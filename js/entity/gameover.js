
export class Gameover {
    constructor(gameoverSprites, canvasWidth, canvasHeight) {
        this.gameoverText = gameoverSprites.gameoverText;
        this.chromeLogos = gameoverSprites.chromeLogos;
        this.restartLogos = gameoverSprites.restartLogos;

        this.canvasWidth = canvasWidth;
        this.canvasHeight = canvasHeight;

        this.gameoverTextPosition = {
            dx: this.canvasWidth / 2 - 95.5,
            dy: this.canvasHeight / 2 - 50,
            width: 191,
            height: 11
        };
        this.statusIndex = 0;
        this.statusFrame = 0.1;

        this.restartLogosPosition = {
            dx: this.canvasWidth / 2 - 20,
            dy: this.canvasHeight / 2,
            width: 228,
            height: 35
        };


    }

    draw(ctx) {
        ctx.drawImage(this.gameoverText, 0, 0, this.gameoverText.width, this.gameoverText.height, this.canvasWidth / 2 - 95.5, this.canvasHeight / 2 - 30, this.gameoverText.width, this.gameoverText.height);
        const index = Math.floor(this.statusIndex);
        ctx.drawImage(
            this.restartLogos[index],
            0,
            0,
            this.restartLogos[index].width,
            this.restartLogos[index].height,
            this.restartLogosPosition.dx,
            this.restartLogosPosition.dy,
            this.restartLogos[index].width,
            this.restartLogos[index].height,
        );
    }

    update() {
        this.statusIndex += this.statusFrame;
        if (this.statusIndex > this.restartLogos.length - 1) {
            this.statusIndex = this.restartLogos.length - 1;
        }
    }

    restart() {
        this.statusIndex = 0;
    }
}