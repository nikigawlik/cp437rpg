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
        // check some collisions
        if(this.x + dx > game.world.width-1 || this.x + dx < 0
        || this.y + dy > game.world.height-1 || this.y + dy < 0) {
            return;    
        }

        // all ok
        game.world.removeObject(this);
        this.x += dx;
        this.y += dy;
        game.world.addObject(this);
    }
}