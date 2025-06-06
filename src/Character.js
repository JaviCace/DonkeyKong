// Player.js
import Entity from './Entity.js';

export default class Character extends Entity 
{
  constructor(scene, x, y) 
  {
    // Usa la textura 'player' por defecto
    super(scene, x, y, 'player');

    this.speed = 0;
    this.jump = 0;

  }
  move(){}
  setAnimation(){}
  update(){}
}
