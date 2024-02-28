
export default class MainScene extends Phaser.Scene {
  constructor() {
    super('HelpScene');
  }

  preload() {
    // Do nothing, all assets are loaded by main scene.
  }

  create() {
    this.add.text(this.game.canvas.width/2, this.game.canvas.height/2, "TO DO");
  }
}