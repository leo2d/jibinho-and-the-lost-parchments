import { Hero } from "../hero";
import GameScene from "src/scenes/game";
import { Item } from "../engine/item";

export default class Parchment extends Item<Parchment>{

    constructor(
        gameScene: Phaser.Scene,
        private hero: Hero) {
        super(gameScene);
    }

    public create(x: number, y: number, texture: string): Parchment {
        super.create(x, y, texture)
            .withBlockColisor().withMass(1);

        this.addColliderWithHero();

        return this;
    }

    private addColliderWithHero(): void {

        this.addOverlap(this.hero.sprite, (that, h) => {
            that.destroy();

            const game = this.gameScene.game.scene.getScene('Game') as GameScene;
            game.portal.openPortal();

            this.hero.hasKey = true;
        });
    }
}