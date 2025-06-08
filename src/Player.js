export default class Player {
  constructor(scene, x, y, texture) {
    this.scene = scene;
    this.sprite = scene.physics.add.sprite(x, y, texture, 3);
    this.lifes = 3;
    this.speed = 160;
    this.jumpForce = 250;
    this.isOnGround = false;

    this.sprite.setBounce(0.2);
 this.sprite.refreshBody();
    this.animator(); 
  }

  moveLeft() {
    this.sprite.setVelocityX(-this.speed);
    this.playAnimation('walk');
    
    this.sprite.flipX = false;
  }

  moveRight() {
    this.sprite.setVelocityX(this.speed);
    this.playAnimation('walk');
    this.sprite.flipX = true;
  }

  jump() {
    if (this.sprite.body.blocked.down || this.sprite.body.touching.down) {
      this.sprite.setVelocityY(-this.jumpForce);
      this.playAnimation('jump');
    }
  }

  animator() {
    this.scene.anims.create({
      key: 'walk',
      frames: this.scene.anims.generateFrameNumbers('player', { start: 1, end: 3 }),
      frameRate: 10,
      repeat: -1
    });

    this.scene.anims.create({
      key: 'jump',
      frames: [{ key: 'player', frame: 1 }],
      frameRate: 1,
      repeat: 0
    });

    this.scene.anims.create({
      key: 'idle',
      frames: [{ key: 'player', frame: 3 }],
      frameRate: 1,
      repeat: -1
    });

    this.scene.anims.create({
      key: 'climb',
      frames: this.scene.anims.generateFrameNumbers('player', { start: 4, end: 5 }),
      frameRate: 10,
      repeat: -1
    });
  }

  playAnimation(key) {
    if (this.sprite.anims.getName() !== key) {
      this.sprite.anims.play(key, true);
    }
  }

  update(cursors) {
    if (cursors.left.isDown) {
      this.moveLeft();
    } else if (cursors.right.isDown) {
      this.moveRight();
    } else {
      this.sprite.setVelocityX(0);
      this.playAnimation('idle');
    }

    if (Phaser.Input.Keyboard.JustDown(cursors.space)) {
      this.jump();
    }
  }
}