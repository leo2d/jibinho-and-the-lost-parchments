import { AUTO } from "phaser";
import config from "../config";

export class Hero {

    public sprite: Phaser.GameObjects.Sprite;
    public body: Phaser.Physics.Arcade.Body;
    public speed: number;
    public jumpSpeed: number;
    public animations: Phaser.GameObjects.Components.Animation;
    public life: number;

    public lookingAt: 'back' | 'front';

    constructor(public _gameScene: Phaser.Scene) {
        this.lookingAt = 'front';

        this.life = 3;

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
        this.life = this.life - 1;

        if (this.life < 1) {

            this.life = 3;

            //debugger;
            // this._gameScene.game.scene.start('GameOver');
            // this._gameScene.game.scene.sleep('Game');

            this._gameScene.game.scene.switch('Game', 'GameOver');

        }
    }
}