


export class Obstacle {
  constructor(cactusSprites, canvasWidth, canvasHeight, initSpeed = 5) {
    this.cactusGroups = cactusSprites.cactusGroups;

    this.canvasWidth = canvasWidth;
    this.canvasHeight = canvasHeight;
    this.initSpeed = initSpeed;

    // 仙人掌的位置
    this.cactusGroundBase = canvasHeight - 44;

    this.minDistance = 250;
    this.maxDistance = 430;


    this.currentCactusGroup = this.#generateCactusGroup();
  }

  draw(ctx) {
    this.currentCactusGroup.forEach(cactus => {
      //绘制方块，以便于观察碰撞体积
      // ctx.fillStyle = "green";
      // ctx.fillRect(cactus.dx, cactus.dy, cactus.currentCactus.width-10, cactus.currentCactus.height-10);

      ctx.drawImage(
        cactus.currentCactus,
        0,
        0,
        cactus.currentCactus.width,
        cactus.currentCactus.height,
        cactus.dx,
        cactus.dy,
        cactus.currentCactus.width,
        cactus.currentCactus.height
      );
    });
  }

  update() {
    this.currentCactusGroup.forEach(cactus => {
      cactus.dx -= this.initSpeed;
    });

    if (this.currentCactusGroup[0].dx + this.currentCactusGroup[0].currentCactus.width < 0) {
      this.currentCactusGroup.shift();
      let dx = this.currentCactusGroup[this.currentCactusGroup.length - 1].dx + this.#randomDistance();
      //避免仙人掌在视觉上突然出现
      if (dx < 600) {
        dx = 600;
      }

      this.currentCactusGroup.push(this.#generateCactus(dx));
      // console.log(this.currentCactusGroup);
    }
  }

  gameOver() {
    this.initSpeed = 0;
  }

  restart() {
    this.initSpeed = 5;
    this.currentCactusGroup = this.#generateCactusGroup();
  }

  updateSpeed(speed) {
    this.initSpeed = speed;
  }
  
  /**
   * 随速度增大，仙人掌间距增大
   * @param {Number} speed 
   */
  updateDistance(speed) {
    this.minDistance = 250 + (speed - 5) * 30;
    this.maxDistance = 430 + (speed - 5) * 30;
  }

  /**
   * 随机生成一组仙人掌
   * @returns [cactus1, cactus2]
   */
  #generateCactusGroup() {
    const cactusGroup = [];
    const distance = this.#randomDistance();

    cactusGroup.push(this.#generateCactus(this.canvasWidth));
    cactusGroup.push(this.#generateCactus(this.canvasWidth + distance));

    return cactusGroup;

  }

  #generateCactus(dx = 0) {
    const i = Math.floor(Math.random() * this.cactusGroups.length);
    const cactus = this.cactusGroups[i];
    return {
      currentCactus: cactus,
      dx: cactus.width + dx,
      dy: this.#calcGroundBase(i)
    };
  }

  #randomDistance() {
    return Math.floor(Math.random() * (this.maxDistance - this.minDistance + 1) + this.minDistance);
  }

  #calcGroundBase(index) {
    return index > 2 ? this.cactusGroundBase - 12 : this.cactusGroundBase;
  }
}


