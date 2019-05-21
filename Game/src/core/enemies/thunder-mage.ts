import Mage from "./mage";
import { Hero } from "../hero";

export default class ThunderMage extends Mage<ThunderMage>{

    constructor(
        gameScene: Phaser.Scene,
        hero: Hero) {
        super(gameScene, hero);

    }

    public create(x: number, y: number): ThunderMage {
        super.create(x, y, 'snowmage');

        this.registerLoopSkill();

        return this;
    }

    private registerLoopSkill(): void {
        this.loopEvent = this.gameScene.time.addEvent({
            delay: 1500,
            callback: () => {
                const position = this.body.position;
            },
            loop: true
        });
    }

}