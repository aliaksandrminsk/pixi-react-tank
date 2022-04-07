import { makeAutoObservable } from "mobx";

export interface ITankStore {
  degrees: number;
  radians: number;
  speed: number;
}

export class TankStore {
  private _degrees = 0;
  private _speed = 0;

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
}

export default TankStore;
