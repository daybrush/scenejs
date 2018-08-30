import { TRANSFORM, FILTER, ANIMATION, timingFunction, ALIAS } from "./consts";
import { isObject, isString, isArray, isRole, getType } from "./utils";
import { toPropertyObject, splitStyle, toObject } from "./utils/property";
import PropertyObject from "./PropertyObject";

function toInnerProperties(obj) {
  if (!obj) {
    return "";
  }

  var arrObj = [];

  for (var name in obj) {
    arrObj.push(name + "(" + obj[name] + ")");
  }

  return arrObj.join(" ");
}

function isPropertyObject(value) {
  return value instanceof PropertyObject;
}
/* eslint-disable */


function clone(target, toValue) {
  if (toValue === void 0) {
    toValue = false;
  }

  return _merge({}, target, toValue);
}

function _merge(to, from, toValue) {
  if (toValue === void 0) {
    toValue = false;
  }

  for (var name in from) {
    var value = from[name];
    var type = getType(value);

    if (type === "property") {
      to[name] = toValue ? value.toValue() : value.clone();
    } else if (type === "array") {
      to[name] = value.slice();
    } else if (type === "object") {
      if (isObject(to[name]) && !(to[name] instanceof PropertyObject)) {
        _merge(to[name], value, toValue);
      } else {
        to[name] = clone(value, toValue);
      }
    } else {
      to[name] = from[name];
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


var Frame =
/*#__PURE__*/
function () {
  function Frame(properties) {
    if (properties === void 0) {
      properties = {};
    }

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


  var _proto = Frame.prototype;

  _proto.get = function get() {
    var value = this.raw.apply(this, arguments);
    var type = getType(value);

    if (type === "property") {
      return value.toValue();
    } else if (type === "object") {
      return clone(value, true);
    } else {
      return value;
    }
  };

  _proto.raw = function raw() {
    var properties = this.properties;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

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


  _proto.remove = function remove() {
    var properties = this.properties;

    for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      args[_key2] = arguments[_key2];
    }

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


  _proto.set = function set() {
    var _this = this;

    for (var _len3 = arguments.length, args = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
      args[_key3] = arguments[_key3];
    }

    var length = args.length;
    var params = args.slice(0, -1);
    var value = args[length - 1];

    if (params[0] in ALIAS) {
      this._set(ALIAS[params[0]], value);
    } else if (length === 2 && isArray(params[0])) {
      this._set(params[0], value);
    } else if (isObject(value)) {
      if (isArray(value)) {
        this._set(params, value);
      } else if (isPropertyObject(value)) {
        if (isRole(params)) {
          this.set.apply(this, params.concat([toObject(value)]));
        } else {
          this._set(params, value);
        }
      } else if (value instanceof Frame) {
        this.merge(value);
      } else {
        for (var name in value) {
          this.set.apply(this, params.concat([name, value[name]]));
        }
      }
    } else if (isString(value)) {
      if (isRole(params)) {
        var obj = toPropertyObject(value);

        if (isObject(obj)) {
          this.set.apply(this, params.concat([obj]));
        }

        return this;
      } else {
        var styles = splitStyle(value);
        styles.forEach(function (style) {
          _this.set.apply(_this, params.concat([style]));
        });

        if (styles.length) {
          return this;
        }
      }

      this._set(params, value);
    } else {
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


  _proto.has = function has() {
    var properties = this.properties;

    for (var _len4 = arguments.length, args = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
      args[_key4] = arguments[_key4];
    }

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


  _proto.clone = function clone() {
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


  _proto.merge = function merge(frame) {
    var properties = this.properties;
    var frameProperties = frame.properties;

    if (!frameProperties) {
      return this;
    }

    _merge(properties, frameProperties);

    return this;
  };

  _proto.toObject = function toObject() {
    return clone(this.properties, true);
  };
  /**
  * Specifies an css object that coverted the frame.
  * @method Scene.Frame#toCSSObject
  * @return {object} cssObject
  */


  _proto.toCSSObject = function toCSSObject() {
    var properties = this.toObject();
    var cssObject = {};

    for (var name in properties) {
      if (isRole([name], true)) {
        continue;
      }

      var value = properties[name];

      if (name === timingFunction) {
        cssObject[timingFunction.replace("animation", ANIMATION)] = (isString(value) ? value : value.easingName) || "initial";
        continue;
      }

      cssObject[name] = value;
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


  _proto.toCSS = function toCSS() {
    var cssObject = this.toCSSObject();
    var cssArray = [];

    for (var name in cssObject) {
      cssArray.push(name + ":" + cssObject[name] + ";");
    }

    return cssArray.join("");
  };

  _proto._set = function _set(args, value) {
    var properties = this.properties;
    var length = args.length;

    for (var i = 0; i < length - 1; ++i) {
      var name = args[i];
      !(name in properties) && (properties[name] = {});
      properties = properties[name];
    }

    if (!length) {
      return;
    }

    properties[args[length - 1]] = isString(value) ? toPropertyObject(value) : value;
  };

  return Frame;
}();

export default Frame;