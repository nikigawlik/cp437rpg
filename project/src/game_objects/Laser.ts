class Laser extends GameObject implements Continuous{
    private counter = 4;

    constructor(x : number, y : number, direction : number) {
        super(x, y, new Tile(
            (direction === 0 || direction === 2 ? 196 : 179), 
            1, 
            0
        ));
        
        game.addContinuous(this);
    }

    public update() {
        this.counter--;
        if (this.counter <= 0) {
            game.world.removeObject(this);
        }
    }
}