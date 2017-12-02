class Game implements ISerializable {
    public tileset : Tileset;
    public canvas : Canvas;
    public debug : Debug;
    public input : InputHandler;
    public palette : ColorPalette;
    public world : GameWorld;

    private cInput : CInput;
    private updateList : Continuous[];

    settings : GameSettings;

    constructor(settings : GameSettings) {
        this.settings = settings;
        this.updateList = [];
    }

    intialize() : void{
        this.debug = new Debug();
        this.palette = new ColorPalette(this.settings.colorPalette);
        this.tileset = this.createTileset();
        this.canvas = this.createCanvas();
        this.world = new GameWorld(this.settings.canvasWidth, this.settings.canvasHeight, this.canvas); // TODO make world width variable from canvas
        this.input = new InputHandler(this.canvas.canvas);
        this.initializeComponents();
        
        window.setInterval(this.update.bind(this), 1000 / game.settings.framerate)
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
        // TODO (now) catch errors and stuff
    }

    serialize() : string{
        return this.canvas.serialize(); // just not true :D
    }

    unserialize(data : string) : this{
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

    public addContinuous(obj : Continuous) {
        this.updateList.push(obj);
    }

    public removeContinuous(obj : Continuous) {
        this.updateList.splice(this.updateList.indexOf(obj), 1);
    }

    private update() {
        for(let obj of this.updateList) {
            obj.update();
        }
    }
}