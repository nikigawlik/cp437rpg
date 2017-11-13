class GameObject {
    public x : number;
    public y : number;
    public tile : Tile;

    constructor(x : number, y : number) {
        this.x = x;
        this.y = y;
        game.world.addObject(this);
    }

    public onStep() {
    }
    
    public moveRelative(dx : number, dy : number) {
        game.world.removeObject(this);
        this.x += dx;
        this.y += dy;
        game.world.addObject(this);
    }
}