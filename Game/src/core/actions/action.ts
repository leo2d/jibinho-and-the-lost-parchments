import { AUTO } from "phaser";
import { Hero } from "../hero";
import { Block } from "../block";

export class Action {

    protected heroPosition: Phaser.Math.Vector2;

    constructor(
        protected hero: Hero,
        protected gameScene: Phaser.Scene,
        protected cursorKeys: Phaser.Input.Keyboard.CursorKeys) {

    }
}

export class GoogleFireAction extends Action {

    public static googleFireGroup: Phaser.GameObjects.Group;

    constructor(
        hero: Hero,
        gameScene: Phaser.Scene,
        cursorKeys: Phaser.Input.Keyboard.CursorKeys) {
        super(hero, gameScene, cursorKeys);
        GoogleFireAction.googleFireGroup = this.gameScene.add.group();

    }

    public actionAssign(): void {
        this.cursorKeys.space.on('down', () => {
            // Obtenção da posição atual do usuário
            this.heroPosition = this.hero.body.position;

            // Construção do projétil google
            const googleBullet = this.gameScene.add.sprite(
                this.heroPosition.x, this.heroPosition.y, 'glogo');

            GoogleFireAction.googleFireGroup.add(googleBullet);

            // Objeto não estático
            this.gameScene.physics.add.existing(googleBullet, false);
            const googleBulletBody = googleBullet.body as Phaser.Physics.Arcade.Body;
            googleBulletBody.setCollideWorldBounds(true).setBounceY(1).setMass(175);

            const vX = this.hero.lookingAt === 'front' ? 400 : -400;
            googleBulletBody.setVelocityX(vX);

            // Colisor do projétil com os blocos construídos
            this.gameScene.physics.add.collider(googleBullet, Block.blocksGroup, (google, block) => {

                // Corpo do bloco colidido
                const googleBody = google.body as Phaser.Physics.Arcade.Body;

                googleBody.onWorldBounds = true;

                googleBody.world.on('worldbounds', (body: Phaser.Physics.Arcade.Body) => {
                    // Check if the body's game object is the sprite you are listening for
                    if (body.gameObject === googleBody.gameObject) {
                        googleBullet.destroy();

                        this.gameScene.time.addEvent({
                            delay: 300,
                            repeat: 0,
                            callback: () => {
                                GoogleFireAction.destroyGroup();
                            },
                            loop: false,
                        });

                    }
                }, googleBullet);

                const blockBody = block.body as Phaser.Physics.Arcade.Body;

                if (GoogleFireAction.googleFireGroup.children.entries.length > 4) {
                    GoogleFireAction.destroyGroup();
                }

            });

        });
    }

    public static destroyGroup(): void {
        GoogleFireAction.googleFireGroup
            .children
            .entries
            .forEach(x => x.destroy());
    }

}