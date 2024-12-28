export default class ParticleTestScene extends Phaser.Scene {
    constructor() {
      super({ key: 'ParticleTestScene' });
    }
  
    preload() {
      // Načítanie textúry particlov
      this.load.image('particle', 'assets/images/ui/particle1.png'); // Nahraďte cestu podľa potreby
    }
  
    create() {
        // Pridanie textu pre informáciu
        this.add.text(10, 10, 'Testing Particles', { font: '16px Arial', fill: '#ffffff' });
    
        // Vytvorenie particlového systému s konfiguráciou
        const particleEmitter = this.add.particles(this.scale.width / 2, this.scale.height / 2, 'particle', {
          lifespan: 1000,                  // Trvanie častíc
          speed: { min: -200, max: 200 },  // Rýchlosť častíc
          scale: { start: 1, end: 0 },     // Postupné zmenšovanie častíc
          tint: [0xff0000, 0x00ff00, 0x0000ff], // Červená, zelená, modrá farba
          blendMode: 'NORMAL',             // Normálny režim miešania
          quantity: 50,                    // Počet častíc
        });
        
        console.log(`Screen center: (${this.scale.width / 2}, ${this.scale.height / 2})`);
        // Automatické spustenie výbuchu pri načítaní scény
        particleEmitter.explode(50, 100, 100);
      }
  }
  