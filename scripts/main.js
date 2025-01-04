import GameScene from './game.js';
import PlayScene from './scenes/play.js';
import GameOverScene from './scenes/gameOver.js'
import GameVictoryScene from './scenes/victory.js'
import PauseScene from './scenes/pause.js'


const config = {
  type: Phaser.AUTO,
  width: 360,
  height: 640,
  zoom: 1,
  pixelArt: true,
  scale: {
    mode: Phaser.Scale.FIT, // Automaticky upraví veľkosť tak, aby sa zmestila na obrazovku
    autoCenter: Phaser.Scale.CENTER_BOTH // Centrovanie hry vertikálne aj horizontálne
  },
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 0 },
      debug: false,
    },
  },
  scene: [GameScene, PlayScene, GameOverScene, GameVictoryScene, PauseScene], // Zoznam scén
  backgroundColor: '#022D36' // Nastavenie čierneho pozadia
};

const game = new Phaser.Game(config);
