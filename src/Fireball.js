export default class Fireball {
  constructor(scene, x, y, texture = 'fire') {
    this.scene = scene;

    // Crear sprite con Arcade Physics
    this.sprite = scene.physics.add.sprite(x, y, texture, 0);

    this.speed = 100; // Ajusta según la escala de tu juego (más alto que en Matter)
    this.direction = 1;

    this.sprite.setBounce(0);
    this.sprite.setCollideWorldBounds(true); // para que rebote en los bordes si se desea
    this.sprite.setGravityY(0); // Sin gravedad si quieres simular fuego flotante
    this.sprite.setScale(3, 3);

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

  animator() {
    this.scene.anims.create({
      key: 'walk',
      frames: this.scene.anims.generateFrameNumbers('fire', { start: 0, end: 1 }),
      frameRate: 10,
      repeat: -1
    });
  }

  playAnimation(key) {
    if (this.sprite.anims.getName() !== key) {
      this.sprite.anims.play(key, true);
    }
  }

  update() {
    if (this.direction === -1) {
      this.moveLeft();
    } else {
      this.moveRight();
    }
  }
}