import { Loader } from '../core/loader';
import { AUTO, Input } from 'phaser';


export default class TutorialScene extends Phaser.Scene {

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
        this.add.tileSprite(625, 320, 1250, 640, 'tutorialBg');

        this.cursorKeys = this.input.keyboard.createCursorKeys();

        this.cursorKeys.space.on('down', () => {
            this.scene.start("Game");
        });

    }
}