class Component {
    public dead : boolean = false; // freed = ready for deletion (external references are removed)

    public free() {
        this.dead = true;
    }
}