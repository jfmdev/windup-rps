import { TextButton } from '../util/buttons.js';
import { Styles, Throw } from '../util/misc.js';
import { Mannequin, Robot } from '../util/figures.js';

export default class MainScene extends Phaser.Scene {
  private level: number = 0;
  private scoreToWin: number = 5;

  private history: Array<object> = [];

  private levelLabel: Phaser.GameObjects.Text | null = null;
  private scoreLabel: Phaser.GameObjects.Text | null = null;

  private mannequin: Mannequin | null = null;
  private robot: Robot | null = null;

  constructor() {
    super('GameScene');
  }

  preload() {
    // Do nothing, all assets are loaded by main scene.
  }

  init(level: number) {
    // Initialize level (-1 for a quickmatch).
    this.level = level ? level : -1;

    // Define the score need for win.
    this.scoreToWin = 5;
  }

  create() {
    // Add background.
    this.add.sprite(this.game.canvas.width/2, this.game.canvas.height/2, 'background-menu');

    // Initialize history and game AI.
    this.history = [];
    // this.gameAI = GameAI.getLevel(this.level);
    // this.gameAI.setHistory(this.history);

    // Add robot and mannequin.
    this.robot = new Robot(this, this.level);
    this.robot.rotateKey(true);
    this.mannequin = new Mannequin(this);

    // Add choose, result and history panels.
    // this.choosePanel = new ChoosePanel(game, {'x': Shared.world.centerX, 'y': Shared.world.centerY + 100}, this.onPlayerChoosed.bind(this));
    // this.resultPanel = new ResultPanel(game, {'x': Shared.world.centerX, 'y': 10});
    // this.historyPanel = new HistoryPanel(game, {'x': Shared.world.width - 100, 'y': 20});

    // Add score label.
    this.scoreLabel = this.add.text(this.game.canvas.width-120, this.game.canvas.height-50, "Score:  0", Styles.boldLabel);
    // this.scoreLabel.setTextBounds(0, 0, 120, 50);

    // Add level label.
    const levelText = this.level > 0? ("Level: " + this.level) : "Quickmatch";
    this.levelLabel = this.add.text(20, 20, levelText, Styles.levelLabel);
    // this.levelLabel.setTextBounds(0, 0, 100, 20);        

    // Add back button.
    TextButton.backButton(this, "Return");
  }

  onPlayerChoosed(playerThrow: Throw) {
    //     // Disable choosing panel.
    //     this.choosePanel.disable();

    //     // User IA for select robot hand.
    //     var robotThrow = this.gameAI.next();

    // Animate arms and (when finished) display round result.
    // this.robot?.animateArm(2, robotThrow, this.displayRoundResult.bind(this, playerThrow, robotThrow));
    this.mannequin?.animateArm(2, playerThrow);
  }

  displayRoundResult(playerThrow: Throw, robotThrow: Throw) {
    //     // Add new entry to history (limiting number of elements to 25).
    //     var result = Shared.matchResult(playerThrow, robotThrow);
    //     this.history.push({'player': playerThrow, 'robot': robotThrow, 'result': result});
    //     if(this.history.length > 25) { this.history.shift(); }

    //     // Send new history to history panel and game AI.
    //     this.historyPanel.update(this.history);

    //     // Update score label.
    //     var score = Shared.getScore(this.history);
    //     this.scoreLabel.text = 'Score: ' + (score<0? '' : ' ') + score;

    //     // Display result animation and (when finished) start next round.
    //     this.resultPanel.display(playerThrow, robotThrow, this.nextRound.bind(this));
  }

  nextRound() {
    //     // Hide panel.
    //     this.resultPanel.hide();

    //     // Verify if the match as ended.
    //     var score = Shared.getScore(this.history);
    //     if(score >= this.scoreToWin || score <= -this.scoreToWin) {
    //         // Stop animations.
    //         this.robot.rotateKey(false);

    //         // Calculate next level.
    //         var nextLevel = (score >= this.scoreToWin && this.level > 0)? (this.level+1) : this.level;

    //         // Update max level reached.
    //         Shared.updateMaxLevel(nextLevel);

    //         // Display match result.
    //         var message = new MatchEndMessage(game, {x: 270, y: 150}, score > 0, function() { 
    //             // If the user cleared all levels, then return to menu.
    //             if(nextLevel > 15) {
    //                 this.game.state.start('levels');
    //             } else {
    //                 this.game.state.start('game', true, false, nextLevel);
    //             }
    //         }.bind(this));
    //         message.show();
    //     } else {
    //         // Enable choosing panel.
    //         this.choosePanel.enable();
    //     }
  }
}