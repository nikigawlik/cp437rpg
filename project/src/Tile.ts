interface Tile {
    tileID: number,
    colorID: number,
    bgColorID : number,
}

enum Tiles {
    Blank = 0,
    At = 64,
    Full = 219,
    Square = 254,
}