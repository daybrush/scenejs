class Util {
    static defineGetter(object, property, parent) {
        Object.defineProperty(object, property, {
            get: function() {
                return this[parent]["_" + property];
            }
        });
    }
    static defineSetter(object, property, parent) {
        Object.defineProperty(object, property, {
            set: function(value) {
                this[parent]["_" + property] = value;
                return this;
            }
        });
    }
    static defineGetterSetter(object, property, parent) {
        Util.defineGetter(object, property, parent);
        Util.defineSetter(object, property, parent);
    }
}
