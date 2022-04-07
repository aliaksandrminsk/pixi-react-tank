import { Rectangle, Point, Container, Graphics, Texture } from "pixi.js";

export class Wall {
  protected _view: Container;
  protected _leftWall: Container;
  protected _rightWall: Container;
  protected _topWall: Container;
  protected _bottomWall: Container;

  constructor() {
    this._view = new Container();

    this._leftWall = new Container();
    const leftWallGraphics = new Graphics();
    leftWallGraphics.beginTextureFill({ texture: Texture.from("wall") });
    leftWallGraphics.drawRect(-400, -300, 20, 600);
    leftWallGraphics.endFill();
    this._leftWall.addChild(leftWallGraphics);
    this._leftWall.hitArea = new Rectangle(-400, -300, 20, 600);
    this._view.addChild(this._leftWall);

    this._rightWall = new Container();
    const rightWallGraphics = new Graphics();
    rightWallGraphics.beginTextureFill({ texture: Texture.from("wall") });
    rightWallGraphics.drawRect(380, -300, 20, 600);
    rightWallGraphics.endFill();
    this._rightWall.addChild(rightWallGraphics);
    this._rightWall.hitArea = new Rectangle(380, -300, 20, 600);
    this._view.addChild(this._rightWall);

    this._topWall = new Container();
    const topWallGraphics = new Graphics();
    topWallGraphics.beginTextureFill({ texture: Texture.from("wall") });
    topWallGraphics.drawRect(-400, -300, 800, 20);
    topWallGraphics.endFill();
    this._topWall.addChild(topWallGraphics);
    this._topWall.hitArea = new Rectangle(-400, -300, 800, 20);
    this._view.addChild(this._topWall);

    this._bottomWall = new Container();
    const bottomWallGraphics = new Graphics();
    bottomWallGraphics.beginTextureFill({ texture: Texture.from("wall") });
    bottomWallGraphics.drawRect(-400, 280, 800, 20);
    bottomWallGraphics.endFill();
    this._bottomWall.addChild(bottomWallGraphics);
    this._bottomWall.hitArea = new Rectangle(-400, 280, 800, 20);
    this._view.addChild(this._bottomWall);
  }

  containPoints(points: Array<Point>) {
    const containers: Array<Container> = [
      this._bottomWall,
      this._topWall,
      this._rightWall,
      this._leftWall,
    ];
    for (const point of points) {
      for (const container of containers) {
        const localPoint = container.toLocal(point);
        if (container.hitArea.contains(localPoint.x, localPoint.y)) {
          return true;
        }
      }
    }
    return false;
  }

  get view() {
    return this._view;
  }
}
