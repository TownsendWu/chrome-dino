import { Game } from "./game.js";
import { ResourceLoader } from "./js/resource-loader.js";
import { Sound, Score, Dinosaurs, GameOver, Cactus, BackGround, Bird } from "./js/resources.js";

export class App {
  constructor() {
    //控制帧数
    this.fps = 60;
    this.interval = 1000 / this.fps;
    this.lastTime = 0;
  }

  async start() {
    //先加载资源
    const resourceLoader = new ResourceLoader();
    const spriteImg = await resourceLoader.initSprites();
    const { gameoverMp3, levelUpMp3, jumpMp3 } =
      await resourceLoader.initSound();

    const sound = new Sound(gameoverMp3, jumpMp3, levelUpMp3);
    //离屏canvas

    const dinosaurs = new Dinosaurs(spriteImg);
    const score = new Score(spriteImg);
    const gameover = new GameOver(spriteImg);
    const cactus = new Cactus(spriteImg);
    const ground = new BackGround(spriteImg);
    const bird = new Bird(spriteImg);

    const sprites = {
      dinosaurs,
      score,
      gameover,
      cactus,
      ground,
      bird,
    };

    //创建游戏实例
    this.game = new Game(sprites, sound);

    //启动游戏循环
    this.loop();
  }

  loop(timeStamp) {
    const deltaTime = timeStamp - this.lastTime;
    if (deltaTime > this.interval) {
      this.lastTime = timeStamp - (deltaTime % this.interval);
      this.game.run();
    }
    this.#render();
  }

  #render() {
    window.requestAnimationFrame(this.loop.bind(this));
  }
}

const app = new App();
app
  .start()
  .then(() => {
    console.log("游戏已启动~");
  })
  .catch((err) => {
    console.error("游戏启动失败: ", err);
  });
