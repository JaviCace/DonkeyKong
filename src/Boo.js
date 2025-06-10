export default class Boo extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y, texture = 'boo') {
    super(scene, x, y, texture, 0);
    this.scene = scene;
    this.speed = 30;

    // Añadir a escena y sistema de físicas
    scene.add.existing(this);
    scene.physics.add.existing(this);

    this.setScale(3, 3);
    this.setCollideWorldBounds(true);
    this.setBounce(0);
    this.setGravity(0);
    this.body.allowGravity = false;

    this.animator();
  }

  animator() {
    this.scene.anims.create({
      key: 'fly',
      frames: this.scene.anims.generateFrameNumbers('boo', { start: 0, end: 1 }),
      frameRate: 10,
      repeat: -1,
    });
  }

  playAnimation(key) {
    if (this.anims.getName() !== key) {
      this.anims.play(key, true);
    }
  }

  followPlayer(player) {
    const diffX = player.x - this.x;
    const diffY = player.y - this.y;

    const dirX = diffX > 0 ? 1 : -1;
    const dirY = diffY > 0 ? 1 : -1;

    this.setVelocityX(dirX * this.speed);
    this.setVelocityY(dirY * this.speed);

    this.playAnimation('fly');
    this.flipX = dirX < 0;
  }

  update(player) {
    this.followPlayer(player);
  }
}
