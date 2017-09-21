interface GameSettings {
    tilesetPath : string; // path to the image file
    tilesetWidth : number; // width of the image file  
    tilesetHeight : number; // height of the image file
    tilesetTileWidth : number; // width of one tile
    tilesetTileHeight : number; // height of one tile
    colorPalette : string[], // list of color names or hex codes in the default palette
    canvasHeight : number; // height of the game canvas in tiles
    canvasWidth : number; // width of the game canvas in tiles
    fitCanvas : boolean, // should the canvas be scaled to fit the page
    canvasScale : number, // scale of the canvas (when fitCanvas is false), ratio of canvas pixels to CSS style pixels
    numberOfColors : number, // maximum number of colors in the palette
    numberOfTiles : number, // maximum number of tiles on the tileset
    framerate : number, // update rate in frames per second
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
                "#ff0", "#0ff", "#f0f", "#800",
                "#080", "#008", "#884", "#848",
                "#444", "#888", "#ccc", "#fff",
                ],
            numberOfColors: 16,
            numberOfTiles: 256,
            canvasWidth: 64,
            canvasHeight: 32,
            fitCanvas: false,
            canvasScale: 1.6,
            framerate: 30,
        };
    }
}