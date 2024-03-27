/**
 * @class Bird
 * @description 鸟的实体类，包含鸟的两种飞行状态
 */
export class Bird {
  constructor() {
    this.birdUp = { dx: 133, dy: 10, width: 48, height: 30 };
    this.birdDown = { dx: 181, dy: 5, width: 48, height: 30 };
  }
}
