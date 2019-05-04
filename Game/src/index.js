import Phaser from "phaser";
import config from "./config";
import GameScene from "./scenes/Game";
import GameOverScene from './scenes/game-over';

class Game extends Phaser.Game {
  constructor() {
    super(config);
    this.scene.add("Game", GameScene);
    this.scene.add("GameOver", GameOverScene);
    this.scene.start("Game");
  }
}

window.game = new Game();
