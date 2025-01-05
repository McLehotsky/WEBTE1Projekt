export default class HowToPlayScene extends Phaser.Scene {
    constructor() {
        super({ key: 'HowToPlayScene' }); // Identifikátor scény
    }
  
    preload() {
        this.load.image('backButton', 'assets/images/ui/BackButton.png');
        this.load.image('backButtonPressed', 'assets/images/ui/BackButtonPressed.png');

        this.add.text(0, 0, '', { fontFamily: 'm6x11', fontSize: '16px' });

        this.load.audio('click', 'assets/sounds/mixkit-mouse-click-close-1113.wav');
    }
  
    create() {
        const { width, height } = this.scale;
        
        // Nadpis
        this.add.text(width / 2, 50, 'How to Play', {
            fontSize: '52px',
            fill: '#fcbf49', // Zlatá farba
            fontFamily: 'm6x11', // Tvoj custom font
        }).setOrigin(0.5);
  
        // Text s návodom
        const instructions = `
            Objective:
            Break all the bricks using the ball.
  
            Controls:
            - Desktop: Use the Arrow Keys or
            Mouse to move the paddle.
            - Mobile: Tilt your device to move
            the paddle.
  
            Power-Ups:
            - Extra Life: Catch the power-up
            to gain an additional life.
  
            Tips:
            - Aim strategically to hit multiple
            bricks in one shot.
            - Keep the ball in play and aim for
            high scores!`;
  
        // Zobrazenie textu s automatickým zalamovaním
        this.add.text(width / 2 - 40, height / 2, instructions, {
            fontSize: '24px',
            fill: '#ffffff', // Biela farba
            fontFamily: 'm6x11',
        }).setOrigin(0.5);

        this.clickSound = this.sound.add('click');
  
        // Tlačidlo "Back to Menu"
        const BackButton = this.add.sprite(width / 2 + 120, height / 2 + 280, 'backButton').setInteractive();
        BackButton.setOrigin(0.5); // Nastavenie stredu tlačidla ako referenčného bodu
      
        // Spracovanie udalostí pre tlačidlo
        BackButton.on('pointerdown', () => {
            BackButton.setTexture('backButtonPressed'); // Zmena na stlačený sprite
        });
      
        BackButton.on('pointerup', () => {
            this.clickSound.play();
            BackButton.setTexture('backButton'); // Zmena späť na normálny sprite
            this.scene.start('GameScene'); // Prepnutie na GameScene pri uvoľnení tlačidla
        });
      
        BackButton.on('pointerout', () => {
            BackButton.setTexture('backButton'); // Zmena späť na normálny sprite, ak ukazovateľ opustí tlačidlo
        });

        this.children.list.forEach((child) => {
            if (child instanceof Phaser.GameObjects.Sprite) {
                child.setScale(1.5); // Zväčšenie spriteov
            }
        });
    }
}
  