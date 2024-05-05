/**
 * @class Bird
 * @description 鸟的实体类，包含鸟的两种飞行状态
 */
export class Bird {
  constructor(birdSprites, canvasWidth, canvasHeight, initSpeed = 5) {
    this.birdStatus = [birdSprites.birdUp, birdSprites.birdDown]

    this.initSpeed = initSpeed;
    this.canvasWidth = canvasWidth;
    this.canvasHeight = canvasHeight;

    this.statusIndex = 0;
    this.statusFrame = 0.2;

    this.currentBird = this.birdStatus[this.statusIndex];
    this.birdHeights = [30, 75, canvasHeight - 40]
    this.birdPosition = {
      dx: 600,
      dy: this.birdHeights[this.#randomHeight()],
      width: this.currentBird.width,
      height: this.currentBird.height
    }

  }

  draw(ctx) {
    ctx.drawImage(
      this.currentBird,
      0,
      0,
      this.currentBird.width,
      this.currentBird.height,
      this.birdPosition.dx,
      this.birdPosition.dy,
      this.currentBird.width,
      this.currentBird.height
    );
  }

  update() {
    this.birdPosition.dx -= this.initSpeed;

    if (this.birdPosition.dx < -50) {
      this.birdPosition.dx = 600;
      this.birdPosition.dy = this.birdHeights[this.#randomHeight()];
    }
  }

  gameOver() {
    this.statusIndex = 0;
    this.currentBird = this.birdStatus[this.statusIndex];
    this.initSpeed = 0;
  }

  restart() {
    this.initSpeed = 5;
  }

  #randomHeight() {
    //随机返回 0 1 2
    return Math.floor(Math.random() * 3);
  }


  updateSpeed(speed) {
    this.initSpeed = speed;
  }
}
