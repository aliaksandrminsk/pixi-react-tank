import { makeAutoObservable } from "mobx";

type CallbackFunction = () => void;

export interface ITankStore {
  degrees: number;
  radians: number;
  speed: number;
  isTexturesLoaded: boolean;
  startTankHandler: CallbackFunction;
  stopTankHandler: CallbackFunction;
}

export class TankStore implements ITankStore {
  private _degrees = 0;
  private _speed = 0;
  private _startTankHandler: CallbackFunction = () => void 0;
  private _stopTankHandler: CallbackFunction = () => void 0;
  public isTexturesLoaded = false;

  constructor() {
    makeAutoObservable(this);
  }

  set degrees(value: number) {
    this._degrees = value;
  }
  get degrees() {
    return this._degrees;
  }
  get radians() {
    return (this._degrees * Math.PI) / 180;
  }

  get speed() {
    return this._speed;
  }

  set speed(value: number) {
    this._speed = value;
  }

  set startTankHandler(callBack: CallbackFunction) {
    this._startTankHandler = callBack;
  }

  get startTankHandler() {
    return this._startTankHandler;
  }

  set stopTankHandler(callBack: CallbackFunction) {
    this._stopTankHandler = callBack;
  }

  get stopTankHandler() {
    return this._stopTankHandler;
  }
}

export default TankStore;
