class Player extends GameObject {
    private input : CInput;

    constructor(x : number, y : number) {
        super(x, y);

        this.tile = new Tile(Chars.At, 15, 0);

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
        game.world.removeObject(this);
        this.x += dx;
        this.y += dy;
        game.world.addObject(this);
    }
}