class Player extends GameObject implements Continuous {
    private input : CInput;

    private moveCounter : number = 0;
    private moveDelay : number = 4;

    private gun : Gun;

    constructor(x : number, y : number) {
        super(x, y, new Tile(Chars.At, 15, 0));

        this.collisionHeight = 0;

        this.initComponents();
        game.addContinuous(this);

        // add gun
        this.gun = new Gun(x, y);
        this.gun.visible = false;
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

        // handle gun
        this.gun.move(this.x, this.y);

        let d : number = -1;
        if (this.input.isDown("i")) {
            d = 1;
        }
        if (this.input.isDown("j")) {
            d = 2;
        }
        if (this.input.isDown("k")) {
            d = 3;
        }
        if (this.input.isDown("l")) {
            d = 0;
        }

        if (d != -1) {
            this.gun.aim(d);
            this.gun.shoot();
        }
    }
}