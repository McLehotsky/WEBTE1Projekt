export default class GyroTestScene extends Phaser.Scene {
    constructor() {
        super({ key: 'GyroTestScene' });
    }

    preload() {
        // Načítanie paddle obrázka
        this.load.image('paddle', 'assets/images/paddle/paddleRedt.png');
    }

    create() {
        // Paddle na testovanie gyroskopu
        this.paddle = this.add.sprite(
            this.scale.width / 2,
            this.scale.height - 50,
            'paddle'
        );
        this.paddle.setOrigin(0.5, 0.5);
    
        // Detekcia iOS zariadenia
        const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
    
        if (isIOS) {
            // HTML tlačidlo pre gyroskop len na iOS
            const htmlButton = document.createElement('button');
            htmlButton.innerText = 'Enable Gyroscope';
            htmlButton.style.position = 'absolute';
            htmlButton.style.top = '50%';
            htmlButton.style.left = '50%';
            htmlButton.style.transform = 'translate(-50%, -50%)';
            htmlButton.style.padding = '10px 20px';
            htmlButton.style.fontSize = '18px';
            htmlButton.style.backgroundColor = '#007bff';
            htmlButton.style.color = '#fff';
            htmlButton.style.border = 'none';
            htmlButton.style.borderRadius = '5px';
            htmlButton.style.cursor = 'pointer';
    
            document.body.appendChild(htmlButton);
    
            htmlButton.addEventListener('click', async () => {
                console.log('HTML tlačidlo bolo stlačené');
                if (typeof DeviceOrientationEvent !== 'undefined' && 
                    typeof DeviceOrientationEvent.requestPermission === 'function') {
                    try {
                        const permission = await DeviceOrientationEvent.requestPermission();
                        if (permission === 'granted') {
                            console.log('Gyroskop povolený!');
                            this.enableGyroscope();
                            htmlButton.style.display = 'none'; // Skrytie tlačidla po povolení
                        } else {
                            console.warn('Gyroskop povolenie zamietnuté.');
                        }
                    } catch (error) {
                        console.error('Chyba pri žiadosti o povolenie:', error);
                    }
                } else {
                    console.log('Gyroskop povolenie nie je potrebné.');
                    this.enableGyroscope();
                    htmlButton.style.display = 'none'; // Skrytie tlačidla
                }
            });
        } else {
            // Pre ostatné zariadenia (Android) povolíme gyroskop automaticky
            this.enableGyroscope();
        }
    
        // Inicializácia gyroskopickej hodnoty
        this.tiltX = 0;
    }
    
    enableGyroscope() {
        window.addEventListener('deviceorientation', event => {
            if (event.gamma !== null) {
                this.tiltX = event.gamma / 10; // Citlivosť gyroskopu
            }
        });
    }
    
    update() {
        // Pohyb paddle na základe gyroskopu
        this.paddle.x += this.tiltX;
    
        // Udržať paddle v rámci obrazovky
        this.paddle.x = Phaser.Math.Clamp(
            this.paddle.x,
            this.paddle.width / 2,
            this.scale.width - this.paddle.width / 2
        );
    }
}
