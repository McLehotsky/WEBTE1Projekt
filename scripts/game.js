export default class GameScene extends Phaser.Scene {
  constructor() {
    super('GameScene');
  }

  preload() {
    this.load.image('playButton', 'assets/images/ui/PlayButton.png');
    this.load.image('playButtonPressed', 'assets/images/ui/PlayButtonpressed.png');

    this.add.text(0, 0, '', { fontFamily: 'm6x11', fontSize: '16px' });

    this.load.audio('click', 'assets/sounds/mixkit-mouse-click-close-1113.wav');
  }

  create() {
    const { width, height } = this.scale; // Získanie šírky a výšky scény

    // Pridanie textu na stred obrazovky
    this.add.text(width / 2, height / 2 - 60, 'EL Smasher', {
      fontSize: '48px',
      fill: '#fff',
      fontFamily: 'm6x11' 
    }).setOrigin(0.5); // Nastavenie stredu textu ako referenčného bodu

    this.clickSound = this.sound.add('click');

    // Pridanie tlačidla na stred obrazovky pod text
    const playButton = this.add.sprite(width / 2, height / 2 + 20, 'playButton').setInteractive();
    playButton.setOrigin(0.5); // Nastavenie stredu tlačidla ako referenčného bodu

    // Spracovanie udalostí pre tlačidlo
    playButton.on('pointerdown', () => {
      playButton.setTexture('playButtonPressed'); // Zmena na stlačený sprite
    });

    playButton.on('pointerup', () => {
      this.clickSound.play();
      playButton.setTexture('playButton'); // Zmena späť na normálny sprite
      this.scene.start('PlayScene'); // Prepnutie na PlayScene pri uvoľnení tlačidla
    });

    playButton.on('pointerout', () => {
      playButton.setTexture('playButton'); // Zmena späť na normálny sprite, ak ukazovateľ opustí tlačidlo
    });

    this.children.list.forEach((child) => {
      if (child instanceof Phaser.GameObjects.Sprite) {
          child.setScale(1.5); // Zväčšenie spriteov
      }
    });
  }
}
