import GameScene from './scenes/game.js';
import PlayScene from './scenes/play.js';

const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 0 },
      debug: false,
    },
  },
  scene: [GameScene, PlayScene], // Zoznam scén
};

const game = new Phaser.Game(config);
