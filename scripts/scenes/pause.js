export default class PauseMenu extends Phaser.Scene {
    constructor() {
        super({ key: 'PauseScene' });
    }

    preload()
    {
        this.load.image('playButtonSmall', 'assets/images/ui/PlayButtonSmall.png');
        this.load.image('playButtonSmallPressed', 'assets/images/ui/PlayButtonSmallPressed.png');
        this.load.image('restartButton', 'assets/images/ui/RestartButton.png');
        this.load.image('restartButtonPressed', 'assets/images/ui/RestartButtonPressed.png');
        this.load.image('homeButton', 'assets/images/ui/HomeButton.png');
        this.load.image('homeButtonPressed', 'assets/images/ui/HomeButtonPressed.png');
        
        this.add.text(0, 0, '', { fontFamily: 'm6x11', fontSize: '16px' });

        this.load.audio('click', 'assets/sounds/mixkit-mouse-click-close-1113.wav');
    }

    create() {
        const { width, height } = this.scale; // Získanie šírky a výšky scény

        // Získanie stredu obrazovky
        const centerX = this.scale.width / 2;
        const centerY = this.scale.height / 2;

        // Semi-transparentné pozadie
        this.add.rectangle(centerX, centerY, this.scale.width, this.scale.height, 0x000000, 0.5); // Čierne pozadie s 50% priehľadnosťou

        // Text "PAUSED"
        this.add.text(centerX, centerY - 100, 'PAUSED', { fontSize: '60px', fill: '#ffffff', fontFamily: 'm6x11' }).setOrigin(0.5);

        this.clickSound = this.sound.add('click');

        // Pridanie tlačidla na stred obrazovky pod text
        const resumeButton = this.add.sprite(width / 2 - 80, height / 2 + 20, 'playButtonSmall').setInteractive();
        resumeButton.setOrigin(0.5); // Nastavenie stredu tlačidla ako referenčného bodu

        // Spracovanie udalostí pre tlačidlo
        resumeButton.on('pointerdown', () => {
            resumeButton.setTexture('playButtonSmallPressed'); // Zmena na stlačený sprite
        });

        resumeButton.on('pointerup', () => {
            this.clickSound.play();
            resumeButton.setTexture('playButtonSmall'); // Zmena späť na normálny sprite
            this.scene.stop();
            this.scene.resume('PlayScene'); // Prepnutie na PlayScene pri uvoľnení tlačidla
        });

        resumeButton.on('pointerout', () => {
            resumeButton.setTexture('playButtonSmall'); // Zmena späť na normálny sprite, ak ukazovateľ opustí tlačidlo
        });

        // Tlačidlo Restart
        const restartButton = this.add.sprite(width / 2, height / 2 + 20, 'restartButton').setInteractive();
        restartButton.setOrigin(0.5); // Nastavenie stredu tlačidla ako referenčného bodu

        // Spracovanie udalostí pre tlačidlo
        restartButton.on('pointerdown', () => {
            restartButton.setTexture('restartButtonPressed'); // Zmena na stlačený sprite
        });

        restartButton.on('pointerup', () => {
            this.clickSound.play();
            restartButton.setTexture('restartButton'); // Zmena späť na normálny sprite
            const playScene = this.scene.get('PlayScene');
            if (playScene) {
              playScene.initializeNewGame(); // Zavolaj resetovanie stavu hry
            }
            this.scene.stop();
            this.scene.stop('PlayScene');
            this.scene.start('PlayScene'); // Prepnutie na PlayScene pri uvoľnení tlačidla
        });

        restartButton.on('pointerout', () => {
            restartButton.setTexture('restartButton'); // Zmena späť na normálny sprite, ak ukazovateľ opustí tlačidlo
        });

        // Tlačidlo Main Menu
        const homeButton = this.add.sprite(width / 2 + 80, height / 2 + 20, 'homeButton').setInteractive();
        homeButton.setOrigin(0.5); // Nastavenie stredu tlačidla ako referenčného bodu
      
        // Spracovanie udalostí pre tlačidlo
        homeButton.on('pointerdown', () => {
            homeButton.setTexture('homeButtonPressed'); // Zmena na stlačený sprite
        });
      
        homeButton.on('pointerup', () => {
            this.clickSound.play();
            homeButton.setTexture('homeButton'); // Zmena späť na normálny sprite
            this.scene.stop('PlayScene');
            this.scene.start('GameScene'); // Prepnutie na GameScene pri uvoľnení tlačidla
        });
      
        homeButton.on('pointerout', () => {
            homeButton.setTexture('homeButton'); // Zmena späť na normálny sprite, ak ukazovateľ opustí tlačidlo
        });

        this.children.list.forEach((child) => {
            if (child instanceof Phaser.GameObjects.Sprite) {
                child.setScale(2); // Zväčšenie spriteov
            }
        });
    }
}
