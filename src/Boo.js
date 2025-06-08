export default class Boo {
  constructor(scene, x, y, texture = 'boo') {
    this.scene = scene;

    this.sprite = scene.physics.add.sprite(x, y, texture, 0);

    this.speed = 30; 
    this.sprite.setScale(3, 3);
    this.sprite.refreshBody();
    this.sprite.setCollideWorldBounds(true);
    this.sprite.setGravity(0); // Sin gravedad
    this.sprite.setBounce(0);  // No rebota
    this.sprite.body.allowGravity = false; 
    
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
    if (this.sprite.anims.getName() !== key) {
      this.sprite.anims.play(key, true);
    }
  }

  followPlayer(player) {
    const diffX = player.sprite.x - this.sprite.x;
    const diffY = player.sprite.y - this.sprite.y;

    const dirX = diffX > 0 ? 1 : -1;
    const dirY = diffY > 0 ? 1 : -1;

    this.sprite.setVelocityX(dirX * this.speed);
    this.sprite.setVelocityY(dirY * this.speed);

    this.playAnimation('fly');
    this.sprite.flipX = dirX < 0;
  }

  update(player) {
    this.followPlayer(player);
  }
}