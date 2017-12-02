class Floor extends GameObject {

    constructor(x : number, y : number, tile : Tile) {
        super(x, y, tile);
        this.collisionHeight = 0;
    }
}