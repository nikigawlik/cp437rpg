class Canvas implements ISerializable{
    width : number;
    height : number;
    displayGrid : Tile[][];
    canvas : HTMLCanvasElement;
    backgroundStyle : string = "black";

    tile : Tile | null = null;
    selection : Rect | null = null;

    // components
    cInput : CInput;
    
    constructor(width : number, height : number) {
        this.width = Math.floor(width);
        this.height = Math.floor(height);
        
        this.displayGrid = ArrayUtils.get2DArray<Tile>(this.width, this.height, {tileID: 0, colorID: 0, bgColorID: 0});
        
        // initianlize canvas
        this.canvas = document.createElement("canvas");
        this.canvas.width = this.width * game.tileset.tileWidth;
        this.canvas.height = this.height * game.tileset.tileHeight;

        if (game.settings.fitCanvas) {
            this.canvas.className = "crisp-rendering autoscale"; // reference style.css file
        } else {
            this.canvas.className = "crisp-rendering"; // reference style.css file
            this.canvas.style.width = (game.settings.canvasScale * this.canvas.width) + "px";
        }

        let ctx : CanvasRenderingContext2D | null = this.canvas.getContext("2d");
        if (!ctx) {return;}
        // set fill style
        ctx.fillStyle = "black";

        // clear canvas 
        ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        // append canvas to page
        let container : HTMLElement | null = document.getElementById("canvas_container");
        if (container) {
            container.appendChild(this.canvas);
        }
    }

    serialize() : string {
        let obj = { // TODO interface
            displayGrid: this.displayGrid, // TODO use function to access just in case
            version: 0,
            width: this.width,
            height: this.height,  
        };
        return JSON.stringify(obj);
    }

    unserialize(data : string) : this {
        let obj : any = JSON.parse(data); // TODO optimize this :'D
        let grid : Tile[][] = obj.displayGrid;
        
        for(let x = 0; x < obj.width; x++)
        for(let y = 0; y < obj.height; y++) {
            this.setTile(x, y, grid[x][y]);
        }

        return this;
    }

    initializeComponents() {
        this.cInput = new CInput(
            (x : number, y : number) => this.onClick(x, y),
            (key : string) => this.processKey(key) // TODO proper stuff
            );
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

        if (this.tile === null || game.input.isDown("Control")) {
            this.tile = {
                tileID: this.getTileAt(xx, yy).tileID,
                colorID: this.getTileAt(xx, yy).colorID,
                bgColorID: this.getTileAt(xx, yy).bgColorID,
            };
        } else
        if (serial < 256) {
            this.tile.tileID = this.getTileAt(xx, yy).tileID;
        } else 
        if (serial < game.palette.numberOfCOlors + 256) {
            this.tile.colorID = this.getTileAt(xx, yy).colorID;
        } else 
        if (serial < game.palette.numberOfCOlors * 2 + 256) {
            this.tile.bgColorID = this.getTileAt(xx, yy).bgColorID;
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
                    this.setTile(x, y, this.tile);
                }

                this.selection = null;
            }
        } else {
            this.setTile(xx, yy, this.tile);
        }
    }

    setTile(x : number, y: number, tile : Tile) {
        // TODO why this shit no work???
        // this.displayGrid[x][y].tileID = tile.tileID;
        // this.displayGrid[x][y].colorID = tile.colorID;
        // this.displayGrid[x][y].bgColorID = tile.bgColorID;
        this.displayGrid[x][y] = {
            tileID: tile.tileID,
            colorID: tile.colorID,
            bgColorID: tile.bgColorID,
        };
        this.refreshTile(x, y);
    }

    getTileAt(x : number, y : number) : Tile {
        x = Math.min(Math.max(0, x), this.displayGrid.length);
        y = Math.min(Math.max(0, y), this.displayGrid[x].length);
        return this.displayGrid[x][y];
    }

    private refreshTile(x, y) {
        let ctx : CanvasRenderingContext2D | null = this.canvas.getContext("2d");
        if (!ctx) {return;}

        let tile : Tile = this.displayGrid[x][y];

        // draw background
        ctx.fillStyle = game.palette.getColor(tile.bgColorID);
        ctx.fillRect(
            x * game.tileset.tileWidth, 
            y * game.tileset.tileHeight, 
            game.tileset.tileWidth, 
            game.tileset.tileHeight
        )

        // draw foreground
        game.tileset.drawTile(
            this.canvas, 
            tile.tileID, 
            tile.colorID, 
            x * game.tileset.tileWidth, 
            y * game.tileset.tileHeight, 
            game.tileset.tileWidth, 
            game.tileset.tileHeight
        );
    }
}