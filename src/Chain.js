class Chain {
    constructor() {
        this._chain = {};
    }
    startChain(name, value) {
        this._chain = {};
        return this.setChain(name, value);
    }
    setChain(names, value) {
        const chain = this._chain;
        if(typeof name === "object") {
            for(let name in names) {
                chain[name]  = names[name];
            }
            return this;
        }
        chain[names] = value;
        return this;
    }
    getChain(names) {
        const chain = this._chain;
        if(typeof names === "object") {
            return names.map(name => chain[name]);
        }
        return chain[names];
    }
    hasChain(names) {
        if(typeof names === "object") {
            return names.every((name) =>  this._chain.hasOwnProperty(name));
        }

        return this._chain.hasOwnProperty(names);
    }
}
