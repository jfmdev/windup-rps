import { changeCursor, Styles } from './misc.js';

export class TextButton {
  private text: Phaser.GameObjects.Text;

  constructor(scene: Phaser.Scene, positionX: number, positionY: number, label: string, style: object, clickHandler: Function) {
    this.text = scene.add.text(positionX, positionY, label, style);

    this.text.setInteractive(
      new Phaser.Geom.Rectangle(-20, -10, this.text.width + 40, this.text.height + 20),
      Phaser.Geom.Rectangle.Contains
    );

    this.text.on('pointerdown', () => clickHandler());
    this.text.on('pointerover', () => changeCursor.onInputOver(scene) );
    this.text.on('pointerout', () => changeCursor.onInputOut(scene) );
  }
}

export function BackButton(scene: Phaser.Scene, label: string) {
  return new TextButton(
    scene,
    0,
    scene.game.canvas.height - 50,
    label,
    Styles.boldLabel,
    () => scene.scene.start('MenuScene')
  ); 
}
