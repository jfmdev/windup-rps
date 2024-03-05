import { Result, Round, Styles, throwToString } from './misc.js';

export class HistoryPanel {
  private container: Phaser.GameObjects.Container;
  private results: Phaser.GameObjects.Text[]; 
  private score: Phaser.GameObjects.Text;

  constructor(scene: Phaser.Scene, positionX: number, positionY: number) {
    // Define group.
    this.container = scene.add.container();
    this.container.setPosition(positionX, positionY);
    
    // Add title.
    this.score = scene.add.text(0, 0, "History", Styles.historyTitle);
    this.container.add(this.score);
    
    // Add results.
    this.results = [];
    for(let i=0; i<16; i++) {
      const text = scene.add.text(0, i*20 + 25, "", Styles.historyText);
      this.results.push(text);
      this.container.add(text);
    }
  }

  update(history: Round[]) {
    for(let i=0; i<this.results.length; i++) {
      if(i<history.length) {
        const round = history[(history.length-1) - i];
        this.results[i].setText(throwToString(round.player).charAt(0) + ' | ' + throwToString(round.robot).charAt(0));
        this.results[i].setFill(round.result === Result.DRAW ? "#ffffff" : round.result === Result.PLAYER_WON ? "#00ff00" : "#ff0000");
      } else {
        this.results[i].setText("");
      }
    }
  }
}
