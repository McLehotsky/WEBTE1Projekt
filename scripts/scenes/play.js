import LevelLoader from './levelLoader.js';

export default class PlayScene extends Phaser.Scene {
  constructor() {
    super({ key: 'PlayScene' });
  }

  preload() {
    console.log('Preloading assets...');
    // Načítanie paddle sprite
    this.load.image('paddle', 'assets/images/paddle/paddleRedt.png');

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

    this.physics.world.setBounds(50, 0, this.scale.width - 100, this.scale.height);

    // Vytvorenie inštancie LevelLoader a načítanie úrovne
    this.levelLoader = new LevelLoader(this);
    this.levelLoader.loadLevel(2); // Načítanie prvej úrovne

    // Pridanie paddle na spodok obrazovky
    this.paddle = this.physics.add.sprite(
      this.scale.width / 2,  // X pozícia (stred obrazovky)
      this.scale.height - 80, // Y pozícia (20px nad spodkom)
      'paddle'
    );

    // Zabránenie padaniu paddle
    this.paddle.setCollideWorldBounds(true);
    this.paddle.body.immovable = true;

    // Nastavenie ovládania
    this.cursors = this.input.keyboard.createCursorKeys();

    console.log('PlayScene created!');
  }

  resize() {
    const width = window.innerWidth;
    const height = window.innerHeight;
  
    this.scale.resize(width, height);
    this.physics.world.setBounds(0, 0, width, height);
  
    if (this.paddle) {
      this.paddle.body.setBoundsRectangle(
        new Phaser.Geom.Rectangle(0, height - 50, width, 30)
      );
    }
  }  

  update() {
    // Resetovanie rýchlosti paddle
    this.paddle.setVelocityX(0);

    // Pohyb paddle doľava
    if (this.cursors.left.isDown) {
      this.paddle.setVelocityX(-300); // Rýchlosť pohybu doľava
    }

    // Pohyb paddle doprava
    if (this.cursors.right.isDown) {
      this.paddle.setVelocityX(300); // Rýchlosť pohybu doprava
    }
  }
}
