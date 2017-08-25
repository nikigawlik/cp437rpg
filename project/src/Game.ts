interface GameSettings {
    tilesetPath : string;
    tilesetWidth : number;
    tilesetHeight : number;
    tilesetTileWidth : number;
    tilesetTileHeight : number;
}

class Game {
    public tileset : Tileset;
    public canvas : Canvas;

    settings : GameSettings;

    constructor(settings : GameSettings) {
        this.settings = settings;
    }

    intialize() : void{
        this.tileset = this.createTileset();
        this.canvas = this.createCanvas();
    }

    createTileset() : Tileset {
        let tilesetImage : HTMLImageElement = document.createElement("img");
        tilesetImage.src = this.settings.tilesetPath;
        tilesetImage.width = this.settings.tilesetWidth;
        tilesetImage.height = this.settings.tilesetHeight;

        return new Tileset(tilesetImage, this.settings.tilesetTileWidth, this.settings.tilesetTileHeight);
    }

    createCanvas() : Canvas {
        return new Canvas(80, 52);
    }
}