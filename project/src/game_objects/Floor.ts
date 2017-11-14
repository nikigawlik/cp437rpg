class Floor extends GameObject {

    constructor(x : number, y : number, tile : Tile) {
        super(x, y);
        this.tile = tile;
        this.collisionHeight = 0;
    }
}