import Player from "./Player.js";
import Flor from './Flor.js';
import Fireball from "./Fireball.js";
import Boo from "./Boo.js";
import Koopa from "./Koopa.js";
import Kong from "./Kong.js";
import Rose from "./Rose.js";
import { FlowerSpawner, HammerSpawner } from "./Spawner.js";

class LevelScene extends Phaser.Scene {
  constructor() {
    super('LevelScene');
  }

  init(data) {
    this.number = data;
  }
  create() {

  this.Spawners = this.physics.add.group();
this.Spawners.add(new FlowerSpawner(this, 200, this.scale.height - 104, 'spawner'));

    this.barrelGroup = this.physics.add.group();
    this.ThrowingGroup = this.physics.add.group();

    this.kongs = [];

    this.flores = this.physics.add.staticGroup();
    this.flores.add(new Flor(this, this.scale.width / 2 - 100, this.scale.height - 64, 'flor', 18, 3).sprite);
    this.flores.add(new Flor(this, this.scale.width / 2 + 100, this.scale.height - 264, 'flor', 18, 2).sprite);
    this.flores.add(new Flor(this, this.scale.width / 2 - 100, this.scale.height - 464, 'flor', 18, 2).sprite);

    this.roses = this.physics.add.group();

    this.player = new Player(this, 100, this.scale.height - 94, 'player');

    this.fireballes = [];
    this.Koopas = [];
    this.Boos = [];

    // Colisiones
    this.physics.add.collider(this.player, this.flores);
    this.physics.add.collider(this.roses, this.flores);
    this.physics.add.collider(this.barrelGroup, this.flores);

    this.fireballes.forEach(f => this.physics.add.collider(f, this.flores));
    this.Koopas.forEach(k => this.physics.add.collider(k, this.flores));
    this.Boos.forEach(b => this.physics.add.collider(b, this.flores));
    this.physics.add.collider(this.Spawners, this.flores);

    // HUD
    this.counter = 120;
    this.puntos = 0;
    this.gameOver = false;

    this.contadorTexto = this.add.text(20, 20, 'Tiempo: 120', { fontSize: '24px', color: '#ffffff' });
    this.puntosTexto = this.add.text(20, 60, 'Puntos: 0', { fontSize: '24px', color: '#ffffff' });
    this.vidasTexto = this.add.text(500, 20, 'Vidas: 3', { fontSize: '24px', color: '#ffffff' });

    this.time.addEvent({
      delay: 1000,
      callback: this.actualizarContador,
      callbackScope: this,
      loop: true
    });

    // Música
    this.music = this.sound.add('nivel', { loop: true, volume: 0.5 });
    this.music.play();

    this.music2 = this.sound.add('MarioMuere', { loop: false, volume: 1 });
    this.music3 = this.sound.add('DonkeyMuere', { loop: false, volume: 1 });

    // Teclado
    this.keys = this.input.keyboard.addKeys({
      left: Phaser.Input.Keyboard.KeyCodes.A,
      right: Phaser.Input.Keyboard.KeyCodes.D,
      space: Phaser.Input.Keyboard.KeyCodes.SPACE,
      use: Phaser.Input.Keyboard.KeyCodes.E,
    });
  }

  update(time, delta) {
    if (this.gameOver) return;

    if (this.counter <= 0 || this.player.lifes <= 0 || this.player.getMuerto()) {
      this.gameOver = true;
      this.puntos += this.counter * 10;
      this.music.stop();
      this.music2.play();

      this.player.forceDeathState();

      this.time.delayedCall(2000, () => {
        if (this.music2.isPlaying) this.music2.stop();
        this.scene.start('LoseScene', { puntos: this.puntos });
      });

      return;
    }

    this.colisiones();

    this.player.update(this.keys);
    this.fireballes.forEach(f => f.update());

    // Actualizar todos los Kong
    this.kongs.forEach(kong => kong.update());

    this.puntosTexto.setText('Puntos: ' + this.puntos);
    this.vidasTexto.setText('Vidas: ' + this.player.lifes);
  }

  colisiones() {
    this.fireballes.forEach(fireball => {
      this.roses.children.iterate(rose => {
        if (this.physics.overlap(fireball, rose)) {
          fireball.cambiarDireccion();
        }
      });

      if (this.physics.overlap(fireball, this.player) && !this.player.golpeado) {
        this.player.hurt();
      }
    });

    this.Koopas.forEach(koopa => {
      this.roses.children.iterate(rose => {
        if (this.physics.overlap(koopa, rose)) {
          koopa.cambiarDireccion();
        }
      });

      if (this.physics.overlap(koopa, this.player) && !this.player.golpeado) {
        this.player.hurt();
      }
    });

    this.Boos.forEach(boo => {
      if (this.physics.overlap(boo, this.player) && !this.player.golpeado) {
        this.player.hurt();
      }
    });

    this.barrelGroup.children.iterate(barril => {
      this.roses.children.iterate(rose => {
        if (this.physics.overlap(barril, rose)) {
          barril.changeDirection();
        }
      });

      if (this.physics.overlap(barril, this.player) && !this.player.golpeado) {
        this.player.hurt();
      }
    });

    this.ThrowingGroup.children.iterate(barril => {
      if (this.physics.overlap(barril, this.flores)) {
        barril.cambiarDirection(Phaser.Math.Between(-15, 15));
      }

      if (this.physics.overlap(barril, this.player) && !this.player.golpeado) {
        this.player.hurt();
      }
    });
this.Spawners.children.iterate(spawner => {
  if (this.physics.overlap(spawner, this.player) && spawner.getCreado()) {
    console.log("tocado");
    console.log(spawner.getItem());
    this.player.addItem(spawner.getItem());
  }
});


    this.kongs.forEach(kong => {
      if (this.physics.overlap(kong, this.player)) {
        kong.Die();
        this.gameOver = true;
        this.puntos += this.counter * 10;
        this.music.stop();
        this.music3.play();

        this.player.forceDeathState();

        this.time.delayedCall(2000, () => {
          if (this.music3.isPlaying) this.music3.stop();
          this.scene.start('WinScene', { puntos: this.puntos });
        });
      }
    });
  }

  actualizarContador() {
    this.counter--;
    this.contadorTexto.setText('Tiempo: ' + this.counter);
  }
}

export { LevelScene };
