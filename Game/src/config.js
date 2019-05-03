import Phaser from "phaser";
export default {
    type: Phaser.AUTO,
    width: 1220,
    height: 640,
    title: "Jibinho and the Lost Parchments",
    pixelArt: false,
    physics: {
        default: "arcade",
        arcade: {
            gravity: { y: 1500 },
            debug: false
        }
    },
    heroPosition: {
        x: 180,
        y: 400
    },
    groundY: 620
};

