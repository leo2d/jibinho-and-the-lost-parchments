
import { Hero } from "../hero";
import { Bug } from "./bug";
import Mage from './mage';

export class FireMage extends Mage<FireMage> {

    constructor(
        gameScene: Phaser.Scene,
        hero: Hero) {
        super(gameScene, hero);

    }

    public create(x: number, y: number): FireMage {
        super.create(x, y, 'firemage');

       // this.registerLoopSkill();

        return this;
    }

    public registerLoopSkill(): void {
        this.loopEvent = this.gameScene.time.addEvent({
            delay: 1500,
            callback: () => {

                console.log("skill 1- mamao")

                // const position = this.body.position;

                // const bug = new Bug(this.gameScene, this.hero);
                // bug.create(position.x, position.y);

                // this.gameScene.physics.add.existing(bug.sprite, false);
                // const bugBody = bug.body as Phaser.Physics.Arcade.Body;
                // bugBody
                //     .setAllowGravity(false)
                //     .setCollideWorldBounds(true)
                //     .setMass(10);

                // this.gameScene.physics.moveToObject(bug.sprite, this.hero.sprite, 280)
            },
            loop: true
        });
    }

    public registerLoopSkillDie(): void {
        this.loopEvent = this.gameScene.time.addEvent({
            delay: 1500,
            callback: () => {

                console.log("skill 2- batata")
                // const position = this.body.position;

                // const bug = new Bug(this.gameScene, this.hero);
                // bug.create(position.x, position.y);

                // this.gameScene.physics.add.existing(bug.sprite, false);
                // const bugBody = bug.body as Phaser.Physics.Arcade.Body;
                // bugBody
                //     .setAllowGravity(false)
                //     .setCollideWorldBounds(true)
                //     .setMass(10);

                // this.gameScene.physics.moveToObject(bug.sprite, this.hero.sprite, 280)
            },
            loop: true
        });
    }
}