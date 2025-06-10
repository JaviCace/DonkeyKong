import Hammer from './Hammer.js';
import IceFlower from './Iceflower.js';

export default class Player extends Phaser.GameObjects.Container {
  constructor(scene, x, y, texture) {
    super(scene, x, y);
    this.scene = scene;
    this.lifes = 3;
    this.speed = 160;
    this.jumpForce = 250;
    this.item = null;

    this.momentum = 1;
    this.lastDirection = 0; // -1 (izq), 1 (der), 0 (quieto)

    this.sprite = scene.physics.add.sprite(0, 0, texture, 3);
    this.sprite.setBounce(0.2);
    this.sprite.setCollideWorldBounds(true);

    this.add(this.sprite);
    scene.add.existing(this);
    scene.physics.add.existing(this);

    this.body.setSize(this.sprite.width, this.sprite.height);
    this.body.setAllowGravity(true);
    this.setSize(this.sprite.width, this.sprite.height);

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
      frames: [{ key: 'player', frame: 1 }],
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
      key: 'climbM',
      frames: this.scene.anims.generateFrameNumbers('player', { start: 4, end: 5 }),
      frameRate: 10,
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

  update(cursors) {
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

    // Reinicia momentum si cambió el sentido del movimiento
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
