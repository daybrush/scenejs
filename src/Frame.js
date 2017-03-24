class Frame {
    constructor() {
        this.names = {};
        this.roles = {};
    }
    set(role, property, value) {
        this.roles[role][property] = value;
        return this;
    }
    get(role, property) {
        return this.roles[role][property];
    }
    remove(role, property) {
        delete this.roles[role][property];
    }
}
