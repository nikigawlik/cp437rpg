interface Tile {
    tileID: number,
    colorID: number,
}

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
        
        this.displayGrid = ArrayUtils.get2DArray<Tile>(this.width, this.height, {tileID: 0, colorID: 0});
        
        // initianlize canvas
        this.canvas = document.createElement("canvas");
        this.canvas.width = this.width * game.tileset.tileWidth;
        this.canvas.height = this.height * game.tileset.tileHeight;
        this.canvas.className = "crisp-rendering autoscale"; // reference style.css file

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
            this.selection = null; // TODO do this in and "up" event (for clarity and robustness)
        }
    }

    private onClick(x : number, y : number) {
        let xx = Math.floor(x / game.tileset.tileWidth);
        let yy = Math.floor(y / game.tileset.tileHeight);

        if (this.tile === null || yy * game.settings.canvasWidth + xx < 256 || game.input.isDown("Control")) {
            this.tile = this.getTileAt(xx, yy);
        } else 
        if (game.input.isDown("Shift")) {
            if (!this.selection) {
                this.selection = new Rect(xx, yy, 0, 0);
            } else {
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
        this.displayGrid[x][y] = tile;
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

        // draw background
        ctx.fillRect(
            x * game.tileset.tileWidth, 
            y * game.tileset.tileHeight, 
            game.tileset.tileWidth, 
            game.tileset.tileHeight
        )

        // draw foreground
        game.tileset.drawTile(
            this.canvas, 
            this.displayGrid[x][y].tileID, 
            this.displayGrid[x][y].colorID, 
            x * game.tileset.tileWidth, 
            y * game.tileset.tileHeight, 
            game.tileset.tileWidth, 
            game.tileset.tileHeight
        );
    }
}