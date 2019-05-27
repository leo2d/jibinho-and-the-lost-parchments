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
            = this._gamePhysics.add.sprite(x, y, "snowGround");

        const groundBody = ground.body as Phaser.Physics.Arcade.Body

        this._gamePhysics.add.existing(ground, true);

        groundBody.setAllowGravity(false);
        groundBody.setImmovable(true);

        Block.blocksGroup.add(ground);
    }

    public addStoneGround(x: number, y: number): void {
        const ground: Phaser.Physics.Arcade.Sprite
            = this._gamePhysics.add.sprite(x, y, "stoneGround");

        const groundBody = ground.body as Phaser.Physics.Arcade.Body

        this._gamePhysics.add.existing(ground, true);

        groundBody.setAllowGravity(false);
        groundBody.setImmovable(true);

        Block.blocksGroup.add(ground);
    }

    public addRedGround(x: number, y: number): void {
        const ground: Phaser.Physics.Arcade.Sprite
            = this._gamePhysics.add.sprite(x, y, "redGround");

        const groundBody = ground.body as Phaser.Physics.Arcade.Body

        this._gamePhysics.add.existing(ground, true);

        groundBody.setAllowGravity(false);
        groundBody.setImmovable(true);

        Block.blocksGroup.add(ground);
    }

    public addSnowPlatforms(): void {

        const iceBlock = 'iceBlock';
        const icePlatformheight = 30;

        //mage platform
        this.addPlatforms(200, 234, 6 * 32, icePlatformheight, iceBlock);
        this.addPlatforms(600, 418, 6 * 32, icePlatformheight, iceBlock);
        this.addPlatforms(780, 330, 2 * 32, icePlatformheight, iceBlock);
        this.addPlatforms(610, 279, 2 * 32, icePlatformheight, iceBlock);
        this.addPlatforms(442, 190, 4 * 32, icePlatformheight, iceBlock);
        this.addPlatforms(900, 250, 2 * 32, icePlatformheight, iceBlock);
        this.addPlatforms(382, 495, 6 * 32, icePlatformheight, iceBlock);
        //portal
        this.addPlatforms(1060, 160, 6 * 32, icePlatformheight, iceBlock);

    }

    public addStonePlatforms(): void {

        const stoneBlock = 'stoneBlock';
        const stonePlatformHeiht = 30;

        this.addPlatforms(100, 300, 4 * 30, stonePlatformHeiht, stoneBlock);
        this.addPlatforms(300, 390, 6 * 30, stonePlatformHeiht, stoneBlock);

        this.addPlatforms(720, 420, 4 * 30, stonePlatformHeiht, stoneBlock);
        this.addPlatforms(840, 310, 3 * 30, stonePlatformHeiht, stoneBlock);

        this.addPlatforms(900, 230, 2 * 30, stonePlatformHeiht, stoneBlock);

        this.addPlatforms(260, 190, 4 * 30, stonePlatformHeiht, stoneBlock);
        //portal
        this.addPlatforms(540, 190, 6 * 30, stonePlatformHeiht, stoneBlock);
        //mais proximo do chao
        this.addPlatforms(470, 495, 6 * 30, stonePlatformHeiht, stoneBlock);

        //mage
        this.addPlatforms(1110, 160, 5 * 30, stonePlatformHeiht, stoneBlock);
        this.addPlatforms(1100, 360, 6 * 30, stonePlatformHeiht, stoneBlock);

    }

    public addRedPlatforms() {
        const stoneBlock = 'redBlock';
        const stonePlatformHeiht = 30;
        const blockWidth = 32;

        this.addPlatforms(790, 420, 4 * blockWidth, stonePlatformHeiht, stoneBlock);
        this.addPlatforms(640, 510, 3 * blockWidth, stonePlatformHeiht, stoneBlock);


        this.addPlatforms(260, 220, 3 * blockWidth, stonePlatformHeiht, stoneBlock);

        //plataformas da entrada
        //mais proximo do chao
        this.addPlatforms(170, 530, 3 * blockWidth, stonePlatformHeiht, stoneBlock);
        //segundo degrau
        this.addPlatforms(270, 460, 2 * blockWidth, stonePlatformHeiht, stoneBlock);
        //terceiro degrau        
        this.addPlatforms(370, 410, 4 * blockWidth, stonePlatformHeiht, stoneBlock);
        //quarto        
        this.addPlatforms(440, 310, 3 * blockWidth, stonePlatformHeiht, stoneBlock);

        //direta
        this.addPlatforms(900, 320, 4 * blockWidth, stonePlatformHeiht, stoneBlock);
        this.addPlatforms(670, 270, 4 * blockWidth, stonePlatformHeiht, stoneBlock);
        this.addPlatforms(1050, 520, 2 * blockWidth, stonePlatformHeiht, stoneBlock);

        //mage
        this.addPlatforms(1180, 420, 4 * blockWidth, stonePlatformHeiht, stoneBlock);
        this.addPlatforms(50, 200, 3 * blockWidth, stonePlatformHeiht, stoneBlock);


        //portal
        this.addPlatforms(1130, 260, 6 * blockWidth, stonePlatformHeiht, stoneBlock);


    }

    private addPlatforms(x: number, y: number, width: number,
        height: number, texture: string, movable = false): Phaser.GameObjects.TileSprite {

        const platform = this._gameScene.add.tileSprite(x, y, width, height, texture);
        this._gamePhysics.add.existing(platform, true);

        const platformBody = platform.body as Phaser.Physics.Arcade.Body
        platformBody.setMass(100);

        Block.blocksGroup.add(platform);

        return platform;
    }
}