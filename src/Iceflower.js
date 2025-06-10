import Item from './Item.js';
import IceBall from './Iceball.js';

export default class IceFlower extends Item {
  constructor(scene, x, y, texture = 'iceflower', shooter) {
    super(scene, x, y, texture);

    this.shooter = shooter; 
  }

  accion() {

    const direction = this.shooter.flipX ? -1 : 1;

 
    const x = this.shooter.x + direction * 20;
    const y = this.shooter.y;

    const iceball = new IceBall(this.scene, x, y, 'iceball', direction);


    this.scene.add.existing(iceball);
    this.scene.physics.add.existing(iceball);


    if (!this.scene.iceballs) this.scene.iceballs = [];
    this.scene.iceballs.push(iceball);
  }
}
