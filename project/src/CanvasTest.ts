class CanvasTest {
    // components
    cInput : CInput;

    tile : Tile | null = null;
    selection : Rect | null = null;

    constructor() {
        this.initializeComponents();
        this.initCanvas();
    }

    initCanvas() {
        let canvas = game.canvas;

        for(let x = 0; x < canvas.width; x++)
        for(let y = 0; y < canvas.height; y++)
        {
            let tileID = Math.floor(Math.random() * 256);
            let serial : number = y * game.settings.canvasWidth + x;
            let colorID = 0;
            let bgColorId = 0;

            if (serial < 256) {
                colorID = Colors.white;
                tileID = y * game.settings.canvasWidth + x;
            } else 
            if (serial < 256 + game.palette.numberOfCOlors) {
                colorID = serial - 256;
                tileID = Chars.Full;
            } else
            if (serial < 256 + game.palette.numberOfCOlors * 2) {

                bgColorId = serial - 256 - game.palette.numberOfCOlors;
                tileID = Chars.Square;
            }
            canvas.setTile(x, y, new Tile(tileID, colorID, bgColorId));
        }
    }

    
    initializeComponents() {
        this.cInput = new CInput(this.onClick.bind(this), this.processKey.bind(this));
    }

    private processKey(key : string) {
        game.debug.log("key: " + key)

        if (key === "Shift") {
            this.selection = null; // TODO do this in an "up" event (for clarity and robustness)
        }
    }

    private onClick(x : number, y : number) {
        let xx = Math.floor(x / game.tileset.tileWidth);
        let yy = Math.floor(y / game.tileset.tileHeight);
        let serial : number = yy * game.settings.canvasWidth + xx;
        let tile : Tile = game.canvas.getTileAt(xx, yy);

        if (this.tile === null || game.input.isDown("Control")) {
            this.tile = tile.clone();
        } else
        if (serial < 256) {
            this.tile.tileID = tile.tileID;
        } else 
        if (serial < game.palette.numberOfCOlors + 256) {
            this.tile.colorID = tile.colorID;
        } else 
        if (serial < game.palette.numberOfCOlors * 2 + 256) {
            this.tile.bgColorID = tile.bgColorID;
        } else 
        if (game.input.isDown("Shift")) {
            if (!this.selection) {
                this.selection = new Rect(xx, yy, 0, 0);
            } else {
                //rect mode
                let dx = xx - this.selection.x;
                let dy = yy - this.selection.y;
                if (dx < 0) {this.selection.x += dx;}
                if (dy < 0) {this.selection.y += dy;}
                this.selection.w = Math.abs(dx) + 1;
                this.selection.h = Math.abs(dy) + 1;

                
                for(let x = this.selection.x; x < this.selection.x + this.selection.w; x++)
                for(let y = this.selection.y; y < this.selection.y + this.selection.h; y++) {
                    game.canvas.setTile(x, y, this.tile);
                }

                this.selection = null;
            }
        } else {
            game.canvas.setTile(xx, yy, this.tile);
        }
    }
}