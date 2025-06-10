export default class IceBall extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y, direction = 1, texture = 'iceball') {
    super(scene, x, y, texture);

    this.scene = scene;
    this.direction = direction;
    this.speed = 200;
    this.isDying = false;

    // Agregar a escena y activar física
    scene.add.existing(this);
    scene.physics.add.existing(this);

    // Sin gravedad
    this.body.setAllowGravity(false);

    // Escala y dirección inicial
    this.setScale(1.5);
    this.setVelocityX(this.speed * this.direction);
    this.setFlipX(this.direction < 0);

    // Iniciar animación
    this.play('iceball_fly', true);
  }

  update() {
    if (this.isDying) return;

    this.setVelocityX(this.speed * this.direction);

    const bounds = this.scene.physics.world.bounds;

    if (this.x < bounds.x || this.x > bounds.width) {
      this.die();
    }
  }

  die() {
    if (this.isDying) return;
    this.isDying = true;

    this.setVelocity(0);
    this.play('iceball_explode', true);

    this.once('animationcomplete', () => {
      this.destroy();
    });
  }
}
