import { Enemy } from "../engine/enemy";
import { Hero } from "../hero";
import config from "../../config";

export class Bug extends Enemy<Bug> {

    constructor(
        gameScene: Phaser.Scene,
        private hero: Hero) {
        super(gameScene);
    }

    public create(x: number, y: number): Bug {
        super.create(x, y, 'bug');
        this.addColliderWithHero();
        this.addWorldBoundsCollider();

        return this;
    }
    private addWorldBoundsCollider(): void {

        this.body.onWorldBounds = true;
        this.body.setCollideWorldBounds(true);

        const bugBody = this.sprite.body as Phaser.Physics.Arcade.Body;

        bugBody.world.on('worldbounds',
            (body: Phaser.Physics.Arcade.Body) => {
                if (body.gameObject === bugBody.gameObject) {
                    this.body.destroy();
                    this.sprite.destroy();
                }
            }, this.sprite);
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