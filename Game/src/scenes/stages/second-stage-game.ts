import { AUTO, GameObjects, Input } from "phaser";
import { Hero } from "../../core/hero";
import { Loader } from "../../core/loader";
import ThunderMage from "../../core/enemies/thunder-mage";
import Portal from "../../core/items/portal";
import { LeftMove } from "../../core/moves/left-move";
import { RightMove } from "../../core/moves/right-move";
import { JumpMove } from "../../core/moves/jump-move";
import { Java } from "../../core/enemies/java";
import { SnowMage } from "../../core/enemies/snow-mage";
import { HealthBarStatus } from "../../core/enemies/HealthBarStatus";
import { Block } from "../../core/block";
import { GoogleFireAction } from "../../core/actions/action";
import config from "../../config";
import IStage from "../IStage";
import { CSharp } from './../../core/enemies/csharp';

export default class SecondStage extends Phaser.Scene implements IStage {

    public hero: Hero;
    public Boss: ThunderMage;
    public animation: Animation;
    public hearts: Phaser.GameObjects.TileSprite[];
    public portal: Portal;

    public cursorKeys: Input.Keyboard.CursorKeys;

    public constructor(key) {
        super(key);
    }

    getStageName(): string {
        return 'SecondStage';
    }

    public init() {

    }

    public preload() {
        new Loader(this.load);
    }

    public create() {

        this.physics.world.bounds.width = config.width;
        this.physics.world.bounds.height = config.height;
        this.cursorKeys = this.input.keyboard.createCursorKeys();

        // A ordem de chamada tem de ser essa! Varios itens
        // dependem que outros tenham sido adicionados antes.
        this.addStageSprites();
        this.addStageBlocks();

        this.addHero();

        this.addStageItems();
        this.addStageEnemies();
        this.addStageHud();
        this.assignMoves();

        // this.animation = new Animation(this);
        this.anims.create({ key: 'player-walking', frames: this.anims.generateFrameNames('player-walking'), repeat: -1 });

        //this.anims.create({ key: 'enemy-damage', frames: this.anims.generateFrameNames('enemy-damage'), repeat: 3 });

        this.input.on("pointerdown", (pointer) => console.log(pointer.x, pointer.y));
    }

    public update() {

    }

    private assignMoves(): void {
        let leftmove = new LeftMove(this.hero, this.cursorKeys).withSpeed(this.hero.speed);
        leftmove.moveAssign();

        let rightmove = new RightMove(this.hero, this.cursorKeys).withSpeed(this.hero.speed);
        rightmove.moveAssign();

        let jumpmove = new JumpMove(this.hero, this.cursorKeys).withSpeed(this.hero.speed);
        jumpmove.moveAssign();
    }

    private addStageItems(): void {
        this.portal = new Portal(this, this.hero, 'SecondStage', 'SecondStageEnd')
            .create(590, 160, 'portalClosed')
            .withBlockColisor();
    }


    private addStageEnemies(): void {

        const cSharps = [
        
            //plataforma mais alta
            new CSharp(this, this.hero).create(260, 150).withRouteLoop(530, 200),

            //plataformas terceiro nivel
            new CSharp(this, this.hero).create(830, 275).withRouteLoop(890, 350, 40),

            //plataformas segundo nivel
            new CSharp(this, this.hero).create(710, 350).withRouteLoop(890, 900, 60),
            new CSharp(this, this.hero).create(250, 330).withRouteLoop(1470, 1080, 120),
        
            //chao
            new CSharp(this, this.hero).create(360, 550).withRouteLoop(1300, 350),
            new CSharp(this, this.hero).create(580, 550).withRouteLoop(900, 500),
            new CSharp(this, this.hero).create(1030, 550).withRouteLoop(1000, 280),
        ];

        const mage = new ThunderMage(this, this.hero).create(1066, 100);
        mage.setHealthBarPosition((mage.sprite.x + 10), (mage.sprite.y - 35));

        this.Boss = mage;
    }

    private addHero(): void {
        const blocks = Block.blocksGroup;

        this.hero = new Hero(this);
        this.physics.add.collider(this.hero.sprite, blocks);

        this.cameras.main.setBounds(0, 0, config.width, config.height);
        this.cameras.main.startFollow(this.hero.sprite);

        new GoogleFireAction(this.hero, this, this.cursorKeys).actionAssign();
    }

    private addStageSprites(): void {
        this.add.tileSprite(600, 100, 1920, 1080, 'stage2Bg');
    }

    private addStageBlocks(): void {
        const gameBlocks = new Block(this);

        const groundSpriteWidth = 72;
        const groundQuantity = Math.round(config.width / groundSpriteWidth);

        for (let i = 0; i <= groundQuantity; i++) {
            gameBlocks.addStoneGround(i * groundSpriteWidth, 620);
        }

        gameBlocks.addStonePlatforms();
    }

    private addStageHud(): void {
        this.hearts = [this.add.tileSprite(25, 50, 32, 32, 'heart'),
        this.add.tileSprite(60, 50, 32, 32, 'heart'),
        this.add.tileSprite(95, 50, 32, 32, 'heart')];
    }
}