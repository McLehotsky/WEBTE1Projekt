import LevelLoader from './levelLoader.js';

export default class PlayScene extends Phaser.Scene {
  constructor() {
    super({ key: 'PlayScene' });
  }

  preload() {
    // Načítanie všetkých sprite súborov z assets
    this.load.image('brickSprite', 'assets/images/tiles/tileSlimGray0.png'); // Východzí sprite
  }

  create() {
    // Vytvorenie inštancie LevelLoader a načítanie úrovne
    this.levelLoader = new LevelLoader(this);
    this.levelLoader.loadLevel(1); // Načítanie prvej úrovne
  }
}
