import { Styles, Throw } from './misc.js';

export class ChoosePanel {
  private scene: Phaser.Scene;

  private callback: Function;
  private container: Phaser.GameObjects.Container;
  private arrayOptions: Phaser.GameObjects.Sprite[];

  constructor(scene: Phaser.Scene, positionX: number, positionY: number, callback: Function) {
    this.scene = scene;
    this.callback = callback;
    
    // Define group.
    this.container = scene.add.container();
    this.container.setPosition(positionX, positionY);
        
    // Add label.
    const textChoose = scene.add.text(0, 0, "Choose a throw", Styles.commonLabel);
    this.container.add(textChoose);
        
    // Create option sprites.
    this.arrayOptions = [
      scene.add.sprite(-90, 90, 'rock'),
      scene.add.sprite(  0, 90, 'paper'),
      scene.add.sprite( 90, 90, 'scissors')
    ];
        
    // Initialize option sprites.
    for(let i=0; i<this.arrayOptions.length; i++) {
      const sprite = this.arrayOptions[i];
    
      // Set anchor and add to group.
      sprite.setOrigin(0.5, 0.5);
      this.container.add(sprite);
        
      // Define mouse events.
      sprite
        .setInteractive({ useHandCursor: true })
        .on('pointerdown', () => this.onInputDownSprite(sprite))        
            
        // Rotate sprites.
      scene.add.tween({
        targets: sprite,
        angle: 360,
        duration: 1600,
        repeat: true,
        ease: Phaser.Math.Easing.Linear,
      });      
    }
  }

  onInputDownSprite(sprite: Phaser.GameObjects.Sprite) {
    // Verify that the panel is not disabled and that callback is defined.
    if(this.container.alpha > 0 && this.callback) {
      let value = Throw.ROCK;
      if(sprite.texture.key == 'paper') { value = Throw.PAPER; }
      if(sprite.texture.key == 'scissors') { value = Throw.SCISSORS; }
      
      this.callback(value);
    }
  }

  disable() {
    // Fade out.
    this.scene.add.tween({
      targets: this.container,
      alpha: 0,
      duration: 200,
      ease: Phaser.Math.Easing.Linear
    });
  }

  enable() {
    // Fade in.
    this.scene.add.tween({
      targets: this.container,
      alpha: 1,
      duration: 200,
      ease: Phaser.Math.Easing.Linear
    });
  }
}
