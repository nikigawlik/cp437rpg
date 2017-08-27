interface OnClickFunction {
    (x : number, y : number) : void;
}

class CInput extends Component {
    public onClick : OnClickFunction;

    constructor(onClick : OnClickFunction | null) {
        super();
        this.onClick = onClick? onClick : function () {};
        game.input.addListener(this);
    }

    public free() {
        game.input.removeListener(this);
        super.free();
    }
}