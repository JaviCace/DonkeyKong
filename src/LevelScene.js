import Player from "./Player.js";
import Flor from './Flor.js';
import Fireball from "./Fireball.js";
import Boo from "./Boo.js";
import Koopa from "./Koopa.js";
import Kong from "./Kong.js";

class LevelScene extends Phaser.Scene {
  constructor() {
    super('LevelScene');
  }

  init(data) {
    this.number = data;
  }

  preload() {
    // Puedes precargar aquí si lo necesitas
  }

  create() {
    // Instanciar entidades
    //this.barrelGroup = this.physics.add.group();
   // this.kong = new Kong(this, 100, 100, 'kong', this.barrelGroup);
    

   // this.boo = new Boo(this, 100, 100, 'boo');
   // this.koopa = new Koopa(this, 200, 100, 'koopa');
    this.player = new Player(this, 100, 100, 'player');


    this.fireballes = [
      new Fireball(this, 400, 100, 'fire'),
      new Fireball(this, 300, 100, 'fire')
    ];

    // Grupo de flores (plataformas estáticas)
    this.flores = this.physics.add.staticGroup();
    this.flores.add(new Flor(this, this.scale.width / 2, this.scale.height - 64, 'flor', 18, 3).sprite);
    this.flores.add(new Flor(this, 300, 300, 'flor', 13, 2).sprite);

    // Colisiones
    this.physics.add.collider(this.player, this.flores);
    this.physics.add.collider(this.kong, this.flores);
    this.physics.add.collider(this.koopa, this.flores);
    this.fireballes.forEach(f => this.physics.add.collider(f, this.flores));
    this.physics.add.collider(this.barrelGroup, this.flores);


    // HUD: tiempo y puntos
    this.counter = 120;
    this.puntos = 0;
    this.contadorTexto = this.add.text(20, 20, 'Tiempo: 120', { fontSize: '24px', color: '#ffffff' });

    this.time.addEvent({
      delay: 1000,
      callback: this.actualizarContador,
      callbackScope: this,
      loop: true
    });

    // Música
    this.music = this.sound.add('nivel', { loop: true, volume: 0.5 });
    this.music.play();

    // Teclado
    this.keys = this.input.keyboard.addKeys({
      up: Phaser.Input.Keyboard.KeyCodes.W,
      down: Phaser.Input.Keyboard.KeyCodes.S,
      left: Phaser.Input.Keyboard.KeyCodes.A,
      right: Phaser.Input.Keyboard.KeyCodes.D,
      space: Phaser.Input.Keyboard.KeyCodes.SPACE,
      use: Phaser.Input.Keyboard.KeyCodes.E,
    });
  }

  update(time, delta) {
    if (this.counter <= 0) {
      this.puntos += this.counter * 10;
      this.music.stop();
      this.scene.start('LoseScene', { puntos: this.puntos });
    }

    this.player.update(this.keys);
    this.fireballes.forEach(f => f.update());
    this.boo.update(this.player);
    this.koopa.update();
    this.kong.update();
  }

  actualizarContador() {
    this.counter--;
    this.contadorTexto.setText('Tiempo: ' + this.counter);
  }
}

export { LevelScene };
