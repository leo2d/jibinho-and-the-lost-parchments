import { Item } from "../engine/item";
import { Hero } from "../hero";
import GameScene from "src/scenes/game";

export default class Portal extends Item<Portal>{
    
    private isOpen: boolean;

    constructor(
        gameScene: Phaser.Scene,
        private hero: Hero,
        private origin: string,
        private destiny:string) {
        super(gameScene);
    }

    public create(x: number, y: number, texture: string): Portal {
        super.create(x, y, texture)
            .withBlockColisor().withMass(1);

        this.addColliderWithHero();

        this.isOpen = false;

        return this;
    }

    private addColliderWithHero(): void {

        this.addOverlap(this.hero.sprite, (that, h) => {
            
            if(this.hero.hasKey && this.isOpen){
                this.gameScene.game.scene.switch(this.origin, this.destiny);
            }
                
        });
    }

    public openPortal(){
        this.isOpen = true;
        this.sprite.setTexture('portalOpen');
    }
}