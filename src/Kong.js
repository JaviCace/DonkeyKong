import RollingBarrel from './RollingBarrel.js';
import ThrowingBarrel from './ThrowingBarrel.js';

export default class Kong extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y, texture = 'kong', barrelGroup) {
    super(scene, x, y, texture, 0);

    this.scene = scene;
    this.barrelGroup = barrelGroup;
    this.barrels = [];
    this.currentAction = null;

    // Agregar a la escena y activar física
    scene.add.existing(this);
    scene.physics.add.existing(this, true); // 'true' para que sea estático

    this.setScale(3);
    this.createAnimations();
    this.play('kong_idle');

    this.Behavior();
  }

  createAnimations() {
    const anims = this.scene.anims;

    if (!anims.exists('kong_idle')) {
      anims.create({
        key: 'kong_idle',
        frames: [{ key: 'kong', frame: 2 }],
        frameRate: 2,
        repeat: -1
      });

      anims.create({
        key: 'kong_roll',
        frames: [{ key: 'kong', frame: 4 }],
        frameRate: 5,
        repeat: 0
      });

      anims.create({
        key: 'kong_throw',
        frames: [{ key: 'kong', frame: 10 }],
        frameRate: 5,
        repeat: 0
      });

      anims.create({
        key: 'kong_pound',
        frames: anims.generateFrameNumbers('kong', { start: 1, end: 3 }),
        frameRate: 5,
        repeat: 6
      });

      anims.create({
        key: 'kong_die',
        frames: anims.generateFrameNumbers('kong', { start: 5, end: 9 }),
        frameRate: 5,
        repeat: 0
      });
    }
  }

  Behavior() {
    this.scene.time.addEvent({
      delay: 6000,
      loop: true,
      callback: () => {
        if (this.currentAction) return;

       
        

        const barrelType = Phaser.Math.Between(0, 1);
        let barrel;

        if (barrelType === 0) {
          this.play('kong_roll');
         
          barrel = new RollingBarrel(this.scene, this.x, this.y, 'barril');
           this.barrelGroup.add(barrel);
        } else {
          this.play('kong_throw');
     
          barrel = new ThrowingBarrel(this.scene, this.x, this.y, 'barril');
        }

        this.barrels.push(barrel);
       

        this.once('animationcomplete', () => {
          this.currentAction = null;
          this.play('kong_idle');
        });
      }
    });

 
  }

  update() {
    this.barrels.forEach(barrel => barrel.update());
  }
}
