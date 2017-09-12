class Canvas implements ISerializable{
    width : number;
    height : number;
    displayGrid : Tile[][];
    canvas : HTMLCanvasElement;
    backgroundStyle : string = "black";
    
    constructor(width : number, height : number) {
        this.width = Math.floor(width);
        this.height = Math.floor(height);
        
        this.displayGrid = ArrayUtils.get2DArray<Tile>(this.width, this.height, new Tile(0, 0, 0));
        
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

    setTile(x : number, y: number, tile : Tile) {
        if(!tile) {return;}
        this.displayGrid[x][y] = tile.clone(); //TODO is cloning bad here?
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