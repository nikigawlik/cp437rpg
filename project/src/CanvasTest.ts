class CanvasTest {
    constructor() {
        let canvas = game.canvas;

        for(let x = 0; x < canvas.width; x++)
        for(let y = 0; y < canvas.height; y++)
        {
            let tileID = Math.floor(Math.random() * 256);
            let serial : number = y * game.settings.canvasWidth + x;
            let colorID = 0;
            let bgColorId = 0;

            if (serial < 256) {
                colorID = game.palette.numberOfCOlors - 1; // TODO name colors or something
                tileID = y * game.settings.canvasWidth + x;
            } else 
            if (serial < 256 + game.palette.numberOfCOlors) {
                colorID = serial - 256;
                tileID = Tiles.Full;
            } else
            if (serial < 256 + game.palette.numberOfCOlors * 2) {

                bgColorId = serial - 256 - game.palette.numberOfCOlors;
                tileID = Tiles.Square;
            }
            canvas.setTile(x, y, {tileID: tileID, colorID: colorID, bgColorID: bgColorId});
        }

        game.world.addObject(new Player(1, 6, game.world));
    }
}