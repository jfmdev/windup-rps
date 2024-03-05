import { matchResult, Result, Styles, Throw, throwToString, VoidCallback } from './misc.js';

export class ResultPanel {
  private scene: Phaser.Scene;

  private container: Phaser.GameObjects.Container;
  private playerSprite: Phaser.GameObjects.Sprite | null = null;
  private robotSprite: Phaser.GameObjects.Sprite | null = null;
  private title: Phaser.GameObjects.Text;

  constructor(scene: Phaser.Scene, positionX: number, positionY: number) {
    this.scene = scene;
        
    // Define group (by default not visible).
    this.container = scene.add.container();
    this.container.setPosition(positionX, positionY);
    this.container.setAlpha(0);
        
    // Add label.
    this.title = scene.add.text(0, 0, "", Styles.subtitle);
    this.container.add(this.title);
  }

  hide() {
    // Fade out.
    this.scene.add.tween({
      targets: this.container,
      alpha: 0,
      duration: 400,
      ease: Phaser.Math.Easing.Linear,
      onComplete: () => {
        if(this.playerSprite) this.playerSprite.destroy();
        if(this.robotSprite) this.robotSprite.destroy();
      }
    });
  }

  display(playerThrow: Throw, robotThrow: Throw, callback: VoidCallback) {
    // Calculate winner.
    const result = matchResult(playerThrow, robotThrow);
    
    // Update title.  
    if(result === Result.DRAW) {
      this.title.setFill('#ffffff');
      this.title.setText("It's a draw!");
    } else if(result === Result.PLAYER_WON) {
      this.title.setFill('#00ff00');
      this.title.setText(throwToString(playerThrow) + " beats " + throwToString(robotThrow) + "!");
    } else {
      this.title.setFill('#ff0000');
      this.title.setText(throwToString(robotThrow) + " beats " + throwToString(playerThrow) + "!");
    }
  
    // Fade in.
    this.scene.add.tween({
      targets: this.container,
      alpha: 1,
      duration: 200,
      ease: Phaser.Math.Easing.Linear
    });
    
    // Animate element sprites and (when finished) invoke callback.
    this.animateIcons(result, throwToString(playerThrow).toLowerCase(), throwToString(robotThrow).toLowerCase(), callback)
  }

  animateIcons(result: Result, playerIcon: string, robotIcon: string, callback: VoidCallback) {
    // Add player and robot icons.
    this.playerSprite = this.scene.add.sprite(-150, 80, playerIcon);
    this.playerSprite.setOrigin(0.5, 0.5);
    this.container.add(this.playerSprite);
    
    this.robotSprite = this.scene.add.sprite(150, 80, robotIcon);
    this.robotSprite.setOrigin(0.5, 0.5);
    this.container.add(this.robotSprite);
    
    // Define animations.
    this.scene.add.tween({
      targets: this.playerSprite,
      x: -15,
      duration: 400,
      delay: 400,
      ease: Phaser.Math.Easing.Cubic.In,
      onComplete: () => {
        const newX = result === Result.DRAW ? -60 : result == Result.PLAYER_WON ? 30 : -150;
        this.scene.add.tween({
          targets: this.playerSprite,
          x: newX,
          duration: 400,
          ease: Phaser.Math.Easing.Cubic.Out
        });
      }
    });

    this.scene.add.tween({
      targets: this.robotSprite,
      x: 15,
      duration: 400,
      delay: 400,
      ease: Phaser.Math.Easing.Cubic.In,
      onComplete: () => {
        const newX = result === Result.DRAW ? 60 : result == Result.ROBOT_WON ? -30 : 150;
        this.scene.add.tween({
          targets: this.robotSprite,
          x: newX,
          duration: 400,
          ease: Phaser.Math.Easing.Cubic.Out
        });
      }
    })

    // Invoke callback.
    if(callback) setTimeout(callback, 1400);
  }
}
