class IngameTest {
    constructor() {
        game.world.loadFromSave("default");

        game.world.addObject(new Player(1, 6));
    }
}