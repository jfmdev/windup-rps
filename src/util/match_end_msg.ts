import { TextButton } from './buttons.js';
import { Result, Styles, VoidCallback } from './misc.js';

export class MatchEndMessage {
  private scene: Phaser.Scene;

  private container: Phaser.GameObjects.Container;

  private back: TextButton;
  private message: Phaser.GameObjects.Text;
  private next: TextButton;

  constructor(scene: Phaser.Scene, positionX: number, positionY: number, result: Result, callback: VoidCallback) {
    this.scene = scene;
  
    // Define group.
    this.container = scene.add.container();
    this.container.setPosition(positionX, positionY);
    
    // Add label.
    this.message = scene.add.text(0, 0, result? "You win" : "You lose", Styles.mainTitle);
    this.message.setFill(result === Result.PLAYER_WON ? "#0F0" : "#F00");
    this.message.setOrigin(0.5, 0);
    this.container.add(this.message);

    // Add buttons.
    this.back = new TextButton(scene, -75, 75, "Back", Styles.boldLabel, () => scene.scene.start('MenuScene'));
    this.back.text.setFill("#F7F"); 
    this.back.text.setOrigin(0.5, 0);
    this.container.add(this.back.text);

    this.next = new TextButton(scene, 75, 75, result === Result.PLAYER_WON ? "Next" : "Retry", Styles.boldLabel, () => callback());
    this.next.text.setFill("#77F");  
    this.next.text.setOrigin(0.5, 0);
    this.container.add(this.next.text);
 
    // Hidden by default.
    this.container.setAlpha(0);
  }

  hide() {
    // Fade out.
    this.scene.add.tween({
      targets: this.container,
      alpha: 0,
      duration: 200,
      ease: Phaser.Math.Easing.Linear
    });
  }

  show() {
    // Init.
    this.back.text.setAlpha(0);
    this.next.text.setAlpha(0);    
    this.message.setAlpha(0);
    this.container.setAlpha(1);
  
    // Fade in.
    this.scene.add.tween({
      targets: this.message,
      alpha: 1,
      duration: 400,
      ease: Phaser.Math.Easing.Linear,
      onComplete: () => {
        this.back.text.setAlpha(1);
        this.next.text.setAlpha(1);    
      }
    });
  }
}
