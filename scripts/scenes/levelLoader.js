export default class LevelLoader {
    constructor(scene) {
      this.scene = scene; // Phaserová scéna, v ktorej sa úroveň načítava
    }
  
    async loadLevel(levelNumber) {
      try {
        // Načítanie JSON súboru
        const response = await fetch('assets/levels.json');
        const data = await response.json();
  
        // Získanie dát pre konkrétnu úroveň
        const levelData = data.levels.find(level => level.level === levelNumber);
  
        if (!levelData) {
          console.error(`Úroveň ${levelNumber} neexistuje v JSON súbore!`);
          return;
        }
  
        // Inicializácia tehličiek
        this.createBricks(levelData);
      } catch (error) {
        console.error('Chyba pri načítavaní JSON súboru:', error);
      }
    }
  
    createBricks(levelData) {
      const { bricks, brickWidth = 32, brickHeight = 16 } = levelData;
  
      bricks.forEach(brick => {
        const x = brick.column * brickWidth + brickWidth / 2;
        const y = brick.row * brickHeight + brickHeight / 2;
        console.log(`Vytváram tehličku na (${x}, ${y}) so sprite: ${brick.sprite}`);
        // Pridanie tehličky do scény
        const newBrick = this.scene.physics.add.sprite(x, y, brick.sprite);
        newBrick.setTexture(brick.sprite); // Nastavenie správneho sprite
        newBrick.setOrigin(0.5); // Zarovnanie stredu
        newBrick.setImmovable(true); // Tehličky sa nepohybujú
        newBrick.lives = brick.lives; // Nastavenie životov tehličky
  
        // Uloženie tehličky do scény pre neskoršie použitie
        if (!this.scene.bricks) this.scene.bricks = [];
        this.scene.bricks.push(newBrick);
      });
    }
  }
  