import Mage from "./mage";
import { Hero } from "../hero";

export default class ThunderMage extends Mage<ThunderMage>{

    originalX: number;
    originalY: number;
    isInOriginalPosition = true;

    constructor(
        gameScene: Phaser.Scene,
        hero: Hero) {
        super(gameScene, hero);

    }

    public create(x: number, y: number): ThunderMage {
        super.create(x, y, 'thundermage');

        this.originalX = x;
        this.originalY = y;

        this.registerLoopSkill();

        return this;
    }

    private registerLoopSkill(): void {
        this.loopEvent = this.gameScene.time.addEvent({
            delay: 1500,
            callback: () => {
                
                if (this.isInOriginalPosition) {
                    this.sprite.x = 1100;
                    this.sprite.y = 300;

                    this.setHealthBarPosition((this.sprite.x + 5), (this.sprite.y - 30));

                    this.isInOriginalPosition = false;
                } else {
                    this.sprite.x = this.originalX;
                    this.sprite.y = this.originalY;

                    this.setHealthBarPosition((this.sprite.x + 5), (this.sprite.y - 30));

                    this.isInOriginalPosition = true;
                }
            },
            loop: true
        });
    }

}