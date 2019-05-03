import Phaser from "phaser";
import config from "./config";
import GameScene from "./scenes/Game";

class Game extends Phaser.Game {
  constructor() {
    super(config);
    this.scene.add("Game", GameScene);
    this.scene.start("Game");
  }
}

window.game = new Game();
