import { Enemy } from "../engine/enemy";
import { Hero } from "../hero";
import config from "../../config";
import { GoogleFireAction } from "../actions/action";

export class Java extends Enemy<Java> {   

    constructor(
        gameScene: Phaser.Scene,
        private hero: Hero) {
        super(gameScene);        
    }

    public create(x: number, y: number): Java {
        super.create(x, y, 'javalogo')
            .withBlockColisor().withMass(1);   
        
        this.addColliderWithHero();
        this.addColliderWithGoogleFire();

        return this;
    }

    public withRouteLoop(moveTo: number, loopDelay: number) : Java {
        this.setRouteLoop(moveTo, loopDelay, 250);
        return this;
    }
    
    private addColliderWithHero(): void {
        this.addOverlap(this.hero.sprite, (that, h) => {
            const heroSprite = h as Phaser.GameObjects.Sprite;
            const heroBody = heroSprite.body as Phaser.Physics.Arcade.Body;
            
            heroBody.x = config.heroPosition.x;
            heroBody.y = config.heroPosition.y;
        });
    }

    private addColliderWithGoogleFire(): void {
        const googleFireGroup = GoogleFireAction.googleFireGroup;
        this.addOverlap(googleFireGroup, (that, g) => {
            const thatBody = that.body as Phaser.Physics.Arcade.Body;   
            const googleFire = g as Phaser.GameObjects.Sprite;              
            
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
