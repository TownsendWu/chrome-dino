const SPRITE_PATH = "../assets/sprite-100.png";
const GAMEOVER_MAP3_PATH = "../assets/game-over.mp3";
const LEVEL_UP_MAP3_PATH = "../assets/level-up.mp3";
const JUMP_MAP3_PATH = "../assets/jump.mp3";

export class ResourceLoader {
  constructor() {}

  async initSprites() {
    const sprite = await this.#loadImage(SPRITE_PATH);
    return sprite;
  }

  async initSound() {
    return new Promise((resolve, reject) => {
      const gameoverMp3 = new Audio(GAMEOVER_MAP3_PATH);
      const levelUpMp3 = new Audio(LEVEL_UP_MAP3_PATH);
      const jumpMp3 = new Audio(JUMP_MAP3_PATH);
      resolve({ gameoverMp3, levelUpMp3, jumpMp3 });
    });
  }

  #loadImage(src) {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.src = src;
      img.onload(resolve(img));
      img.onerror = reject;
    });
  }
}
