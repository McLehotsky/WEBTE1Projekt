export default class GameScene extends Phaser.Scene {
    constructor() {
      super('GameOverScene');
    }
  
    preload() {
      this.load.image('playButton', 'assets/images/ui/PlayButton.png');
      this.load.image('playButtonPressed', 'assets/images/ui/PlayButtonpressed.png');
    }
  
    create() {
      const { width, height } = this.scale; // Získanie šírky a výšky scény
  
      // Pridanie textu na stred obrazovky
      this.add.text(width / 2, height / 2 - 50, 'GameOver!', {
        fontSize: '32px',
        fill: '#fff',
      }).setOrigin(0.5); // Nastavenie stredu textu ako referenčného bodu
  
      // Pridanie tlačidla na stred obrazovky pod text
      const playButton = this.add.sprite(width / 2, height / 2 + 20, 'playButton').setInteractive();
      playButton.setOrigin(0.5); // Nastavenie stredu tlačidla ako referenčného bodu
  
      // Spracovanie udalostí pre tlačidlo
      playButton.on('pointerdown', () => {
        playButton.setTexture('playButtonPressed'); // Zmena na stlačený sprite
      });
  
      playButton.on('pointerup', () => {
        playButton.setTexture('playButton'); // Zmena späť na normálny sprite
        this.scene.start('GameScene'); // Prepnutie na PlayScene pri uvoľnení tlačidla
      });
  
      playButton.on('pointerout', () => {
        playButton.setTexture('playButton'); // Zmena späť na normálny sprite, ak ukazovateľ opustí tlačidlo
      });
    }
  }
  