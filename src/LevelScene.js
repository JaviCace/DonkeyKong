class LevelScene extends Phaser.Scene 
{
    constructor() 
    {
        super('LevelScene'); 
        
    }
    init(data) 
    {
        this.number = data;
    }

    preload() 
    {   
      
    }

    create() 
    {
       this.text = 'level' + this.number;
       this.counter = 120;
       this.puntos = 0;
    this.contadorTexto = this.add.text(20, 20, 'Tiempo: 120', {
        fontSize: '24px',
        color: '#ffffff'
    });

    // Usamos un timer que sume 1 cada segundo
    this.time.addEvent({
        delay: 1000, // 1000 ms = 1 segundo
        callback: this.actualizarContador,
        callbackScope: this,
        loop: true
    })
       var play = this.add.text(350, 400, this.text, {fontFamily: 'arcade_classic',fontSize: '56px',color: '#FFA500' });
       play.setInteractive();

        play.on('pointerdown', () => {
            this.scene.start('MapScene');
        });

        var win = this.add.text(250, 600, 'you win', {fontFamily: 'arcade_classic',fontSize: '13px',color: '#FFA500' });
         win.setInteractive();

        win.on('pointerdown', () => {
             this.puntos += (this.counter * 10);
              this.music.stop();
            this.scene.start('WinScene',{puntos : this.puntos} );
        });


        var lose = this.add.text(650, 600, 'you lose', {fontFamily: 'arcade_classic',fontSize: '13px',color: '#FFA500' });
         lose.setInteractive();

        lose.on('pointerdown', () => {
             this.puntos += (this.counter * 10);
              this.music.stop();
            this.scene.start('LoseScene',{puntos : this.puntos});
        });
        this.music = this.sound.add('nivel', { loop: true, volume: 0.5 });
       this.music.play();

    }

    update(time, delta) 
    {
        if (this.counter <= 0)
            {
                this.puntos += (this.counter * 10);
                 this.music.stop();
                this.scene.start('LoseScene',{puntos : this.puntos})
            }
    }

    actualizarContador() 
    {
    this.counter--;
    this.contadorTexto.setText('Tiempo: ' + this.counter);
    }
}
export {LevelScene}