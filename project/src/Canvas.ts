class Canvas {
    width : number;
    height : number;
    displayGrid : number[][];
    canvas : HTMLCanvasElement;
    backgroundStyle : String = "black";
    
    constructor(width : number, height : number) {
        this.width = Math.floor(width);
        this.height = Math.floor(height);
        
        this.displayGrid = ArrayUtils.get2DArray<number>(this.width, this.height, 0);
        
        // initianlize canvas
        this.canvas = document.createElement("canvas");
        this.canvas.width = this.width * game.tileset.tileWidth;
        this.canvas.height = this.height * game.tileset.tileHeight;


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

    setTile(x : number, y: number, tileId : number) {
        this.displayGrid[x][y] = tileId;
        this.refreshTile(x, y);
    }

    refreshTile(x, y) {
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
            this.displayGrid[x][y], 
            x * game.tileset.tileWidth, 
            y * game.tileset.tileHeight, 
            game.tileset.tileWidth, 
            game.tileset.tileHeight
        );
    }
}