class ColorPalette {
    private colors : string[];
    public readonly numberOfCOlors = 16;

    constructor(colors : string[]) {
        this.colors = [];
        for(let i = 0; i < this.numberOfCOlors; i++) {
            if (colors[i]) {
                this.colors[i] = colors[i];
            } else {
                this.colors[i] = "#000";
            }
        }
    }

    public getColor(id : number) : string {
        return this.colors[id];
    }
}