import { AUTO, GameObjects, Input } from "phaser";
import { Hero } from "../../core/hero";
import { Loader } from "../../core/loader";
import Portal from "../../core/items/portal";
import { LeftMove } from "../../core/moves/left-move";
import { RightMove } from "../../core/moves/right-move";
import { JumpMove } from "../../core/moves/jump-move";
import { Block } from "../../core/block";
import { GoogleFireAction } from "../../core/actions/action";
import config from "../../config";
import IStage from "../IStage";
import { Hitfilm } from './../../core/enemies/hitfilm';
import { Javascript } from '../../core/enemies/javascript';
import { FireMage } from "../../core/enemies/fire-mage";

export default class ThirdStage extends Phaser.Scene implements IStage {

    public hero: Hero;
    public Boss: FireMage;
    public Boss2: FireMage = null;
    public animation: Animation;
    public hearts: Phaser.GameObjects.TileSprite[];
    public portal: Portal;

    public cursorKeys: Input.Keyboard.CursorKeys;

    public constructor(key) {
        super(key);
    }

    getStageName(): string {
        return 'ThirdStage';
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
        this.manageBosses();
    }

    private manageBosses(): void {
        if (this.Boss.health < 1 && null === this.Boss2) {

            this.portal.closePortal();

            const mage  = new FireMage(this.Boss.gameScene, this.Boss.hero).create(30, 150);
            mage.setHealthBarPosition((mage.sprite.x + 15), (mage.sprite.y - 50));

            mage.registerLoopSkillDie();

            this.Boss2 = mage;
        }
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
            this.portal = new Portal(this, this.hero, this.getStageName(), 'EndGame')
            .create(1180, 230, 'portalClosed')
            .withBlockColisor();
    }


    private addStageEnemies(): void {

        const javascripts = [

            //canto esquerdo
            new Javascript(this, this.hero).create(260, 150).withRouteLoop(530, 200),

            //direita, proximo ao protal
            new Javascript(this, this.hero).create(930, 275).withRouteLoop(1000, 280),

            //portal
            new Javascript(this, this.hero).create(1150, 200).withRouteLoop(1470, 1080, 120),

            //chao
            new Javascript(this, this.hero).create(680, 550).withRouteLoop(900, 500),

            //terceiro degrau
            new Javascript(this, this.hero).create(350, 360).withRouteLoop(890, 350, 40),

            //plataforma central
            new Javascript(this, this.hero).create(666, 215).withRouteLoop(890, 900, 60),
        ];

        const mage = new FireMage(this, this.hero).create(1160, 370);
        mage.setHealthBarPosition((mage.sprite.x + 15), (mage.sprite.y - 50));

        mage.dropItem = false;
        mage.sprite.flipX = true;
        mage.registerLoopSkill();

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

    private addStageSprites(): void  {
        this.add.tileSprite(600, 150, 1920, 1080, 'stage3Bg');
    }

    private addStageBlocks(): void {
        const gameBlocks = new Block(this);

        const groundSpriteWidth = 72;
        const groundQuantity = Math.round(config.width / groundSpriteWidth);

        for (let i = 0; i <= groundQuantity; i++) {
            gameBlocks.addRedGround(i * groundSpriteWidth, 620);
        }

        gameBlocks.addRedPlatforms();
    }

    private addStageHud(): void {
        this.hearts = [this.add.tileSprite(25, 50, 32, 32, 'heart'),
        this.add.tileSprite(60, 50, 32, 32, 'heart'),
        this.add.tileSprite(95, 50, 32, 32, 'heart')];
    }
}