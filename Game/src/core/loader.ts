import { AUTO } from "phaser";
import assets from "../assets/assets";

export class Loader {    
    constructor(loadPlugin: Phaser.Loader.LoaderPlugin) {
       // loadPlugin.multiatlas('background-p1', 'src/assets/json/background-phase1.json', 'src/assets/images');

        loadPlugin.image("iceBlock", assets.iceBlock);
        loadPlugin.image("stoneBlock", assets.stoneBlock);
        loadPlugin.image("snowGround", assets.snowGround);
        loadPlugin.image("stoneGround", assets.stoneGround);
        loadPlugin.image("glogo", assets.glogo);
        loadPlugin.image("javalogo", assets.javalogo);
        loadPlugin.image("csharplogo", assets.csharplogo);
        loadPlugin.image("snowmage", assets.snowmage);
        loadPlugin.image("thundermage", assets.thundermage);
        loadPlugin.image("bug", assets.bug);
        loadPlugin.image("stage2Bg", assets.stage2Bg);
        loadPlugin.image("stage1Bg", assets.stage1Bg);
        loadPlugin.image("firstStageEnd", assets.firstStageEnd);
        loadPlugin.image("gameOver", assets.gameOver);
        loadPlugin.image("main", assets.main);
        loadPlugin.image("heart", assets.heart);
        loadPlugin.image("tutorialBg", assets.tutorialBg);
        loadPlugin.image("portalClosed", assets.portalClosed);
        loadPlugin.image("portalOpen", assets.portalOpen);
        loadPlugin.image("enemyHealthBarDanger", assets.enemyHealthBarDanger);
        loadPlugin.image("enemyHealthBarCaution", assets.enemyHealthBarCaution);
        loadPlugin.image("enemyHealthBarWaring", assets.enemyHealthBarWaring);
        loadPlugin.image("enemyHealthBarFine", assets.enemyHealthBarFine);
        loadPlugin.image("stage1Parchment", assets.stage1Parchment);

        loadPlugin.atlas('player-walking', 'src/assets/images/hero/walk.png', 'src/assets/json/walk.json');

    }
}