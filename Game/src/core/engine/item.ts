import { Block } from "../block";

export abstract class Item<TItem extends Item<TItem>> {

    public sprite: Phaser.GameObjects.Sprite;
    public body: Phaser.Physics.Arcade.Body;

    constructor(protected gameScene: Phaser.Scene) {

    }

    public create(x: number, y: number, frame: string): TItem {
        this.sprite = this.gameScene.add.sprite(x, y, frame);

        this.gameScene.physics.add.existing(this.sprite, false);
        this.body = this.sprite.body as Phaser.Physics.Arcade.Body;
        this.body.setCollideWorldBounds(true);
        //this.body.onWorldBounds = true;

        return this as unknown as TItem;
    }

    public withBlockColisor(): TItem {
        const blocksGroup = Block.blocksGroup;
        this.addCollider(blocksGroup);

        return this as unknown as TItem;
    }

    public withMass(mass: number): TItem {
        this.body.mass = mass;
        return this as unknown as TItem;
    }

    public withGravity(g: number): TItem {
        this.body.setGravityY(g);
        return this as unknown as TItem;
    }

    public addCollider(
        object: Phaser.GameObjects.Group | Phaser.GameObjects.Sprite,
        onCollision?: ((that: Phaser.GameObjects.Sprite, object: Phaser.GameObjects.Group | Phaser.GameObjects.Sprite) => any)): TItem {
        this.gameScene.physics.add.collider(this.sprite, object, (that, obj) => {
            if (onCollision) onCollision(this.sprite, object)
        });

        return this as unknown as TItem;
    }

    public addOverlap(
        object: Phaser.GameObjects.Group | Phaser.GameObjects.Sprite,
        onCollision?: ((that: Phaser.GameObjects.Sprite, object: Phaser.GameObjects.Group | Phaser.GameObjects.Sprite) => any)): TItem {
            this.gameScene.physics.add.overlap(this.sprite, object, (that, obj) => {                
                if (onCollision) onCollision(this.sprite, object)
            });

            return this as unknown as TItem;
    }
}