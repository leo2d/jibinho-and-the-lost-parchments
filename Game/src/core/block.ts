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

        const iceBlock = 'block';
        const icePlatformheight = 30;

        this.addPlatforms(240, 174, 5 * 32, icePlatformheight, iceBlock);
        // this.addPlatforms(734, 395, 8 * 32, icePlatformheight, iceBlock);
        this.addPlatforms(634, 418, 8 * 32, icePlatformheight, iceBlock);

        // this.addPlatforms(180, 500, 4 * 32, icePlatformheight, iceBlock);

        // this.addPlatforms(380, 400, 6 * 32, icePlatformheight, iceBlock);
        this.addPlatforms(780, 330, 4 * 32, icePlatformheight, iceBlock);
        this.addPlatforms(538, 279, 4 * 32, icePlatformheight, iceBlock);
        this.addPlatforms(442, 190, 4 * 32, icePlatformheight, iceBlock);
        this.addPlatforms(900, 250, 4 * 32, icePlatformheight, iceBlock);
        this.addPlatforms(382, 508, 6 * 32, icePlatformheight, iceBlock);

        this.addPlatforms(1060, 160, 6 * 32, icePlatformheight, iceBlock);

    }
    private addPlatforms(x: number, y: number, width: number,
        height: number, texture: string, movable = false): Phaser.GameObjects.TileSprite {

        const platform = this._gameScene.add.tileSprite(x, y, width, height, texture);
        this._gamePhysics.add.existing(platform, true);

        const platformBody = platform.body as Phaser.Physics.Arcade.Body
        platformBody.setMass(100);

        Block.blocksGroup.add(platform);

        // if(movable)
        // this.setRouteLoop(880, 500, 250, platform);
        
        return platform;
    }

    // public setRouteLoop(x: number, delayMetric: number, 
    //     speed: number, sprite:Phaser.GameObjects.TileSprite) {
    //     this._gameScene.physics.moveTo(sprite, x, 0, speed);
    //     this._gameScene.time.addEvent({
    //         delay: delayMetric,
    //         callback: () => {
    //             speed *= -1;
    //             // let body = 
    //             () => (sprite.body as Phaser.Physics.Arcade.Body) .setVelocityX(speed);                
    //         },
    //         loop: true
    //     });
    // }
}