import Item from './Item.js';

export default class Hammer extends Item {
  constructor(scene, x, y, texture = 'hammer', owner) {
    super(scene, x, y, texture);

    this.owner = owner; // Quién usa el martillo (ej: jugador)
    this.originalScale = { x: this.sprite.scaleX, y: this.sprite.scaleY };
    this.originalPosition = { x: this.sprite.x, y: this.sprite.y };

    this.isActing = false;
  }

  accion() {
    if (this.isActing) return;

    this.isActing = true;

    // Guardar posición original
    const { x, y } = this.sprite;
    const dir = this.owner.flipX ? -1 : 1;

    // Agrandar visualmente
    this.sprite.setScale(this.originalScale.x * 1.5, this.originalScale.y * 1.5);

    // Opcional: agrandar físicamente también
    const body = this.sprite.body;
    if (body) {
      body.setSize(body.width * 1.5, body.height * 1.5, true);
    }

    // Avanzar un poco hacia adelante
    this.sprite.x += dir * 30;

    // Después de 300ms volver al tamaño/posición original
    this.scene.time.delayedCall(300, () => {
      this.sprite.setScale(this.originalScale.x, this.originalScale.y);
      this.sprite.setPosition(x, y);

      // Restaurar hitbox
      if (body) {
        body.setSize(body.width / 1.5, body.height / 1.5, true);
      }

      this.isActing = false;
    });
  }
}
