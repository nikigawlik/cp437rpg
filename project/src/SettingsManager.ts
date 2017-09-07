class SettingsManager {
    public static loadGameSettings() : GameSettings {
        return {
            tilesetPath: "Alloy_curses_12x12.png",
            tilesetWidth: 12*16,
            tilesetHeight: 12*16,
            tilesetTileWidth: 12,
            tilesetTileHeight: 12,
            colorPalette: [
                "#000", "#f00", "#0f0", "#00f",
                "#ff0", "#0ff", "#f0f", "#000",
                "#000", "#000", "#000", "#000",
                "#444", "#888", "#ccc", "#fff",
                ],
            canvasWidth: 64,
            canvasHeight: 32,
        };
    }
}