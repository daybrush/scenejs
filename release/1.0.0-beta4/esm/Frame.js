import { TRANSFORM, FILTER, ANIMATION, timingFunction, ALIAS } from "./consts";
import { isObject, isString, isArray, isRole, getType } from "./utils";
import { toPropertyObject, splitStyle, toObject } from "./utils/property";
import PropertyObject from "./PropertyObject";
function toInnerProperties(obj) {
    if (!obj) {
        return "";
    }
    var arrObj = [];
    for (var name_1 in obj) {
        arrObj.push(name_1 + "(" + obj[name_1] + ")");
    }
    return arrObj.join(" ");
}
function isPropertyObject(value) {
    return value instanceof PropertyObject;
}
/* eslint-disable */
function clone(target, toValue) {
    if (toValue === void 0) { toValue = false; }
    return merge({}, target, toValue);
}
function merge(to, from, toValue) {
    if (toValue === void 0) { toValue = false; }
    for (var name_2 in from) {
        var value = from[name_2];
        var type = getType(value);
        if (type === "property") {
            to[name_2] = toValue ? value.toValue() : value.clone();
        }
        else if (type === "array") {
            to[name_2] = value.slice();
        }
        else if (type === "object") {
            if (isObject(to[name_2]) && !(to[name_2] instanceof PropertyObject)) {
                merge(to[name_2], value, toValue);
            }
            else {
                to[name_2] = clone(value, toValue);
            }
        }
        else {
            to[name_2] = from[name_2];
        }
    }
    return to;
}
/* eslint-enable */
/**
* Animation's Frame
* @class Scene.Frame
* @param {Object} properties - properties
* @example
const frame = new Scene.Frame({
    display: "none"
    transform: {
        translate: "50px",
        scale: "5, 5",
    }
});
 */
var Frame = /*#__PURE__*/ (function () {
    function Frame(properties) {
        if (properties === void 0) { properties = {}; }
        this.properties = {};
        this.set(properties);
    }
    /**
    * get property value
    * @method Scene.Frame#get
    * @param {...Number|String|Scene.PropertyObject} args - property name or value
    * @example
    frame.get("display") // => "none", "block", ....
    frame.get("transform", "translate") // => "10px,10px"
    */
    Frame.prototype.get = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var value = this.raw.apply(this, args);
        var type = getType(value);
        if (type === "property") {
            return value.toValue();
        }
        else if (type === "object") {
            return clone(value, true);
        }
        else {
            return value;
        }
    };
    Frame.prototype.raw = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var properties = this.properties;
        var params = args[0] in ALIAS ? ALIAS[args[0]] : args;
        var length = params.length;
        for (var i = 0; i < length; ++i) {
            if (!isObject(properties)) {
                return undefined;
            }
            properties = properties[params[i]];
        }
        return properties;
    };
    /**
    * remove property value
    * @method Scene.Frame#remove
    * @param {...String} args - property name
    * @return {Scene.Frame} An instance itself
    * @example
    frame.remove("display")
    */
    Frame.prototype.remove = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var properties = this.properties;
        var params = args[0] in ALIAS ? ALIAS[args[0]] : args;
        var length = params.length;
        if (!length) {
            return this;
        }
        for (var i = 0; i < length - 1; ++i) {
            if (!isObject(properties)) {
                return this;
            }
            properties = properties[params[i]];
        }
        delete properties[params[length - 1]];
        return this;
    };
    /**
    * set property
    * @method Scene.Frame#set
    * @param {...Number|String|Scene.PropertyObject} args - property names or values
    * @return {Scene.Frame} An instance itself
    * @example
// one parameter
frame.set({
    display: "none",
    transform: {
        translate: "10px, 10px",
        scale: "1",
    },
    filter: {
        brightness: "50%",
        grayscale: "100%"
    }
});

// two parameters
frame.set("transform", {
    translate: "10px, 10px",
    scale: "1",
});

// three parameters
frame.set("transform", "translate", "50px");
    */
    Frame.prototype.set = function () {
        var _this = this;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var length = args.length;
        var params = args.slice(0, -1);
        var value = args[length - 1];
        if (params[0] in ALIAS) {
            this._set(ALIAS[params[0]], value);
        }
        else if (length === 2 && isArray(params[0])) {
            this._set(params[0], value);
        }
        else if (isObject(value)) {
            if (isArray(value)) {
                this._set(params, value);
            }
            else if (isPropertyObject(value)) {
                if (isRole(params)) {
                    this.set.apply(this, params.concat([toObject(value)]));
                }
                else {
                    this._set(params, value);
                }
            }
            else if (value instanceof Frame) {
                this.merge(value);
            }
            else {
                for (var name_3 in value) {
                    this.set.apply(this, params.concat([name_3, value[name_3]]));
                }
            }
        }
        else if (isString(value)) {
            if (isRole(params)) {
                var obj = toPropertyObject(value);
                if (isObject(obj)) {
                    this.set.apply(this, params.concat([obj]));
                }
                return this;
            }
            else {
                var styles = splitStyle(value);
                styles.forEach(function (style) {
                    _this.set.apply(_this, params.concat([style]));
                });
                if (styles.length) {
                    return this;
                }
            }
            this._set(params, value);
        }
        else {
            this._set(params, value);
        }
        return this;
    };
    /**
    * check that has property.
    * @method Scene.Frame#has
    * @param {...String} args - property name
    * @example
    frame.has("property", "display") // => true or false
    */
    Frame.prototype.has = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var properties = this.properties;
        var params = args[0] in ALIAS ? ALIAS[args[0]] : args;
        var length = params.length;
        if (!length) {
            return false;
        }
        for (var i = 0; i < length; ++i) {
            if (!isObject(properties) || !(params[i] in properties)) {
                return false;
            }
            properties = properties[params[i]];
        }
        return true;
    };
    /**
    * clone frame.
    * @method Scene.Frame#clone
    * @return {Scene.Frame} An instance of clone
    * @example
    frame.clone();
    */
    Frame.prototype.clone = function () {
        var frame = new Frame();
        frame.merge(this);
        return frame;
    };
    /**
    * merge one frame to other frame.
    * @method Scene.Frame#merge
    * @param {Scene.Frame} frame - target frame.
    * @return {Scene.Frame} An instance itself
    * @example
    frame.merge(frame2);
    */
    Frame.prototype.merge = function (frame) {
        var properties = this.properties;
        var frameProperties = frame.properties;
        if (!frameProperties) {
            return this;
        }
        merge(properties, frameProperties);
        return this;
    };
    Frame.prototype.toObject = function () {
        return clone(this.properties, true);
    };
    /**
    * Specifies an css object that coverted the frame.
    * @method Scene.Frame#toCSSObject
    * @return {object} cssObject
    */
    Frame.prototype.toCSSObject = function () {
        var properties = this.toObject();
        var cssObject = {};
        for (var name_4 in properties) {
            if (isRole([name_4], true)) {
                continue;
            }
            var value = properties[name_4];
            if (name_4 === timingFunction) {
                cssObject[timingFunction.replace("animation", ANIMATION)] =
                    (isString(value) ? value : value.easingName) || "initial";
                continue;
            }
            cssObject[name_4] = value;
        }
        var transform = toInnerProperties(properties.transform);
        var filter = toInnerProperties(properties.filter);
        TRANSFORM && transform && (cssObject[TRANSFORM] = transform);
        FILTER && filter && (cssObject[FILTER] = filter);
        return cssObject;
    };
    /**
    * Specifies an css text that coverted the frame.
    * @method Scene.Frame#toCSS
    * @return {string} cssText
    */
    Frame.prototype.toCSS = function () {
        var cssObject = this.toCSSObject();
        var cssArray = [];
        for (var name_5 in cssObject) {
            cssArray.push(name_5 + ":" + cssObject[name_5] + ";");
        }
        return cssArray.join("");
    };
    Frame.prototype._set = function (args, value) {
        var properties = this.properties;
        var length = args.length;
        for (var i = 0; i < length - 1; ++i) {
            var name_6 = args[i];
            !(name_6 in properties) && (properties[name_6] = {});
            properties = properties[name_6];
        }
        if (!length) {
            return;
        }
        properties[args[length - 1]] = isString(value) ? toPropertyObject(value) : value;
    };
    return Frame;
}());
export default Frame;
//# sourceMappingURL=Frame.js.map