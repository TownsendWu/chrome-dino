import { calcY } from "../utils/physics-util.js";

/**
 * @class Dinosaur
 * @classdesc 恐龙的实体对象，负责恐龙的各种状态
 */
export class Dinosaur {
  constructor(canvasWidth, canvasHeight) {
    this.canvasWidth = canvasWidth;
    this.canvasHeight = canvasHeight;

    this.dinosaurBegin = { x: 37, y: 5, width: 48, height: 48 };

    this.dinosaurStatus = [
      { x: 934, y: 5, width: 45, height: 48 },
      { x: 978, y: 5, width: 45, height: 48 },
      { x: 849, y: 5, width: 42, height: 48 },
      { x: 892, y: 5, width: 42, height: 48 },
      { x: 1025, y: 5, width: 42, height: 48 },
      { x: 1070, y: 5, width: 42, height: 48 },
      { x: 1113, y: 20, width: 58, height: 32 },
      { x: 1170, y: 20, width: 58, height: 32 },
    ];
    //当前的动作状态
    this.statusIndex = 2;
    this.statusFrame = 0.2;
    this.currentDinosaur = this.dinosaurStatus[0];

    //离地面的高度
    this.dinoGroundBase = canvasHeight - 48 - 4;

    this.dinosaurPosition = {
      sx: 0,
      sy: 54,
      sWidth: 48,
      sHeight: 48,
      dx: 20,
      dy: this.dinoGroundBase,
      dWidth: 48,
      dHeight: 48,
    };

    this.velocityY = 0;
    this.jumpForce = -10;
    // this.maxJumpHeight = 10;
  }

  update() {
    this.statusIndex += this.statusFrame;
    if (this.statusIndex > 2) {
      this.statusIndex = 0;
    }
    // console.log(this.statusIndex);
    // this.statusIndex = 1
    this.currentDinosaur = this.dinosaurStatus[Math.floor(this.statusIndex)];

    [this.velocityY, this.dinosaurPosition.dy] = calcY(
      this.velocityY,
      this.dinosaurPosition.dy
    );

    if (this.dinosaurPosition.dy >= this.dinoGroundBase) {
      this.dinosaurPosition.dy = this.dinoGroundBase;
    }
  }

  jump() {

    //只有在地面的时候才能跳跃
    if (this.dinosaurPosition.dy < this.dinoGroundBase - 1) {
      return;
    }
    //todo 根据按键的时长来调整的跳跃的力度
    this.velocityY = this.jumpForce;
  }

  reset() {
    this.dinosaurPosition = {
      sx: 0,
      sy: 54,
      sWidth: 48,
      sHeight: 48,
      dx: 20,
      dy: this.dinoGroundBase,
      dWidth: 48,
      dHeight: 48,
    };

    this.velocityY = 0;
    this.jumpForce = -10;
  }
}
