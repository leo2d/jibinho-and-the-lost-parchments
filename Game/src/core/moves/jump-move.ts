import { Move } from "./move";
import { Hero } from "../hero";

export class JumpMove extends Move<JumpMove> {
    
    constructor(
        hero: Hero, 
        cursorKeys: Phaser.Input.Keyboard.CursorKeys) {
            super(hero, cursorKeys);        
    }
    
    public moveAssign() {
        this.cursorKeys.up.on('down', () => {          
            this.updateOnGround();           
            if (this.onGround) {
                this.hero.body.setVelocityY(this.hero.jumpSpeed);
            }
        }); 
    }
}