/**
 * This file initializes the whole engine and should be executed last
 */
let game : Game;
window.onload = function () {
    game = new Game(SettingsManager.loadGameSettings());
    game.intialize();

    setTimeout(function () {
        let t = new TestController();
    }, 300);
}