export default class ThrowingBarrel extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y, texture = 'barril', angle = 90) {
    super(scene, x, y, texture, 0);

    scene.add.existing(this);
    scene.physics.add.existing(this);

    this.angleDegrees = angle; // ángulo en grados
    this.speed = 200;

    this.setBounce(0.1);
    this.setCollideWorldBounds(true);
    this.setGravityY(0); // control manual del movimiento
    this.setScale(2);

    this.scene = scene;
  
  }



  setAngle(newAngle) {
    this.angleDegrees = newAngle;
  }

  update() {
    const radians = Phaser.Math.DegToRad(this.angleDegrees);
    const vx = Math.cos(radians) * this.speed;
    const vy = Math.sin(radians) * this.speed;
    this.setVelocity(vx, vy);

  }
}
