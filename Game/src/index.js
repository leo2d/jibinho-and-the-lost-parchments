import Phaser from "phaser";
import config from "./config";
import GameOverScene from './scenes/game-over';
import MainScreenScene from './scenes/main';
import TutorialScene from './scenes/tutorial';
import FirstStage from './scenes/stages/first-stage-game';
import SecondStage from './scenes/stages/second-stage-game';
import ThirdStage from './scenes/stages/third-stage-game';
import FirstStageEnd from './scenes/ends/first-stage-end';
import SecondStageEnd from './scenes/ends/second-stage-end';
import EndGame from './scenes/ends/end-game';
import CreditsScene from './scenes/credits';
import IntroScene from './scenes/intro';

class Game extends Phaser.Game {
  constructor() {
    super(config);
    this.scene.add("Main", MainScreenScene);
    this.scene.add("Tutorial", TutorialScene);
    this.scene.add("GameOver", GameOverScene);

    this.scene.add("FirstStage", FirstStage);
    this.scene.add("SecondStage", SecondStage);
    this.scene.add("ThirdStage", ThirdStage);
    this.scene.add("FirstStageEnd", FirstStageEnd);
    this.scene.add("SecondStageEnd", SecondStageEnd);
    this.scene.add("CreditsScene", CreditsScene);
    this.scene.add("EndGame", EndGame);
    this.scene.add("Intro", IntroScene);

    
    this.scene.start("Main");
    //  this.scene.start("CreditsScene");
  }
}

window.game = new Game();
