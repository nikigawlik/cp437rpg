class GameWorld {
    public width : number;
    public height : number;
    private canvas : Canvas;

    private objectGrid : GameObject[][][];

    constructor(width : number, height : number, canvas : Canvas) {
        this.width = width;
        this.height = height;
        this.canvas = canvas;

        this.fillGridEmpty();
    }

    public loadFromSave(saveName : string) {
        this.fillGridEmpty();

        let data : string | null = localStorage.getItem(saveName);
        if (!data) {return;}
        
        let obj : any = JSON.parse(data); // TODO optimize this :'D
        let grid : Tile[][] = obj.displayGrid;
        let aniBoxes : Rect[] = obj.aniBoxes? obj.aniBoxes : [];

        //TODO don't hack
        aniBoxes.push(new Rect(45, 13, 19, 8));
        
        for(let x = 0; x < obj.width; x++)
        for(let y = 0; y < obj.height; y++) {
            let tile : Tile = grid[x][y];
            let ani : boolean = false;
            for(let box of aniBoxes) {
                if (box.containsPoint(x, y)) {
                    let tiles : Tile[] = [];
                    for(let ibx = box.x + box.w - 1; ibx > box.x; ibx--) { // TODO name and stuff
                        tiles.push(grid[ibx][y]);
                    }
                    let anitile : AnimatedFloorTile = new AnimatedFloorTile(x, y, tiles, tiles.length - 1 - (x - box.x));

                    this.insertObject(anitile, 0); // TODO differing sizes save vs. game

                    ani = true;
                    break;
                }
            }
            if (!ani) {
                this.insertObject(new FloorTile(x, y, tile), 0); // TODO differing sizes save vs. game
            }
        }
    }

    public fillGridEmpty() {
        this.objectGrid = ArrayUtils.get2DArrayDynamic<GameObject[]>(this.width, this.height, (x : number, y : number) => []);
    }

    public addObject(obj : GameObject) {
        this.objectGrid[obj.x][obj.y].push(obj);
        this.refreshAtPos(obj.x, obj.y);
    }

    public insertObject(obj : GameObject, pos : number) {
        this.objectGrid[obj.x][obj.y].splice(pos, 0, obj);
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