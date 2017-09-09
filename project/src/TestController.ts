class TestController {
    input : CInput;
    testClass : CanvasTest | IngameTest;

    constructor() {
        this.input = new CInput(null, this.onKeyPress.bind(this));
        this.testClass = new CanvasTest();
    }

    private onKeyPress(key : string) {
        if (key === "P") {
            if (this.testClass instanceof CanvasTest) {
                this.testClass = new IngameTest();
            } else {
                this.testClass = new CanvasTest();
            }
        }
    }
}