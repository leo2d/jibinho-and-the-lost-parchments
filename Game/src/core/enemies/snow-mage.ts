import { Block } from './../block';
import { Enemy } from "../engine/enemy";
import { Hero } from "../hero";
import { Bug } from "./bug";
import config from "../../config";
import { GoogleFireAction } from '../actions/action';
import GameScene from 'src/scenes/game';
import { GameObjects } from 'phaser';

export class SnowMage extends Enemy<SnowMage> {

    public health: number;
    public animations: Phaser.GameObjects.Components.Animation;
    public healtBarAnimations: Phaser.GameObjects.Components.Animation;

    constructor(
        gameScene: Phaser.Scene,
        private hero: Hero) {
        super(gameScene);

        this.health = 4;

    }

    public create(x: number, y: number): SnowMage {
        super.create(x, y, 'snowmage')
            .withBlockColisor().withMass(1);

        // this.registerLoopSkill();
        this.addColliderWithHero();
        this.addColliderWithGoogleFire();


        return this;
    }

    private registerLoopSkill(): void {
        this.gameScene.time.addEvent({
            delay: 1500,
            callback: () => {
                const position = this.body.position;

                const bug = new Bug(this.gameScene, this.hero);
                bug.create(position.x, position.y);

                this.gameScene.physics.add.existing(bug.sprite, false);
                const googleBulletBody = bug.body as Phaser.Physics.Arcade.Body;
                googleBulletBody
                    .setAllowGravity(false)
                    .setCollideWorldBounds(true)
                    .setMass(10);

                this.gameScene.physics.moveToObject(bug.sprite, this.hero.sprite, 280)
            },
            loop: true
        });
    }
    private addColliderWithHero(): void {
        this.addOverlap(this.hero.sprite, (that, h) => {
            const heroSprite = h as Phaser.GameObjects.Sprite;
            const heroBody = heroSprite.body as Phaser.Physics.Arcade.Body;

            heroBody.x = config.heroPosition.x;
            heroBody.y = config.heroPosition.y;

            this.hero.decreaseLife();

        });
    }

    private addColliderWithGoogleFire(): void {
        const body = this.body;
        const googleFireGroup = GoogleFireAction.googleFireGroup;
        this.addOverlap(this.sprite, (that, g) => {
            const thatBody = that.body as Phaser.Physics.Arcade.Body;
            const googleFire = g as Phaser.GameObjects.Sprite;


            const googleFireBody = googleFire.body as Phaser.Physics.Arcade.Body;

            googleFire.update(this.decreaseLife());
            //thatBody.rotation = 95;

            that.update(this.decreaseLife());

            // this.gameScene.time.addEvent({
            //     delay: 0,
            //     repeat: 0,
            //     callback: () => {
            //         if (thatBody === body ) {
            //             this.decreaseLife()
            //         }
            //     }
            //     ,
            //     loop: false,
            // });
        });

        // this.addCollider();

    }

    public decreaseLife(): void {

        console.log("before => " + this.health);


        this.health = this.health - 1;

        console.log(this.health);

        if (this.health < 1) {
            this.sprite.destroy();
        }

        const game = this.gameScene.game.scene.getScene('Game') as GameScene;

        game.mageHealthBar.setTexture('enemyHealthBarWaring');
    }
}