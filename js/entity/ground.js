export class Ground {
  constructor(groundSprites, canvasWidth, canvasHeight, initSpeed = 5) {
    this.groundOne = groundSprites.ground1;
    this.groundTwo = groundSprites.ground2;
    this.clouds = groundSprites.clouds;
    this.canvasWidth = canvasWidth;
    this.canvasHeight = canvasHeight;
    this.speed = initSpeed;
    this.cloudSpeed = 1;


    //两个地面的位置，用于无缝滚动
    this.groundPositions = [
      {
        dx: 0,
        dy: canvasHeight - 20,
      },
      {
        dx: 1119,
        dy: canvasHeight - 20,
      },
    ];

    this.cloudPositions = [
      {
        dx: 0,
        dy: 30,
      },
      {
        dx: 300,
        dy: 20,
      },
      {
        dx: 450,
        dy: 40,
      }
    ]
  }
  /**
   * @param {CanvasRenderingContext2D} ctx 
   */
  draw(ctx) {
    ctx.drawImage(this.groundOne, 0, 0, 1119, 12, this.groundPositions[0].dx, this.groundPositions[0].dy, 1119, 12);
    ctx.drawImage(this.groundTwo, 0, 0, 1119, 12, this.groundPositions[1].dx, this.groundPositions[1].dy, 1119, 12);

    this.cloudPositions.forEach((cloud,index) => {
      ctx.drawImage(this.clouds[index], 0, 0, 48, 15, cloud.dx, cloud.dy, 48, 15);
    });

  }

  update() {
    this.groundPositions[0].dx -= this.speed;

    this.groundPositions[1].dx -= this.speed;

    if (this.groundPositions[0].dx <= -1119) {
      this.groundPositions[0].dx = 1119;
    }

    if (this.groundPositions[1].dx <= -1119) {
      this.groundPositions[1].dx = 1119;
    }

    this.cloudPositions.forEach(cloud => {
      cloud.dx -= this.cloudSpeed;
      if (cloud.dx <= -48) {
        cloud.dx = 1119;
      }
    });
  }

  gameOver() {
    this.speed = 0;
    this.cloudSpeed = 0;
  }
  restart() {
    this.speed = 5;
    this.cloudSpeed = 1;
  }

  updateSpeed(speed) {
    this.speed = speed;
  }
}
