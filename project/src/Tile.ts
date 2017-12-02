enum Chars {
    Blank = 0,
    At = 64,
    Full = 219,
    Square = 254,
}

class Tile {
    public static EMPTY = new Tile(0, 0, 0);

    tileID : number;
    colorID : number;
    bgColorID : number;

    constructor(tileID : number, colorID : number, bgColorID : number) {
        this.tileID = tileID;
        this.colorID = colorID;
        this.bgColorID = bgColorID;
    }

    public clone() : Tile {
        return new Tile(this.tileID, this.colorID, this.bgColorID);
    }
}