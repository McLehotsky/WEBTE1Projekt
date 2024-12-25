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
    this.load.image('tileSlimGray1', 'assets/images/tiles/tileSlimGray1.png');
    this.load.image('tileSlimGray2', 'assets/images/tiles/tileSlimGray2.png');
    this.load.image('tileSlimGreen0', 'assets/images/tiles/tileSlimGreen0.png');
    this.load.image('tileSlimGreen1', 'assets/images/tiles/tileSlimGreen1.png');
    this.load.image('tileSlimGreen2', 'assets/images/tiles/tileSlimGreen2.png');
    this.load.image('tileSlimYellow0', 'assets/images/tiles/tileSlimYellow0.png');
    this.load.image('tileSlimYellow1', 'assets/images/tiles/tileSlimYellow1.png');
    this.load.image('tileSlimYellow2', 'assets/images/tiles/tileSlimYellow2.png');
    this.load.image('tileSlimOrange0', 'assets/images/tiles/tileSlimOrange0.png');
    this.load.image('tileSlimOrange1', 'assets/images/tiles/tileSlimOrange1.png');
    this.load.image('tileSlimOrange2', 'assets/images/tiles/tileSlimOrange2.png');
    this.load.image('tileSlimRed0', 'assets/images/tiles/tileSlimRed0.png');
    this.load.image('tileSlimRed1', 'assets/images/tiles/tileSlimRed1.png');
    this.load.image('tileSlimRed2', 'assets/images/tiles/tileSlimRed2.png');
    this.load.image('tileSlimPurple0', 'assets/images/tiles/tileSlimPurple0.png');
    this.load.image('tileSlimPurple1', 'assets/images/tiles/tileSlimPurple1.png');
    this.load.image('tileSlimPurple2', 'assets/images/tiles/tileSlimPurple2.png');
    this.load.image('tileThickGray0', 'assets/images/tiles/tileThickGray0.png');
    this.load.image('tileThickGray1', 'assets/images/tiles/tileThickGray1.png');
    this.load.image('tileThickGray2', 'assets/images/tiles/tileThickGray2.png');
    this.load.image('tileThickGreen0', 'assets/images/tiles/tileThickGreen0.png');
    this.load.image('tileThickGreen1', 'assets/images/tiles/tileThickGreen1.png');
    this.load.image('tileThickGreen2', 'assets/images/tiles/tileThickGreen2.png');
    this.load.image('tileThickYellow0', 'assets/images/tiles/tileThickYellow0.png');
    this.load.image('tileThickYellow1', 'assets/images/tiles/tileThickYellow1.png');
    this.load.image('tileThickYellow2', 'assets/images/tiles/tileThickYellow2.png');
    this.load.image('tileThickOrange0', 'assets/images/tiles/tileThickOrange0.png');
    this.load.image('tileThickOrange1', 'assets/images/tiles/tileThickOrange1.png');
    this.load.image('tileThickOrange2', 'assets/images/tiles/tileThickOrange2.png');
    this.load.image('tileThickRed0', 'assets/images/tiles/tileThickRed0.png');
    this.load.image('tileThickRed1', 'assets/images/tiles/tileThickRed1.png');
    this.load.image('tileThickRed2', 'assets/images/tiles/tileThickRed2.png');
    this.load.image('tileThickPurple0', 'assets/images/tiles/tileThickPurple0.png');
    this.load.image('tileThickPurple1', 'assets/images/tiles/tileThickPurple1.png');
    this.load.image('tileThickPurple2', 'assets/images/tiles/tileThickPurple2.png');
    this.load.image('ball', 'assets/images/balls/ballYellow.png');
  }

  async create() {

    this.physics.world.setBounds(50, 0, this.scale.width - 100, this.scale.height);

      // Vykreslenie farby pozadia vo vnútri hraníc
    const graphics = this.add.graphics();
    graphics.fillStyle(0x2a9d8f, 1); // Nastavenie farby (hex kód, nepriehľadnosť)
    graphics.fillRect(
      50, // X-pozícia začiatku hraníc
      0,  // Y-pozícia začiatku hraníc
      this.scale.width - 100, // Šírka hernej plochy
      this.scale.height       // Výška hernej plochy
    );

    this.currentLevel = 1; // Začni na leveli 2

    // Vytvorenie inštancie LevelLoader a načítanie úrovne
    this.levelLoader = new LevelLoader(this);
    this.tiles = await this.levelLoader.loadLevel(this.currentLevel); // Použitie await na načítanie tehličiek

    // Pridanie paddle na spodok obrazovky
    this.paddle = this.physics.add.sprite(
      this.scale.width / 2,  // X pozícia (stred obrazovky)
      this.scale.height - 80, // Y pozícia (20px nad spodkom)
      'paddle'
    );

    // Zabránenie padaniu paddle
    this.paddle.setCollideWorldBounds(true);
    this.paddle.body.immovable = true;

    // Pridanie lopty
    this.ball = this.physics.add.sprite(this.scale.width / 2, this.scale.height - 120, 'ball');
    this.ball.setCollideWorldBounds(true);
    this.ball.setBounce(1); // Nastavenie odrazu
    this.ball.setVelocity(200, -200); // Počiatočný pohyb lopty

    // Kolízie medzi loptou a paddle
    this.physics.add.collider(this.ball, this.paddle, this.handleBallPaddleCollision, null, this);

    // Collision handlers
    this.tiles.forEach(tile => {
      this.physics.add.collider(this.ball, tile, this.handleBallTileCollision, null, this);
    });

    // Kolízie medzi loptou a stenami
    this.physics.world.setBoundsCollision(true, true, true, false); // Zabráni loptu spadnúť dole

    // Nastavenie ovládania
    this.cursors = this.input.keyboard.createCursorKeys();

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

  handleBallPaddleCollision(ball, paddle) {
    const relativeImpact = ball.x - paddle.x;
    ball.setVelocityX(relativeImpact * 10); // Nastavenie odrazu na základe miesta dopadu
  }

  handleBallTileCollision(ball, tile) {
    if (tile.lives > 1) {
      // Zníženie lives a zmena vzhľadu
      tile.lives -= 1;
          // Získanie aktuálneho názvu textúry
      const currentTexture = tile.texture.key; // Napr. 'tileSlimGray0'
      const baseName = currentTexture.slice(0, -1); // Odstránenie posledného čísla (napr. 'tileSlimGray')
      const nextTexture = `${baseName}${parseInt(currentTexture.slice(-1)) + 1}`; // Zvýšenie čísla na konci

      // Zmena textúry
      tile.setTexture(nextTexture);
    } else {
      // Zničenie tile
      tile.destroy();

      this.checkLevelComplete();
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
    // Kontrola, či lopta spadla
    if (this.ball.y > this.scale.height) {
      this.resetBall(); // Reštart lopty
    }
  }

  resetBall() {
    this.ball.setPosition(this.scale.width / 2, this.scale.height - 120);
    this.ball.setVelocity(200, -200);
  }

  checkLevelComplete() {
    // Skontrolovať, či neexistuje žiadna tehlička
    if (!this.tiles.some(tile => tile.active)) {
      console.log('Všetky tehličky sú zničené!');
  
      // Ak chceš načítať ďalší level:
      this.loadNextLevel();
  
      // Ak chceš ukončiť hru:
      // this.endGame();
    }
  }

  async loadNextLevel() {
    const nextLevel = this.currentLevel + 1;
  
    // Skontroluj, či ďalší level existuje
    const response = await fetch('assets/levels.json');
    const data = await response.json();
    const levelData = data.levels.find(level => level.level === nextLevel);
  
    if (levelData) {
      console.log(`Načítavam level ${nextLevel}...`);
      this.tiles.forEach(tile => tile.destroy()); // Odstráni aktuálne tehličky
      this.tiles = await this.levelLoader.loadLevel(nextLevel); // Načíta nové tehličky
          // Nastav fyziku pre nové tehličky
      this.tiles.forEach(tile => {
        this.physics.add.collider(this.ball, tile, this.handleBallTileCollision, null, this);
      });
      this.currentLevel = nextLevel;
    } else {
      console.log('Žiadne ďalšie levely, ukončenie hry.');
      this.endGame(); // Ak nie je ďalší level, ukonči hru
    }
  }

  endGame() {
    console.log('Hra skončila!');
    this.scene.start('GameOverScene'); // Prepnutie na scénu Game Over (ak existuje)
  }
}
