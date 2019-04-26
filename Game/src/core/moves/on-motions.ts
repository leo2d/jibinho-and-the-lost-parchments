export class OnMotion {
    public static moves: number[] = [];  

    public static AddMove(moveToAdd: number): void {
        const moveIndex = OnMotion.moves.findIndex(m => m === moveToAdd);
        if (moveIndex >= 0) 
            return;

        OnMotion.moves.push(moveToAdd);
    }
}