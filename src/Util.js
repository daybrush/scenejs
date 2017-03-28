const FUNCTIONS = {
    "get": function() {
        return this[parent]["_" + property];
    },
    "set": function() {
        return this[parent]["_" + property];
    }
}

/*@export */const camelize = function camelize(str) {
    return str.replace(/[\s-_]([a-z])/g, function(all, letter) {
        return letter.toUpperCase();
    });
}
/*@export */const assign = function(object, ...objects) {
    const length = objects.length;
    let i, j, obj;
    for(i = 0; i < length; ++i) {
        obj = objects[i];
        if(!isObject(obj))
            continue;

        for(j in obj) {
            objects[j] = obj[j];
        }
    }
}
/*@export */const defineProperty = function(object, property, func) {
    Object.defineProperty(object, property, func);
}
/*@export */const defineGetter = function(object, property, parent) {
    defineProperty(object, property, {
        get: FUNCTIONS["get"]
    });
}
/*@export */const defineSetter = function(object, property, parent) {
    Object.defineProperty(object, property, {
        set: FUNCTIONS["set"]
    });
}
/*@export */const defineGetterSetter = function(object, property, parent) {
    Object.defineProperty(object, property, {
        get: FUNCTIONS["get"],
        set: FUNCTIONS["set"]
    });
}

/*@export */const isUndefined = function(value) {
    return (typeof value === "undefined");
}

/*@export */const isObject = function(value) {
    return (typeof value === "object");
}
