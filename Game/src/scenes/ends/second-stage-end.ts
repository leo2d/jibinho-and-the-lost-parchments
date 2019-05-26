import { Input } from 'phaser';
import { Loader } from '../../core/loader';


export default class SecondStageEndScene extends Phaser.Scene {
    public constructor(key) {
        super(key);
    }

    public cursorKeys: Input.Keyboard.CursorKeys;

    public init() {

    }

    public preload() {
        new Loader(this.load);
    }
    public create() {
        this.add.tileSprite(625, 320, 1250, 640, 'secondStageEnd');

        this.cursorKeys = this.input.keyboard.createCursorKeys();

        this.cursorKeys.space.on('down', () => {
            window.location.reload();
        });
    }
}