export default class Koopa 
{
  constructor(scene, x, y, texture = 'koopa') {
    this.scene = scene;

    this.sprite = scene.physics.add.sprite(x, y, texture, 0);
    this.sprite.setBounce(0);
    this.sprite.setCollideWorldBounds(true); // Detectar colisiones con bordes
    this.sprite.setScale(2, 2);
    this.sprite.refreshBody();
    this.speed = 100;
    this.direction = 1;
    
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
    // Solo crear animaciones si aún no existen
    if (!this.scene.anims.exists('walk')) {
      this.scene.anims.create({
        key: 'walk',
        frames: this.scene.anims.generateFrameNumbers('koopa', { start: 0, end: 3 }),
        frameRate: 10,
        repeat: -1
      });
    }

    if (!this.scene.anims.exists('die')) {
      this.scene.anims.create({
        key: 'die',
        frames: this.scene.anims.generateFrameNumbers('koopa', { start: 4, end: 6 }),
        frameRate: 10,
        repeat: -1
      });
    }

    if (!this.scene.anims.exists('ice')) {
      this.scene.anims.create({
        key: 'ice',
        frames: [{ key: 'koopa', frame: 7 }],
        frameRate: 10,
        repeat: -1
      });
    }

    if (!this.scene.anims.exists('idle')) {
      this.scene.anims.create({
        key: 'idle',
        frames: [{ key: 'koopa', frame: 3 }],
        frameRate: 10,
        repeat: -1
      });
    }
  }

  playAnimation(key) {
    if (this.sprite.anims.getName() !== key) {
      this.sprite.anims.play(key, true);
    }
  }

  update() {
    // Movimiento automático
    if (this.direction === -1) {
      this.moveLeft();
    } else {
      this.moveRight();
    }

    // Cambiar dirección al tocar paredes
    if (this.sprite.body.blocked.left) {
      this.direction = 1;
    } else if (this.sprite.body.blocked.right) {
      this.direction = -1;
    }
  }
}