interface OnClickFunction {
    (x : number, y : number) : void;
}

interface OnKeyPressFunction {
    (key : string) : void;
}

class CInput extends Component {
    public onClick : OnClickFunction;
    public onKeyPress : OnKeyPressFunction;

    constructor(onClick : OnClickFunction | null, onKeyPress : OnKeyPressFunction | null) {
        super();
        
        this.onClick = onClick? onClick : function () {};
        this.onKeyPress = onKeyPress? onKeyPress : function () {};

        game.input.addListener(this);
    }

    public free() {
        game.input.removeListener(this);
        super.free();
    }

    public isDown(key : string) : boolean {
        return game.input.isDown(key); // pass job to input handler
    }
}