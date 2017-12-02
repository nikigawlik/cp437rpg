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
    //     let stack : GameObject[] = this.getObjectsAt(x, y);
        
    //     if (stack.length === 0) {
    //         return 0;
    //     }

    //     let biggest : GameObject = stack.reduce(function(a : GameObject, b : GameObject) { 
    //         return a.collisionHeight > b.collisionHeight? a : b;
    //     }
    //     );

    //     return biggest.collisionHeight;
    // }

    public canEnter(obj: GameObject | null, x : number, y : number) : boolean{
        let stack : GameObject[] = this.getObjectsAt(x, y);
        
        if (stack.length === 0) {
            return true;
        }

        let other = stack[stack.length - 1];

        let height = obj !== null ? obj.collisionHeight : 0;

        return Math.abs(height) + Math.abs(other.collisionHeight) < 1;  // definition of collision formula
    }

    public canSee(x1 : number, y1 : number, x2 : number, y2 : number) : boolean{
        let startX : number;
        let startY : number;
        let endX : number;
        let endY : number;
        
        if (x1 > x2) {
            startX = x2 + 0.5;
            startY = y2 + 0.5;
            endX = x1 + 0.5;
            endY = y1 + 0.5;
        }
        else {
            startX = x1 + 0.5;
            startY = y1 + 0.5;
            endX = x2 + 0.5;
            endY = y2 + 0.5;
        }

        let last : number = startY;
        let current : number;
        for(let i : number = 0; Math.abs(i) < Math.abs(endX - startX); i += Utils.sign(endX - startX)) {
            let dx : number = i + 0.5;
            let dy : number = (endY - startY) * i / (endX - startX);
            current = startY + dy;

            let xx : number = startX + dx;
            if (this.testBounds(last, current, xx)) {
                return false;
            }

            last = current;
        }

        current = endY;
        
        let xx : number = endX - 0.5;
        if (this.testBounds(last, current, xx)) {
            return false;
        }

        return true;
    }

    private testBounds(last : number, current: number, xx : number) : boolean {
        let lower = Math.floor(Math.min(last, current));
        let upper = Math.ceil(Math.max(last, current)) - 1;

        for(let yy : number = lower; yy <= upper; yy++) {
            if (!game.world.canEnter(null, xx, yy)) {
                return true;
            }
        }
        return false;
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
                else if (tile.tileID === 71) {
                    new Floor(x, y, new Tile(0, 0, tile.bgColorID)); // TODO differing sizes save vs. game
                    new Goblin(x, y);
                }
                else if (tile.tileID === Chars.At) {
                    new Floor(x, y, new Tile(0, 0, tile.bgColorID)); // TODO differing sizes save vs. game
                    new Player(x, y);
                }
                else if (tile.tileID >= 128) {
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
        let stack : GameObject[] = this.getObjectsAt(obj.x, obj.y);
        let index : number = stack.indexOf(obj);
        if (index === -1) {return;}
        stack.splice(index, 1);
        this.refreshAtPos(obj.x, obj.y);
    }

    public refreshAtPos(x : number, y : number) {
        let obj : GameObject | null = this.getTopAt(x, y);
        let tile : Tile = obj != null? obj.tile : Tile.EMPTY;
        this.canvas.setTile(x, y, tile);
    }

    public getObjectsAt(x : number, y : number) : GameObject[] {
        if (x < 0 || x >= this.width || y < 0 || y >= this.height) {
            return [];
        }

        return this.objectGrid[x][y];
    }

    public getTopAt(x : number, y : number) : GameObject | null {
        let objects : GameObject[] = this.getObjectsAt(x, y);

        let obj = null;

        for (let i : number = objects.length - 1; i >= 0; i--) {
            if (objects[i].visible) {
                obj = objects[i];
                break;
            }
        }

        return obj
    }
}