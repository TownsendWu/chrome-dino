export class ScoreUI {
    constructor(scoreSprites, sound, canvasWidth, canvasHeight) {
        this.hi = scoreSprites.hi;
        this.numbers = scoreSprites.numbers;

        this.sound = sound;

        this.canvasWidth = canvasWidth;
        this.canvasHeight = canvasHeight;
        this.score = 0;

        this.step = 0.15;

        this.isGameOver = false;


        this.numbersPositions = [
            { dx: this.canvasWidth - 40, dy: 10 },
            { dx: this.canvasWidth - 40 - 11, dy: 10 },
            { dx: this.canvasWidth - 40 - 22, dy: 10 },
            { dx: this.canvasWidth - 40 - 33, dy: 10 },
            { dx: this.canvasWidth - 40 - 44, dy: 10 },
        ]

        this.maxScorePositions = [
            { dx: this.canvasWidth - 110, dy: 10 },
            { dx: this.canvasWidth - 110 - 11, dy: 10 },
            { dx: this.canvasWidth - 110 - 22, dy: 10 },
            { dx: this.canvasWidth - 110 - 33, dy: 10 },
            { dx: this.canvasWidth - 110 - 44, dy: 10 },
        ]
    }

    draw(ctx) {
        let score = Math.round(this.score);

        //在右上角绘制数字UI
        this.numbersPositions.forEach((pos, index) => {
            let num = Math.floor(score / Math.pow(10, index)) % 10;
            ctx.drawImage(this.numbers[num], pos.dx, pos.dy, 11, 13);
        });

        //在右上角绘制HI
        ctx.drawImage(this.hi, this.canvasWidth - 180, 10, 20, 13);
        //在右上角绘制历史最高分
        let maxScore = this.#getMaxScore();

        maxScore = Math.round(maxScore);
        this.maxScorePositions.forEach((pos, index) => {
            let num = Math.floor(maxScore / Math.pow(10, index)) % 10;
            ctx.drawImage(this.numbers[num], pos.dx, pos.dy, 11, 13);
        });

    }

    update() {
        if (this.isGameOver) {
            return;
        }

        this.score += this.step;

        let tmpScore = Math.round(this.score);
        if (tmpScore % 100 === 0 && tmpScore !== 0) {
            this.sound.levelUp();
        }

        if (this.score >= 99999) {
            this.score = 99999;
        }
    }

    gameOver() {
        this.isGameOver = true;
        let maxScore = this.#getMaxScore();
        if (this.score > maxScore) {
            localStorage.setItem("maxScore", Math.round(this.score));
        }
    }

    restart() {
        this.score = 0;
        this.finalScore = 0;
        this.isGameOver = false;
    }

    #getMaxScore() {
        const maxScore = localStorage.getItem("maxScore");

        return Number(maxScore) || 0;
    }


    #tmpScore() {
        // let scoreStr = score.toString();
        //先在右上角绘制文字版分数
        //四色五入取整
        // ctx.fillStyle = "black";
        // ctx.font = "15px Arial";
        // ctx.fillText(scoreStr, this.canvasWidth - 50, 30);
    }
}