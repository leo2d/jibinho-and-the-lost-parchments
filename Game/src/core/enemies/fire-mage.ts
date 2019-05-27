
import { Hero } from "../hero";
import { Bug } from "./bug";
import Mage from './mage';
import { Hitfilm } from './hitfilm';

export class FireMage extends Mage<FireMage> {

    constructor(
       public gameScene: Phaser.Scene,
       public  hero: Hero) {
        super(gameScene, hero);

    }

    public create(x: number, y: number): FireMage {
        super.create(x, y, 'firemage');

        // this.registerLoopSkill();

        return this;
    }

    public registerLoopSkill(): void {
        this.loopEvent = this.gameScene.time.addEvent({
            delay: 6000,
            callback: () => {

                const x = Math.floor(Math.random() * 1130); //1130 final da tela
                const y = Math.floor(Math.random() * 550); // 550 chao

                const newEnemy = new Hitfilm(this.gameScene, this.hero)
                    .create(x, y)
                    .withRouteLoop(y - 140, x + 130, y - 100);

                // console.log(x, y);
            },
            loop: true
        });
    }

    public registerLoopSkillDie(): void {
        this.loopEvent = this.gameScene.time.addEvent({
            delay: 1500,
            callback: () => {
                const position = this.body.position;

                const bug = new Bug(this.gameScene, this.hero);
                bug.create(position.x, position.y);

                this.gameScene.physics.add.existing(bug.sprite, false);
                const bugBody = bug.body as Phaser.Physics.Arcade.Body;
                bugBody
                    .setAllowGravity(false)
                    .setCollideWorldBounds(true)
                    .setMass(10);

                this.gameScene.physics.moveToObject(bug.sprite, this.hero.sprite, 280)
            },
            loop: true
        });
    }
}