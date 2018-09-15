import { ROLES, MAXIMUM, FIXED, ALIAS } from "./consts";
import PropertyObject from "./PropertyObject";
export function setAlias(name, alias) {
    ALIAS[name] = alias;
}
export function setRole(names, isProperty, isFixedProperty) {
    var length = names.length;
    var roles = ROLES;
    var fixed = FIXED;
    for (var i = 0; i < length - 1; ++i) {
        !roles[names[i]] && (roles[names[i]] = {});
        roles = roles[names[i]];
        if (isFixedProperty) {
            !fixed[names[i]] && (fixed[names[i]] = {});
            fixed = fixed[names[i]];
        }
    }
    isFixedProperty && (fixed[names[length - 1]] = true);
    roles[names[length - 1]] = isProperty ? true : {};
}
export function getType(value) {
    var type = typeof value;
    if (type === "object") {
        if (isArray(value)) {
            return "array";
        }
        else if (value instanceof PropertyObject) {
            return "property";
        }
    }
    else if (type === "string" || type === "number") {
        return "value";
    }
    return type;
}
export function toFixed(num) {
    return Math.round(num * MAXIMUM) / MAXIMUM;
}
export function isInProperties(roles, args, isCheckTrue) {
    var length = args.length;
    var role = roles;
    if (length === 0) {
        return false;
    }
    for (var i = 0; i < length; ++i) {
        if (role === true) {
            return false;
        }
        role = role[args[i]];
        if (!role || (!isCheckTrue && role === true)) {
            return false;
        }
    }
    return true;
}
export function isRole(args, isCheckTrue) {
    return isInProperties(ROLES, args, isCheckTrue);
}
export function isFixed(args) {
    return isInProperties(FIXED, args, true);
}
export function isUndefined(value) {
    return (typeof value === "undefined");
}
export function isObject(value) {
    return value && (typeof value === "object");
}
export function isArray(value) {
    return Array.isArray(value);
}
export function isString(value) {
    return typeof value === "string";
}
export function has(object, name) {
    return Object.prototype.hasOwnProperty.call(object, name);
}
export function splitUnit(text) {
    var matches = /^([^\d|e|\-|\+]*)((?:\d|\.|-|e-|e\+)+)(\S*)$/g.exec(text);
    if (!matches) {
        return { prefix: "", unit: "", value: NaN };
    }
    var prefix = matches[1];
    var value = matches[2];
    var unit = matches[3];
    return { prefix: prefix, unit: unit, value: parseFloat(value) };
}
// export function camelize(str: string) {
// 	return str.replace(/[\s-_]([a-z])/g, (all, letter) => letter.toUpperCase());
// }
export function decamelize(str) {
    return str.replace(/([a-z])([A-Z])/g, function (all, letter, letter2) { return letter + "-" + letter2.toLowerCase(); });
}
//# sourceMappingURL=utils.js.map