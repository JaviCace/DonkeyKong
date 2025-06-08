export class PreloadScene extends Phaser.Scene 
{
  preload() 
  {
    this.load.image('mapa','./assets/sprites/mapa.png');
    this.load.image('nivel', './assets/sprites/platform.png');
    this.load.spritesheet('player', './assets/sprites/mario.png', { frameWidth: 16, frameHeight: 24 });
    this.load.spritesheet('fire','./assets/sprites/fire.png', { frameWidth: 16, frameHeight: 12 });
    this.load.spritesheet('boo','./assets/sprites/boo.png', { frameWidth: 16, frameHeight: 12 });
    this.load.spritesheet('koopa','./assets/sprites/Koopa.png', { frameWidth: 16, frameHeight: 24 });
    this.load.spritesheet('kong','./assets/sprites/Kong.png', { frameWidth: 16, frameHeight: 24 });
    this.load.image('Background', './assets/sprites/MainMenu.jpg');
    this.load.image('flor', './assets/sprites/Floor.png');
    this.load.image('flower', './assets/sprites/iceflower.png');
    this.load.image('hammer', './assets/sprites/hammer.png');

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