class Gun extends GameObject implements Continuous {
    private range = 64;
    private direction : number;
    private cooldown : number = 0;
    private shootDelay : number = 15;

    constructor(x : number, y : number) {
        super(x, y, new Tile(103, 14, 0));

        game.addContinuous(this);
    }

    public update() {
        this.cooldown = Math.max(this.cooldown - 1, 0);
    }

    public shoot() {
        if (this.cooldown > 0) { return; }
        this.cooldown = this.shootDelay;

        let dx : number = this.direction === 0 ? 1 : (this.direction === 2 ? -1 : 0);
        let dy : number = this.direction === 3 ? 1 : (this.direction === 1 ? -1 : 0);

        for(let i : number = 0; i < this.range; i++) {
            let xx : number = this.x + dx * (i + 1);
            let yy : number = this.y + dy * (i + 1);

            if (game.world.canEnter(this, xx, yy)) {
                new Laser(xx, yy, this.direction);
            } else {
                break;
            }
        }
    }

    public aim(direction : number) {
        this.direction = direction;
    }
}