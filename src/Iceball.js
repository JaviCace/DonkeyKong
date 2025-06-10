export default class IceBall extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y, direction = 1, texture = 'iceball') {
    super(scene, x, y, texture);

    this.scene = scene;
    this.direction = direction;
    this.speed = 200;

    // Agregar a escena y activar física
    scene.add.existing(this);
    scene.physics.add.existing(this);

    // Sin gravedad
    this.body.setAllowGravity(false);

    // Escala y dirección inicial
    this.setScale(1.5);
    this.setVelocityX(this.speed * this.direction);
    this.setFlipX(this.direction < 0);
  }

  update() {
    // Mantiene velocidad constante
    this.setVelocityX(this.speed * this.direction);
  }
}
