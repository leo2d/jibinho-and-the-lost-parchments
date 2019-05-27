import { Enemy } from "../engine/enemy";
import { Hero } from "../hero";
import config from "../../config";
import { GoogleFireAction } from "../actions/action";

export class Hitfilm extends Enemy<Hitfilm> {

    constructor(
        gameScene: Phaser.Scene,
        private hero: Hero) {
        super(gameScene);
    }

    public create(x: number, y: number): Hitfilm {
        super.create(x, y, 'hitfilmlogo')
            .withBlockColisor().withMass(1);

        this.addColliderWithHero();
        this.addColliderWithGoogleFire();

        return this;
    }

    public withRouteLoop(moveTo: number, loopDelay: number, speed?: number): Hitfilm {
        this.setRouteLoop(moveTo, loopDelay, speed ? speed : 250);
        return this;
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
        const googleFireGroup = GoogleFireAction.googleFireGroup;
        this.addOverlap(googleFireGroup, (that, g) => {
            const thatBody = that.body as Phaser.Physics.Arcade.Body;
            const gFireGroup = g as Phaser.GameObjects.Group;

            GoogleFireAction.destroyGroup();

            thatBody.rotation = 95;
            this.gameScene.time.addEvent({
                delay: 50,
                callback: () => {
                    that.destroy();
                },
                loop: false
            });
        });

    }
}
