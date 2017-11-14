class GameObject {
    public x : number;
    public y : number;
    public tile : Tile;
    public collisionHeight : number; // 0 for flat, 1 for solid, 0.X for slab, -0.X for tunnel

    constructor(x : number, y : number) {
        this.x = x;
        this.y = y;
        this.collisionHeight = 0.5;
        game.world.addObject(this);
    }

    public onStep() {
    }
    
    public moveRelative(dx : number, dy : number) {
        // check some collisions
        if(this.x + dx > game.world.width-1 || this.x + dx < 0
        || this.y + dy > game.world.height-1 || this.y + dy < 0
        || !game.world.canEnter(this, this.x + dx, this.y + dy)) {
            return;    
        }

        // all ok
        game.world.removeObject(this);
        this.x += dx;
        this.y += dy;
        game.world.addObject(this);
    }
}