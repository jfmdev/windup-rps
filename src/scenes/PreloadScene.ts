
export default class PreloadScene extends Phaser.Scene {
  constructor() {
    super('PreloadScene');
  }

  preload() {
    // Do nothing, resources will be loaded on 'create'.
  }

  create() {
    // Show loading message.
    this.add.text(this.game.canvas.width/2, this.game.canvas.height/2, "Loading...");

    // Load all images/sprites and then redirect to introduction scene.
    this.load.image('background-intro', 'assets/background-intro.jpg');
    this.load.image('background-menu', 'assets/background-menu.jpg');
    this.load.image('background-game', 'assets/background-game.jpg');

    this.load.image('rock', 'assets/rock.png');
    this.load.image('paper', 'assets/sheet.png');
    this.load.image('scissors', 'assets/cut.png');

    this.load.image('robot-1', 'assets/robot-1.png');
    this.load.image('robot-2', 'assets/robot-2.png');
    this.load.image('robot-3', 'assets/robot-3.png');
    this.load.image('robot-4', 'assets/robot-4.png');
    this.load.spritesheet('robot-arm', 'assets/robot-arm-1.png', { frameWidth: 100, frameHeight: 30 });
    this.load.spritesheet('windup-key', 'assets/key.png', { frameWidth: 80, frameHeight: 80 })
    this.load.image('mannequin', 'assets/mannequin.png');
    this.load.spritesheet('mannequin-arm', 'assets/mannequin-arm.png', { frameWidth: 90, frameHeight: 16 });

    this.load.image('logotipo', 'assets/logotipo.png');
    this.load.spritesheet('button-start', 'assets/button-start.png', { frameWidth: 100, frameHeight: 52 })
    this.load.spritesheet('level', 'assets/level.png', { frameWidth: 96, frameHeight: 96 });

    this.load.on('complete', ()=>{
      this.scene.start('IntroScene')
    });
    this.load.start();
  }
}