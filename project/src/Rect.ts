class Rect {
    public x : number;
    public y : number;
    public w : number;
    public h : number;
    constructor(x : number, y : number, w : number, h : number) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
    }

    public containsPoint(x : number, y : number) {
        return x >= this.x && x < this.x + this.w && y > this.y && y < this.y + this.h;
    }
}