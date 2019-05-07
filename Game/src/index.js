import Phaser from "phaser";
import config from "./config";
import GameScene from "./scenes/Game";
import GameOverScene from './scenes/game-over';
import MainScreenScene from './scenes/main';
import TutorialScene from './scenes/tutorial';

class Game extends Phaser.Game {
  constructor() {
    super(config);
    this.scene.add("Game", GameScene);
    this.scene.add("GameOver", GameOverScene);
    this.scene.add("Main", MainScreenScene);
    this.scene.add("Tutorial", TutorialScene);
    //this.scene.start("Game");
     this.scene.start("Main");
  }
}

window.game = new Game();
