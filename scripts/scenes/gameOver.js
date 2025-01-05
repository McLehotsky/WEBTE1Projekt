export default class GameScene extends Phaser.Scene {
    constructor() {
      super('GameOverScene');
    }
  
    preload() {
      this.load.image('homeButton', 'assets/images/ui/HomeButton.png');
      this.load.image('homeButtonPressed', 'assets/images/ui/HomeButtonPressed.png');

      this.add.text(0, 0, '', { fontFamily: 'm6x11', fontSize: '16px' });

      this.load.audio('click', 'assets/sounds/mixkit-mouse-click-close-1113.wav');
    }
  
    create(data) {
      const { width, height } = this.scale; // Získanie šírky a výšky scény
  
      // Pridanie textu na stred obrazovky
      this.add.text(width / 2, height / 2 - 100, 'GameOver!', {
        fontSize: '60px',
        fill: '#fff',
        fontFamily: 'm6x11',
      }).setOrigin(0.5); // Nastavenie stredu textu ako referenčného bodu

      this.add.text(width / 2, height / 2 - 35, 'Score:', {
        fontSize: '32px',
        fill: '#fff',
        fontFamily: 'm6x11',
      }).setOrigin(0.5); // Nastavenie stredu textu ako referenčného bodu

      const score = data.currentScore; // Použi 0 ako predvolenú hodnotu, ak `data.score` neexistuje

      this.add.text(width / 2, height / 2, `${score}`, {
        fontSize: '32px',
        fill: '#fff',
        fontFamily: 'm6x11',
      }).setOrigin(0.5); // Nastavenie stredu textu ako referenčného bodu
  
      this.clickSound = this.sound.add('click');

      // Pridanie tlačidla na vrátenie sa na začiatočnú obrazovku
      const homeButton = this.add.sprite(width / 2, height / 2 + 80, 'homeButton').setInteractive();
      homeButton.setOrigin(0.5); // Nastavenie stredu tlačidla ako referenčného bodu
      
      // Spracovanie udalostí pre tlačidlo
      homeButton.on('pointerdown', () => {
        homeButton.setTexture('homeButtonPressed'); // Zmena na stlačený sprite
      });
      
      homeButton.on('pointerup', () => {
        this.clickSound.play();
        homeButton.setTexture('homeButton'); // Zmena späť na normálny sprite
        const playScene = this.scene.get('PlayScene');
        if (playScene) {
          playScene.initializeNewGame(); // Zavolaj resetovanie stavu hry
        }
        this.scene.start('GameScene'); // Prepnutie na GameScene pri uvoľnení tlačidla
      });
      
      homeButton.on('pointerout', () => {
        homeButton.setTexture('homeButton'); // Zmena späť na normálny sprite, ak ukazovateľ opustí tlačidlo
      });

      this.children.list.forEach((child) => {
        if (child instanceof Phaser.GameObjects.Sprite) {
            child.setScale(2); // Zväčšenie spriteov
        }
      });
    }
  }
  