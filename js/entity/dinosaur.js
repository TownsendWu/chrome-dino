import { calcY } from "../utils/physics-util.js";

/**
 * @class Dinosaur
 * @classdesc 恐龙的实体对象，负责恐龙的各种状态
 */
export class Dinosaur {

  constructor(dinosaurSprites, sound, canvasWidth, canvasHeight) {
    //音效
    this.sound = sound;
    //恐龙的精灵裁切图
    this.initDinosaur = dinosaurSprites.initDinosaur;
    this.dinosaurStatus = dinosaurSprites.moveDinosaurs;

    //画布大小
    this.canvasWidth = canvasWidth;
    this.canvasHeight = canvasHeight;

    //恐龙的状态
    this.statusIndex = 2;
    this.statusFrame = 0.2;
    this.isDuck = false;
    this.isDead = false;

    //恐龙的跳跃力
    this.velocityY = 0;
    this.jumpForce = -12;

    //离地面的高度
    this.dinoGroundBase = canvasHeight - 51;



    //恐龙的位置
    this.currentDinosaur = this.dinosaurStatus[this.statusIndex];
    this.position = {
      dx: 20,
      dy: this.dinoGroundBase,
      width: this.currentDinosaur.width,
      height: this.currentDinosaur.height
    };

    this.duckPosition = {
      dx: 21,
      dy: this.dinoGroundBase + 15,
      width: this.dinosaurStatus[6].width,
      height: this.dinosaurStatus[6].height
    };

  }

  draw(ctx) {
    //绘制方块，以便于观察碰撞体积
    // ctx.fillStyle = "red";
    // ctx.fillRect(this.position.dx, this.position.dy, this.currentDinosaur.width -10 , this.currentDinosaur.height -10 );

    if (this.isDuck && !this.isDead && this.position.dy >= this.dinoGroundBase - 1) {
      ctx.drawImage(
        this.currentDinosaur,
        0,
        0,
        this.currentDinosaur.width,
        this.currentDinosaur.height,
        this.duckPosition.dx,
        this.duckPosition.dy,
        this.currentDinosaur.width,
        this.currentDinosaur.height);
      return;
    }
    ctx.drawImage(
      this.currentDinosaur,
      0,
      0,
      this.currentDinosaur.width,
      this.currentDinosaur.height,
      this.position.dx,
      this.position.dy,
      this.currentDinosaur.width,
      this.currentDinosaur.height);
  }

  update() {
    this.statusIndex += this.statusFrame;

    if (this.isDead) {
      this.statusIndex = 5;
      this.currentDinosaur = this.dinosaurStatus[this.statusIndex];

      return
    }


    if (this.isDuck && this.statusIndex > 8) {
      this.statusIndex = 6;
    }

    if (!this.isDuck && this.statusIndex > 2) {
      this.statusIndex = 0;
    }


    this.currentDinosaur = this.dinosaurStatus[Math.floor(this.statusIndex)];

    [this.velocityY, this.position.dy] = calcY(
      this.velocityY,
      this.position.dy
    );
    //判断是否在空中,在空中就固定站立
    if (this.position.dy < this.dinoGroundBase) {
      this.currentDinosaur = this.dinosaurStatus[2];
      this.isDuck = false;
    }

    if (this.position.dy >= this.dinoGroundBase) {
      this.position.dy = this.dinoGroundBase;
    }

  }

  jump() {
    //只有在地面的时候才能跳跃
    if (this.position.dy < this.dinoGroundBase - 1) {
      return;
    }
    //todo 根据按键的时长来调整的跳跃的力度
    this.velocityY = this.jumpForce;
    this.isJump = true;
    this.sound.jump(); 
  }


  duck(flag = true) {
    if (flag) {
      this.isDuck = true;
      if (this.statusIndex < 6) {
        this.statusIndex = 6;
      }
    } else {
      this.isDuck = false;
      this.statusIndex = 2;
    }
  }

  gameOver() {
    if (!this.isDead) {
      this.sound.gameover();
    }
    this.isDead = true;
  }

  restart() {
    this.isDead = false;
    this.statusIndex = 2;
  }
}