import { AUTO } from "phaser";
import assets from "../assets/assets";

export class Loader {    
    constructor(loadPlugin: Phaser.Loader.LoaderPlugin) {
       // loadPlugin.multiatlas('background-p1', 'src/assets/json/background-phase1.json', 'src/assets/images');

        loadPlugin.image("block", assets.imgBlock);
        loadPlugin.image("ground", assets.imgGround);
        loadPlugin.image("glogo", assets.glogo);
        loadPlugin.image("javalogo", assets.javalogo);
        loadPlugin.image("snowmage", assets.snowmage);
        loadPlugin.image("bug", assets.bug);
        loadPlugin.image("bg", assets.bg);
        loadPlugin.image("gameOver", assets.gameOver);
        loadPlugin.image("main", assets.main);
        loadPlugin.image("heart", assets.heart);

        loadPlugin.atlas('player-walking', 'src/assets/images/walk.png', 'src/assets/json/walk.json');

    }
}