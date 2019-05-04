import { Block } from './../block';
import config from "../../config";

export abstract class Enemy<TEnemy extends Enemy<TEnemy>> {

    public sprite: Phaser.GameObjects.Sprite;
    public body: Phaser.Physics.Arcade.Body; 
    
    constructor(protected gameScene: Phaser.Scene) {        
        
    }

    public create(x: number, y: number, frame: string): TEnemy {
        this.sprite = this.gameScene.add.sprite(x, y, frame);
        
        this.gameScene.physics.add.existing(this.sprite, false);
        this.body = this.sprite.body as Phaser.Physics.Arcade.Body;
        this.body.setCollideWorldBounds(true);
        //this.body.onWorldBounds = true;

        return this as unknown as TEnemy;
    }

    public withBlockColisor(): TEnemy {
        const blocksGroup = Block.blocksGroup;
        this.addCollider(blocksGroup);

        return this as unknown as TEnemy;
    }

    public withMass(mass: number): TEnemy {
        this.body.mass = mass;        
        return this as unknown as TEnemy;
    }

    public withGravity(g: number): TEnemy {
        this.body.setGravityY(g);
        return this as unknown as TEnemy;
    }

    public addCollider(
        object: Phaser.GameObjects.Group | Phaser.GameObjects.Sprite,
        onCollision?: ((that: Phaser.GameObjects.Sprite, object: Phaser.GameObjects.Group | Phaser.GameObjects.Sprite) => any)): TEnemy {
            this.gameScene.physics.add.collider(this.sprite, object, (that, obj) => {                
                if (onCollision) onCollision(this.sprite, object)
            });

            return this as unknown as TEnemy;
    }

    public addOverlap(
        object: Phaser.GameObjects.Group | Phaser.GameObjects.Sprite,
        onCollision?: ((that: Phaser.GameObjects.Sprite, object: Phaser.GameObjects.Group | Phaser.GameObjects.Sprite) => any)): TEnemy {
            this.gameScene.physics.add.overlap(this.sprite, object, (that, obj) => {                
                if (onCollision) onCollision(this.sprite, object)
            });

            return this as unknown as TEnemy;
    }

    public setRouteLoop(x: number, delayMetric: number, speed: number) {        
        this.gameScene.physics.moveTo(this.sprite, x, config.groundY, speed);
        this.gameScene.time.addEvent({
            delay: delayMetric,
            callback: () => {
                speed *= -1;
                this.body.setVelocityX(speed);                
            },
            loop: true
        });
    }
    
}