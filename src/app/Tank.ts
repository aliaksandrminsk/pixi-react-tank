import {
  Point,
  Container,
  AnimatedSprite,
  Texture,
  Sprite,
  Graphics,
} from "pixi.js";

export const createAnimatedSprite = (
  textureNames: Array<string>,
  position = { x: 0, y: 0 },
  anchor = { x: 0.5, y: 0.5 }
) => {
  const textures = textureNames.map((name: string) => Texture.from(name));

  const animatedSprite = new AnimatedSprite(textures);
  animatedSprite.position.copyFrom(position);
  animatedSprite.anchor.copyFrom(anchor);
  return animatedSprite;
};

export const createSprite = (
  textureName: string,
  position = { x: 0, y: 0 },
  anchor = { x: 0.5, y: 0.5 }
) => {
  const sprite = new Sprite(Texture.from(textureName));
  sprite.position.copyFrom(position);
  sprite.anchor.copyFrom(anchor);
  return sprite;
};

export class Tank {
  protected _view: Container;
  protected _bodyContainer: Container;
  protected _tracksLeft: AnimatedSprite;
  protected _tracksRight: AnimatedSprite;
  protected _towerContainer: Container;
  protected _arrowGraphics: Graphics;

  public stepX: number = 0;
  public stepY: number = 0;

  constructor() {
    this._view = new Container();

    this._bodyContainer = new Container();
    this._view.addChild(this._bodyContainer);

    this._tracksLeft = createAnimatedSprite(["TrackСFrame1", "TrackСFrame2"], {
      x: 0,
      y: -80,
    });
    this._tracksRight = createAnimatedSprite(["TrackСFrame1", "TrackСFrame2"], {
      x: 0,
      y: 80,
    });
    this._tracksLeft.animationSpeed = 0.25;
    this._tracksRight.animationSpeed = 0.25;
    this._bodyContainer.addChild(this._tracksLeft, this._tracksRight);

    const hull = createSprite("HeavyHullB");
    this._bodyContainer.addChild(hull);

    this._towerContainer = new Container();
    this._view.addChild(this._towerContainer);
    this._towerContainer.addChild(
      createSprite("HeavyGunB", { x: 140, y: -27 })
    );
    this._towerContainer.addChild(createSprite("HeavyGunB", { x: 160, y: 29 }));
    this._towerContainer.addChild(
      createSprite("GunConnectorD", { x: 80, y: 0 })
    );
    this._towerContainer.addChild(createSprite("HeavyTowerB"));

    this._arrowGraphics = new Graphics();
    this._view.addChild(this._arrowGraphics);

    //*******Check positions of control points for Collision************
    // const marker = new Graphics();
    // marker.beginFill(0xfff000, 1);
    // marker.drawCircle(106, 120, 5);
    // marker.drawCircle(106, -120, 5);
    // marker.drawCircle(114, -82, 5);
    // marker.drawCircle(114, 82, 5);
    // marker.drawCircle(114, 0, 5);
    // marker.endFill();
    // this._bodyContainer.addChild(marker);
  }

  getControlPoints() {
    const points: Array<Point> = [];
    points.push(this._bodyContainer.toGlobal({ x: 106, y: 120 }));
    points.push(this._bodyContainer.toGlobal({ x: 106, y: -120 }));
    points.push(this._bodyContainer.toGlobal({ x: 114, y: -82 }));
    points.push(this._bodyContainer.toGlobal({ x: 114, y: 82 }));
    points.push(this._bodyContainer.toGlobal({ x: 114, y: 0 }));
    return points;
  }

  get view() {
    return this._view;
  }

  set towerDirection(value: number) {
    this._towerContainer.rotation = value;
  }

  get towerDirection() {
    return this._towerContainer.rotation;
  }

  set bodyDirection(value: number) {
    this._bodyContainer.rotation = value;
  }

  get bodyDirection() {
    return this._bodyContainer.rotation;
  }

  get x() {
    return this._view.position.x;
  }

  set x(value: number) {
    this._view.position.x = value;
  }

  get y() {
    return this._view.position.y;
  }

  set y(value: number) {
    this._view.position.y = value;
  }

  startTracks() {
    this._tracksLeft.play();
    this._tracksRight.play();
  }

  stopTracks() {
    this._tracksLeft.stop();
    this._tracksRight.stop();
  }

  drawArrow(angle: number) {
    const pointX = 800 * Math.cos(angle);
    const pointY = 800 * Math.sin(angle);
    this._arrowGraphics.clear();
    this._arrowGraphics
      .lineStyle(2, 0xffffff, 0.4)
      .moveTo(0, 0)
      .lineTo(pointX, pointY);
  }
}
