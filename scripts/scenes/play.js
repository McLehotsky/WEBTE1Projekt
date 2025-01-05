import LevelLoader from './levelLoader.js';

let gyroscopeEnabled = false;

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
    this.load.image('particle', 'assets/images/ui/particle1.png');
    this.load.image('extraLife', 'assets/images/ui/ExtraLife.png');

    // Načítanie zvukových efektov
    this.load.audio('bounce', 'assets/sounds/bounceSound.wav'); // Zvuk odrazu
    this.load.audio('explosion', 'assets/sounds/boom3.wav'); // Zvuk výbuchu
    this.load.audio('click', 'assets/sounds/mixkit-mouse-click-close-1113.wav');
    this.load.audio('collect', 'assets/sounds/collectSound.wav');

    this.load.image('pauseButton', 'assets/images/ui/PauseButton.png');
    this.load.image('pauseButtonPressed', 'assets/images/ui/PauseButtonPressed.png');

    this.add.text(0, 0, '', { fontFamily: 'm6x11', fontSize: '16px' });
  }

  create() {

    const reservedTopSpace = 50; // Rezervovaná oblasť na skóre a pauzu
    const worldWidth = 360; // Logická šírka herného sveta
    const worldHeight = 640; // Logická výška herného sveta

    // Nastavenie world bounds (herného sveta)
    this.physics.world.setBounds(
      0,                // Začiatok na X-osi
      reservedTopSpace, // Začiatok na Y-osi (pod rezervovanou oblasťou)
      worldWidth,       // Šírka sveta
      worldHeight - reservedTopSpace // Výška sveta bez rezervovanej oblasti
    );

    // Transparentný panel
    const graphics = this.add.graphics();
    graphics.fillStyle(0x000000, 0.5);
    graphics.fillRect(0, 0, worldWidth, reservedTopSpace);
    graphics.setDepth(0); // Nastavenie hĺbky na spodnú vrstvu

    // Nastavenie kamery (ak používaš kameru)
    this.cameras.main.setBounds(0, 0, worldWidth, worldHeight);

    // Inicializácia zoznamu odohraných levelov
    this.playedLevels = new Set();

    // Zavolanie funkcie na načítanie prvého náhodného levelu
    this.loadRandomFirstLevel();

  //###############LOPTA##########################//
    // Pridanie lopty
    this.ball = this.physics.add.sprite(this.scale.width / 2, this.scale.height - 120, 'ball');
    this.ball.setCollideWorldBounds(true);
    this.ball.setBounce(1); // Nastavenie odrazu
    this.ball.setVelocity(200, -200); // Počiatočný pohyb lopty

    // Pridanie zvuku pri kolízii lopty so stenami
    this.ball.body.onWorldBounds = true;
    this.physics.world.on('worldbounds', body => {
      if (body.gameObject === this.ball) {
        this.bounceSound.play(); // Prehrá zvuk odrazu
      }
    });

    // Kolízie medzi loptou a stenami
    this.physics.world.setBoundsCollision(true, true, true, false); // Zabráni loptu spadnúť dole

  //###################PADDLE#######################//
    // Pridanie paddle na spodok obrazovky
    this.paddle = this.physics.add.sprite(
      this.scale.width / 2,  // X pozícia (stred obrazovky)
      this.scale.height - 50, // Y pozícia (20px nad spodkom)
      'paddle'
    );

    // Zabránenie padaniu paddle
    this.paddle.setCollideWorldBounds(true);
    this.paddle.body.immovable = true;

    // Kolízie medzi loptou a paddle
    this.physics.add.collider(this.ball, this.paddle, this.handleBallPaddleCollision, null, this);

  //###################SCORE###################//
    // Skórovací systém
    this.score = 0; // Inicializácia skóre
    this.scoreText = this.add.text(
      this.scale.width / 2, // Stred obrazovky
      25,                  // Vzdialenosť od vrchu
      `${this.score}`,      // Zobrazované skóre
      {
        fontSize: '24px',
        color: '#ffffff',
        fontFamily: 'm6x11',
      }
    ).setOrigin(0.5, 0.5); // Nastaví stred textu ako bod ukotvenia

    this.PlayerLives = 3;

    this.livesText = this.add.text(
      10, // X pozícia (vľavo hore)
      15, // Y pozícia (vľavo hore)
      `Lives: `, // Počiatočný text
      {
        fontSize: '20px', // Veľkosť textu
        fontFamily: 'm6x11', // Font
        color: '#ffffff', // Farba textu (biela)
      }
    );

    this.livesValueText = this.add.text(
      60, // X pozícia (vedľa textu "Lives:")
      15, // Y pozícia (vľavo hore)
      `${this.PlayerLives}`, // Počiatočný text (len číslo)
      {
        fontSize: '20px', // Veľkosť textu
        fontFamily: 'm6x11', // Font
        color: '#ff0000', // Farba textu (červená)
      }
    );


  //###############CONTROLS##############//
    // Ovládanie paddle myšou
    this.input.on('pointermove', pointer => {
      this.paddle.x = Phaser.Math.Clamp(
          pointer.x,                              // Pozícia myši
          this.paddle.width / 2,                  // Minimálna hodnota
          worldWidth - this.paddle.width / 2      // Maximálna hodnota
      );
    });

    // Ovládanie pomocou klávesnice
    this.cursors = this.input.keyboard.createCursorKeys();

    // Detekcia iOS zariadenia
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
    
    if (isIOS && !gyroscopeEnabled) {
    // HTML tlačidlo pre gyroskop len na iOS
      const htmlButton = document.createElement('button');
      htmlButton.innerText = 'Enable Gyroscope';
      htmlButton.style.position = 'absolute';
      htmlButton.style.top = '50%';
      htmlButton.style.left = '50%';
      htmlButton.style.transform = 'translate(-50%, -50%)';
      htmlButton.style.padding = '10px 20px';
      htmlButton.style.fontSize = '18px';
      htmlButton.style.backgroundColor = '#007bff';
      htmlButton.style.color = '#fff';
      htmlButton.style.border = 'none';
      htmlButton.style.borderRadius = '5px';
      htmlButton.style.cursor = 'pointer';

      document.body.appendChild(htmlButton);

      htmlButton.addEventListener('click', async () => {
        console.log('HTML tlačidlo bolo stlačené');
        if (typeof DeviceOrientationEvent !== 'undefined' && 
            typeof DeviceOrientationEvent.requestPermission === 'function') {
            try {
                const permission = await DeviceOrientationEvent.requestPermission();
                if (permission === 'granted') {
                    console.log('Gyroskop povolený!');
                    gyroscopeEnabled = true;
                    this.enableGyroscope();
                    htmlButton.style.display = 'none'; // Skrytie tlačidla po povolení
                } else {
                    console.warn('Gyroskop povolenie zamietnuté.');
                }
            } catch (error) {
                console.error('Chyba pri žiadosti o povolenie:', error);
            }
        } else {
            console.log('Gyroskop povolenie nie je potrebné.');
            gyroscopeEnabled = true;
            this.enableGyroscope();
            htmlButton.style.display = 'none'; // Skrytie tlačidla
        }
      });
    } else {
      // Pre ostatné zariadenia (Android) povolíme gyroskop automaticky
      this.enableGyroscope();
    }

    // Inicializácia gyroskopickej hodnoty
    this.tiltX = 0;

  //###############SOUNDS##############//
    // Vytvorenie zvukov
    this.bounceSound = this.sound.add('bounce');
    this.explosionSound = this.sound.add('explosion');
    this.clickSound = this.sound.add('click');
    this.collectSound = this.sound.add('collect');

    // Pridaj event na stlačenie ESC pre pauzu
    this.input.keyboard.on('keydown-ESC', () => {
      this.scene.pause(); // Pauznutie hry
      this.scene.launch('PauseScene'); // Spustenie PauseMenu scény
    });

    // Pause button
    const pauseButton = this.add.image(
      worldWidth - 30,       // Pravý horný roh
      reservedTopSpace / 2,  // Vertikálne zarovnanie s textom skóre
      'pauseButton'
    ).setInteractive();

    pauseButton.on('pointerdown', () => {
        pauseButton.setTexture('pauseButtonPressed');
    });

    pauseButton.on('pointerup', () => {
      this.clickSound.play();
      pauseButton.setTexture('pauseButton');
      this.scene.pause(); // Pauznutie hry
      this.scene.launch('PauseScene'); // Spustenie PauseMenu scény
    });

    this.children.list.forEach((child) => {
      if (child instanceof Phaser.GameObjects.Sprite) {
        child.setScale(1.5); // Zväčšenie spriteov
      }
    });

    this.ballSpeed = 300; // Požadovaná konštantná rýchlosť lopty
  }

  enableGyroscope() {
    window.addEventListener('deviceorientation', event => {
      if (event.gamma !== null) {
          this.tiltX = event.gamma / 5; // Citlivosť
      }
    });
  }

  update() {
    // Resetovanie rýchlosti paddle
    this.paddle.setVelocityX(0);
    
  //############INPUT##########//
    // Ovládanie paddle pomocou gyroskopu
    if (this.tiltX !== undefined) {
      this.paddle.x += this.tiltX;
      this.paddle.x = Phaser.Math.Clamp(
        this.paddle.x,
        this.paddle.width / 2,
        this.scale.width - this.paddle.width / 2
      );
    }

    // Klávesnica - umožní prepísanie myšou
    if (this.cursors.left.isDown) {
      this.paddle.setVelocityX(-300);
    } else if (this.cursors.right.isDown) {
      this.paddle.setVelocityX(300);
    } else {
      this.paddle.setVelocityX(0); // Zastavenie, ak sa klávesy nepoužívajú
    }

  //########BALL########//
    // Kontrola, či lopta spadla
    if (this.ball.y > this.scale.height) {
      this.resetBall(); // Reštart lopty
      this.PlayerLives -= 1;
      console.log(`Lives ${this.PlayerLives}...`);

      // Aktualizácia textu životov
      this.livesValueText.setText(`${this.PlayerLives}`);
    }

    if(this.PlayerLives <= 0)
    {
      this.GameOver();
    }

    this.ensureConstantBallSpeed();
  }

  /*
  ASYNC FUNKCIA NA NACITANIE NAHODNEHO PRVEHO LEVELU
  */
  async loadRandomFirstLevel() {
    // Načíta údaje z JSON súboru
    const response = await fetch('assets/levels.json');
    const data = await response.json();

    // Vyber náhodný level
    const randomIndex = Math.floor(Math.random() * data.levels.length);
    this.currentLevel = data.levels[randomIndex].level;

    // Pridaj náhodný level do zoznamu odohraných
    this.playedLevels.add(this.currentLevel);

    console.log(`Načítavam prvý náhodný level ${this.currentLevel}...`);

    // Načítanie prvého levelu
    this.levelLoader = new LevelLoader(this);
    this.loadLevel(this.currentLevel); // Nie je potrebné await, ak sa používa v ne-async funkcii
  }

  /*
  ASYNC FUNKCIA NA NACITANIE LEVELU
   */
  async loadLevel(levelNumber) {
    console.log(`Načítavam level ${levelNumber}...`);

    // Ak existujú tehličky z predchádzajúceho levelu, znič ich
    if (this.tiles) {
      this.tiles.forEach(tile => tile.destroy());
    }

    // Načíta úroveň pomocou LevelLoader
    this.tiles = await this.levelLoader.loadLevel(levelNumber);

    // Nastav fyziku pre tehličky
    this.tiles.forEach(tile => {
      tile.setScale(1.5);
      this.physics.add.collider(this.ball, tile, this.handleBallTileCollision, null, this);
    });

    this.currentLevel = levelNumber;
  }

  /*
  FUNKCIA NA RESIZE POLA
  */
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
  
  /*
  FUNKCIA NA ZVYSOVANIE SCORE
   */
  increaseScore(points) {
    this.score += points; // Zvýšenie skóre
    this.scoreText.setText(`${this.score}`); // Aktualizácia textu na obrazovke
  }

  /*
  FUNKCIA NA PADDLE COLLISION
   */
  handleBallPaddleCollision(ball, paddle) {
    const relativeImpact = ball.x - paddle.x;
    ball.setVelocityX(relativeImpact * 10); // Nastavenie odrazu na základe miesta dopadu
    this.bounceSound.play();
  }

  /*
  FUNKCIA NA TILE COLLISION
   */
  handleBallTileCollision(ball, tile) {
    if (tile.lives > 1) {
      this.bounceSound.play();
      // Zníženie lives a zmena vzhľadu
      tile.lives -= 1;
          // Získanie aktuálneho názvu textúry
      const currentTexture = tile.texture.key; // Napr. 'tileSlimGray0'
      const baseName = currentTexture.slice(0, -1); // Odstránenie posledného čísla (napr. 'tileSlimGray')
      const nextTexture = `${baseName}${parseInt(currentTexture.slice(-1)) + 1}`; // Zvýšenie čísla na konci

      // Zmena textúry
      tile.setTexture(nextTexture);
      this.increaseScore(5);
    } else {
      // Prepočet pozície dlaždice do svetových súradníc
      const worldPoint = tile.getWorldTransformMatrix().transformPoint(0, 0);

      this.particleEmitter = this.add.particles(this.scale.width / 2, this.scale.height / 2, 'particle', {
        lifespan: 800,                  // Trvanie častíc
        speed: { min: -80, max: 80 },  // Rýchlosť častíc
        scale: { start: 2, end: 0 },     // Postupné zmenšovanie častíc
        tint: [0xffffff, 0xd3d3d3, 0x808080],
        blendMode: 'NORMAL',             // Normálny režim miešania
        quantity: 0,                    // Počet častíc
      });

      // Spustenie particlového efektu na správnom mieste
      this.particleEmitter.setPosition(worldPoint.x, worldPoint.y);
      this.particleEmitter.explode(20);
      this.explosionSound.play({ volume: 0.2 });
      
      tile.destroy();
      this.increaseScore(10);
      this.checkLevelComplete();

      // Náhodné spawnovanie powerupu
      if (Math.random() < 0.02) { // 2% šanca na spawn
        this.spawnPowerUp(tile.x, tile.y);
      }
    }
  }

  /*
  FUNKCIA NA KONSTANTNU BALL SPEED
   */
  ensureConstantBallSpeed() {
    const velocityX = this.ball.body.velocity.x;
    const velocityY = this.ball.body.velocity.y;
  
    // Vypočíta aktuálnu rýchlosť (veľkosť vektora)
    const currentSpeed = Math.sqrt(velocityX * velocityX + velocityY * velocityY);
  
    // Ak sa aktuálna rýchlosť líši od požadovanej, upravíme ju
    if (currentSpeed !== this.ballSpeed) {
      const scale = this.ballSpeed / currentSpeed;
  
      // Nastavenie novej rýchlosti
      this.ball.setVelocity(velocityX * scale, velocityY * scale);
    }
  }

  /*
  FUNKCIA NA RESET POZICIE LOPTY
   */
  resetBall() {
    this.ball.setPosition(this.scale.width / 2, this.scale.height - 120);
    this.ball.setVelocity(200, -200);
  }

  /*
  FUNKCIA NA KONTROLA SPLNENIA LEVELU
   */
  checkLevelComplete() {
    // Skontrolovať, či neexistuje žiadna tehlička
    if (!this.tiles.some(tile => tile.active)) {
      console.log('Všetky tehličky sú zničené!');
  
      // Ak chceš načítať ďalší level:
      this.loadNextLevel();
      this.ballSpeed += 30;
  
      // Ak chceš ukončiť hru:
      // this.endGame();
    }
  }

  /*
  FUNKCIA NA NACITANIE NOVEHO LEVELU
  */
  async loadNextLevel() {
    // Ak ešte nemáš, inicializuj zoznam odohraných levelov
    if (!this.playedLevels) {
      this.playedLevels = new Set();
    }

    // Načíta údaje z JSON súboru
    const response = await fetch('assets/levels.json');
    const data = await response.json();

    // Filtruj levely, ktoré ešte neboli odohrané
    const remainingLevels = data.levels.filter(level => !this.playedLevels.has(level.level));

    if (remainingLevels.length === 0) {
      console.log('Žiadne ďalšie levely, ukončenie hry.');
      this.endGame();
      return;
    }

    // Vyber náhodný level z dostupných
    const randomIndex = Math.floor(Math.random() * remainingLevels.length);
    const nextLevel = remainingLevels[randomIndex].level;

    // Pridaj level do zoznamu odohraných
    this.playedLevels.add(nextLevel);

    console.log(`Načítavam náhodný level ${nextLevel}...`);
    await this.loadLevel(nextLevel); // Volanie asynchrónnej funkcie na načítanie levelu
    this.resetBall();
  }

  /*
  FUNKCIA NA SPAWNOVANIE POWERUPU
  */
  spawnPowerUp(x, y) {
    const powerUp = this.physics.add.sprite(x, y, 'extraLife');
    powerUp.setVelocityY(50); // Pomaly padá smerom dole
    powerUp.setScale(1.2); // Prípadné zväčšenie
    powerUp.setTint(0x9e1c2c);

    this.physics.add.collider(this.paddle, powerUp, this.collectPowerUp, null, this); // Kolízia s paddle
  }

  /*
  FUNKCIA NA DETEKCIU POWERUPU
  */
  collectPowerUp(paddle, powerUp) {
    powerUp.destroy(); // Odstráni powerup zo scény
    if (this.PlayerLives < 3) {
      this.collectSound.play();
      this.PlayerLives += 1; // Pridanie extra života
      console.log(`Lives: ${this.PlayerLives}`);
    }

    // Aktualizácia textu životov
    this.livesValueText.setText(`${this.PlayerLives}`);
  }

  /*
  FUNKCIA NA KONIEC HRY - PREHRA
   */
  GameOver() {
    this.scene.start('GameOverScene', {currentScore: this.score}); // Prepnutie na scénu Game Over (ak existuje)
    this.scene.stop();
  }

  /*
  FUNKCIA NA KONIEC HRY - VYHRA
   */
  endGame() {
    this.scene.start('GameVictoryScene', {currentScore: this.score}); // Prepnutie na scénu Victory (ak existuje)
    this.scene.stop();
  }
}
