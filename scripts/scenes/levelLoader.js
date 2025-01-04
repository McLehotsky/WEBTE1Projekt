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
        return this.createBricks(levelData);
      } catch (error) {
        console.error('Chyba pri načítavaní JSON súboru:', error);
      }
    }
  
    createBricks(levelData) {
      const { bricks, brickWidth, brickHeight, rows, columns } = levelData;
  
      const scale = 1.5; // Faktor mierky
  
      // Dynamické rozmery
      const scaledBrickWidth = brickWidth * scale; // Šírka tehličky po mierke
      const scaledBrickHeight = brickHeight * scale; // Výška tehličky po mierke
      const horizontalSpacing = 2; // Pevná medzera medzi stĺpcami
      const verticalSpacing = 2; // Pevná medzera medzi riadkami
  
      // Šírka jedného stĺpca (tehlička + medzera)
      const columnWidth = scaledBrickWidth + horizontalSpacing;
  
      // Celková šírka všetkých stĺpcov
      const totalBricksWidth = 6 * columnWidth - horizontalSpacing;
  
      // Počiatočné X a Y pozície
      const startX = (360 - totalBricksWidth) / 2; // 360 = šírka logickej oblasti
      const startY = 92; // Pevný posun zhora
  
      const brickObjects = [];
  
      bricks.forEach(brick => {
          const x = startX + brick.column * columnWidth;
          const y = startY + brick.row * (scaledBrickHeight + verticalSpacing);
  
          // Pridanie tehličky
          const newBrick = this.scene.physics.add.sprite(x, y, brick.sprite);
          newBrick.setTexture(brick.sprite);
          newBrick.setOrigin(0.5);
          newBrick.setImmovable(true);
          newBrick.setDisplaySize(scaledBrickWidth, scaledBrickHeight);
          newBrick.lives = brick.lives;
  
          brickObjects.push(newBrick);
      });
  
      return brickObjects;
  }
  
  
  
  }
  