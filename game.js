import { Ground } from "./js/entity/ground.js";
import { Background } from "./js/entity/background.js";
import { Dinosaur } from "./js/entity/dinosaur.js";
import { Cactus } from "./js/entity/cactus.js";
import { Gameover } from "./js/entity/gameover.js";
import { Bird } from "./js/entity/bird.js";
import { Score } from "./js/entity/score.js";

export class Game {
  constructor(sprites, sound) {
    //注册空格按钮事件
    this.#initEvent();

    this.sprites = sprites;
    this.sound = sound;

    //获取画布
    this.canvas = document.getElementById("gameBox");
    this.ctx = this.canvas.getContext("2d");
    //获取画布宽高
    this.canvasWidth = this.canvas.width;
    this.canvasHeight = this.canvas.height;

    //初始化游戏状态
    this.firstLoading = true;
    this.isLoadAnmation = false;
    this.start = false;
    this.gameover = false;
    this.score = 0;
    this.level = 1;
    this.rollSpeed = 2;

    //初始化游戏元素
    this.ground = new Ground(this.canvasWidth, this.canvasHeight, 0);

    this.background = new Background();
    this.dinosaur = new Dinosaur(this.canvasWidth, this.canvasHeight);
    this.cactus = new Cactus();
    this.gameover = new Gameover();
    this.bird = new Bird();
    this.score = new Score();
  }

  run() {
    this.ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight);

    if (this.firstLoading) {
      this.#drawFirstLoadDinosaur();
      return;
    }
    if (this.isLoadAnmation) {
      this.#drawFirstLoadAnimation();
      return; 
    }

    //绘制地面
    this.#drawGround();
    //绘制恐龙
    this.#drawDinosaur();
  }

  #drawFirstLoadDinosaur() {
    this.ctx.drawImage(
      this.sprites.spriteImg,
      this.dinosaur.dinosaurBegin.dx,
      this.dinosaur.dinosaurBegin.dy,
      this.dinosaur.dinosaurBegin.width,
      this.dinosaur.dinosaurBegin.height,
      this.dinosaur.dinosaurPosition.dx,
      this.dinosaur.dinosaurPosition.dy,
      this.dinosaur.dinosaurBegin.width,
      this.dinosaur.dinosaurBegin.height
    );
  }
  #drawFirstLoadAnimation() {
    const item = this.ground.groundPositions[0];
    this.ctx.drawImage(
      this.sprites.spriteImg,
      item.sx,
      item.sy,
      item.sWidth,
      item.sHeight,
      item.dx,
      item.dy,
      item.dWidth,
      item.dHeight
    );
  
    if (this.ground.firstLoadAnimation()) {
      this.isLoadAnmation = false;
      this.ground.reset()
    }
  }

  #drawGround() {
    for (const item of this.ground.groundPositions) {
      this.ctx.drawImage(
        this.sprites.spriteImg,
        item.sx,
        item.sy,
        item.sWidth,
        item.sHeight,
        item.dx,
        item.dy,
        item.dWidth,
        item.dHeight
      );
    }
    this.ground.update();
  }

  #drawDinosaur() {}

  #initEvent() {
    document.addEventListener("keydown", (e) => {
      // console.log(e);
      if (e.code === "Space") {
        console.log("jump");
        //绘制开场动画
        if (this.firstLoading) {
          this.isLoadAnmation = true;
          this.firstLoading = false;
        }
      }
    });
  }
}
