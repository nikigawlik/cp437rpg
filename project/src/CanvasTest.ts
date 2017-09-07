class CanvasTest {
    constructor() {
        let canvas = game.canvas;

        for(let x = 0; x < canvas.width; x++)
        for(let y = 0; y < canvas.height; y++)
        {
            let tileID = Math.floor(Math.random() * 256);
            if ( y * game.settings.canvasWidth + x < 256) {
                tileID = y * game.settings.canvasWidth + x;
            }
            let colorID = Math.floor(Math.random() * game.palette.numberOfCOlors);
            canvas.setTile(x, y, {tileID: tileID, colorID: colorID});
        }
    }
}