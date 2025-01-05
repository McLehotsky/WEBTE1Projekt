export default class GameScene extends Phaser.Scene {
  constructor() {
    super('GameScene');
  }

  preload() {
    this.load.image('playButton', 'assets/images/ui/PlayButton.png');
    this.load.image('playButtonPressed', 'assets/images/ui/PlayButtonpressed.png');
    this.load.image('continueButton', 'assets/images/ui/ContinueButton.png');
    this.load.image('continueButtonPressed', 'assets/images/ui/ContinueButtonPressed.png');
    this.load.image('howToPlay', 'assets/images/ui/HowToPlay.png');
    this.load.image('howToPlayPressed', 'assets/images/ui/HowToPlayPressed.png');

    this.add.text(0, 0, '', { fontFamily: 'm6x11', fontSize: '16px' });

    this.load.audio('click', 'assets/sounds/mixkit-mouse-click-close-1113.wav');
  }

  create() {
    // const savedLevel = localStorage.getItem('currentLevel');

    const { width, height } = this.scale; // Získanie šírky a výšky scény

    // Pridanie textu na stred obrazovky
    this.add.text(width / 2, height / 2 - 120, 'EL Smasher', {
      fontSize: '65px',
      fill: '#fff',
      fontFamily: 'm6x11' 
    }).setOrigin(0.5); // Nastavenie stredu textu ako referenčného bodu

    this.clickSound = this.sound.add('click');

    // Play Button
    const playButton = this.add.sprite(width / 2, height / 2 + 60, 'playButton').setInteractive();
    playButton.setOrigin(0.5); // Nastavenie stredu tlačidla ako referenčného bodu

    playButton.on('pointerdown', () => {
      playButton.setTexture('playButtonPressed'); // Zmena na stlačený sprite
    });

    playButton.on('pointerup', () => {
      this.clickSound.play();
      playButton.setTexture('playButton'); // Zmena späť na normálny sprite
      const playScene = this.scene.get('PlayScene');
      if (playScene) {
        playScene.initializeNewGame(); // Zavolaj resetovanie stavu hry
      }
      this.scene.start('PlayScene'); // Prepnutie na PlayScene pri uvoľnení tlačidla
    });

    playButton.on('pointerout', () => {
      playButton.setTexture('playButton'); // Zmena späť na normálny sprite, ak ukazovateľ opustí tlačidlo
    });




    const savedState = localStorage.getItem('gameState');
    let gameState = null;
    
    // Skontroluj, či existuje uložený stav a načítaj ho
    if (savedState) {
      try {
        gameState = JSON.parse(savedState);
        console.log('Načítaný stav hry:', gameState);
      } catch (error) {
        console.error('Chyba pri parsovaní uloženého stavu:', error);
      }
    }
    
    // Nastavenie textúry tlačidla Continue
    const continueTexture = gameState && gameState.currentLevel !== null
      ? 'continueButton'
      : 'continueButtonPressed';
    
    const continueButton = this.add.sprite(width / 2, height / 2 - 10, continueTexture);
    continueButton.setOrigin(0.5);
    
    // Ak je hra uložená, nastav interaktivitu tlačidla
    if (gameState && gameState.currentLevel !== null) {
      continueButton.setInteractive();
    
      continueButton.on('pointerdown', () => {
        continueButton.setTexture('continueButtonPressed');
      });
    
      continueButton.on('pointerup', () => {
        this.clickSound.play();
        continueButton.setTexture('continueButton');
        this.scene.start('PlayScene', { level: gameState.currentLevel }); // Prenes level
      });
    
      continueButton.on('pointerout', () => {
        continueButton.setTexture('continueButton');
      });
    } else {
      console.log('Žiadna uložená hra.');
    }
    


    // How To Play Button
    const howToPlay = this.add.sprite(width / 2, height / 2 + 130, 'howToPlay').setInteractive();
    howToPlay.setOrigin(0.5); // Nastavenie stredu tlačidla ako referenčného bodu

    howToPlay.on('pointerdown', () => {
      howToPlay.setTexture('howToPlayPressed'); // Zmena na stlačený sprite
    });

    howToPlay.on('pointerup', () => {
      this.clickSound.play();
      howToPlay.setTexture('howToPlay'); // Zmena späť na normálny sprite
      this.scene.start('HowToPlayScene');
    });

    howToPlay.on('pointerout', () => {
      howToPlay.setTexture('howToPlay'); // Zmena späť na normálny sprite, ak ukazovateľ opustí tlačidlo
    });

    this.children.list.forEach((child) => {
      if (child instanceof Phaser.GameObjects.Sprite) {
          child.setScale(2); // Zväčšenie spriteov
      }
    });
  }
}
