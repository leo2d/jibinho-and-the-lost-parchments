import { Block } from './../block';
import { Enemy } from "../engine/enemy";
import { Hero } from "../hero";
import { Bug } from "./bug";
import config from "../../config";
import { GoogleFireAction } from '../actions/action';
import GameScene from 'src/scenes/game';
import { HealthBarStatus } from './HealthBarStatus';
import Parchment from '../items/parchment';
import Mage from './mage';

export class SnowMage extends Mage<SnowMage> {

    constructor(
        gameScene: Phaser.Scene,
        hero: Hero) {
        super(gameScene, hero);

        this.health = 4;
    }

    public create(x: number, y: number): SnowMage {
        super.create(x, y, 'snowmage');

        this.registerLoopSkill();

        return this;
    }

    private registerLoopSkill(): void {
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