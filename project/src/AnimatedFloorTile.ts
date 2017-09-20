class AnimatedFloorTile extends GameObject implements Continuous{
    private tiles : Tile[];
    private currentIndex : number;

    constructor(x : number, y : number, tiles : Tile[], startIndex? : number) {
        super(x, y);
        this.tiles = tiles;
        this.currentIndex = startIndex || 0;
        this.tile = this.tiles[this.currentIndex]; // TODO safety

        let self = this;
        window.setTimeout( // TODO : ohnononono
            window.setInterval(function() {
                self.update();
            },
            125), 125);
    }

    public update() {
        this.currentIndex++;
        if (this.currentIndex >= this.tiles.length) {
            this.currentIndex = 0;
        }
        if (this.tiles.length > 0) {
            this.tile = this.tiles[this.currentIndex];
        }

        game.world.refreshAtPos(this.x, this.y);
    }
}