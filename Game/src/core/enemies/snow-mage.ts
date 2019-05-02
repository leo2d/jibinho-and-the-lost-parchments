import { Block } from './../block';
import { Enemy } from "../engine/enemy";
import { Hero } from "../hero";
import { Bug } from "./bug";

export class SnowMage extends Enemy<SnowMage> {

    constructor(
        gameScene: Phaser.Scene,
        private hero: Hero) {
        super(gameScene);
    }

    public create(x: number, y: number): SnowMage {
        super.create(x, y, 'snowmage')
            .withBlockColisor().withMass(1);

        this.registerLoopSkill();

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
}