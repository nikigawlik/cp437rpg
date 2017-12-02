enum GoblinStates {
    Follow,
    Idle,
}

class Goblin extends GameObject implements Continuous {
    private aiCounter = 0;
    private aiDelay = 15;
    private visionRange = 12;
    private target : GameObject | null = null;

    private moveCounter : number = 0;
    private moveDelay : number = 6;

    private cantSeeCounter : number = 0;
    private cantSeeDelay : number = 120;  // steps it takes to stop chase

    private state : number = GoblinStates.Idle;

    constructor(x : number, y : number) {
        super(x, y, new Tile(71, 2, 0))
        game.addContinuous(this);

        this.aiCounter = this.aiDelay;
        this.cantSeeCounter = this.cantSeeDelay;
    }

    public update() {
        switch (this.state) {
            case GoblinStates.Idle: 
                // exit condition
                if (this.target !== null) {
                    this.state = GoblinStates.Follow;
                    this.aiCounter = this.aiDelay;
                    break;
                }
                this.aiCounter = Math.max(this.aiCounter - 1, 0);
                if (this.aiCounter === 0) {
                    this.scanForPlayerTarget();
                }
            break;
            case GoblinStates.Follow: 
                // exit condition
                if (this.target === null) {
                    this.state = GoblinStates.Idle;
                    break;
                }
                if (!game.world.canSee(this.x, this.y, this.target.x, this.target.y)) {
                    this.cantSeeCounter--;
                    if (this.cantSeeCounter <= 0) {
                        this.cantSeeCounter = this.cantSeeDelay;
                        this.target = null;
                    }
                }
            break;
        }

        // movement
        let dx : number = 0;
        let dy : number = 0;

        // TODO check dead target
        if (this.target !== null) {
            let difx : number = this.target.x - this.x;
            let dify : number = this.target.y - this.y;

            // move lateral normally and straight when aligned
            if (Math.abs(dify) < Math.abs(difx)) {
                dx = Utils.sign(difx);
                dy = 0;
            } 
            else {
                dx = 0;
                dy = Utils.sign(dify);
            }
        }

        this.moveCounter = Math.max(this.moveCounter - 1, 0);
        if (this.moveCounter === 0 && (dx != 0 || dy != 0)) {
            this.moveCounter = this.moveDelay;
            this.moveRelative(dx, dy);
        }
    }

    private scanForPlayerTarget() {
        this.aiCounter = this.aiDelay
        // scan for player
        let done : boolean = false;
        for (let dx : number = -this.visionRange; dx <= this.visionRange && !done; dx++) 
        for (let dy : number = -this.visionRange; dy <= this.visionRange && !done; dy++) {
            let obj : GameObject | null = game.world.getTopAt(this.x + dx, this.y + dy);
            if (obj !== null && obj instanceof Player) {
                // calc line of sight
                if (game.world.canSee(this.x, this.y, obj.x, obj.y)) {
                    this.target = obj;
                    done = true;
                }
            }
        }
    }
}