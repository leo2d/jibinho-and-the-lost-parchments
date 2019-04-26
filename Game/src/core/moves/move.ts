import { Hero } from '../hero';
import { AUTO } from "phaser";
import { OnMotion } from './on-motions';

export abstract class Move<TMove> {

    public onGround: boolean;
    
    public constructor(
        protected hero: Hero, 
        protected cursorKeys: Phaser.Input.Keyboard.CursorKeys) {
        
    }

    public withSpeed(speed: number): TMove {
        this.hero.speed = speed;
        return this as unknown as TMove;
    }

    protected updateOnGround(): void {
        this.onGround = this.hero.body.blocked.down || this.hero.body.touching.down;
    }

    protected abstract moveAssign(): void;

    protected stopMove(moveToStop: number): void {
        const moveIndex = OnMotion.moves.findIndex(m => m === moveToStop);
        if (moveIndex < 0) return;

        OnMotion.moves.splice(moveIndex, 1);        
        if (OnMotion.moves.length > 0) return;

        this.hero.body.setVelocityX(0);
        this.hero.animations.stop();
    }
}



