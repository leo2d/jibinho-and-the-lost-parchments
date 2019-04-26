import { AUTO } from "phaser";

export class Animation {  
    
    constructor(public _gameScene: Phaser.Scene) {
        this._gameScene.anims.create({
            key: 'walking',
            frames: this._gameScene.anims.generateFrameNames("player", {
                prefix: 'Idle (1).png',
                frames: true
            }),
            frameRate: 12,
            yoyo: true,
            repeat: -1
        });
    }
}