import Hammer from './Hammer.js';
import IceFlower from './Iceflower.js';

export default class Player extends Phaser.GameObjects.Container {
  constructor(scene, x, y, texture) {
    super(scene, x, y);
    this.scene = scene;
    this.lifes = 3;
    this.speed = 160;
    this.jumpForce = 200;
    this.item = null;

    this.momentum = 1;
    this.lastDirection = 0;

    this.golpeado = false;
    this.controlBlocked = false;
    this.muerto = false;

    // Sprite
    this.sprite = scene.add.sprite(0, 0, texture, 3);
    this.sprite.setOrigin(0.5, 0.5);
    this.add(this.sprite);

    scene.add.existing(this);
    scene.physics.world.enable(this);

    this.body.setSize(this.sprite.width, this.sprite.height);
    this.body.setOffset(-this.sprite.width / 2, -this.sprite.height / 2);
    this.body.setCollideWorldBounds(true);
    this.body.setAllowGravity(true);
    this.animator();
  }

  setMomentum(value) {
    this.momentum = value;
  }

  moveLeft() {
    this.body.setVelocityX(-this.speed * this.momentum);
    this.sprite.play('walkM', true);
    this.sprite.flipX = false;
  }

  moveRight() {
    this.body.setVelocityX(this.speed * this.momentum);
    this.sprite.play('walkM', true);
    this.sprite.flipX = true;
  }

  jump() {
    if (this.body.blocked.down || this.body.touching.down) {
      this.body.setVelocityY(-this.jumpForce);
      this.sprite.play('jumpM');
    }
  }

  animator() {
    this.scene.anims.create({
      key: 'walkM',
      frames: this.scene.anims.generateFrameNumbers('player', { start: 1, end: 3 }),
      frameRate: 10,
      repeat: -1
    });

    this.scene.anims.create({
      key: 'jumpM',
      frames: [{ key: 'player', frame: 6 }],
      frameRate: 1,
      repeat: 0
    });

    this.scene.anims.create({
      key: 'idleM',
      frames: [{ key: 'player', frame: 3 }],
      frameRate: 1,
      repeat: -1
    });

    this.scene.anims.create({
      key: 'DieM',
      frames: [{ key: 'player', frame: 6 }],
      frameRate: 10 ,
      repeat: -1
    });
  }

  addItem(type) {
    if (this.item) {
      this.item.destroy();
    }

    if (type === 'hammer') {
      this.item = new Hammer(this.scene, 0, -20);
    } else if (type === 'iceflower') {
      this.item = new IceFlower(this.scene, 0, -20);
    }

    if (this.item) {
      this.add(this.item);
    }
  }

  hurt() {
    if (!this.golpeado && !this.muerto) {
      this.golpeado = true;
      this.controlBlocked = true;
      this.lifes -= 1;

      if (this.lifes <= 0) {
        this.muerto = true;
        this.sprite.play('DieM', true);
        return;
      }

      const pushX = 400;
      const pushY = -50;
      let dir = this.lastDirection !== 0 ? this.lastDirection : 1;

      this.body.setVelocityX(-dir * pushX);
      this.body.setVelocityY(pushY);

      this.scene.time.delayedCall(1000, () => {
        this.controlBlocked = false;
      });

      this.scene.time.delayedCall(2000, () => {
        this.golpeado = false;
      });
    }
  }

  forceDeathState() {
    this.controlBlocked = true;
    this.golpeado = false;
    this.body.setVelocity(0, 0);
    this.body.allowGravity = false;
    this.sprite.play('idleM', true);
  }

  getMuerto() {
    return this.muerto;
  }

  update(cursors) {
    if (this.controlBlocked) {
      const deceleration = 600;
      const delta = this.scene.game.loop.delta / 1000;

      if (this.body.velocity.x > 0) {
        this.body.setVelocityX(Math.max(this.body.velocity.x - deceleration * delta, 0));
      } else if (this.body.velocity.x < 0) {
        this.body.setVelocityX(Math.min(this.body.velocity.x + deceleration * delta, 0));
      }

      this.sprite.play('idleM', true);
      return;
    }

    let direction = 0;

    if (cursors.left.isDown) {
      direction = -1;
      this.moveLeft();
    } else if (cursors.right.isDown) {
      direction = 1;
      this.moveRight();
    } else {
      direction = 0;
      this.body.setVelocityX(0);
      this.sprite.play('idleM', true);
    }

    if (direction !== 0 && direction !== this.lastDirection) {
      this.momentum = 1;
    }

    this.lastDirection = direction;

    if (Phaser.Input.Keyboard.JustDown(cursors.space)) {
      this.jump();
    }

    if (this.item) {
      this.item.update();
    }
  }
}
