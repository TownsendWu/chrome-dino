import { calcY } from "../utils/physics-util.js";


/**
 * @class Dinosaur
 * @classdesc 恐龙的实体对象，负责恐龙的各种状态
 */
export class Dinosaur {
  constructor(canvasWidth,canvasHeight) {
    this.canvasWidth = canvasWidth;
    this.canvasHeight = canvasHeight;

    this.dinosaurBegin = { dx: 37, dy: 5, width: 48, height: 48 };

    this.dinosaurStatus = [
      { dx: 37, dy: 5, width: 48, height: 48 },
      { dx: 85, dy: 5, width: 48, height: 48 },
      { dx: 133, dy: 5, width: 48, height: 48 },
      { dx: 181, dy: 5, width: 48, height: 48 },
      { dx: 229, dy: 5, width: 48, height: 48 },
      { dx: 277, dy: 5, width: 48, height: 48 },
      { dx: 325, dy: 20, width: 58, height: 32 },
      { dx: 383, dy: 20, width: 58, height: 32 },
    ];

    this.dinosaurPosition = {
      sx: 0,
      sy: 54,
      sWidth: 48,
      sHeight: 48,
      dx: 20,
      dy: canvasHeight - 48 - 4,
      dWidth: 48,
      dHeight: 48,
    };

    this.velocityY = 0;
    this.jumpForce = -10;

  }

  update() {
    this.dinosaurPosition.dy = this.canvasHeight - 21;
  }

  jump() {
    this.velocityY = this.jumpForce;
  }

}
