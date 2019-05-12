import { Block } from './../block';
import { Enemy } from "../engine/enemy";
import { Hero } from "../hero";
import { Bug } from "./bug";
import config from "../../config";
import { GoogleFireAction } from '../actions/action';
import GameScene from 'src/scenes/game';
import { HealthBarStatus } from './HealthBarStatus';
import Parchment from '../items/parchment';

export class SnowMage extends Enemy<SnowMage> {

    public health: number;
    public animations: Phaser.GameObjects.Components.Animation;
    private loopEvent: Phaser.Time.TimerEvent;

    constructor(
        gameScene: Phaser.Scene,
        private hero: Hero) {
        super(gameScene);

        this.health = 4;
    }

    public create(x: number, y: number): SnowMage {
        super.create(x, y, 'snowmage')
            .withBlockColisor().withMass(1);

        this.registerLoopSkill();
        this.addColliderWithHero();
        this.addColliderWithGoogleFire();

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

        const game = this.gameScene.game.scene.getScene('Game') as GameScene;

        if (this.health < 1) {
            this.kill(game);
            return;
        }

        let status = this.getHealthbarStatus(this.health);
        game.mageHealthBar.setTexture(status);

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

    private kill(game: GameScene): void {
        this.body.destroy();
        this.sprite.destroy();
        game.mageHealthBar.destroy();

        this.loopEvent.destroy();

        new Parchment(this.gameScene, this.hero)
            .create(this.sprite.x, this.sprite.y, 'stage1Parchment')
            .withBlockColisor();

    }
}