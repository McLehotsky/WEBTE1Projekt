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
      const { bricks, brickWidth, brickHeight, rows, columns } = levelData;
  
      // Vypočítanie celkovej šírky a výšky tehličiek
      const totalBricksWidth = columns * brickWidth;
      const totalBricksHeight = rows * brickHeight;

      // Vypočítanie počiatočnej X a Y pozície na centrovanie
      const startX = (this.scene.scale.width - totalBricksWidth) / 2;
      const startY = (this.scene.scale.height - totalBricksHeight) / 4 + 10; // Začíname 1/4 výšky obrazovky

      bricks.forEach(brick => {
        const x = startX + brick.column * (brickWidth + 7); // Horizontálny rozostup +10 px
        const y = startY + brick.row * (brickHeight + 2); // Vertikálny rozostup +5 px

        
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
  