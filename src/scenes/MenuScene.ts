import { Styles } from '../util/misc.js'; 

export default class MainScene extends Phaser.Scene {
  constructor() {
    super('MenuScene');
  }

  preload() {
    // Do nothing, all assets are loaded by preload scene.
  }

  create() {
    // Add background.
    this.add.sprite(this.game.canvas.width/2, this.game.canvas.height/2, 'background-menu');

    // Define labels and actions for menu buttons.
    const buttons = [
      { label: "Play", action: this.play.bind(this) },
      { label: "Quick match", action: this.quickMatch.bind(this) },
      { label: "How to play", action: this.howToPlay.bind(this) }
    ];

    // Define event handlers for menu buttons.
    const mainColor = "#ffffff";
    const secondaryColor = "#000000";
    const onInputOverText = (text: Phaser.GameObjects.Text) => {
      const myStyle = text.style;
      myStyle.setStroke(mainColor, 1);
      myStyle.setFill(secondaryColor);
      text.setStyle(myStyle);
      this.game.canvas.style.cursor = "pointer";
    };
    const onInputOutText = (text: Phaser.GameObjects.Text) => {
      const myStyle = text.style;
      myStyle.setStroke(secondaryColor, 1);
      myStyle.setFill(mainColor);
      text.setStyle(myStyle);
      this.game.canvas.style.cursor = "default";
    };

    // Create menu buttons.
    for(let i=0; i<buttons.length; i++) {
      const button = buttons[i];
      const positionX = this.game.canvas.width/2;
      const positionY = this.game.canvas.height/2 - 150 + i*100;
      const myText = this.add.text(positionX, positionY, button.label, Styles.menuLabel);
      myText.setOrigin(0.5, 0.5);

      const rectWidth = 0.6 * this.game.canvas.width;
      myText.setInteractive(
        new Phaser.Geom.Rectangle((myText.width - rectWidth)/2, -10, rectWidth, myText.height + 20),
        Phaser.Geom.Rectangle.Contains
      );

      myText.on('pointerdown', () => button.action());
      myText.on('pointerover', () => onInputOverText(myText) );
      myText.on('pointerout', () => onInputOutText(myText) );
    }

    // Create fullscreen button.
    const fullscreenButton = this.add.text(this.game.canvas.width-140, this.game.canvas.height-50, "Fullscreen", Styles.boldLabel);
    fullscreenButton.setInteractive(
      new Phaser.Geom.Rectangle(-10, -10, fullscreenButton.width + 20, fullscreenButton.height + 20),
      Phaser.Geom.Rectangle.Contains
    );
    fullscreenButton.on('pointerdown', () => this.goFullScreen());
    fullscreenButton.on('pointerover', () => onInputOverText(fullscreenButton) );
    fullscreenButton.on('pointerout', () => onInputOutText(fullscreenButton) );
  }

  goFullScreen() {
    if(this.scale.isFullscreen) {
      this.scale.stopFullscreen();
    } else {
      this.scale.startFullscreen();
    }
  }

  play() {
    this.scene.start('LevelsScene');
  }

  quickMatch() {
    this.scene.start('GameScene');
  }

  howToPlay() {
    this.scene.start('HelpScene');
  }
}