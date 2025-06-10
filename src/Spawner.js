export default class Spawner extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y, texture = 'spawner') {
    super(scene, x, y, texture);


    scene.add.existing(this);
    scene.physics.add.existing(this);

    this.scene = scene;

   
    this.setImmovable(true);

    this.creado = false;

    this.scene.time.addEvent({
      delay: 15000,
      loop: true,
      callback: () => {
        this.creado = true;

        this.scene.time.delayedCall(30000, () => {
          this.creado = false;
        });
      }
    });
  }

  update() {
    if (this.creado) {
      
    }
  }
}
