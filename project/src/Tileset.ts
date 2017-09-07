class Tileset {
    tileWidth : number;
    tileHeight : number;
    tilesHorizontal : number;
    tilesVertical : number;
    image : HTMLImageElement;
    bufferTile : HTMLCanvasElement;

    constructor(image : HTMLImageElement, tileWidth : number, tileHeight : number) {
        this.image = image;
        this.tileWidth = Math.floor(tileWidth);
        this.tileHeight = Math.floor(tileHeight);

        // calculate other attributes
        this.tilesHorizontal = Math.floor(this.image.width / this.tileWidth);
        this.tilesVertical = Math.floor(this.image.height / this.tileHeight);

        // create a little buffer canvas for image processing
        this.bufferTile = document.createElement("canvas");
        this.bufferTile.width = this.tileWidth;
        this.bufferTile.height = this.tileHeight;
    }

    getTileArea(tileId : number) : Rect | null {
        if (tileId < 0 || tileId >= this.tilesHorizontal * this.tilesVertical) { return null; }

        let xx : number = tileId % this.tilesHorizontal;
        let yy : number = Math.floor(tileId / this.tilesHorizontal);
        return new Rect(xx * this.tileWidth, yy * this.tileHeight, this.tileWidth, this.tileHeight);
    }

    drawTile(canvas : HTMLCanvasElement, tileId : number, colorId : number, x : number, y : number, w : number, h : number) {
        let tile : Rect | null = this.getTileArea(tileId);
        let ctx : CanvasRenderingContext2D | null = canvas.getContext("2d");
        if (ctx === null || tile === null) { return; }

        let bufCtx : CanvasRenderingContext2D | null = this.bufferTile.getContext("2d");
        if (bufCtx === null) { return; }

        bufCtx.globalCompositeOperation = "source-over";
        bufCtx.fillStyle = game.palette.getColor(colorId);
        bufCtx.fillRect(0, 0, this.tileWidth, this.tileHeight);

        bufCtx.globalCompositeOperation = "destination-in";
        bufCtx.drawImage(this.image, tile.x, tile.y, tile.w, tile.h, 0, 0, w, h);

        ctx.drawImage(this.bufferTile, x, y);
    }
}