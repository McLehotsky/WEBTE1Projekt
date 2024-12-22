import LevelLoader from './levelLoader.js';

export default class PlayScene extends Phaser.Scene {
  constructor() {
    super({ key: 'PlayScene' });
  }

  preload() {
    console.log('Preloading assets...');
    // Načítanie všetkých sprite súborov z assets
    this.load.image('brickSprite', 'assets/images/tiles/tileSlimGray0.png'); // Východzí sprite
  }

  create() {
    console.log('Creating PlayScene...');
    // Vytvorenie inštancie LevelLoader a načítanie úrovne
    this.levelLoader = new LevelLoader(this);
    this.levelLoader.loadLevel(3); // Načítanie prvej úrovne
    console.log('PlayScene created!');
  }

}
