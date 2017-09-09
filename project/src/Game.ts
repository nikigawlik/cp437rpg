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
}

class Game implements ISerializable {
    public tileset : Tileset;
    public canvas : Canvas;
    public debug : Debug;
    public input : InputHandler;
    public palette : ColorPalette;

    private cInput : CInput;

    settings : GameSettings;

    constructor(settings : GameSettings) {
        this.settings = settings;
    }

    intialize() : void{
        this.debug = new Debug();
        this.palette = new ColorPalette(this.settings.colorPalette);
        this.tileset = this.createTileset();
        this.canvas = this.createCanvas();
        this.input = new InputHandler(this.canvas.canvas);
        this.canvas.initializeComponents();
        this.initializeComponents();
    }

    private initializeComponents() {
        this.cInput = new CInput(null, this.onKeyPress.bind(this));
    }

    private onKeyPress(key : string) {
        if (key === "S") {
            this.saveGame("default");
        } else 
        if (key === "L") {
            this.loadGame("default");
        }
    }

    public saveGame(saveName : string) {
        localStorage.setItem(saveName, this.serialize());
    }

    public loadGame(saveName : string) {
        let item : string | null = localStorage.getItem(saveName);
        if (item) {
            this.unserialize(item);
        } else {
            game.debug.log("loading data failed");
        }
        // TODO catch errors and stuff
    }

    serialize() : string{
        // TODO create object with version and shit
        return this.canvas.serialize();
    }

    unserialize(data : string) : this{
        // TODO create object with version and shit
        this.canvas = this.canvas.unserialize(data); // might not actually change the canvas (look at implementation)
        return this;
    }

    createTileset() : Tileset {
        let tilesetImage : HTMLImageElement = document.createElement("img");
        tilesetImage.src = this.settings.tilesetPath;
        tilesetImage.width = this.settings.tilesetWidth;
        tilesetImage.height = this.settings.tilesetHeight;

        return new Tileset(tilesetImage, this.settings.tilesetTileWidth, this.settings.tilesetTileHeight);
    }

    createCanvas() : Canvas {
        return new Canvas(this.settings.canvasWidth, this.settings.canvasHeight);
    }
}