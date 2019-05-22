import Portal from "../core/items/portal";

export default interface IStage{
    portal: Portal;
    hearts: Phaser.GameObjects.TileSprite[];

    getStageName():string;
}