import { Styles } from '../util/misc.js';

export class LevelButton {
  private disabled: boolean;
  private clickHandler: Function;
  
  private back: Phaser.GameObjects.Sprite;
  private group: Phaser.GameObjects.Group;
  private label: Phaser.GameObjects.Text;

  constructor(game: Phaser.Scene, positionX: number, positionY: number, text: string, disabled: boolean, clickHandler: Function) {
    this.disabled = disabled;
    this.clickHandler = clickHandler;

    // Define group.
    this.group = game.add.group();
    
    // Define background.
    this.back = game.add.sprite(positionX, positionY, 'level');
    this.group.add(this.back);
    if(disabled) {
      this.back.setFrame(2);
    }

    // Create text object and define bounds.
    this.label = game.add.text(positionX, positionY, text, Styles.mainTitle);
    this.label.setOrigin(0.5, 0.5);
    this.group.add(this.label);
    if(disabled) {
      const myStyle = this.label.style;
      myStyle.setFill("#666");
      this.label.setStyle(myStyle);      
    }
    
    // Enable and handle mouse events.
    this.back
      .setInteractive({ useHandCursor: true })
      .on('pointerdown', () => this.onInputDown())
      .on('pointerover', () => this.onInputOver())
      .on('pointerout', () => this.onInputOut())
  }

  onInputOver() {
    if(!this.disabled) {
      const myStyle = this.label.style;
      myStyle.setFill("#CFA");
      this.label.setStyle(myStyle);
      this.back.setFrame(1);
    }
  }

  onInputOut() {
    if(!this.disabled) {
      const myStyle = this.label.style;
      myStyle.setFill("#FFF");
      this.label.setStyle(myStyle);
      this.back.setFrame(0);
    }
  }

  onInputDown() {
    if(!this.disabled && this.clickHandler) {
      this.clickHandler(this);
    }
  }
}
