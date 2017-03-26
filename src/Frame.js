class Frame {
    static addRole(role) {
        const framePrototype = Frame.prototype;
        const _role = Capitalize(role);
        const obj = {};

        Object.defineProperty(framePrototype, "set" + _role, function(property, value) {
            this.set(role, property, value);
        });
        Object.defineProperty(framePrototype, "get" + _role, function(property) {
            return this.get(role, property);
        });
    }
    constructor() {
        this.names = {};
        this.roles = {};
        this.updateNumber = 0;
    }
    load(properties) {
        let value, role;
        for(let property in properties) {
            value = properties[property];
            if(this.roles.hasOwnProperty(property)) {
                if(!isObject(value))
                    continue;

                //role, properties
                this.set(property, value);
                continue;
            }

            //role, property, value
            this.set("property", property, value);
        }
        return this;
    }
    _set(role, property, value) {
        ++this.updateNumber;
        this.roles[role][property] = value;
    }
    set(role, property, value) {
        if(typeof role === "object") {
            this.load(role);
            return this;
        }
        if(typeof property === "object") {
            //role, properties
            for(let name in property) {
                //role, property, value
                this._set(role, name, property[name]);
            }
            return this;
        }
        this._set(role, property, value);
        return this;
    }
    get(role, property) {
        return this.roles[role][property];
    }
    remove(role, property) {
        this.updating = true;
        delete this.roles[role][property];
    }
}
