class GameWorld {
    public width : number;
    public height : number;
    private canvas : Canvas;

    private objectGrid : GameObject[][][];

    constructor(width : number, height : number, canvas : Canvas) {
        this.width = width;
        this.height = height;
        this.canvas = canvas;

        this.objectGrid = ArrayUtils.get2DArray<GameObject[]>(width, height, []);
    }

    public addObject(obj : GameObject) {
        this.objectGrid[obj.x][obj.y].push(obj);
        this.refreshAtPos(obj.x, obj.y);
    }

    public removeObject(obj : GameObject) {
        let stack : GameObject[] = this.objectGrid[obj.x][obj.y];
        let index : number = stack.indexOf(obj);
        if (index === -1) {return;}
        stack.splice(index, 1);
        this.refreshAtPos(obj.x, obj.y);
    }

    public refreshAtPos(x : number, y : number) {
        let tile : Tile;
        if (this.objectGrid[x][y].length !== 0) {
            tile = this.objectGrid[x][y][this.objectGrid[x][y].length-1].tile;
        } else {
            tile = {
                tileID: 0,
                colorID: 0,
                bgColorID: 0,
            };
        }
        this.canvas.setTile(x, y, tile);
    }
}