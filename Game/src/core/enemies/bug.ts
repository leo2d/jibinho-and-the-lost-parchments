import { Enemy } from "../engine/enemy";
import { Hero } from "../hero";
import config from "../../config";
import { GoogleFireAction } from "../actions/action";

export class Bug extends Enemy<Bug> {

    constructor(
        gameScene: Phaser.Scene,
        private hero: Hero) {
        super(gameScene);
    }

    public create(x: number, y: number): Bug {
        super.create(x, y, 'bug');
        this.addColliderWithHero();
        return this;
    }

    private addColliderWithHero(): void {
        this.addOverlap(this.hero.sprite, (that, h) => {
            const heroSprite = h as Phaser.GameObjects.Sprite;
            const heroBody = heroSprite.body as Phaser.Physics.Arcade.Body;

            heroBody.x = config.heroPosition.x;
            heroBody.y = config.heroPosition.y;

            that.destroy();
            this.hero.decreaseLife();
        });
    }
}