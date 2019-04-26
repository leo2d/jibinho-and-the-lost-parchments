import { MoveTypes } from './move-types';
import { Move } from "./move";
import { Hero } from "../hero";
import { OnMotion } from './on-motions';

export class LeftMove extends Move<LeftMove> {
    
    constructor(
        hero: Hero, 
        cursorKeys: Phaser.Input.Keyboard.CursorKeys) {
            super(hero, cursorKeys);        
    }
    
    public moveAssign() {
        this.cursorKeys.left.on('down', () => {
            this.updateOnGround();
            this.hero.body.setVelocityX(-this.hero.speed);
            this.hero.sprite.flipX = true;
    
            this.hero.animations.play("player-walking");

            OnMotion.AddMove(MoveTypes.LEFT_MOVE);
            this.hero.lookingAt = 'back';
        });  
        
        this.cursorKeys.left.on('up', () => {
            this.stopMove(MoveTypes.LEFT_MOVE);
        }); 
    }
}