export default class Flor {
  constructor(scene, x, y, texture, sizeX, sizeY) {
    this.scene = scene;

    // Crear sprite con física Arcade
    this.sprite = scene.physics.add.staticImage(x, y, texture);

    // Ajustar escala y rotación
    this.sprite.setScale(sizeX, sizeY);
    this.sprite.refreshBody();
  }
}