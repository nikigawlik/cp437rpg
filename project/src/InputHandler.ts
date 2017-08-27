class InputHandler {
    mouseX : number;
    mouseY : number;
    isMouseDown : boolean;
    canvas : HTMLCanvasElement;

    constructor(canvas : HTMLCanvasElement) {
        this.canvas = canvas;

        this.hookUpEvents();
    }

    private hookUpEvents() {
        this.canvas.onclick = this.onClick;
        this.canvas.onmousedown = this.onMouseDown;
        this.canvas.onmouseup = this.onMouseUp;
        this.canvas.onmouseenter = this.onMouseEnter;
        this.canvas.onmouseleave = this.onMouseLeave;
        this.canvas.onmousemove = this.onMouseMove;
    }

    private onClick(event : MouseEvent) {
        let x = event.offsetX;
        let y = event.offsetY;
        // TODO rewrite this after entity & event system is in place
        game.debug.log(x, y);
    }

    private onMouseDown() {
        this.isMouseDown = true;
    }

    private onMouseUp() {
        this.isMouseDown = false;
    }

    private onMouseEnter() {
        //stub
    }

    private onMouseLeave() {
        this.isMouseDown = false;
    }

    private onMouseMove() {
        //stub
    }
}