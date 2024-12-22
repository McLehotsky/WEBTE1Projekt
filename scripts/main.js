import GameScene from './game.js';
import PlayScene from './scenes/play.js';

const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  pixelArt: true,
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 0 },
      debug: false,
    },
  },
  scene: [PlayScene], // Zoznam scén
};

const game = new Phaser.Game(config);
