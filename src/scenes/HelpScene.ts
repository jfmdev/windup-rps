import { Styles } from '../util/misc.js';
import { BackButton } from '../util/text_button';

export default class MainScene extends Phaser.Scene {
  constructor() {
    super('HelpScene');
  }

  preload() {
    // Do nothing, all assets are loaded by main scene.
  }

  create() {
    // Add background.
    this.add.sprite(this.game.canvas.width/2, this.game.canvas.height/2, 'background-menu');

    // Add title.
    this.add.text(this.game.canvas.width/2, 0, "Help", Styles.mainTitle);
    
    // Add instructions.
    const instructions = "You must play Rock Paper Scissors against a group of evil robots." +
        "\n" + "In order to make them acknowledge defeat, you must win 5 consecutive rounds." +
        "\n" + "This normally would be a difficult task, but these robots are not very smart, since they are powered by a wind up engine. After a few rounds you will be able to predict the robot's next movement." +
        "\n\n" + "As usual, Rock beats Scissors, Scissors beats Paper and Paper beats Rock.";
    this.add.text(10, 50, instructions, Styles.helpText);
    
    // Add back button.
    BackButton(this, "Go back");
  }
}