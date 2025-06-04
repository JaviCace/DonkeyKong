export class PreloadScene extends Phaser.Scene 
{
  preload() 
  {
    this.load.image('mapa','./assets/sprites/mapa.png');
    this.load.image('nivel', './assets/sprites/platform.png');
    this.load.spritesheet('player', './assets/sprites/mario.png', { frameWidth: 16, frameHeight: 24 });
    this.load.image('Background', './assets/sprites/MainMenu.jpg');

    //audios
    this.load.audio('Menu','./assets/sounds/intro1.mp3');
    this.load.audio('Mapa','./assets/sounds/Mapa.mp3');
    this.load.audio('nivel','./assets/sounds/nivel.mp3');
    this.load.audio('MarioMuere','./assets/sounds/marioMuere.mp3');
    this.load.audio('DonkeyMuere','./assets/sounds/donkeyMuere.mp3');
    this.load.audio('Lose','./assets/sounds/failure.mp3');
    this.load.audio('Win','./assets/sounds/ganar.mp3');
    this.load.audio('Puntos','./assets/sounds/score.wav');
  }

  create() 
  {
    this.scene.start('MainScene');
  }
}