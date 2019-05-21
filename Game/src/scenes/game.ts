import { GoogleFireAction } from '../core/actions/action';
import { Animation } from '../core/animation';
import { Hero } from '../core/hero';
import { Block } from '../core/block';
import { Loader } from '../core/loader';
import { AUTO, GameObjects, Input } from "phaser";
import config from "../config";
import { LeftMove } from '../core/moves/left-move';
import { RightMove } from '../core/moves/right-move';
import { JumpMove } from '../core/moves/jump-move';
import { Action } from '../core/actions/action';
import { Java } from '../core/enemies/java';
import { SnowMage } from '../core/enemies/snow-mage';
import { Bug } from 'src/core/enemies/bug';
import { Enemy } from 'src/core/engine/enemy';
import { HealthBarStatus } from './../core/enemies/HealthBarStatus';
import Portal from './../core/items/portal';
import IStage from './IStage';


export default class GameScene extends Phaser.Scene implements IStage {

    public hero: Hero;
    public Boss: SnowMage;
    public animation: Animation;
    public hearts: Phaser.GameObjects.TileSprite[];
    public portal: Portal;

    public cursorKeys: Input.Keyboard.CursorKeys;

    public constructor(key) {
        super(key);
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
        this.portal = new Portal(this, this.hero, 'Game', 'FirstStageEnd')
            .create(1130, 130, 'portalClosed')
            .withBlockColisor();
    }


    private addStageEnemies(): void {

        const javas = [new Java(this, this.hero).create(754, 420).withRouteLoop(900, 500),
        new Java(this, this.hero).create(1102, 420).withRouteLoop(1300, 350),
        new Java(this, this.hero).create(390, 390).withRouteLoop(530, 250),
        new Java(this, this.hero).create(580, 295).withRouteLoop(890, 1080, 80),
        new Java(this, this.hero).create(440, 140).withRouteLoop(890, 1080, 80),
        new Java(this, this.hero).create(1066, 120).withRouteLoop(1470, 1080, 80),
        ];

        const mage = new SnowMage(this, this.hero).create(180, 110);

        // const mage = new SnowMage(this, this.hero).create(200, 520);
        // this.mageHealthBar = this.add.tileSprite(mage.sprite.x, (mage.sprite.y -20), 57, 20, 'enemyHealthBarFine');

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
        this.add.tileSprite(600, 100, 1920, 1080, 'stage1Bg');
    }

    private addStageBlocks(): void {
        const gameBlocks = new Block(this);

        const groundSpriteWidth = 72;
        const groundQuantity = Math.round(config.width / groundSpriteWidth);

        for (let i = 0; i <= groundQuantity; i++) {
            gameBlocks.addGround(i * groundSpriteWidth, 620);
        }

        gameBlocks.addPlatform();
    }

    private addStageHud(): void {
        this.hearts = [this.add.tileSprite(25, 50, 32, 32, 'heart'),
        this.add.tileSprite(60, 50, 32, 32, 'heart'),
        this.add.tileSprite(95, 50, 32, 32, 'heart')];
    }
}