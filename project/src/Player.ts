class Player extends GameObject {
    private input : CInput;
    private world : GameWorld;

    constructor(x : number, y : number, world : GameWorld) {
        super(x, y);
        this.world = world;

        this.tile = {
            tileID: Tiles.At,
            colorID: 15,
            bgColorID : 0,
        }

        this.initComponents();
    }

    private initComponents() {
        this.input = new CInput(null, this.onKeyPress.bind(this));
    }

    private onKeyPress(key : string) {
        let dx = 0;
        let dy = 0;
        switch (key) {
            case "w": dx = 0; dy = -1; break;
            case "a": dx = -1; dy = 0; break;
            case "s": dx = 0; dy = 1; break;
            case "d": dx = 1; dy = 0; break;
            default: return;
        }

        this.moveRelative(dx, dy);
    }

    public moveRelative(dx : number, dy : number) {
        this.world.removeObject(this);
        this.x += dx;
        this.y += dy;
        this.world.addObject(this);
    }
}