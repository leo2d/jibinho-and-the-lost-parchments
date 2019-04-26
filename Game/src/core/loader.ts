import { AUTO } from "phaser";
import assets from "../assets/assets";

export class Loader {    
    constructor(loadPlugin: Phaser.Loader.LoaderPlugin) {
        loadPlugin.multiatlas('background-p1', 'src/assets/json/background-phase1.json', 'src/assets/images');
        
        loadPlugin.image("barrel", assets.imgBarrel);
        loadPlugin.image("block", assets.imgBlock);
        loadPlugin.image("goal", assets.imgGoal);
        loadPlugin.image("ground", assets.imgGround);
        loadPlugin.image("glogo", assets.glogo);
        loadPlugin.image("javalogo", assets.javalogo);
        loadPlugin.image("snowmage", assets.snowmage);
        loadPlugin.image("bug", assets.bug);

        // loadPlugin.spritesheet("player", assets.spritesheetPlayer, {
        //     frameWidth: 28, 
        //     frameHeight: 30, 
        //     margin: 1, 
        //     spacing: 1
        // });

        loadPlugin.spritesheet("fire", assets.spritesheetFire, {
            frameWidth: 20,
            frameHeight: 21,
            margin: 1,
            spacing: 1
        }); 
        
        loadPlugin.atlas('player-walking', 'src/assets/images/walk.png', 'src/assets/json/walk.json');

    }
}