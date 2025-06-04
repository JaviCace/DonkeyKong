class WinScene extends Phaser.Scene 
{
    constructor() 
    {
        super('WinScene'); 
        
    }
    init(data) 
    {
        this.punto = data.puntos;
    }


    preload() 
    {   
      
    }

    create() 
    {
     
       this.audio = true;
       this.puntuaciones = 0;
       
       var play = this.add.text(350, 400, 'you win', {fontFamily: 'arcade_classic',fontSize: '56px',color: '#FFA500' });
       play.setInteractive();
       this.puntos = this.add.text(350, 100, 'Puntos:', {fontFamily: 'arcade_classic',fontSize: '56px',color: '#FFA500' });
       this.puntuacion = this.add.text(350, 170, '0', {fontFamily: 'arcade_classic',fontSize: '56px',color: '#FFA500' });
     
        play.on('pointerdown', () => {
            this.scene.start('MapScene');
            this.music2.stop();
            this.music1.stop();
        });
                this.music1 = this.sound.add('Puntos', { loop: true, volume: 0.75 });
        this.music1.play();
        this.music2 = this.sound.add('Win', { loop: true, volume: 0.5 });
        this.music2.play();
    }

    update(time, delta) 
    {
                if(this.audio)
            {
        if (this.puntuaciones <= this.punto)
        {
            this.puntuaciones += 5;
            this.puntuacion.setText(this.puntuaciones);
        }
        else 
        {
             this.music1.stop();
             this.audio= false
            this.puntuacion.setText(this.punto);
       
           
        }
        }

    }
}
export {WinScene}