
/*@export */const defineGetter = function(object, property, parent) {
    Object.defineProperty(object, property, {
        get: function() {
            return this[parent]["_" + property];
        }
    });
}
/*@export */const defineSetter = function(object, property, parent) {
    Object.defineProperty(object, property, {
        set: function(value) {
            this[parent]["_" + property] = value;
            return this;
        }
    });
}
/*@export */const defineGetterSetter = function(object, property, parent) {
    Util.defineGetter(object, property, parent);
    Util.defineSetter(object, property, parent);
}

/*@export */const isUndefined = function(value) {
    return (typeof value === "undefined");
}

/*@export */const isObject = function(value) {
    return (typeof value === "object");
}
