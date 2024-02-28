import Phaser from "phaser";

import GameScene from "./scenes/GameScene";
import HelpScene from "./scenes/HelpScene";
import IntroScene from "./scenes/IntroScene";
import LevelsScene from "./scenes/LevelsScene";
import MenuScene from "./scenes/MenuScene";
import PreloadScene from "./scenes/PreloadScene";

import { GAME_HEIGHT, GAME_WIDTH } from "./util/misc";

const config: Phaser.Types.Core.GameConfig = {
  parent: "app",
  type: Phaser.AUTO,
  width: GAME_WIDTH,
  height: GAME_HEIGHT,
  scale: {
    mode: Phaser.Scale.ScaleModes.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
  },
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 200, x: 0 }
    }
  },
  scene: [
    PreloadScene,
    IntroScene,
    MenuScene,
    HelpScene,
    LevelsScene,
    GameScene
  ]
};

export default new Phaser.Game(config);
