import { Dinosaur } from "./js/entity/dinosaur.js";
import { Ground } from "./js/entity/ground.js";
import { Cactus } from "./js/entity/cactus.js";
import { ScoreUI } from "./js/entity/score.js";
import { Gameover } from "./js/entity/gameover.js";
import { Bird } from "./js/entity/bird.js";


export class Game {
  constructor(sprites, sound) {
    //游戏资源
    this.sprites = sprites;
    this.sound = sound;

    //获取背景画布
    this.backgroundCanvas = document.getElementById("backgroundBox")
    this.backgroundCtx = this.backgroundCanvas.getContext("2d");

    //获取游戏主体画布相关信息
    this.gameCanvas = document.getElementById("gameBox");
    this.ctx = this.gameCanvas.getContext("2d");
    this.canvasWidth = this.gameCanvas.width;
    this.canvasHeight = this.gameCanvas.height;


    //游戏状态
    this.isGameOver = false;
    this.initSpeed = 5;
    this.maxSpeed = 13;


    //精灵实体
    //地面
    this.ground = new Ground(this.sprites.ground, this.canvasWidth, this.canvasHeight, this.initSpeed);
    //恐龙
    this.dinosaurs = new Dinosaur(this.sprites.dinosaurs, this.sound, this.canvasWidth, this.canvasHeight);
    //仙人掌
    this.cactus = new Cactus(this.sprites.cactus, this.canvasWidth, this.canvasHeight, this.initSpeed);
    //小鸟
    this.bird = new Bird(this.sprites.bird, this.canvasWidth, this.canvasHeight, this.initSpeed);

    //分数UI
    this.scoreUI = new ScoreUI(sprites.score, this.sound, this.canvasWidth, this.canvasHeight);

    //游戏结束
    this.gameover = new Gameover(sprites.gameover, this.canvasWidth, this.canvasHeight);



    //初始化鼠标点击和键盘空格事件
    this.#initEvent();
  }

  run() {
    this.backgroundCtx.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
    this.ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
    // console.log("游戏运行中~");

    this.#drawCactus();
    // this.#drawBird();
    this.#drawDinosaurs();
    this.#drawGround();
    this.#drawScore();

    this.#collisionDetection();


    if (this.isGameOver) {
      this.#drawGameover();
      return;
    }

    this.#updateSpeed();
  }

  #drawGround() {
    this.ground.draw(this.backgroundCtx);
    this.ground.update();
  }

  #drawDinosaurs() {
    this.dinosaurs.draw(this.ctx);
    this.dinosaurs.update();
  }

  #drawCactus() {
    this.cactus.draw(this.ctx);
    this.cactus.update();
  }

  #drawBird() {
    this.bird.draw(this.ctx);
    this.bird.update();
  }

  #drawScore() {
    this.scoreUI.draw(this.backgroundCtx);
    this.scoreUI.update();
  }

  #drawGameover() {
    this.gameover.draw(this.ctx);
    this.gameover.update();
  }

  /**
   * 碰撞检测
   */
  #collisionDetection() {
    if (this.isGameOver) {
      this.#gameOver();
      return;
    }
    const dinosaurs = this.dinosaurs.position;
    const cactusGroup = this.cactus.currentCactusGroup;
    //适当缩小碰撞体积
    for (const cactus of cactusGroup) {
      if (dinosaurs.dx < cactus.dx + cactus.currentCactus.width - 15 &&
        dinosaurs.dx + dinosaurs.width - 10 > cactus.dx &&
        dinosaurs.dy < cactus.dy + cactus.currentCactus.height - 10 &&
        dinosaurs.height - 10 + dinosaurs.dy > cactus.dy) {
        this.isGameOver = true;
      }
    }
  }

  #updateSpeed() {
    //每100分速度增加1
    let speed = Math.floor(this.scoreUI.score / 100) + this.initSpeed;
    if (speed > this.maxSpeed) {
      this.initSpeed = this.maxSpeed;
      speed = this.maxSpeed;
    }
    this.ground.updateSpeed(speed);
    this.cactus.updateSpeed(speed);
    //同时适当更改仙人掌的间距
    this.cactus.updateDistance(speed);
  }

  #gameOver() {
    this.dinosaurs.gameOver();
    this.ground.gameOver();
    this.cactus.gameOver();
    this.scoreUI.gameOver();

  }

  #restart() {
    this.isGameOver = false;
    this.dinosaurs.restart();
    this.ground.restart();
    this.cactus.restart();
    this.scoreUI.restart();
    this.gameover.restart();
    this.initSpeed = 5;
  }

  #initEvent() {
    //鼠标点击事件
    this.gameCanvas.addEventListener("click", () => {
      if (this.isGameOver) {
        this.#restart();
      } else {
        this.dinosaurs.jump();
      }
    });

    //键盘空格事件
    document.addEventListener("keydown", (e) => {
      // console.log(e);
      if (["Space", "KeyW", "ArrowUp"].indexOf(e.code) !== -1) {
        if (this.isGameOver) {
          this.#restart();
        } else {
          this.dinosaurs.jump();
        }
      }

      //监听S键和下键
      if (["KeyS", "ArrowDown"].indexOf(e.code) !== -1) {
        this.dinosaurs.duck();
      }

    });

    //键盘空格事件
    document.addEventListener("keyup", (e) => {
      //监听S键和下键
      if (["KeyS", "ArrowDown"].indexOf(e.code) !== -1) {
        this.dinosaurs.duck(false);
      }

    });
  }
}