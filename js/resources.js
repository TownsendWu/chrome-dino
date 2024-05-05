function createCanvas(spriteImg, dx, dy, width, height) {
    const myCanvas = document.createElement("canvas");
    const ctx = myCanvas.getContext("2d");
    myCanvas.width = width;
    myCanvas.height = height;
    ctx.drawImage(spriteImg, dx, dy, width, height, 0, 0, width, height);
    return myCanvas;
}


export class Sound {
    constructor(gameoverMp3, jumpMp3, levelUpMp3) {
        this.gameoverMp3 = gameoverMp3;
        this.jumpMp3 = jumpMp3;
        this.levelUpMp3 = levelUpMp3;
    }
    jump() {
        this.jumpMp3.play();
    }
    gameover() {
        this.gameoverMp3.play();
    }
    levelUp() {
        this.levelUpMp3.play();
    }
}


export class Score {
    constructor(spriteImg) {
        this.spriteImg = spriteImg;
        //离屏canvas缓存
        //初始化的分数
        this.hi = this.#getHi();
        this.numbers = this.#getNumbers();
    }
    #getHi() {
        const hi = { dx: 754, dy: 2, width: 22, height: 12 };
        return createCanvas(this.spriteImg, hi.dx, hi.dy, hi.width, hi.height);
    }

    #getNumbers() {
        const numbers = [
            { dx: 652, dy: 2, width: 12, height: 12 },
            { dx: 664, dy: 2, width: 11, height: 12 },
            { dx: 674, dy: 2, width: 11, height: 12 },
            { dx: 684, dy: 2, width: 11, height: 12 },
            { dx: 694, dy: 2, width: 11, height: 12 },
            { dx: 704, dy: 2, width: 11, height: 12 },
            { dx: 714, dy: 2, width: 11, height: 12 },
            { dx: 724, dy: 2, width: 11, height: 12 },
            { dx: 734, dy: 2, width: 11, height: 12 },
            { dx: 744, dy: 2, width: 11, height: 12 },
        ]

        const numberImages = [];
        for (const item of numbers) {
            numberImages.push(createCanvas(this.spriteImg, item.dx, item.dy, item.width, item.height));
        }
        return numberImages;
    }


}

export class GameOver {
    constructor(spriteImg) {
        this.spriteImg = spriteImg;
        //离屏canvas缓存
        //初始化的gameover
        this.gameoverText = this.#getGameOverText();
        this.chromeLogos = this.#getChromeLogos();
        this.restartLogos = this.#getRestartLogos();
    }

    #getGameOverText() {
        return createCanvas(this.spriteImg, 653, 15, 195, 18);
    }

    #getChromeLogos() {
        const chromeLogos = [];
        const logos = [
            { x: 5, y: 68, width: 30, height: 30 },
            { x: 38, y: 68, width: 30, height: 30 },
        ];
        for (const item of logos) {
            chromeLogos.push(createCanvas(this.spriteImg, item.x, item.y, item.width, item.height));
        }
        return chromeLogos;
    }

    #getRestartLogos() {
        const restartLogos = [];
        const logos = [
            { x: 71, y: 68, width: 35, height: 35 },
            { x: 108, y: 68, width: 38, height: 35 },
            { x: 148, y: 68, width: 35, height: 35 },
            { x: 181, y: 68, width: 38, height: 35 },
            { x: 217, y: 68, width: 38, height: 35 },
            { x: 253, y: 68, width: 38, height: 35 },
        ];
        for (const item of logos) {
            restartLogos.push(createCanvas(this.spriteImg, item.x, item.y, item.width, item.height));
        }
        return restartLogos;

    }


}

export class Bird {
    constructor(spriteImg) {
        this.spriteImg = spriteImg;
        //离屏canvas缓存
        //初始化的鸟
        this.birdUp = this.#getBirdUp();
        this.birdDown = this.#getBirdDown();
    }

    #getBirdUp() {
        return createCanvas(this.spriteImg, 133, 10, 48, 30);
    }

    #getBirdDown() {
        return createCanvas(this.spriteImg, 181, 5, 48, 30);
    }
}

export class BackGround {
    constructor(spriteImg) {
        this.spriteImg = spriteImg;
        //离屏canvas缓存
        //初始化的地面
        this.ground1 = this.#getGround();
        this.ground2 = this.#getGround();
        this.clouds = [
            this.#getCloud(),
            this.#getCloud(),
            this.#getCloud()
        ]
    }

    #getGround() {
        return createCanvas(this.spriteImg, 0, 54, 1199, 12);
    }

    #getCloud() {
        return createCanvas(this.spriteImg, 85, 2, 48, 15);
    }

}


export class Cactus {
    constructor(spriteImg) {
        this.spriteImg = spriteImg;
        //离屏canvas缓存
        //初始化的仙人掌
        this.cactusGroups = this.#getCactusGroups();
    }
    #getCactusGroups() {
        const cactusGroups = [];
        const cactus = [
            { x: 229, y: 3, width: 15, height: 40 },
            { x: 245, y: 3, width: 34, height: 40 },
            { x: 280, y: 3, width: 50, height: 40 },
            { x: 330, y: 3, width: 26, height: 48 },
            { x: 357, y: 3, width: 50, height: 48 },
            { x: 408, y: 3, width: 75, height: 48 },
        ];
        for (const item of cactus) {
            cactusGroups.push(createCanvas(this.spriteImg, item.x, item.y, item.width, item.height));
        }
        return cactusGroups;
    }
}


export class Dinosaurs {
    constructor(spriteImg) {
        this.spriteImg = spriteImg;
        //离屏canvas缓存
        //初始化的恐龙
        this.initDinosaur = this.#getInitDinosaur();

        //移动状态的恐龙
        this.moveDinosaurs = this.#getMoveDinosaur();
    }


    /**
     * 获取初始化的恐龙
     * @returns {HTMLCanvasElement}
     */
    #getInitDinosaur() {
        return createCanvas(this.spriteImg, 37, 5, 48, 48);
    }

    #getMoveDinosaur() {
        const dinosaurs = [];
        const dinosaurStatus = [
            { x: 937, y: 5, width: 44, height: 48 },
            { x: 980, y: 5, width: 44, height: 48 },
            { x: 849, y: 5, width: 42, height: 48 },
            { x: 892, y: 5, width: 42, height: 48 },
            { x: 1025, y: 5, width: 42, height: 48 },
            { x: 1070, y: 5, width: 42, height: 48 },
            { x: 1113, y: 20, width: 58, height: 32 },
            { x: 1170, y: 20, width: 58, height: 32 },
        ];

        for (const item of dinosaurStatus) {
            dinosaurs.push(createCanvas(this.spriteImg, item.x, item.y, item.width, item.height));
        }

        return dinosaurs;
    }
}