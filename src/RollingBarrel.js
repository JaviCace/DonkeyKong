export default class RollingBarrel extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y, texture = 'barril') {
    super(scene, x, y, texture, 1);
    scene.add.existing(this);
    scene.physics.add.existing(this);

    this.setBounce(0.1);
    this.setCollideWorldBounds(true);
    this.setGravityY(300);
    this.setScale(2);

    this.speed = 100;
    this.direction = 1;

    this.scene = scene;
  }


  update() 
  {
    this.setVelocityX(this.speed * this.direction);
  }

  changeDirection() {
    this.direction *= -1;
  }
}
