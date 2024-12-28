import GameScene from './game.js';
import ParticleTestScene from './scenes/ParticleTestScene.js';
import PlayScene from './scenes/play.js';

const config = {
  type: Phaser.AUTO,
  width: 500,
  height: 450,
  zoom: 2,
  pixelArt: true,
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
