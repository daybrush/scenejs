class Pipe {
    constructor() {
        this._pipe = {};
    }
    start(name, value) {
        this._pipe = {};
        this.setPipe(name, value);
    }
    setPipe(name, value) {
        this._pipe[name] = value;
        return this;
    }
    getPipe(name) {

        return this._pipe[name];
    }
}
