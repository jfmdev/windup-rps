import { GAME_HEIGHT, GAME_WIDTH } from "../util/misc";

export default class IntroScene extends Phaser.Scene {

  private group: Phaser.GameObjects.Group | null = null;

  constructor() {
    super('IntroScene');
  }

  preload() {
    // Do nothing, all assets are loaded by main scene.
  }

  create() {
    const centerX = this.game.canvas.width/2;
    const centerY = this.game.canvas.height/2;

    // Add background.
    this.add.sprite(centerX, centerY, 'background-intro');

    // Add bouncing icons.
    const icons = [
      this.add.sprite(centerX, centerY, 'rock'),
      this.add.sprite(centerX, centerY, 'paper'),
      this.add.sprite(centerX, centerY, 'scissors')
    ];
    for(let i=0; i<icons.length; i++) {
      const icon = icons[i];
      icon.setOrigin(0.5, 0.5);		
      this.bounceIcon(icon);
    }
    
    // Add isotype.
    const logo = this.add.sprite(centerX, centerY, 'logotipo');
    
    // Add button.
    const startButton = this.add.sprite(centerX, centerY + 125, 'button-start');
    startButton
      .setInteractive({ useHandCursor: true })
      .on('pointerdown', this.start.bind(this))
      .on('pointerover', () => startButton.setFrame(1) )
      .on('pointerout', () => startButton.setFrame(0) )
  
    // Define group.
    this.group = this.add.group();
    for(let i=0; i<icons.length; i++) {
      this.group.add(icons[i]);
    }
    this.group.add(logo);
    this.group.add(startButton);
  }

  start() {
    if(this.group !== null) {
      this.tweens.add({ 
        targets: this.group.getChildren(),
        alpha: 0,
        duration: 600,
        onComplete: () => {
          this.scene.start('MenuScene');
        }
      });
    }
  }

  update() {
    // Do nothing.
  }

  bounceIcon(icon: Phaser.GameObjects.Sprite, destX = -1, destY = -1) {
    const minX = icon.width/2;
    const maxX = GAME_WIDTH - icon.width/2;
    const minY = icon.height/2;
    const maxY = GAME_HEIGHT - icon.height/2;
    
    // Validate parameters.
    if(destX === -1 || destY === -1) {
      const seed = Math.floor(4*Math.random());
      if(seed == 0 || seed == 2) {
        destX = (seed == 0)? minX : maxX;
        destY = Math.floor((maxY - minY) * Math.random() + minY);
      } else {
        destX = Math.floor((maxX - minX) * Math.random() + minX);
        destY = (seed == 1)? minY : maxY;
      }
    }
    
    // Calculate duration.
    const sourceX = icon.x;
    const sourceY = icon.y;
    const distance = Math.sqrt( (destX-sourceX)*(destX-sourceX) + (destY-sourceY)*(destY-sourceY) );
    const duration = Math.floor(distance*5);

    // Trigger animation.
    this.tweens.add({
      targets: icon,
      x: destX,
      y: destY,
      duration,
      ease: Phaser.Math.Easing.Linear,
      onComplete: () => {
        // Calculate new direction (y = m*x + y0).
        let m = -(destY-sourceY)/(destX-sourceX);
        if(isNaN(m) || m == 0) {
          m = 1;
        }
        const y0 = destY - m*destX;
        
        // Calculate intersection points.
        const points = [
            {x: minX, y: Math.floor(m*minX + y0)},
            {x: maxX, y: Math.floor(m*maxX + y0)},
            {x: Math.floor((minY - y0)/m), y: minY},
            {x: Math.floor((maxY - y0)/m), y: maxY}
        ];
        
        // Get next point.
        let newDestX = sourceX;
        let newDestY = sourceY;
        for(let i=0; i<points.length; i++) {
            const p = points[i];
            if(p.x >= minX && p.x <= maxX && p.y >= minY && p.y <= maxY && (Math.abs(p.x - destX) > 1 || Math.abs(p.y - destY) > 1)) {
                newDestX = p.x;
                newDestY = p.y;
            } 
        }
        
        // Trigger next animation.
        this.bounceIcon(icon, newDestX, newDestY); 
       }
    });
  }
}