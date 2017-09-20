interface GameSettings {
    tilesetPath : string; // path to the image file
    tilesetWidth : number; // width of the image file  
    tilesetHeight : number; // height of the image file
    tilesetTileWidth : number; // width of one tile
    tilesetTileHeight : number; // height of one tile
    colorPalette : string[], // list of color names or hex codes in the default palette
    canvasHeight : number; // height of the game canvas in tiles
    canvasWidth : number; // width of the game canvas in tiles
    fitCanvas : boolean,
    canvasScale : number,
    numberOfColors : number,
    numberOfTiles : number,
}

class SettingsManager {
    public static loadGameSettings() : GameSettings {
        return {
            tilesetPath: "Alloy_curses_12x12.png",
            tilesetWidth: 12*16,
            tilesetHeight: 12*16,
            tilesetTileWidth: 12,
            tilesetTileHeight: 12,
            colorPalette: [
                "#000", "#f00", "#0f0", "#00f",
                "#ff0", "#0ff", "#f0f", "#000",
                "#000", "#000", "#000", "#000",
                "#444", "#888", "#ccc", "#fff",
                ],
            numberOfColors: 16,
            numberOfTiles: 256,
            canvasWidth: 64,
            canvasHeight: 32,
            fitCanvas: false,
            canvasScale: 1.6,
        };
    }
}