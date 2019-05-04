import { Animation } from '../core/animation';
import { Loader } from '../core/loader';
import { AUTO, GameObjects, Input } from "phaser";
import config from "../config";
import { Action } from '../core/actions/action';


export default class GameOverScene extends Phaser.Scene {
    public constructor(key) {
        super(key);
    }

    public init() {

    }

    public preload() {
        new Loader(this.load);
    }
    public create() {
        this.add.tileSprite(625, 320, 1250, 640, 'gameOver');
    }
}