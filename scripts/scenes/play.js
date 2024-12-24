import LevelLoader from './levelLoader.js';

export default class PlayScene extends Phaser.Scene {
  constructor() {
    super({ key: 'PlayScene' });
  }

  preload() {
    console.log('Preloading assets...');
    // Načítanie všetkých sprite súborov z assets
    this.load.image('tileSlimGray0', 'assets/images/tiles/tileSlimGray0.png'); // Východzí sprite
    this.load.image('tileSlimGreen0', 'assets/images/tiles/tileSlimGreen0.png');
    this.load.image('tileSlimYellow0', 'assets/images/tiles/tileSlimYellow0.png');
    this.load.image('tileSlimOrange0', 'assets/images/tiles/tileSlimOrange0.png');
    this.load.image('tileSlimRed0', 'assets/images/tiles/tileSlimRed0.png');
    this.load.image('tileSlimPurple0', 'assets/images/tiles/tileSlimPurple0.png');
    this.load.image('tileThickGray0', 'assets/images/tiles/tileThickGray0.png');
    this.load.image('tileThickGreen0', 'assets/images/tiles/tileThickGreen0.png');
    this.load.image('tileThickYellow0', 'assets/images/tiles/tileThickYellow0.png');
    this.load.image('tileThickOrange0', 'assets/images/tiles/tileThickOrange0.png');
    this.load.image('tileThickRed0', 'assets/images/tiles/tileThickRed0.png');
    this.load.image('tileThickPurple0', 'assets/images/tiles/tileThickPurple0.png');
  }

  create() {
    console.log('Creating PlayScene...');
    // Vytvorenie inštancie LevelLoader a načítanie úrovne
    this.levelLoader = new LevelLoader(this);
    this.levelLoader.loadLevel(2); // Načítanie prvej úrovne
    console.log('PlayScene created!');
  }

}
