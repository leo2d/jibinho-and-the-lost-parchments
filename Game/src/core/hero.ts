import { AUTO } from "phaser";
import config from "../config";
import { get } from "https";
import GameScene from "src/scenes/game";
import IStage from "src/scenes/IStage";

export class Hero {

    public sprite: Phaser.GameObjects.Sprite;
    public body: Phaser.Physics.Arcade.Body;
    public speed: number;
    public jumpSpeed: number;
    public animations: Phaser.GameObjects.Components.Animation;
    public lifes: number;
    public hasKey: boolean;

    public lookingAt: 'back' | 'front';

    constructor(public _gameScene: Phaser.Scene) {
        this.lookingAt = 'front';

        this.lifes = 3;
        this.hasKey = false;
        
        const gamePhysics = this._gameScene.physics;

        this.speed = 150;
        this.jumpSpeed = -600;

        this.sprite = _gameScene.add.sprite(config.heroPosition.x, config.heroPosition.y, 'player-walking');
        gamePhysics.add.existing(this.sprite);

        this.body = this.sprite.body as Phaser.Physics.Arcade.Body;
        this.animations = this.sprite.anims;

        this.body.collideWorldBounds = true;
    }

    public decreaseLife(): void {
        this.lifes = this.lifes - 1;

        const scene = this._gameScene as unknown as IStage;

        if (this.lifes < 1) {
            this._gameScene.game.scene.switch(scene.getStageName(), 'GameOver');
        }

        if (scene.hearts.length > 0 && this.lifes > 0) {
            let heart = scene.hearts[this.lifes];
            heart.destroy();
        }
    }
}