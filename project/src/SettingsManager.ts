class SettingsManager {
    public static loadGameSettings() : GameSettings {
        return {
            tilesetPath: "Alloy_curses_12x12.png",
            tilesetWidth: 12*16,
            tilesetHeight: 12*16,
            tilesetTileWidth: 12,
            tilesetTileHeight: 12,
        };
    }
}