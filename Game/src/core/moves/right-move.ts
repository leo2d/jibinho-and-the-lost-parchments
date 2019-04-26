import { Move } from "./move";
import { Hero } from "../hero";
import { MoveTypes } from "./move-types";
import { OnMotion } from "./on-motions";

export class RightMove extends Move<RightMove> {
    
    constructor(
        hero: Hero, 
        cursorKeys: Phaser.Input.Keyboard.CursorKeys) {
            super(hero, cursorKeys);        
    }
    
    public moveAssign() {
        this.cursorKeys.right.on('down', () => {
            this.updateOnGround();
            this.hero.body.setVelocityX(this.hero.speed);
            this.hero.sprite.flipX = false;
    
            this.hero.animations.play("player-walking");

            OnMotion.AddMove(MoveTypes.RIGHT_MOVE);
            this.hero.lookingAt = 'front';
        });  
        
        this.cursorKeys.right.on('up', () => {
            this.stopMove(MoveTypes.RIGHT_MOVE);
        }); 
    }
}