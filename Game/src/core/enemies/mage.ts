import { Enemy } from '../engine/enemy';
import { Hero } from '../hero';
import config from "../../config";
import { GoogleFireAction } from '../actions/action';
import { HealthBarStatus } from './HealthBarStatus';
import Parchment from '../items/parchment';

export default class Mage<T> extends Enemy<Mage<T>>
{

    public health: number;
    public mageHealthBar: Phaser.GameObjects.TileSprite;
    public animations: Phaser.GameObjects.Components.Animation;
    protected loopEvent: Phaser.Time.TimerEvent;

    constructor(
        gameScene: Phaser.Scene,
        protected hero: Hero) {
        super(gameScene);

        this.health = 4;
    }

    public create(x: number, y: number, texture: string): Mage<T> {
        super.create(x, y, texture)
            .withBlockColisor().withMass(1);

        this.addColliderWithHero();
        this.addColliderWithGoogleFire();

        this.mageHealthBar = this.gameScene
            .add.tileSprite(this.sprite.x,
                (this.sprite.y + 20), 57, 20, HealthBarStatus.FINE);

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
        this.addOverlap(GoogleFireAction.googleFireGroup, (that, g) => {

            GoogleFireAction.destroyGroup();

            this.decreaseLife()
        });
    }


    public decreaseLife(): void {
        this.health = this.health - 1;

        if (this.health < 1) {
            this.kill();
            return;
        }

        let status = this.getHealthbarStatus(this.health);
        this.mageHealthBar.setTexture(status);

    }

    private getHealthbarStatus(health: number): string {

        switch (health) {
            case (3):
                return HealthBarStatus.WARING;
            case (2):
                return HealthBarStatus.CAUTION;
            case (1):
                return HealthBarStatus.DANGER;
            default:
                return HealthBarStatus.FINE;
        }
    }

    private kill(): void {
        this.body.destroy();
        this.sprite.destroy();
        this.mageHealthBar.destroy();

        this.loopEvent.destroy();

        new Parchment(this.gameScene, this.hero)
            .create(this.sprite.x, this.sprite.y, 'stage1Parchment')
            .withBlockColisor();

    }
}