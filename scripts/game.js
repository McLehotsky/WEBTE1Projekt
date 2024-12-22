export default class GameScene extends Phaser.Scene {
    constructor() {
      super('GameScene');
    }
  
    preload() {
      this.load.image('playButton', 'assets/images/buttons/play.png'); // Obrázok tlačidla
    }
  
    create() {
      this.add.text(300, 200, 'Breakout Game', { fontSize: '32px', fill: '#fff' });
  
      // Tlačidlo pre začatie hry
      const playButton = this.add.sprite(400, 300, 'playButton').setInteractive();
      playButton.on('pointerdown', () => {
        this.scene.start('PlayScene'); // Prepnutie na hlavnú scénu hry
      });
    }
  }