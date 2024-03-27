export class Ground {
  constructor(canvasWidth, canvasHeight) {
    this.canvasWidth = canvasWidth;
    this.canvasHeight = canvasHeight;

    //地面在精灵图中的位置
    this.x = 0;
    this.y = 54;
    this.width = 1233;
    this.height = 12;

    //地面的初始滚动速度
    this.speed = 5;

    //两个地面的位置，用于无缝滚动
    this.groundPositions = [
      {
        sx: 0,
        sy: 54,
        sWidth: 0,
        sHeight: 12,
        dx: 0,
        dy: canvasHeight - this.height - 8,
        dWidth: 0,
        dHeight: 12,
      },
      {
        sx: 600,
        sy: 54,
        sWidth: 633,
        sHeight: 12,
        dx: 600,
        dy: canvasHeight - this.height - 8,
        dWidth: 633,
        dHeight: 12,
      },
    ];
  }
  firstLoadAnimation() {
    const item = this.groundPositions[0];
    item.dWidth += this.speed;
    item.sWidth += this.speed;

    return item.sWidth >= this.canvasWidth
  }

  update() {
    this.groundPositions[0].dx -= this.speed;
    this.groundPositions[1].dx -= this.speed;

    if (this.groundPositions[0].dx <= -600) {
      this.groundPositions[0].dx = 600;
    }

    if (this.groundPositions[1].dx <= -600) {
      this.groundPositions[1].dx = 600;
    }
  }

  updateSpeed(speed) {
    this.speed = speed;
  }

  reset() {
    this.groundPositions = [
      {
        sx: 0,
        sy: 54,
        sWidth: 600,
        sHeight: 12,
        dx: 0,
        dy: this.canvasHeight - this.height - 8,
        dWidth: 600,
        dHeight: 12,
      },
      {
        sx: 600,
        sy: 54,
        sWidth: 633,
        sHeight: 12,
        dx: 600,
        dy: this.canvasHeight - this.height - 8,
        dWidth: 633,
        dHeight: 12,
      },
    ];
  }
}
