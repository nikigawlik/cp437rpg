class Player extends GameObject implements Continuous {
    private input : CInput;

    private moveCounter = 0;
    private moveDelay = 4;

    constructor(x : number, y : number) {
        super(x, y);

        this.tile = new Tile(Chars.At, 15, 0);

        this.initComponents();
        game.addContinuous(this);
    }

    private initComponents() {
        this.input = new CInput(null, this.onKeyPress.bind(this));
    }

    private onKeyPress(key : string) {
    }

    public update() {
        let dx = 0;
        let dy = 0;

        if (this.input.isDown("w")) {
            dy = -1;
        }
        if (this.input.isDown("a")) {
            dx = -1;
        }
        if (this.input.isDown("s")) {
            dy = 1;
        }
        if (this.input.isDown("d")) {
            dx = 1;
        }

        if ((dx || dy) && this.moveCounter === 0) {
            this.moveCounter = this.moveDelay + 1;
            this.moveRelative(dx, dy);
        }

        this.moveCounter = Math.max(this.moveCounter - 1, 0);
    }
}