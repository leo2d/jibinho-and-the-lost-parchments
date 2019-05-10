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


export default class GameScene extends Phaser.Scene {

    public hero: Hero;
    public animation: Animation;
    public hearts: Phaser.GameObjects.TileSprite[];
    public mageHealthBar: Phaser.GameObjects.TileSprite;

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
        this.add.tileSprite(600, 100, 1920, 1080, 'bg');

        this.hearts = [this.add.tileSprite(25, 50, 32, 32, 'heart'),
        this.add.tileSprite(60, 50, 32, 32, 'heart'),
        this.add.tileSprite(95, 50, 32, 32, 'heart')];

        this.add.tileSprite(1130, 130, 36, 32, 'portalClosed');
        this.mageHealthBar = this.add.tileSprite(229, 75, 57, 20, 'enemyHealthBarFine');

        this.physics.world.bounds.width = config.width;
        this.physics.world.bounds.height = config.height;

        const gameBlocks = new Block(this);
        gameBlocks.addGround(180, 620);
        gameBlocks.addGround(540, 620);
        gameBlocks.addGround(900, 620);
        gameBlocks.addGround(1260, 620);
        gameBlocks.addGround(1620, 620);
        gameBlocks.addGround(1980, 620);
        gameBlocks.addPlatform();

        const blocks = Block.blocksGroup;

        this.hero = new Hero(this);
        this.physics.add.collider(this.hero.sprite, blocks);

        this.cameras.main.setBounds(0, 0, config.width, config.height);
        this.cameras.main.startFollow(this.hero.sprite);

        // this.animation = new Animation(this);
        this.anims.create({ key: 'player-walking', frames: this.anims.generateFrameNames('player-walking'), repeat: -1 });

        //this.anims.create({ key: 'enemy-damage', frames: this.anims.generateFrameNames('enemy-damage'), repeat: 3 });

        this.cursorKeys = this.input.keyboard.createCursorKeys();

        new GoogleFireAction(this.hero, this, this.cursorKeys).actionAssign();
        const javas = [new Java(this, this.hero).create(754, 420).withRouteLoop(900, 500),
        new Java(this, this.hero).create(1102, 420).withRouteLoop(1300, 350),
        new Java(this, this.hero).create(390, 390).withRouteLoop(530, 250),
        new Java(this, this.hero).create(740, 295).withRouteLoop(890, 1080, 80),
        new Java(this, this.hero).create(1066, 120).withRouteLoop(1470, 1080, 80),
        ];

        const mage = new SnowMage(this, this.hero).create(229, 55);

        this.assignMoves();

        this.input.on("pointerdown", function (pointer) {
            console.log(pointer.x, pointer.y);
        });
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
}