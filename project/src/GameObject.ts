class GameObject {
    public x : number;
    public y : number;
    public tile : Tile;
    public collisionHeight : number; // 0 for flat, 1 for solid, 0.X for slab, -0.X for tunnel
    public visible : boolean = true;

    constructor(x : number, y : number, tile : Tile) {
        this.x = x;
        this.y = y;
        this.tile = tile;
        this.collisionHeight = 0.5;
        game.world.addObject(this);
    }

    public move(x : number, y : number) : boolean {
        // check some collisions
        if(x > game.world.width-1 || x < 0
        || y > game.world.height-1 || y < 0
        || !game.world.canEnter(this, x, y)) {
            return false;    
        }

        // all ok
        game.world.removeObject(this);
        this.x = x;
        this.y = y;
        game.world.addObject(this);

        return true;
    }
    
    public moveRelative(dx : number, dy : number) : boolean {
        return this.move(this.x + dx, this.y + dy);
    }
}