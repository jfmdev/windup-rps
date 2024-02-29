import { getMaxLevel, Styles } from '../util/misc.js';
import { BackButton } from '../util/text_button';
import { LevelButton } from '../util/level_button';

export default class MainScene extends Phaser.Scene {
  constructor() {
    super('LevelsScene');
  }

  preload() {
    // Do nothing, all assets are loaded by main scene.
  }

  create() {
    // Add background.
    this.add.sprite(this.game.canvas.width/2, this.game.canvas.height/2, 'background-menu');

    // Set title.
    this.add.text(0, 0, "Select level", Styles.mainTitle);

    // Display level icons.
    let offsetY = -20;
    const maxLevel = getMaxLevel();
    for(var i=0; i<15; i++) {
        if(i%5 == 0) {offsetY += 120;}
        var offsetX = 64 + (i%5)*122;
        var disabled = (i+1) > maxLevel;
        new LevelButton(this, offsetX, offsetY, (i+1) + "", disabled, () => this.playLevel(i+1));
    }

    // Add back button.
    BackButton(this, "Go back");
  }

  playLevel(level: number) {
    this.scene.start('GameScene', { level });
  }
}
