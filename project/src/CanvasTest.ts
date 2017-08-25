class CanvasTest {
    constructor() {
        let canvas = game.canvas;

        for(let x = 0; x < canvas.width; x++)
        for(let y = 0; y < canvas.height; y++)
        {
            let tileID = Math.floor(Math.random() * 256);
            canvas.setTile(x, y, tileID);
        }
    }
}