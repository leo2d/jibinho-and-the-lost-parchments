import { Loader } from '../core/loader';
import { Input } from 'phaser';


export default class CreditsScene extends Phaser.Scene {
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
        this.add.tileSprite(625, 320, 1250, 640, 'credits');

        this.cursorKeys = this.input.keyboard.createCursorKeys();

        this.cursorKeys.space.on('down', () => {
            window.location.reload();
        });
    }
}