import * as PIXI from "pixi.js";
import { assetsMap } from "./assetsMap";
import { Tank } from "./Tank";
import { autorun } from "mobx";
import { Wall } from "./Wall";
import { ITankStore } from "../store/TankStore";
import { appConstants } from "./constants";
import { Tween } from "@tweenjs/tween.js";
const TWEEN = require("@tweenjs/tween.js");
window.PIXI = PIXI;

declare global {
  interface Window {
    TANK: any;
  }
}

export class TankApplication extends PIXI.Application {
  store: ITankStore;

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

  runGame = () => {
    const tank = new Tank();
    const wall = new Wall();

    this.stage.addChild(wall.view);
    this.stage.addChild(tank.view);

    this.stage.position.set(
      appConstants.STAGE_WIDTH / 2,
      appConstants.STAGE_HEIGHT / 2
    );

    window.TANK = tank;

    let turnTowerTween: Tween<Tank> = new TWEEN.Tween(tank);
    let turnBodyTween: Tween<Tank> = new TWEEN.Tween(tank);

    const startTank = (angle: number) => {
      tank.startTracks();

      if (tank.bodyDirection !== angle) {
        turnTowerTween = new TWEEN.Tween(tank)
          .to({ towerDirection: angle }, 500)
          .start();
        turnBodyTween = new TWEEN.Tween(tank)
          .to({ bodyDirection: angle }, 1000)
          .start();
      }

      tank.stepX = this.store.speed * Math.cos(angle);
      tank.stepY = this.store.speed * Math.sin(angle);
    };

    const stopTank = () => {
      turnBodyTween.stop();
      turnTowerTween.stop();
      tank.stepX = 0;
      tank.stepY = 0;
      tank.stopTracks();
    };

    autorun(() => {
      tank.drawArrow(this.store.radians);
      if (this.store.speed > 0) {
        startTank(this.store.radians);
      } else {
        stopTank();
      }
    });

    this.ticker.add(() => {
      TWEEN.update();

      if (this.store.speed > 0 && turnBodyTween && !turnBodyTween.isPlaying()) {
        if (wall.containPoints(tank.getControlPoints())) {
          this.store.speed = 0;
        } else {
          tank.x += tank.stepX;
          tank.y += tank.stepY;
        }
      }
    });
  };
}
