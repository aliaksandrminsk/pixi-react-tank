import * as PIXI from "pixi.js";
import { assetsMap } from "./assetsMap";
import { Tank } from "./Tank";
import { reaction, runInAction } from "mobx";
import { Wall } from "./Wall";
import { ITankStore } from "../store/TankStore";
import { appConstants } from "./constants";
import { Tween } from "@tweenjs/tween.js";
import TWEEN from "@tweenjs/tween.js";
window.PIXI = PIXI;

declare global {
  interface Window {
    TANK: any;
  }
}

export class TankApplication extends PIXI.Application {
  private store: ITankStore;
  private tank = new Tank();
  private wall = new Wall();
  private turnTowerTween: Tween<Tank> = new TWEEN.Tween(this.tank);
  private turnBodyTween: Tween<Tank> = new TWEEN.Tween(this.tank);

  constructor(store: ITankStore) {
    super({
      width: appConstants.STAGE_WIDTH,
      height: appConstants.STAGE_HEIGHT,
      backgroundColor: appConstants.COLOR,
    });

    this.store = store;
    PIXI.utils.clearTextureCache();
    assetsMap.sprites.forEach((value) =>
      this.loader.add(value.name, value.url)
    );
    this.loader.load(this.runGame);
  }

  startTank = () => {
    this.tank.startTracks();
    this.store.speed = appConstants.TANK_SPEED;

    const angle = this.store.radians;

    if (this.tank.bodyDirection !== angle) {
      this.turnTowerTween = new TWEEN.Tween(this.tank)
        .to({ towerDirection: angle }, 500)
        .start();
      this.turnBodyTween = new TWEEN.Tween(this.tank)
        .to({ bodyDirection: angle }, 1000)
        .start();
    }

    this.tank.stepX = this.store.speed * Math.cos(angle);
    this.tank.stepY = this.store.speed * Math.sin(angle);
  };

  stopTank = () => {
    this.store.speed = 0;
    this.turnBodyTween.stop();
    this.turnTowerTween.stop();
    this.tank.stepX = 0;
    this.tank.stepY = 0;
    this.tank.stopTracks();
  };

  runGame = () => {
    runInAction(() => {
      this.store.isTexturesLoaded = true;
    });

    this.tank.build();
    this.wall.build();

    this.stage.addChild(this.wall.view);
    this.stage.addChild(this.tank.view);

    this.stage.position.set(
      appConstants.STAGE_WIDTH / 2,
      appConstants.STAGE_HEIGHT / 2
    );

    window.TANK = this.tank;

    this.tank.drawArrow(this.store.radians);
    reaction(
      () => this.store.radians,
      (radians) => this.tank.drawArrow(radians)
    );

    this.ticker.add(() => {
      TWEEN.update();

      if (
        this.store.speed > 0 &&
        this.turnBodyTween &&
        !this.turnBodyTween.isPlaying()
      ) {
        if (this.wall.containPoints(this.tank.getControlPoints())) {
          this.stopTank();
        } else {
          this.tank.x += this.tank.stepX;
          this.tank.y += this.tank.stepY;
        }
      }
    });
  };
}
