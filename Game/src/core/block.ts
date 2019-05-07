import { AUTO } from "phaser";

export class Block {

    public static blocksGroup: Phaser.GameObjects.Group;
    private _gamePhysics: Phaser.Physics.Arcade.ArcadePhysics

    constructor(public _gameScene: Phaser.Scene) {
        this._gamePhysics = this._gameScene.physics;
        Block.blocksGroup = this._gameScene.add.group();
    }

    public addGround(x: number, y: number): void {
        const ground: Phaser.Physics.Arcade.Sprite
            = this._gamePhysics.add.sprite(x, y, "ground");

        const groundBody = ground.body as Phaser.Physics.Arcade.Body

        this._gamePhysics.add.existing(ground, true);

        groundBody.setAllowGravity(false);
        groundBody.setImmovable(true);

        Block.blocksGroup.add(ground);
    }

    public addPlatform(): void {
        // const platform = this._gameScene.add.tileSprite(180, 500, 4 * 36, 1 * 30, "block");
        // this._gamePhysics.add.existing(platform, true);

        // const platformBody = platform.body as Phaser.Physics.Arcade.Body
        // platformBody.setMass(100);

        // Block.blocksGroup.add(platform);

        // const platformA = this._gameScene.add.tileSprite(50, 326, 4 * 36, 1 * 30, "block");
        // this._gamePhysics.add.existing(platformA, true);

        // const platformABody = platformA.body as Phaser.Physics.Arcade.Body
        // platformABody.setMass(100);

        // Block.blocksGroup.add(platformA);

        const platformB = this._gameScene.add.tileSprite(240, 174, 5 * 32, 1 * 30, "block");
        this._gamePhysics.add.existing(platformB, true);

        const platformBBody = platformB.body as Phaser.Physics.Arcade.Body
        platformBBody.setMass(100);

        Block.blocksGroup.add(platformB);
   
        const platformX = this._gameScene.add.tileSprite(734, 395, 8 * 32, 1 * 30, "block");
        this._gamePhysics.add.existing(platformX, true);

        const platformXBody = platformX.body as Phaser.Physics.Arcade.Body
        platformXBody.setMass(100);

        Block.blocksGroup.add(platformX);


        // const platformF = this._gameScene.add.tileSprite(370, 390, 8 * 36, 1 * 30, "block");
        // this._gamePhysics.add.existing(platformF, true);

        // const platformFBody = platformF.body as Phaser.Physics.Arcade.Body
        // platformFBody.setMass(100);

        // Block.blocksGroup.add(platformF);
    }
}