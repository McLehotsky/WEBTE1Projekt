export default class PauseMenu extends Phaser.Scene {
    constructor() {
        super({ key: 'PauseScene' });
    }

    create() {
        // Získanie stredu obrazovky
        const centerX = this.scale.width / 2;
        const centerY = this.scale.height / 2;

        // Semi-transparentné pozadie
        this.add.rectangle(centerX, centerY, this.scale.width, this.scale.height, 0x000000, 0.5); // Čierne pozadie s 50% priehľadnosťou

        // Text "PAUSED"
        this.add.text(centerX, centerY - 100, 'PAUSED', { fontSize: '48px', fill: '#ffffff' }).setOrigin(0.5);

        // Tlačidlo Resume
        const resumeButton = this.add.text(centerX, centerY, 'Resume', { fontSize: '32px', fill: '#ffffff' })
            .setOrigin(0.5)
            .setInteractive()
            .on('pointerdown', () => {
                this.scene.stop(); // Zastav PauseMenu scénu
                this.scene.resume('PlayScene'); // Obnov hernú scénu
            });

        // Tlačidlo Restart
        const restartButton = this.add.text(centerX, centerY + 50, 'Restart', { fontSize: '32px', fill: '#ffffff' })
            .setOrigin(0.5)
            .setInteractive()
            .on('pointerdown', () => {
                this.scene.stop(); // Zastav PauseMenu scénu
                this.scene.stop('PlayScene'); // Zastav GameScene
                this.scene.start('PlayScene'); // Reštartuj hru
            });

        // Tlačidlo Main Menu
        const mainMenuButton = this.add.text(centerX, centerY + 100, 'Main Menu', { fontSize: '32px', fill: '#ffffff' })
            .setOrigin(0.5)
            .setInteractive()
            .on('pointerdown', () => {
                this.scene.stop(); // Zastav PauseMenu scénu
                this.scene.stop('PlayScene'); // Zastav GameScene
                this.scene.start('GameScene'); // Spusti hlavnú obrazovku
            });
    }
}
