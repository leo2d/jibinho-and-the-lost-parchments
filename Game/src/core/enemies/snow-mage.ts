import { Block } from './../block';
import { Enemy } from "../engine/enemy";
import { Hero } from "../hero";

export class SnowMage extends Enemy<SnowMage> {
    constructor(
        gameScene: Phaser.Scene,
        private hero: Hero) {
            super(gameScene);        
    }

    public create(x: number, y: number): SnowMage {
        super.create(x, y, 'snowmage')
            .withBlockColisor().withMass(1); 

        this.registerLoopSkill();

        return this;
    }

    private registerLoopSkill(): void {       
        this.gameScene.time.addEvent({
            delay: 4000,
            callback: () => {               
                const position = this.body.position; 
                
                const bug = this.gameScene.add.sprite(
                    position.x, position.y, 'bug');                    
               
                this.gameScene.physics.add.existing(bug, false);
                const googleBulletBody = bug.body as Phaser.Physics.Arcade.Body;  
                googleBulletBody
                    .setAllowGravity(false)
                    .setCollideWorldBounds(true)
                    .setMass(10);    
                    
                // this.gameScene.physics.add.collider(bug, Block.blocksGroup);
                this.gameScene.physics.moveToObject(bug, this.hero.sprite, 100)
            },
            loop: true
        });
    }
}