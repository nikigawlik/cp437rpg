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

    // will probably come in handy later
    // public getHeightAt(x : number, y : number) : number {
    //     let stack : GameObject[] = this.objectGrid[x][y];
        
    //     if (stack.length === 0) {
    //         return 0;
    //     }

    //     let biggest : GameObject = stack.reduce(function(a : GameObject, b : GameObject) { 
    //         return a.collisionHeight > b.collisionHeight? a : b;
    //     }
    //     );

    //     return biggest.collisionHeight;
    // }

    public canEnter(obj: GameObject, x : number, y : number) : boolean{
        let stack : GameObject[] = this.objectGrid[x][y];
        
        if (stack.length === 0) {
            return true;
        }

        let other = stack[stack.length - 1];

        return Math.abs(obj.collisionHeight) + Math.abs(other.collisionHeight) < 1;  // definition of collision formula
    }

    public loadFromSave(saveName : string) {
        this.fillGridEmpty();
        
        let obj = {
            displayGrid: game.canvas.displayGrid,
            // aniBoxes: [new Rect(45, 13, 19, 8)], // TODO remove this test value (implement aniboxes in editor/save)
            aniBoxes: [],
            width: game.canvas.width,
            height: game.canvas.height,
        }

        let grid : Tile[][] = obj.displayGrid;
        let aniBoxes : Rect[] = obj.aniBoxes? obj.aniBoxes : [];
        
        for(let x = 0; x < obj.width; x++)
        for(let y = 0; y < obj.height; y++) {
            let tile : Tile = new Tile(grid[x][y].tileID, grid[x][y].colorID, grid[x][y].bgColorID);
            let ani : boolean = false;
            
            // TODO remove this when no longer needed
            // Change tiles that appear empty to actually be the empty tile
            if (tile.bgColorID === tile.colorID) {
                tile.tileID = 0;
            }

            for(let box of aniBoxes) {
                if (box.containsPoint(x, y)) {
                    let tiles : Tile[] = [];
                    for(let offsetX = box.x + box.w - 1; offsetX > box.x; offsetX--) {
                        let gridObj = grid[offsetX][y];
                        tiles.push(new Tile(gridObj.tileID, gridObj.colorID, gridObj.bgColorID));
                    }
                    let anitile : AnimatedFloor = new AnimatedFloor(x, y, tiles, tiles.length - 1 - (x - box.x));

                    this.insertObject(anitile, 0); // TODO differing sizes save vs. game

                    ani = true;
                    break;
                }
            }

            if (!ani) {
                // stupid heuristic for testing
                if (y * obj.width + x < 256) {
                    // do nothing
                }
                else if (tile.tileID === Chars.At) {
                    new Floor(x, y, new Tile(0, 0, tile.bgColorID)); // TODO differing sizes save vs. game
                    new Player(x, y);
                }
                else if (tile.tileID > 179) {
                    new Wall(x, y, tile); // TODO differing sizes save vs. game
                }
                else {
                    new Floor(x, y, tile); // TODO differing sizes save vs. game
                }
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
            tile = new Tile(0, 0, 0);
        }
        this.canvas.setTile(x, y, tile);
    }

    public getObjectsAt(x : number, y : number) : GameObject[] {
        return this.objectGrid[x][y];
    }
}