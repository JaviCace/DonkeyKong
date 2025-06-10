export default class Spawner extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y, texture = 'spawner') {
    super(scene, x, y, texture,0);


    scene.add.existing(this);
    scene.physics.add.existing(this);
   
    this.scene = scene;

   
    this.setImmovable(true);
    this.setScale(2);
    this.refreshBody();
    this.creado = false;

    this.scene.time.addEvent({
      delay: 5000,
      loop: true,
      callback: () => {
        this.creado = true;

        this.scene.time.delayedCall(10000, () => {
          this.creado = false;
        });
      }
    });
  }
    getItem()
    {
      
      this.creado = false;

    }
     getCreado()
  {
    return this.creado;
  }
}
export class FlowerSpawner extends Spawner {
  constructor(scene, x, y, texture = 'spawner') {
    super(scene, x, y, texture);
    this.item = 1;

    this.animator();

    this.play(this.creado ? 'Sflawner' : 'idleSF');

    this.scene.time.addEvent({
      delay: 100,
      loop: true,
      callback: () => {
        if (this.creado && this.anims.currentAnim.key !== 'Sflawner') {
          this.play('Sflawner');
        } else if (!this.creado && this.anims.currentAnim.key !== 'idleSF') {
          this.play('idleSF');
        }
      }
    });
  }

  animator() {
    if (!this.scene.anims.exists('idleSF')) {
      this.scene.anims.create({
        key: 'idleSF',  // <-- CORREGIDO
        frames: this.scene.anims.generateFrameNumbers('spawner', { start: 0, end: 1 }),
        frameRate: 10,
        repeat: -1
      });
    }

    if (!this.scene.anims.exists('Sflawner')) {
      this.scene.anims.create({
        key: 'Sflawner',
        frames: this.scene.anims.generateFrameNumbers('spawner', { start: 2, end: 3 }),
        frameRate: 10,
        repeat: -1
      });
    }
  }

  getItem() {
    this.creado = false;
    return this.item;
  }
 
}


export class HammerSpawner extends Spawner {
  constructor(scene, x, y, texture = 'spawner') {
    super(scene, x, y, texture);
    this.item = 0;

    this.animator();

    this.play(this.creado ? 'Spammer' : 'idleSH');

    
    this.scene.time.addEvent({
      delay: 100, 
      loop: true,
      callback: () => {
        if (this.creado && this.anims.currentAnim.key !== 'Spammer') {
          this.play('Spammer');
        } else if (!this.creado && this.anims.currentAnim.key !== 'idleSH') {
          this.play('idleSH');
        }
      }
    });
  }

  animator() {
    if (!this.scene.anims.exists('idleSH')) {
      this.scene.anims.create({
        key: 'idleSH',
        frames: this.scene.anims.generateFrameNumbers('spawner', { start: 0, end: 1}),
        frameRate: 10,
        repeat: -1
      });
    }

    if (!this.scene.anims.exists('Spammer')) {
      this.scene.anims.create({
        key: 'Spammer',
        frames: this.scene.anims.generateFrameNumbers('spawner', { start: 2, end: 3 }),
        frameRate: 1,
        repeat: 0
      });
    }
  }

  getItem() {
    this.creado = false;
    return this.item;
  }
}
