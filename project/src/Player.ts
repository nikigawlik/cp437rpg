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
            case "w": dy = -1; break;
            case "a": dx = -1; break;
            case "s": dy = 1; break;
            case "d": dx = 1; break;
            default: return;
        }

        this.moveRelative(dx, dy);
    }
}