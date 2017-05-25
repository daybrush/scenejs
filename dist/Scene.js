(function() {
        (function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("Scene", [], factory);
	else if(typeof exports === 'object')
		exports["Scene"] = factory();
	else
		root["Scene"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 13);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/**
* @namespace
* @name Util
*/

var FUNCTIONS = {
	"get": function get(parent, _property) {
		var prefix = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "";

		var property = prefix + _property;

		if (parent) {
			return function () {
				return this[parent][property];
			};
		}
		return function () {
			return this[property];
		};
	},
	"set": function set(parent, _property) {
		var prefix = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "";

		var property = prefix + _property;

		if (parent) {
			return function (value) {
				this[parent][property] = value;
				return this;
			};
		}
		return function (value) {
			this[property] = value;
			return this;
		};
	}
};

/**
* check if type of value is undefined.
* @memberof Util
* @function isUndefined
* @param {Object} value - value to check.
* @example
if (!isUndefined("11")) {
	// defined
}
*/
var isUndefined = exports.isUndefined = function isUndefined(value) {
	return typeof value === "undefined";
};
/**
* check if type of value is object.
* @memberof Util
* @function isObject
* @param {Object} value - value to check.
* @example
if (isObject({})) {
	// object
}
*/
var isObject = exports.isObject = function isObject(value) {
	return (typeof value === "undefined" ? "undefined" : _typeof(value)) === "object";
};
/**
* check if type of value is string.
* @memberof Util
* @function isString
* @param {Object} value - value to check.
* @example
if (isString("String")) {
	// string
}
*/
var isString = exports.isString = function isString(value) {
	return typeof value === "string";
};
/**
* check if this object has a property.
* @memberof Util
* @function has
* @param {Object} object - target
* @pararm {String} name - the name of the property.
* @example
if (has({a:1}, "a")) {
	// has
}
*/
var has = exports.has = function has(object, name) {
	return Object.prototype.hasOwnProperty.call(object, name);
};
/**
* split number and unit of the value.
* @memberof Util
* @function splitUnit
* @param {String} value - value with or without unit.
* @example
const v = splitUnit("10px");
console.log(v.value); // 10
console.log(v.unit); // px
*/
var splitUnit = exports.splitUnit = function splitUnit(_value) {
	var v = "" + _value;

	try {
		var value = v.match(/([0-9]|\.|-|e-|e\+)+/g, "")[0];
		var unit = v.replace(value, "") || "";

		value = parseFloat(value);

		return { unit: unit, value: value };
	} catch (e) {
		return { unit: v };
	}
};
/**
* transform strings to camel-case
* @memberof Util
* @function camelize
* @param {String} str - value to transform.
* @example
console.log(camelize(" abcd")); // Abcd
console.log(camelize("abc def ghi")); // abcDefGhi
*/
var camelize = exports.camelize = function camelize(str) {
	return str.replace(/[\s-_]([a-z])/g, function (all, letter) {
		return letter.toUpperCase();
	});
};
/**
* define the function or the variable.
* @memberof Util
* @function defineProperty
* @param {Object} target - the target to define the property.
* @param {name} name - the name of the property to be defined.
* @param {Object} descriptor - the descriptor for the property being defined.
* @example
const obj = {};
defineProperty(obj, "test", {
	get: function() {
		return "test2";
	},
});
console.log(obj.test); // test2
*/
var defineProperty = exports.defineProperty = function defineProperty(target, name, descriptor) {
	Object.defineProperty(target, name, descriptor);
};
/**
* define getter function.
* @memberof Util
* @function defineGetter
* @param {Object} obj - parameters.
* @param {Object} obj.target - the target to define the property.
* @param {name} obj.name - the name of the property to be defined.
* @param {name} [obj.parent] - the target of the instance to define the property.
* @param {name} [obj.prefix] - the prefix of the name to define the property.
* @example
const obj = {};
defineGetter({target: obj, name: "test", prefix: "_"});
obj._test = 10;
console.log(obj.test); // 10
*/
var defineGetter = exports.defineGetter = function defineGetter(_ref) {
	var target = _ref.target,
	    name = _ref.name,
	    parent = _ref.parent,
	    prefix = _ref.prefix;

	defineProperty(target, name, {
		get: FUNCTIONS.get(parent, name, prefix)
	});
};
/**
* define setter function.
* @memberof Util
* @function defineSetter
* @param {Object} obj - parameters.
* @param {Object} obj.target - the target to define the property.
* @param {name} obj.name - the name of the property to be defined.
* @param {name} [obj.parent] - the target of the instance to define the property.
* @param {name} [obj.prefix] - the prefix of the name to define the property.
* @example
const obj = {};
defineSetter({target: obj, name: "test", prefix: "_"});
obj.test = 10;
console.log(obj._test); // 10
*/
var defineSetter = exports.defineSetter = function defineSetter(_ref2) {
	var target = _ref2.target,
	    name = _ref2.name,
	    parent = _ref2.parent,
	    prefix = _ref2.prefix;

	defineProperty(target, name, {
		set: FUNCTIONS.set(parent, name, prefix)
	});
};
/**
* define getter and setter function.
* @memberof Util
* @function defineGetterSetter
* @param {Object} obj - parameters.
* @param {Object} obj.target - the target to define the property.
* @param {name} obj.name - the name of the property to be defined.
* @param {name} [obj.parent] - the target of the instance to define the property.
* @param {name} [obj.prefix] - the prefix of the name to define the property.
* @example
const obj = {};
defineGetterSetter({target: obj, name: "test", prefix: "_"});
obj.test = 10;
console.log(obj.test); // 10
*/
var defineGetterSetter = exports.defineGetterSetter = function defineGetterSetter(_ref3) {
	var target = _ref3.target,
	    name = _ref3.name,
	    parent = _ref3.parent,
	    prefix = _ref3.prefix;

	defineProperty(target, name, {
		get: FUNCTIONS.get(parent, name, prefix),
		set: FUNCTIONS.set(parent, name, prefix)
	});
};

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Util = __webpack_require__(0);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var PropertyObject = function () {
	/**
 * Make string, array to PropertyObject for the dot product
 * @param {String|Array} value - This value is in the array format ..
 * @param {String} separator - Array separator.
 * @example
 var obj1 = new PropertyObject("1,2,3", ",");
 var obj2 = new PropertyObject([1,2,3], " ");
 var obj3 = new PropertyObject("1$2$3", "$");
 // rgba(100, 100, 100, 0.5)
 var obj4 = new PropertyObject([100,100,100,0.5], {
 "separator" : ",",
 "prefix" : "rgba(",
 "suffix" : ")"
 });
  */
	function PropertyObject(value) {
		var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : ",";

		_classCallCheck(this, PropertyObject);

		this.prefix = "";
		this.suffix = "";
		this.model = "";
		this.type = "";
		this.separator = ",";
		this.init(value, options);
	}

	_createClass(PropertyObject, [{
		key: "init",
		value: function init(value, options) {
			var key = void 0;

			if ((0, _Util.isObject)(options)) {
				for (key in options) {
					this[key] = options[key];
				}
			} else {
				this.separator = options;
			}
			if ((0, _Util.isString)(value)) {
				this.value = value.split(this.separator);
			} else if ((0, _Util.isObject)(value)) {
				this.value = value;
			} else {
				this.value = [value];
			}
		}
		/**
  * the number of values.
  * @readonly
  * @example
  const obj1 = new PropertyObject("1,2,3", ",");
  console.log(obj1.length);
  // 3
   */

	}, {
		key: "get",

		/**
  * retrieve one of values at the index
  * @param {Number} index - index
  * @return {Object} one of values at the index
  * @example
  const obj1 = new PropertyObject("1,2,3", ",");
  console.log(obj1.get(0));
  // 1
   */
		value: function get(index) {
			return this.value[index];
		}
		/**
  * Set the value at that index
  * @param {Number} index - index
  * @param {Object} value - text, a number, object to set
  * @return {Object} one of values at the index
  * @example
  const obj1 = new PropertyObject("1,2,3", ",");
  obj1.set(0, 2);
  console.log(obj1.toValue());
  // 2,2,3
   */

	}, {
		key: "set",
		value: function set(index, value) {
			this.value[index] = value;
			return this;
		}
		/**
  * create a copy of an instance itself.
  * @return {PropertyObject} clone
  * @example
  const obj1 = new PropertyObject("1,2,3", ",");
  const obj2 = obj1.clone();
  	 */

	}, {
		key: "clone",
		value: function clone() {
			var arr = [];
			var value = this.value;
			var v = "";
			var i = void 0;

			for (i in value) {
				v = value[i];
				arr.push(v instanceof PropertyObject ? v.clone() : v);
			}
			return new PropertyObject(arr, {
				separator: this.separator,
				prefix: this.prefix,
				suffix: this.suffix,
				model: this.model,
				type: this.type
			});
		}
		/**
  * Make Property Object to String
  * @return {String} Make Property Object to String
  * @example
  //rgba(100, 100, 100, 0.5)
  const obj4 = new PropertyObject([100,100,100,0.5], {
  "separator" : ",",
  "prefix" : "rgba(",
  "suffix" : ")",
  });
  console.log(obj4.toValue());
  // "rgba(100,100,100,0.5)"
  */

	}, {
		key: "toValue",
		value: function toValue() {
			return this.prefix + this.join() + this.suffix;
		}
		/**
  * Make Property Object's array to String
  * @return {String} Join the elements of an array into a string
  * @example
  //rgba(100, 100, 100, 0.5)
  var obj4 = new PropertyObject([100,100,100,0.5], {
  	"separator" : ",",
  	"prefix" : "rgba(",
  	"suffix" : ")"
  });
  obj4.join();  // =>   "100,100,100,0.5"
   */

	}, {
		key: "join",
		value: function join() {
			var arr = [];
			var value = this.value;
			var separator = this.separator;
			var v = "";
			var i = void 0;

			for (i in value) {
				v = value[i];
				arr.push(v instanceof PropertyObject ? v.toValue() : v);
			}
			return arr.join(separator);
		}

		/**
  * executes a provided function once per array element.
  * @param {Function} callback - Function to execute for each element, taking three arguments
  * @param {All} [callback.currentValue] The current element being processed in the array.
  * @param {Number} [callback.index] The index of the current element being processed in the array.
  * @param {Array} [callback.array] the array.
  * @return {String} Join the elements of an array into a string
  * @see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach|MDN Array.forEach()} reference to MDN document.
  * @example
  //rgba(100, 100, 100, 0.5)
  var obj4 = new PropertyObject([100,100,100,0.5], {
  "separator" : ",",
  "prefix" : "rgba(",
  "suffix" : ")"
  });
  obj4.join();  // =>   "100,100,100,0.5"
  */

	}, {
		key: "each",
		value: function each(func) {
			var arr = this.value;
			var i = void 0;

			for (i in arr) {
				func(arr[i], i, arr);
			}
		}
	}, {
		key: "length",
		get: function get() {
			var value = this.value;

			if ((0, _Util.has)(value, "length")) {
				return value.length;
			}
			var length = 0;
			var i = void 0;

			for (i in value) {
				if (!(0, _Util.has)(value, i)) {
					continue;
				}
				++length;
			}
			return length;
		}
	}]);

	return PropertyObject;
}();

exports.default = PropertyObject;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EASE_IN_OUT = exports.EASE_OUT = exports.EASE_IN = exports.EASE = exports.PLAY_DIRECTION = exports.FILL_MODE = exports.ANIMATION_PLAY_STATE = exports.SCENE_ROLES = undefined;

var _TimingFunction = __webpack_require__(9);

var SCENE_ROLES = exports.SCENE_ROLES = {};

var ANIMATION_PLAY_STATE = exports.ANIMATION_PLAY_STATE = ["idle", "pending", "paused", "running", "finished"];
var FILL_MODE = exports.FILL_MODE = ["none", "forwards", "backwards", "both", "auto"];
var PLAY_DIRECTION = exports.PLAY_DIRECTION = ["normal", "reverse", "alternate", "alternate-reverse"];
var EASE = exports.EASE = (0, _TimingFunction.cubicBezier)([0.25, 0.1, 0.25, 1]);
var EASE_IN = exports.EASE_IN = (0, _TimingFunction.cubicBezier)([0.42, 0, 1, 1]);
var EASE_OUT = exports.EASE_OUT = (0, _TimingFunction.cubicBezier)([0, 0, 0.58, 1]);
var EASE_IN_OUT = exports.EASE_IN_OUT = (0, _TimingFunction.cubicBezier)([0.42, 0, 0.58, 1]);

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Constant = __webpack_require__(2);

var _Util = __webpack_require__(0);

var _Property = __webpack_require__(4);

var _PropertyObject = __webpack_require__(1);

var _PropertyObject2 = _interopRequireDefault(_PropertyObject);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Animation's Frame
 */
var Frame = function () {
	_createClass(Frame, null, [{
		key: "addRole",

		/**
  * add Role to Frame.
  * @static
  * @param {String} role - property role(property, transform, filter)
  * @example
  Scene.Frame.addRole("property");
  Scene.Frame.addRole("transform");
  Scene.Frame.addRole("filter");
  */
		value: function addRole(role) {
			var framePrototype = this.prototype;
			var _role = (0, _Util.camelize)(" " + role);

			framePrototype["set" + _role] = function (property, value) {
				this.set(role, property, value);
			};
			framePrototype["get" + _role] = function (property) {
				return this.get(role, property);
			};
			framePrototype["remove" + _role] = function (property) {
				this.remove(role, property);
				return this;
			};
			_Constant.SCENE_ROLES[role] = true;
		}
		/**
  * Create an animation's frame.
  * @param {Object} properties - properties
  * @example
  let frame = new Scene.Frame({
  display: "none"
  });
  */

	}]);

	function Frame(properties) {
		_classCallCheck(this, Frame);

		var role = void 0;

		this.properties = {};
		this.updateNumber = 0;

		for (role in _Constant.SCENE_ROLES) {
			this.properties[role] = {};
		}

		this.load(properties);
	}
	/**
 * load json of properties.
 * @param {Object} properties - properties
 * @return {Frame} An instance itself
 * @example
 frame.load({
 display: "none"
 });
 */


	_createClass(Frame, [{
		key: "load",
		value: function load(properties) {
			if (properties && !(0, _Util.isObject)(properties)) {
				return this;
			}

			var value = void 0;
			var property = void 0;

			for (property in properties) {
				value = properties[property];
				if ((0, _Util.has)(_Constant.SCENE_ROLES, property)) {
					// role, properties
					this.set(property, value);
					continue;
				}
				// role, property, value
				this._set("property", property, value);
			}
			return this;
		}
		/**
  * get property value
  * @param {String} role - property role(property, transform, filter)
  * @param {String} property - property name
  * @return {Number|String|Scene.PropertyObejct} property value
  * @example
  frame.get("property", "display") // => "none", "block", ....
  */

	}, {
		key: "get",
		value: function get(role, property) {
			return this.properties[role][property];
		}
		/**
  * remove property value
  * @param {String} role - property role(property, transform, filter)
  * @param {String} property - property name
  * @return {Frame} An instance itself
  * @example
  frame.remove("property", "display")
  */

	}, {
		key: "remove",
		value: function remove(role, property) {
			delete this.properties[role][property];
		}
	}, {
		key: "_set",
		value: function _set(role, property, value) {
			var _value = value;

			++this.updateNumber;
			if ((0, _Util.isString)(_value)) {
				_value = (0, _Property.toPropertyObject)(_value);
			}
			this.properties[role][property] = _value;
		}
		/**
  * set property
  * @param {Object|String} role - property role(property, transform, filter)
  * @param {Object|String} property - property name
  * @param {Object|String} value - property value
  * @return {Frame} An instance itself
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
  frame.set("property", "display", "none");
  */

	}, {
		key: "set",
		value: function set(role, property, _value) {
			var name = void 0;
			var value = _value;

			if ((0, _Util.isObject)(role)) {
				this.load(role);
				return this;
			}
			if ((0, _Util.isObject)(property)) {
				// role, properties
				for (name in property) {
					// role, property, value
					this._set(role, name, property[name]);
				}
				return this;
			}

			if ((0, _Util.isString)(property) && (0, _Util.isUndefined)(_value)) {
				value = (0, _Property.splitSpace)(property);

				if (!(0, _Util.isObject)(value)) {
					return this;
				}
				var length = value.length;
				var obj = void 0;

				for (var i = 0; i < length; ++i) {
					obj = (0, _Property.toPropertyObject)(value[i]);

					if (!(0, _Util.isObject)(obj)) {
						continue;
					}

					if (!obj.model) {
						continue;
					}

					if (obj.length === 1) {
						this._set(role, obj.model, obj.value[0]);
						continue;
					}
					this._set(role, obj.model, new _PropertyObject2.default(obj.value, {
						separator: obj.separator
					}));
				}
				return this;
			}
			this._set(role, property, value);
			return this;
		}
		/**
  * check that has property.
  * @param {String} role - property role(property, transform, filter)
  * @param {String} property - property name
  * @return {Boolean} true : has property, false : has not property
  * @example
  frame.has("property", "display") // => true or false
  */

	}, {
		key: "has",
		value: function has(role, property) {
			return (0, _Util.has)(this.properties[role], property);
		}
		/**
  * copy frame.
  * @return {Scene.Frame} An instance of copy
  * @example
  frame.copy();
  */

	}, {
		key: "clone",
		value: function clone() {
			var frame = new Frame();

			frame.merge(this);

			return frame;
		}
		/**
  * merge one frame to other frame.
  * @param {Scene.Frame} frame - target frame.
  * @return {Scene.Frame} An instance itself
  * @example
  frame.merge(frame2);
  */

	}, {
		key: "merge",
		value: function merge(frame) {
			var properties = this.properties;
			var frameProperties = frame.properties;

			if (!frameProperties) {
				return this;
			}

			var _properties = void 0;
			var property = void 0;
			var value = void 0;
			var name = void 0;

			for (name in properties) {
				if (!(0, _Util.has)(frameProperties, name)) {
					continue;
				}
				_properties = frameProperties[name];
				for (property in _properties) {
					value = _properties[property];
					if (value instanceof _PropertyObject2.default) {
						value = value.clone();
					}

					this.set(name, property, value);
				}
			}

			return this;
		}
		/**
  * get string into format for properties.
  * @param {String} role - property role(property, transform, filter)
  * @param {String} format - string format to get properties.
  * @param {String} separator - separator between properties.
  * @return {Frame} An instance itself
  * @example
  var frame = new Scene.Frame({
  a: 1,
  b: 2,
  c: 3,
  transform: {
  	translate: "10px, 10px",
  	scale: 1,
  }
  });
  frame.format("property", "$1:$2;", ""); // => a:1;b:2;c:3;
  frame.format("transform", "$1($2)", " "); // => translate(10px,10px) scale(1)
  */

	}, {
		key: "format",
		value: function format(role, _format, separator) {
			var properties = this.properties[role];
			var arr = [];
			var value = void 0;
			var property = void 0;

			for (property in properties) {
				value = properties[property];
				if (value instanceof _PropertyObject2.default) {
					value = value.toValue();
				}
				value = _format.replace(/\$1/g, property).replace(/\$2/g, value);
				arr.push(value);
			}

			return arr.join(separator);
		}
	}]);

	return Frame;
}();

exports.default = Frame;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.stringToColorObject = exports.toPropertyObject = exports.toBracketObject = exports.toColorObject = exports.arrayToColorObject = exports.splitComma = exports.splitSpace = undefined;

var _PropertyObject = __webpack_require__(1);

var _PropertyObject2 = _interopRequireDefault(_PropertyObject);

var _Color = __webpack_require__(16);

var _Util = __webpack_require__(0);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _toPropertyObject = void 0; /**
                                * @namespace
                                * @name Property
                                */

var stringToColorObject = void 0;

/**
* divide text by space.
* @memberof Property
* @function splitSpace
* @param {String} text - text to divide
* @return {Array} divided texts
* @example
console.log(splitSpace("a b c d e f g"));
// ["a", "b", "c", "d", "e", "f", "g"]
console.log(splitSpace("'a,b' c 'd,e' f g"));
// ["'a,b'", "c", "'d,e'", "f", "g"]
*/
var splitSpace = exports.splitSpace = function splitSpace(text) {
	// divide comma(,)
	var matches = text.split(/("[^"]*"|'[^']*'|[^\s()]*(?:\((?:[^()]*|\([^()]*\))*\))[^\s()]*)|\s+/g);
	var length = matches.length;
	var arr = [];
	var value = void 0;
	var arrValue = void 0;
	var index = 0;

	for (var i = 0; i < length; ++i) {
		value = matches[i];
		if ((0, _Util.isUndefined)(value)) {
			++index;
			continue;
		} else if (!value) {
			continue;
		}
		arrValue = arr[index];
		arr[index] = arrValue ? arrValue + value : value;
	}
	return arr;
};
/**
* divide text by comma.
* @memberof Property
* @function splitComma
* @param {String} text - text to divide
* @return {Array} divided texts
* @example
console.log(splitComma("a,b,c,d,e,f,g"));
// ["a", "b", "c", "d", "e", "f", "g"]
console.log(splitComma("'a,b',c,'d,e',f,g"));
// ["'a,b'", "c", "'d,e'", "f", "g"]
*/
var splitComma = exports.splitComma = function splitComma(text) {
	// divide comma(,)
	// "[^"]*"|'[^']*'
	var matches = text.split(/("[^"]*"|'[^']*'|[^,\s()]*(?:\((?:[^()]*|\([^()]*\))*\))[^,\s()]*)|\s*,\s*/g);
	var length = matches.length;
	var arr = [];
	var value = void 0;
	var arrValue = void 0;
	var index = 0;

	for (var i = 0; i < length; ++i) {
		value = matches[i];
		if ((0, _Util.isUndefined)(value)) {
			++index;
			continue;
		} else if (!value) {
			continue;
		}
		arrValue = arr[index];
		arr[index] = arrValue ? arrValue + value : value;
	}
	return arr;
};
/**
* convert array to PropertyObject[type=color].
* default model "rgba"
* @memberof Property
* @function arrayToColorObject
* @param {Array|PropertyObject} value ex) [0, 0, 0, 1]
* @return {PropertyObject} PropertyObject[type=color]
* @example
arrayToColorObject([0, 0, 0])
// => PropertyObject(type="color", model="rgba", value=[0, 0, 0, 1], separator=",")
*/
var arrayToColorObject = exports.arrayToColorObject = function arrayToColorObject(arr) {
	var model = "rgba";

	if (arr instanceof _PropertyObject2.default) {
		arr.type = "color";
		arr.model = model;
		arr.prefix = model + "(";
		return arr;
	}

	if (arr.length === 3) {
		arr[3] = 1;
	}
	var object = new _PropertyObject2.default(arr, {
		model: model,
		separator: ",",
		type: "color",
		prefix: model + "(",
		suffix: ")"
	});

	return object;
};
/**
	* convert text with parentheses to PropertyObject[type=color].
	* If the values are not RGBA model, change them RGBA mdoel.
	* @memberof Property
	* @function toColorObject
	* @param {String|PropertyObject} value - color value "rgba(0,0,0,1)"
	* @return {PropertyObject} PropertyObject[type=color]
	* @example
toColorObject("rgba(0, 0, 0,1)")
// => PropertyObject(type="color", model="rgba", value=[0, 0, 0,1], separator=",")
*/
var toColorObject = exports.toColorObject = function toColorObject(value) {
	var colorObject = void 0;

	if (value instanceof _PropertyObject2.default) {
		colorObject = value;
	} else if ((0, _Util.isObject)(value)) {
		colorObject = arrayToColorObject(value);
	} else if ((0, _Util.isString)(value)) {
		return stringToColorObject(value);
	} else {
		return value;
	}
	var colorArray = colorObject.value;

	var length = colorArray.length;

	if (length === 4) {
		colorArray[3] = parseFloat(colorArray[3]);
	} else if (length === 3) {
		colorArray[3] = 1;
	}
	colorObject.type = "color";
	var colorModel = colorObject.model.toLowerCase();
	var i = void 0;

	// rgb hsl model to CHANGE rgba hsla
	// string -> number
	if (colorModel === "rgb") {
		arrayToColorObject(colorObject);
	}
	switch (colorModel) {
		case "rgb":
		case "rgba":
			for (i = 0; i < 3; ++i) {
				colorArray[i] = parseInt(colorArray[i], 10);
			}
			break;
		case "hsl":
		case "hsla":
			for (i = 1; i < 3; ++i) {
				if (colorArray[i].indexOf("%") !== -1) {
					colorArray[i] = parseFloat(colorArray[i]) / 100;
				}
			}
			// hsl, hsla to rgba
			colorArray = (0, _Color.hslToRGB)(colorArray);
			return arrayToColorObject(colorArray);
		default:
	}
	return colorObject;
};
/**
* convert text with parentheses to PropertyObject.
* @memberof Property
* @function toBracketObject
* @param {String} value ex) "rgba(0,0,0,1)"
* @return {PropertyObject} PropertyObject
* @example
toBracketObject("abcde(0, 0, 0,1)")
// => PropertyObject(model="abcde", value=[0, 0, 0,1], separator=",")
*/
var toBracketObject = exports.toBracketObject = function toBracketObject(value) {
	// [prefix, value, other]
	var matches = /([^(]*)\(([\s\S]*)\)([\s\S]*)/g.exec(value);

	if (!matches || matches.length < 4) {
		return value;
	}
	var model = matches[1] || "";
	var prefix = model + "(";
	var text = matches[2];
	var suffix = ")" + matches[3];

	// divide comma(,)
	var texts = splitComma(text);
	var length = texts.length;
	var result = void 0;
	var separator = ",";

	if (length === 1) {
		result = _toPropertyObject(text);
		if (!result.prefix && !result.suffix) {
			separator = result.separator;
			result = result.value;
		}
	}
	if (!result) {
		result = texts.map(function (t) {
			return _toPropertyObject(t);
		});
	}

	return new _PropertyObject2.default(result, {
		separator: separator,
		model: model,
		prefix: prefix,
		suffix: suffix
	});
};
/**
* convert text with parentheses to PropertyObject[type=color].
* If the values are not RGBA model, change them RGBA mdoel.
* @memberof Property
* @function stringToColorObject
* @param {String|PropertyObject} value ex) "rgba(0,0,0,1)"
* @return {PropertyObject} PropertyObject[type=color]
* @example
stringToColorObject("rgba(0, 0, 0,1)")
// => PropertyObject(type="color", model="rgba", value=[0, 0, 0,1], separator=",")
*/
exports.stringToColorObject = stringToColorObject = function stringToColorObject(value) {
	var colorArray = 0;
	var colorObject = 0;

	if (value.charAt(0) === "#") {
		if (value.length === 4) {
			colorArray = (0, _Color.hexToRGB)((0, _Color.hex3to6)(value));
		} else if (value.length === 7) {
			colorArray = (0, _Color.hexToRGB)(value);
		} else {
			colorArray = (0, _Color.hexToRGB)(value);
		}
		return arrayToColorObject(colorArray);
	} else if (value.indexOf("(") !== -1) {
		colorObject = toBracketObject(value);
	} else {
		throw new Error("Invalid Format : Not a Color - " + value);
	}

	return toColorObject(colorObject);
};
/**
* convert CSS Value to PropertyObject
* @memberof Property
* @function toPropertyObject
* @param {String} value it's text contains the array.
* @return {String} Not Array, Not Separator, Only Number & Unit
* @return {PropertyObject} Array with Separator.
* @see referenced regular expression {@link http://stackoverflow.com/questions/20215440/parse-css-gradient-rule-with-javascript-regex}
* @example
toPropertyObject("1px solid #000");
// => PropertyObject(["1px", "solid", rgba(0, 0, 0, 1)])
*/
exports.toPropertyObject = _toPropertyObject = function toPropertyObject(value) {
	if (!(0, _Util.isString)(value)) {
		return value;
	}
	var values = splitComma(value);
	var result = void 0;

	if (values.length > 1) {
		result = new _PropertyObject2.default(values.map(function (v) {
			return _toPropertyObject(v);
		}), ",");
		result.type = "array";
		return result;
	}
	values = splitSpace(value);
	if (values.length > 1) {
		result = new _PropertyObject2.default(values.map(function (v) {
			return _toPropertyObject(v);
		}), " ");
		result.type = "array";
		return result;
	} else if ((result = value.charAt(0)) && (result === '"' || result === "'")) {
		return value;
	} else if (value.indexOf("(") !== -1) {
		// in bracket.
		result = toBracketObject(value);
		if (!(0, _Util.isObject)(result)) {
			return result;
		}
		var model = result.model.toLowerCase();

		if (_Color.COLOR_MODELS.indexOf(model) !== -1) {
			return toColorObject(result);
		}
		var length = result.length;

		for (var i = 0; i < length; ++i) {
			result.set(i, _toPropertyObject(result.get(i)));
		}
		return result;
	} else if (value.indexOf("#") === 0) {
		return toColorObject(value);
	}
	return value;
};

exports.toPropertyObject = _toPropertyObject;
exports.stringToColorObject = stringToColorObject;

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Frame2 = __webpack_require__(3);

var _Frame3 = _interopRequireDefault(_Frame2);

var _PropertyObject = __webpack_require__(1);

var _PropertyObject2 = _interopRequireDefault(_PropertyObject);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var convertCrossBrowserCSSObject = function convertCrossBrowserCSSObject(cssObject, property, value) {
	cssObject[property] = value;
	cssObject["-moz-" + property] = value;
	cssObject["-ms-" + property] = value;
	cssObject["-o-" + property] = value;
	cssObject["-webkit-" + property] = value;
};

/**
* Animation's CSS Frame
* @extends Frame
*/

var CSSFrame = function (_Frame) {
	_inherits(CSSFrame, _Frame);

	function CSSFrame() {
		_classCallCheck(this, CSSFrame);

		return _possibleConstructorReturn(this, (CSSFrame.__proto__ || Object.getPrototypeOf(CSSFrame)).apply(this, arguments));
	}

	_createClass(CSSFrame, [{
		key: "cssText",

		/**
  * get the contents of a style declaration as a string.
  * @readonly
  */
		get: function get() {
			var cssObject = {};
			var cssArray = [];
			var properties = this.properties.property;
			var property = void 0;
			var value = void 0;

			for (property in properties) {
				value = properties[property];
				if (value instanceof _PropertyObject2.default) {
					value = value.toValue();
				}
				cssObject[property] = value;
			}

			var transform = this.format("transform", "$1($2)", " ");
			var filter = this.format("filter", "$1($2)", " ");

			if (transform) {
				convertCrossBrowserCSSObject(cssObject, "transform", transform);
			}
			if (filter) {
				convertCrossBrowserCSSObject(cssObject, "filter", filter);
			}
			for (property in cssObject) {
				cssArray.push(property + ":" + cssObject[property] + ";");
			}
			return cssArray.join("");
		}
	}]);

	return CSSFrame;
}(_Frame3.default);

/**
* set transform to the frame.
* @param {String|Object} [properties] - property's name or properties
* @param {Object} [value] - property's value
* @method Frame#setTransform
* @return {SceneItem} An instance itself
* @example
item.setTransform(10, "scale", "1,1");
// same
const frame = item.getFrame(10);
frame.setTransform("scale", "1,1");
*/
/**
* get transform's value in the frame
* @param {String} property - property's name
* @method Frame#getTransform
* @return {Object} property's value
* @example
item.getTransform(10, "scale");
// same
const frame = item.getFrame(10);
frame.getTransform("scale");
*/
/**
* set filter to the frame.
* @param {String|Object} [properties] - property's name or properties
* @param {Object} [value] - property's value
* @method CSSFrame#setFilter
* @return {SceneItem} An instance itself
* @example
item.setFilter(10, "opacity", "50%");
// same
const frame = item.getFrame(10);
frame.setFilter("opacity", "50%");
*/
/**
* get filter's value in the frame
* @param {String} property - property's name
* @method CSSFrame#getFilter
* @return {Object} property's value
* @example
item.getFilter(10, "scale");
// same
const frame = item.getFrame(10);
frame.getFilter("opacity");
*/

exports.default = CSSFrame;

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _EventTrigger2 = __webpack_require__(14);

var _EventTrigger3 = _interopRequireDefault(_EventTrigger2);

var _TimingFunction = __webpack_require__(9);

var _Util = __webpack_require__(0);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var lastTime = 0;

var requestAnimFrame = function () {
	return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || function (callback) {
		var currTime = Date.now();
		var timeToCall = Math.max(0, 16 - (currTime - lastTime));
		var id = window.setTimeout(function () {
			callback(currTime + timeToCall);
		}, 1000 / 60);

		lastTime = currTime + timeToCall;
		return id;
	};
}();

/**
* play video, animation, the others
* @extends EventTrigger
*/

var Animator = function (_EventTrigger) {
	_inherits(Animator, _EventTrigger);

	/**
 * Create an Animator.
 * <br/>see {@link https://www.w3schools.com/css/css3_animations.asp|CSS3 Animation}
 * @param {Object} [options] - animator's options
 * @param {Number} [options.delay] - specifies a delay for the start of an animation
 * @param {String} [options.direction] - Specifies whether an animation should play in reverse direction or alternate cycles
 * @param {Number} [options.duration] - Specifies how many seconds or milliseconds an animation takes to complete one cycle
 * @param {String} [options.fillMode] - Specifies a style for the element when the animation is not playing (when it is finished, or when it has a delay)
 * @param {Number|String} [options.iterationCount] - specifies the number of times an animation should be played
 * @param {Object} [options.timingFunction] - Specifies the speed curve of the animation
 * @example
 const animator = new Scene.Animator({
 delay: 2,
 diretion: "alternate",
 duration: 2,
 fillMode: "forwards",
 iterationCount: 3,
 timingFuncition: Scene.Animator.EASE,
 });
 */
	function Animator(options) {
		_classCallCheck(this, Animator);

		var _this = _possibleConstructorReturn(this, (Animator.__proto__ || Object.getPrototypeOf(Animator)).call(this));

		_this._currentTime = 0;
		_this._timer = 0;

		_this.options = {};
		_this.iterationCount = 1;
		_this.delay = 0;
		_this.fillMode = "forwards";
		_this.direction = "none";
		_this.playState = "paused";
		_this.playSpeed = 1;

		_this._currentTime = 0;
		_this._currentIterationTime = -1;
		_this._prevTime = 0;
		_this.setOptions(options);
		return _this;
	}

	_createClass(Animator, [{
		key: "setOptions",

		/**
  * set animator's options.
  * <br/>see {@link https://www.w3schools.com/css/css3_animations.asp|CSS3 Animation}
  * @param {Object} [options] - animator's options
  * @param {Number} [options.delay] - specifies a delay for the start of an animation
  * @param {String} [options.direction] - Specifies whether an animation should play in reverse direction or alternate cycles
  * @param {Number} [options.duration] - Specifies how many seconds or milliseconds an animation takes to complete one cycle
  * @param {String} [options.fillMode] - Specifies a style for the element when the animation is not playing (when it is finished, or when it has a delay)
  * @param {Number|String} [options.iterationCount] - specifies the number of times an animation should be played
  * @param {Object} [options.timingFunction] - Specifies the speed curve of the animation
  * @example
  animator.({
  delay: 2,
  diretion: "alternate",
  duration: 2,
  fillMode: "forwards",
  iterationCount: 3,
  timingFuncition: Scene.Animator.EASE,
  });
  */
		value: function setOptions(options) {
			if (!options) {
				return this;
			}

			var option = void 0;

			for (option in options) {
				if (option === "timingFunction" || option === "timingFunctions") {
					this[option] = options[option];
					continue;
				}
				this.options[option] = options[option];
			}

			return this;
		}
		/**
  * currentTime
  * @example
  animator.currentTime = 10;
  animator.currentTime // 10
  */

	}, {
		key: "play",

		/**
  * play animator
  * @return {Animator} An instance itself.
  */
		value: function play() {
			var _this2 = this;

			if (this.ended) {
				this.currentTime = 0;
			}
			this.playState = "running";
			requestAnimFrame(function (time) {
				_this2._prevTime = time;
				_this2.tick(time);
			});
			this.trigger("play");

			return this;
		}
		/**
  * pause animator
  * @return {Animator} An instance itself.
  */

	}, {
		key: "pause",
		value: function pause() {
			this.playState = "paused";
			this.trigger("paused");
			return this;
		}
		/**
  * stop animator
  * @return {Animator} An instance itself.
  */

	}, {
		key: "stop",
		value: function stop() {
			this.playState = "paused";
			this.trigger("paused");
			this.trigger("ended");
			return this;
		}
		/**
  * reset animator
  * @return {Animator} An instance itself.
  */

	}, {
		key: "reset",
		value: function reset() {
			this.currentTime = 0;
			this.stop();
			return this;
		}
		/**
  * set currentTime
  * @param {Number} time - currentTime
  * @example
  animator.setTime(10);
  animator.currentTime // 10
  */

	}, {
		key: "setTime",
		value: function setTime(time) {
			var totalDuration = this.totalDuration;

			var _time = time;

			if (_time < 0) {
				_time = 0;
			} else if (_time > totalDuration) {
				_time = totalDuration;
			}
			this._currentTime = _time;
			this.calculateIterationTime();
			this.trigger("timeupdate", [_time]);
		}
	}, {
		key: "calculateIterationTime",
		value: function calculateIterationTime() {
			var currentTime = this._currentTime;
			var duration = this.duration,
			    iterationCount = this.iterationCount,
			    fillMode = this.fillMode,
			    direction = this.direction;

			var activeTime = parseInt(Math.max(currentTime - this.delay, 0) * 10000, 10) / 10000;
			var currentIterationCount = duration === 0 ? 0 : activeTime / duration;
			var isOdd = currentIterationCount % 2 >= 1;

			var currentIterationTime = activeTime % duration;
			var isAlternate = false;

			// direction : normal, reverse, alternate, alternate-reverse
			// fillMode : forwards, backwards, both, none
			switch (direction) {
				case "reverse":
					currentIterationTime = duration - currentIterationTime;
					break;
				case "alternate":
					if (isOdd) {
						currentIterationTime = duration - currentIterationTime;
					}
					isAlternate = true;
					break;
				case "alternate-reverse":
					if (!isOdd) {
						currentIterationTime = duration - currentIterationTime;
					}
					isAlternate = true;
					break;
				default:
			}

			switch (fillMode) {
				case "both":
				case "forwards":
					if (isAlternate || currentIterationCount !== iterationCount || iterationCount % 1 !== 0) {
						break;
					}
					currentIterationTime = duration - currentIterationTime;

					break;
				default:
					if (currentIterationCount !== iterationCount || iterationCount % 1 !== 0) {
						break;
					}
					currentIterationTime = 0;
			}
			this.setIterationTime(currentIterationTime);
		}
	}, {
		key: "caculateTimingFunction",
		value: function caculateTimingFunction(_time) {
			var duration = this.duration;
			var timingFunction = this.timingFunction;
			var time = _time;
			var ratio = void 0;

			if ((0, _Util.isObject)(timingFunction)) {
				var length = timingFunction.length;
				var nowTimingFunction = this.options.nowTimingFunction;

				// 시간이 벗어나거나 TimingFunction이 미지정일시 해당 시간에 만족하는 TimingFunction을 찾는다.
				if (nowTimingFunction && (nowTimingFunction.end < time || time < nowTimingFunction.start) || length > 0 && !nowTimingFunction) {
					nowTimingFunction = 0;
					this.options.nowTimingFunction = 0;
					for (var i = 0; i < length; ++i) {
						if (timingFunction[i].start <= time && time <= timingFunction[i].end) {
							nowTimingFunction = timingFunction[i];
							this.options.nowTimingFunction = nowTimingFunction;
							break;
						}
					}
				}
				if (nowTimingFunction) {
					var start = nowTimingFunction.start;

					if (duration < nowTimingFunction.end) {
						nowTimingFunction.end = duration;
					}
					duration = nowTimingFunction.end - start;
					ratio = duration === 0 ? 0 : (time - start) / duration;
					time = start + nowTimingFunction.curve(ratio) * duration;
				}
			} else {
				ratio = duration === 0 ? 0 : time / duration;
				time = this.timingFunction(ratio) * duration;
			}
			return time;
		}
	}, {
		key: "setIterationTime",
		value: function setIterationTime(_time) {
			var time = _time;

			if (this.timingFunction) {
				time = this.caculateTimingFunction(time);
			}
			this._currentIterationTime = time;
			this.trigger("iterationtimeupdate", [time]);

			return this;
		}
	}, {
		key: "tick",
		value: function tick(now) {
			var _this3 = this;

			var prevTime = this._prevTime;
			var currentTime = this.currentTime + Math.min(1000, now - prevTime) / 1000 * this.playSpeed;

			this._prevTime = now;
			this.setTime(currentTime);
			if (this.ended) {
				this.stop();
			}
			if (this.playState === "paused") {
				return;
			}

			requestAnimFrame(function (time) {
				_this3.tick(time);
			});
		}
	}, {
		key: "timingFunction",
		set: function set(curveArray) {
			this.options.timingFunction = typeof curveArray === "function" ? curveArray : (0, _TimingFunction.cubicBezier)(curveArray);
		}
	}, {
		key: "timingFunctions",
		set: function set(curveArrays) {
			var length = curveArrays.length;
			var curves = [];
			var start = void 0;
			var end = void 0;
			var curve = void 0;

			for (var i = 0; i < length / 3; ++i) {
				start = curveArrays[3 * i + 0];
				end = curveArrays[3 * i + 1];
				curve = curveArrays[3 * i + 2];
				if (typeof curve !== "function") {
					curve = (0, _TimingFunction.cubicBezier)(curve);
				}
				curves.push({ start: start, end: end, curve: curve });
			}
			this.options.timingFunction = curves;
		}
	}, {
		key: "currentTime",
		set: function set(value) {
			this.setTime(value);
		}
		/**
  * total duration including all iteration.
  * @readonly
  * @example
  const animator = new Scene.Animator({
  delay: 2,
  diretion: "alternate",
  duration: 2,
  fillMode: "forwards",
  iterationCount: 3,
  timingFuncition: Scene.Animator.EASE,
  });
  animator.totalDuration; // delay + duration * iterationCount =  2 + 2 * 3 = 8
  */

	}, {
		key: "totalDuration",
		get: function get() {
			if (this.iterationCount === "infinite") {
				return Infinity;
			}
			return this.delay + this.activeDuration;
		}
		/**
  * total duration excluding delay.
  * @readonly
  * @example
  const animator = new Scene.Animator({
  delay: 2,
  diretion: "alternate",
  duration: 2,
  fillMode: "forwards",
  iterationCount: 3,
  timingFuncition: Scene.Animator.EASE,
  });
  animator.activeDuration; // duration * iterationCount =  2 * 3 = 6
  */

	}, {
		key: "activeDuration",
		get: function get() {
			return this.duration * this.iterationCount;
		}
		/**
  * check if animator is ended.
  * @readonly
  * @return {Boolean} true: animattor is ended, false : not ended.
  * @example
  // true: animator is ended, false : not ended.
  if (animator.ended) {
  // is ended...
  } else {
  // not ended...
  }
  */

	}, {
		key: "ended",
		get: function get() {
			if (this.currentTime === 0 && this.playState === "paused") {
				return true;
			} else if (this.currentTime < this.totalDuration) {
				return false;
			}

			return true;
		}
		/**
  * check if animator is paused.
  * @readonly
  * @return {Boolean} true: animattor is paused, false : not paused.
  * @example
  // true: animator is paused(not playing), false : not paused.
  if (animator.paused) {
  // is paused...
  } else {
  // not paused...
  }
  */

	}, {
		key: "paused",
		get: function get() {
			return this.playState === "paused";
		}
	}, {
		key: "next",
		set: function set(animator) {
			this.on("ended", function () {
				animator.play();
			});
		}
	}]);

	return Animator;
}(_EventTrigger3.default);
/**
* iterationTime
* @memberof Animator
* @instance
* @name currentIterationTime
* @readonly
* @example
animator.currentIterationTime // ....
*/


(0, _Util.defineGetter)({ target: Animator.prototype, name: "currentIterationTime", prefix: "_" });
(0, _Util.defineGetter)({ target: Animator.prototype, name: "currentTime", prefix: "_" });
(0, _Util.defineGetter)({ target: Animator.prototype, name: "timingFunction", parent: "options" });
/**
* playSpeed
* @memberof Animator
* @instance
* @name playSpeed
* @example
animator.playSpeed = 1;// default speed
animator.playSpeed = 2;// speed 2x
*/
(0, _Util.defineGetterSetter)({ target: Animator.prototype, name: "playSpeed", parent: "options" });
/**
* playState
* @memberof Animator
* @instance
* @name playState
* @example
animator.play();
animator.playState // => running

animator.pause();
animator.playState // => paused

animator.stop();
animator.playState // => paused
*/
(0, _Util.defineGetterSetter)({ target: Animator.prototype, name: "playState", parent: "options" });
/**
* specifies the number of times an animation should be played
* @memberof Animator
* @instance
* @name iterationCount
* @example
const animator = new Scene.Animator({
	delay: 2,
	diretion: "forwards",
	duration: 2,
	fillMode: "alternate",
	iterationCount: 3,
	timingFuncition: Scene.Animator.EASE,
});
animator.totalDuration; // delay + duration * iterationCount =  2 + 2 * 3 = 8
animator.iterationCount = 2;
animator.totalDuration; // delay + duration * iterationCount =  2 + 2 * 2 = 6
*/
(0, _Util.defineGetterSetter)({ target: Animator.prototype, name: "iterationCount", parent: "options" });
/**
* Specifies how many seconds or milliseconds an animation takes to complete one cycle
* @memberof Animator
* @instance
* @name duration
*/
(0, _Util.defineGetterSetter)({ target: Animator.prototype, name: "duration", parent: "options" });
/**
* Specifies a style for the element when the animation is not playing (when it is finished, or when it has a delay)(none, forwards, backwards)
* @memberof Animator
* @instance
* @name fillMode
*/
(0, _Util.defineGetterSetter)({ target: Animator.prototype, name: "fillMode", parent: "options" });
/**
* Specifies whether an animation should play in reverse direction or alternate cycles(normal, reverse, alternate, alternate-reverse)
* @memberof Animator
* @instance
* @name direction
*/
(0, _Util.defineGetterSetter)({ target: Animator.prototype, name: "direction", parent: "options" });
/**
* specifies a delay for the start of an animation
* @memberof Animator
* @instance
* @name delay
*/
(0, _Util.defineGetterSetter)({ target: Animator.prototype, name: "delay", parent: "options" });

exports.default = Animator;

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Animator2 = __webpack_require__(6);

var _Animator3 = _interopRequireDefault(_Animator2);

var _Frame = __webpack_require__(3);

var _Frame2 = _interopRequireDefault(_Frame);

var _Util = __webpack_require__(0);

var _FrameTimeline = __webpack_require__(15);

var _FrameTimeline2 = _interopRequireDefault(_FrameTimeline);

var _Dot = __webpack_require__(10);

var _Constant = __webpack_require__(2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
* manage Frame Timeline and play Timeline.
* @extends Animator
*/
var SceneItem = function (_Animator) {
	_inherits(SceneItem, _Animator);

	_createClass(SceneItem, null, [{
		key: "addGetterSetter",
		value: function addGetterSetter(role) {
			this.prototype[(0, _Util.camelize)("set " + role)] = function (time, properties, value) {
				this.set(time, role, properties, value);
				return this;
			};
			this.prototype[(0, _Util.camelize)("get " + role)] = function (time, property) {
				var frame = this.getFrame(time);

				if (!frame) {
					return 0;
				}
				return frame.get(role, property);
			};
		}
		/**
  * add Role to SceneItem.
  * @static
  * @param {String} role - property role(property, transform, filter)
  * @example
  Scene.SceneItem.addRole("property");
  Scene.SceneItem.addRole("transform");
  Scene.SceneItem.addRole("filter");
  */

	}, {
		key: "addRole",
		value: function addRole(role) {
			_Frame2.default.addRole(role);
			this.addGetterSetter(role);
		}
		/**
  * Create a scene's item.
  * @param {Object} properties - properties
  * @example
  let item = new Scene.SceneItem({
  0: {
  	display: "none",
  },
  1: {
  	display: "block",
  	opacity: 0,
  },
  2: {
  	opacity: 1,
  }
  });
  */

	}]);

	function SceneItem(properties) {
		_classCallCheck(this, SceneItem);

		var _this = _possibleConstructorReturn(this, (SceneItem.__proto__ || Object.getPrototypeOf(SceneItem)).call(this));

		_this.timeline = new _FrameTimeline2.default();
		_this.load(properties);
		return _this;
	}
	/**
 * Specifies how many seconds an animation takes to complete one cycle
 * Specifies timeline's lastTime
 * @override
 * @example
 item.duration; // = item.timeline.last
 */


	_createClass(SceneItem, [{
		key: "setId",
		value: function setId(_id) {
			this.options.id = _id;
		}
		/**
  * set properties to the sceneItem at that time
  * @param {Number} time - time
  * @param {String|Object} role - property role or properties
  * @param {String|Object} [properties] - property's name or properties
  * @param {Object} [value] - property's value
  * @return {SceneItem} An instance itself
  * @example
  item.duration; // = item.timeline.last
  */

	}, {
		key: "set",
		value: function set(time, role, properties, value) {
			if ((0, _Util.isObject)(time)) {
				this.load(time);
				return this;
			}
			var frame = this.getFrame(time);

			if (!frame) {
				frame = this.newFrame(time);
			}
			frame.set(role, properties, value);
			this.updateFrame(time, frame);
			return this;
		}
	}, {
		key: "setIterationTime",
		value: function setIterationTime(_time) {
			_get(SceneItem.prototype.__proto__ || Object.getPrototypeOf(SceneItem.prototype), "setIterationTime", this).call(this, _time);
			var time = this.currentIterationTime;
			var frame = this.getNowFrame(time);

			if (!frame) {
				return this;
			}
			this.trigger("animate", [time, this.getNowFrame(time), this.currentTime]);
			return this;
		}
		/**
  * update property names used in frames.
  * @override
  * @return {SceneItem} An instance itself
  * @example
  item.update();
  */

	}, {
		key: "update",
		value: function update() {
			this.timeline.update();
			return this;
		}
		/**
  * update property names used in frame.
  * @param {Number} time - frame's time
  * @param {Frame} [frame] - frame of that time.
  * @return {SceneItem} An instance itself
  * @example
  item.updateFrame(time, this.get(time));
  */

	}, {
		key: "updateFrame",
		value: function updateFrame(time) {
			var frame = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.getFrame(time);

			this.timeline.updateFrame(time, frame);
			return this;
		}
		/**
  * create and add a frame to the sceneItem at that time
  * @param {Number} time - frame's time
  * @return {Frame} Created frame.
  * @example
  item.newFrame(time);
  */

	}, {
		key: "newFrame",
		value: function newFrame(time) {
			var frame = this.getFrame(time);

			if (frame) {
				return frame;
			}
			frame = new _Frame2.default();
			if (!(0, _Util.isUndefined)(time)) {
				this.setFrame(time, frame);
			}
			return frame;
		}
		/**
  * add a frame to the sceneItem at that time
  * @param {Number} time - frame's time
  * @return {SceneItem} An instance itself
  * @example
  item.setFrame(time, frame);
  */

	}, {
		key: "setFrame",
		value: function setFrame(time, frame) {
			this.timeline.add(time, frame);
			return this;
		}
		/**
  * get sceneItem's frame at that time
  * @param {Number} time - frame's time
  * @return {Frame} sceneItem's frame at that time
  * @example
  const frame = item.getFrame(time);
  */

	}, {
		key: "getFrame",
		value: function getFrame(time) {
			return this.timeline.get(time);
		}
		/**
  * check if the item has a frame at that time
  * @param {Number} time - frame's time
  * @return {Boolean} true: the item has a frame // false: not
  * @example
  if (item.hasFrame(10)) {
  // has
  } else {
  // not
  }
  */

	}, {
		key: "hasFrame",
		value: function hasFrame(time) {
			return this.timeline.has(time);
		}
		/**
  * remove sceneItem's frame at that time
  * @param {Number} time - frame's time
  * @return {SceneItem} An instance itself
  * @example
  item.removeFrame(time);
  */

	}, {
		key: "removeFrame",
		value: function removeFrame(time) {
			var timeline = this.timeline;

			timeline.remove(time);
			delete this.frames[time];

			return this;
		}
		/**
  * Copy frame of the previous time at the next time.
  * @param {Number} fromTime - the previous time
  * @param {Number} toTime - the next time
  * @return {SceneItem} An instance itself
  * @example
  // getFrame(0) equal getFrame(1)
  item.copyFrame(0, 1);
  */

	}, {
		key: "copyFrame",
		value: function copyFrame(fromTime, toTime) {
			var time = void 0;

			if ((0, _Util.isObject)(fromTime)) {
				for (time in fromTime) {
					this.copyFrame(time, fromTime[time]);
				}
				return this;
			}
			var frame = this.getFrame(fromTime);

			if (!frame) {
				return this;
			}
			var copyFrame = frame.clone();

			this.setFrame(toTime, copyFrame);
			return this;
		}
		/**
  * merge frame of the previous time at the next time.
  * @param {Number} fromTime - the previous time
  * @param {Number} toTime - the next time
  * @return {SceneItem} An instance itself
  * @example
  // getFrame(1) contains getFrame(0)
  item.merge(0, 1);
  */

	}, {
		key: "mergeFrame",
		value: function mergeFrame(fromTime, toTime) {
			var time = void 0;

			if ((0, _Util.isObject)(fromTime)) {
				for (time in fromTime) {
					this.mergeFrame(time, fromTime[time]);
				}
				return this;
			}
			var frame = this.getFrame(fromTime);

			if (!frame) {
				return this;
			}
			var toFrame = this.newFrame(toTime);

			toFrame.merge(frame);
			return this;
		}
	}, {
		key: "getNowValue",
		value: function getNowValue(role, property, time) {
			var left = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 0;
			var right = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : this.timeline.length;

			var timeline = this.timeline;
			var times = timeline.times;
			var length = times.length;

			var prevFrame = void 0;
			var nextFrame = void 0;
			var i = void 0;

			var prevTime = times[left];
			var nextTime = times[right];

			if (time < prevTime) {
				return undefined;
			}
			for (i = left; i >= 0; --i) {
				prevTime = times[i];
				prevFrame = timeline.get(prevTime);
				if (prevFrame.has(role, property)) {
					break;
				}
			}
			for (i = right; i < length; ++i) {
				nextTime = times[i];
				nextFrame = timeline.get(nextTime);
				if (nextFrame.has(role, property)) {
					break;
				}
			}

			var prevValue = prevFrame.get(role, property);

			if ((0, _Util.isUndefined)(prevValue)) {
				return undefined;
			}
			if (!nextFrame) {
				return prevValue;
			}
			var nextValue = nextFrame.get(role, property);

			if ((0, _Util.isUndefined)(nextValue)) {
				return prevValue;
			}

			if (prevTime < 0) {
				prevTime = 0;
			}

			var value = (0, _Dot.dot)(prevValue, nextValue, time - prevTime, nextTime - time);

			return value;
		}
	}, {
		key: "getLeftRightIndex",
		value: function getLeftRightIndex(time) {
			var timeline = this.timeline;
			var times = timeline.times,
			    last = timeline.last,
			    length = timeline.length;


			if (length === 0) {
				return undefined;
			}
			// index : length = time : last
			var index = parseInt(last > 0 ? time * length / last : 0, 10);
			var right = length - 1;
			var left = 0;

			if (index < 0) {
				index = 0;
			} else if (index > right) {
				index = right;
			}
			if (time < times[right]) {
				// Binary Search
				while (left < right) {
					if ((left === index || right === index) && left + 1 === right) {
						break;
					} else if (times[index] > time) {
						right = index;
					} else if (times[index] < time) {
						left = index;
					} else {
						right = index;
						left = right;
						break;
					}
					index = parseInt((left + right) / 2, 10);
				}
			} else {
				index = right;
				left = index;
			}
			return { left: left, right: right };
		}
		/**
  * Get frame of the current time
  * @param {Number} time - the current time
  * @return {Frame} frame of the current time
  * @example
  let item = new Scene.SceneItem({
  0: {
  	display: "none",
  },
  1: {
  	display: "block",
  	opacity: 0,
  },
  2: {
  	opacity: 1,
  }
  });
  // opacity: 0.7; display:"block";
  const frame = item.getNowFrame(1.7);
  */

	}, {
		key: "getNowFrame",
		value: function getNowFrame(time) {
			this.update();

			var indices = this.getLeftRightIndex(time);

			if (!indices) {
				return indices;
			}
			var left = indices.left,
			    right = indices.right;

			var frame = this.newFrame();

			var names = this.timeline.names;
			var role = void 0;
			var propertyNames = void 0;
			var property = void 0;
			var value = void 0;

			for (role in _Constant.SCENE_ROLES) {
				propertyNames = names[role];
				for (property in propertyNames) {
					value = this.getNowValue(role, property, time, left, right);

					if ((0, _Util.isUndefined)(value)) {
						continue;
					}
					frame.set(role, property, value);
				}
			}
			return frame;
		}
		/**
  * load properties
  * @param {Object} properties - properties
  * @example
  item.load({
  0: {
  	display: "none",
  },
  1: {
  	display: "block",
  	opacity: 0,
  },
  2: {
  	opacity: 1,
  }
  });
  */

	}, {
		key: "load",
		value: function load(properties) {
			if (!(0, _Util.isObject)(properties)) {
				return this;
			}
			var isOptions = false;
			var time = void 0;
			var _properties = void 0;

			for (time in properties) {
				if (time === "options") {
					isOptions = true;
					continue;
				}
				_properties = properties[time];
				if (typeof _properties === "number") {
					this.mergeFrame(_properties, time);
					continue;
				}
				this.set(time, properties[time]);
			}
			if (isOptions) {
				this.setOptions(properties.options);
			}
			return this;
		}
	}, {
		key: "duration",
		get: function get() {
			return this.timeline.last;
		}
	}, {
		key: "id",
		set: function set(_id) {
			this.setId(_id);
		}
	}]);

	return SceneItem;
}(_Animator3.default);
/**
* Specifies the item's id to synchronize the element.
* @memberof SceneItem
* @instance
* @name id
*/


(0, _Util.defineGetter)({ target: SceneItem.prototype, name: "id", parent: "options" });

SceneItem.addRole("property");
exports.default = SceneItem;

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Util = __webpack_require__(0);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// import TimelineStep from "./TimelineStep";
/**
* a list of objects in chronological order.
*/
var Timeline = function () {
	function Timeline() {
		_classCallCheck(this, Timeline);

		this.times = [];
		this.item = {};
	}
	/**
 * get last time of list
 * @readonly
 * @return {Number} last time
 */


	_createClass(Timeline, [{
		key: "add",

		/**
  * add object in list
  * @param {Number} time - frame's time
  * @param {Object} object - target
  * @return {Timeline} An instance itself
  */
		value: function add(time, object) {
			this.item[time] = object;
			this.addTime(time);
			return this;
		}
	}, {
		key: "addTime",
		value: function addTime(time) {
			var times = this.times;
			var length = times.length;
			var pushIndex = length;
			var i = void 0;

			for (i = 0; i < length; ++i) {
				// if time is smaller than times[i], add time to index
				if (time === times[i]) {
					return this;
				} else if (time < times[i]) {
					pushIndex = i;
					break;
				}
			}
			this.times.splice(pushIndex, 0, time);
			return this;
		}
		/**
  * Check if timeline has object at that time.
  * @param {Number} time - object's time
  * @return {Boolean} true: if has time, false: not
  */

	}, {
		key: "has",
		value: function has(time) {
			return (0, _Util.has)(this.item, time);
		}
		/**
  * get object at that time.
  * @param {Number} time - object's time
  * @return {Object} object at that time
  */

	}, {
		key: "get",
		value: function get(time) {
			return this.item[time];
		}
		/**
  * remove object at that time.
  * @param {Number} time - object's time
  * @return {Timeline} An instance itself
  */

	}, {
		key: "remove",
		value: function remove(time) {
			delete this.item[time];
			this.removeTime(time);
			return this;
		}
	}, {
		key: "removeTime",
		value: function removeTime(time) {
			var index = this.times.indexOf(time);

			if (index === -1) {
				return this;
			}
			this.times.splice(index, 1);
			return this;
		}
	}, {
		key: "last",
		get: function get() {
			var times = this.times;

			return times.length === 0 ? 0 : times[times.length - 1];
		}
		/**
  * get last time of list
  * @readonly
  * @return {Number} length of list
  */

	}, {
		key: "length",
		get: function get() {
			return this.times.length;
		}
	}]);

	return Timeline;
}();

exports.default = Timeline;

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var cubicBezier = exports.cubicBezier = function cubicBezier(curveArray) {
	var _curveArray2 = _slicedToArray(curveArray, 4),
	    x1 = _curveArray2[0],
	    y1 = _curveArray2[1],
	    x2 = _curveArray2[2],
	    y2 = _curveArray2[3];

	function cubic(_x1, _x2, t) {
		var t2 = 1 - t;

		// Bezier Curve Formula
		return t * t * t + 3 * t * t * t2 * _x2 + 3 * t * t2 * t2 * _x1;
	}
	/*
 	x = f(t)
 	calculate inverse function by x
 	t = f-1(x)
 */
	function solveFromX(_x) {
		// x  0 ~ 1
		// t 0 ~ 1
		var t = _x;
		var x = _x;
		var dx = 1;

		while (Math.abs(dx) > 1 / 1000) {
			// 예상 t초에 의한 _x값
			x = cubic(x1, x2, t);
			dx = x - _x;
			// 차이가 미세하면 그 값을 t로 지정
			if (Math.abs(dx) < 1 / 1000) {
				return t;
			}
			t -= dx / 2;
		}
		return t;
	}
	return function (_x) {
		var x = _x;

		if (x >= 1) {
			x = 1;
		} else if (x <= 0) {
			x = 0;
		}
		x = solveFromX(x);
		return cubic(y1, y2, x);
	};
};

/**
* 8애니메이션이 해당 시간대에 어떤 TimingFunction을 사용할건지 지정한다.
*/

var TimingFunction = function () {
	function TimingFunction(_curveArray) {
		_classCallCheck(this, TimingFunction);

		this._curve = cubicBezier(_curveArray[0], _curveArray[1], _curveArray[2], _curveArray[3]);
	}

	_createClass(TimingFunction, [{
		key: "curve",
		value: function curve(ratio) {
			return this._curve(ratio);
		}
	}]);

	return TimingFunction;
}();

exports.default = TimingFunction;

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.dot = exports.dotObject = exports.dotColor = exports.dotArray = undefined;

var _Util = __webpack_require__(0);

var _PropertyObject = __webpack_require__(1);

var _PropertyObject2 = _interopRequireDefault(_PropertyObject);

var _Property = __webpack_require__(4);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var dot = void 0;

/**
* The dot product of Arrays
* @memberof Dot
* @function dotArray
* @param {Array} a1 value1
* @param {Array} a2 value2
* @param {Number} b1 b1 ratio
* @param {Number} b2 b2 ratio
* @return {Array|Object} Array.
* @example
dotArray([0, 0, 0, 1],[50, 50, 50, 1],0.5, 0.5);
// => [25, 25, 25, 1]
*/
/**
* @namespace
* @name Dot
*/

var dotArray = exports.dotArray = function dotArray(a1, a2, b1, b2) {
	var obj = [];
	var v1 = void 0;
	var i = void 0;

	for (i in a1) {
		v1 = a1[i];
		if (!(i in a2)) {
			obj[i] = v1;
		} else {
			obj[i] = dot(v1, a2[i], b1, b2);
		}
	}
	return obj;
};

/**
* The dot product of PropertyObject(type=color)
* If the values are not RGBA model, change them RGBA mdoel.
* @memberof Dot
* @function dotColor
* @param {PropertyObject|String} a1 value1
* @param {PropertyObject|String} a2 value2
* @param {Number} b1 b1 ratio
* @param {Number} b2 b2 ratio
* @return {PropertyObject} PropertyObject(type=color).
* @example
var colorObject = ......; //PropertyObject(type=color, model="rgba", value=[254, 254, 254, 1]);
dotColor("#000",  colorObject, 0.5, 0.5);
// "#000" => PropertyObject(type=color, model="rgba", value=[0, 0, 0, 1]);
// return => PropertyObject(type=color, model="rgba", value=[127, 127, 127, 1]);
*/
var dotColor = exports.dotColor = function dotColor(_a1, _a2, b1, b2) {
	var a1 = _a1;
	var a2 = _a2;

	// convert array to PropertyObject(type=color)
	if (!(a1 instanceof _PropertyObject2.default)) {
		a1 = (0, _Property.toColorObject)(a1);
	}
	if (!(a2 instanceof _PropertyObject2.default)) {
		a2 = (0, _Property.toColorObject)(a2);
	}
	var value1 = a1.value;
	var value2 = a2.value;
	// If the model name is not same, the inner product is impossible.
	var model1 = a1.model;
	var model2 = a2.model;

	if (model1 !== model2) {
		// It is recognized as a string.
		return dot(a1.toValue(), a2.toValue(), b1, b2);
	}
	if (value1.length === 3) {
		value1[3] = 1;
	}
	if (value2.length === 3) {
		value2[3] = 1;
	}
	var v = dotArray(value1, value2, b1, b2);
	var colorModel = model1;

	for (var i = 0; i < 3; ++i) {
		v[i] = parseInt(v[i], 10);
	}
	var object = new _PropertyObject2.default(v, {
		type: "color",
		model: colorModel,
		prefix: colorModel + "(",
		suffix: ")"
	});

	return object;
};
/**
* The dot product of Objects
* @memberof Dot
* @function dotObject
* @param {PropertyObject} a1 value1
* @param {PropertyObject} a2 value2
* @param {Number} b1 b1 ratio
* @param {Number} b2 b2 ratio
* @return {PropertyObject} Array with Separator.
* @example
dotObject(PropertyObject(["1px", "solid", rgba(0, 0, 0, 1)]),
PropertyObject(["9px", "solid", rgba(50, 50, 50, 1)]),
0.5, 0.5);
// => PropertyObject(["5px", "solid", rgba(25, 25, 25, 1)])
*/
var dotObject = exports.dotObject = function dotObject(a1, a2, b1, b2) {
	var a1Type = a1.type;

	if (a1Type === "color") {
		return dotColor(a1, a2, b1, b2);
	}
	var value1 = a1.value;
	var value2 = a2.value;

	if (!(0, _Util.isObject)(a2)) {
		return a1;
	}
	var arr = dotArray(value1, value2, b1, b2);
	var obj = new _PropertyObject2.default(arr, a1.separator);

	obj.prefix = a1.prefix;
	obj.suffix = a1.suffix;
	return obj;
};
/**
* The dot product of a1 and a2 for the b1 and b2.
* @memberof Dot
* @function dot
* @param {String|Number|PropertyObject} a1 value1
* @param {String|Number|PropertyObject} a2 value2
* @param {Number} b1 b1 ratio
* @param {Number} b2 b2 ratio
* @return {String} Not Array, Not Separator, Only Number & Unit
* @return {PropertyObject} Array with Separator.
* @example
dot(1, 3, 0.3, 0.7);
// => 1.6
*/
exports.dot = dot = function dot(a1, a2, b1, b2) {
	// dot Object
	if (a1 instanceof _PropertyObject2.default) {
		return dotObject(a1, a2, b1, b2);
	}
	// prevent division by zero.
	if (b1 + b2 === 0) {
		return a1;
	}
	// split number and unit of the value.
	var v1 = (0, _Util.splitUnit)(a1);
	var v2 = (0, _Util.splitUnit)(a2);
	var r1 = b1 / (b1 + b2);
	var r2 = 1 - r1;
	var v = void 0;

	// 숫자가 아닐경우 첫번째 값을 반환 b2가 0일경우 두번째 값을 반환
	if (isNaN(v1.value) || isNaN(v2.value)) {
		return r1 >= 1 ? a2 : a1;
	} else {
		v = v1.value * r2 + v2.value * r1;
	}
	var unit = v1.unit || v2.unit || false;

	if (unit === false) {
		return v;
	}
	return v + unit.trim();
};
exports.dot = dot;

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _SceneItem2 = __webpack_require__(7);

var _SceneItem3 = _interopRequireDefault(_SceneItem2);

var _Util = __webpack_require__(0);

var _CSSFrame = __webpack_require__(5);

var _CSSFrame2 = _interopRequireDefault(_CSSFrame);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function animateFunction(time, frame) {
	var element = this.element;

	if (!element) {
		return;
	}
	var cssText = frame.cssText;

	if (this.options.cssText === cssText) {
		return;
	}
	this.options.cssText = cssText;
	if (element instanceof NodeList) {
		var length = element.length;
		var i = void 0;

		for (i = 0; i < length; ++i) {
			element[i].style.cssText = cssText;
		}
		return;
	}
	element.style.cssText = cssText;
}

/**
* manage CSSFrame
* @extends SceneItem
*/

var CSSItem = function (_SceneItem) {
	_inherits(CSSItem, _SceneItem);

	_createClass(CSSItem, null, [{
		key: "addRole",
		value: function addRole(role) {
			_CSSFrame2.default.addRole(role);
			this.addGetterSetter(role);
		}
	}]);

	function CSSItem(properties) {
		_classCallCheck(this, CSSItem);

		var _this = _possibleConstructorReturn(this, (CSSItem.__proto__ || Object.getPrototypeOf(CSSItem)).call(this, properties));

		_this.on("animate", animateFunction);
		return _this;
	}

	_createClass(CSSItem, [{
		key: "newFrame",
		value: function newFrame(time) {
			var frame = this.getFrame(time);

			if (frame) {
				return frame;
			}
			frame = new _CSSFrame2.default();
			if (!(0, _Util.isUndefined)(time)) {
				this.setFrame(time, frame);
			}
			return frame;
		}
		/**
  * In CSS, selectors are patterns used to select the element(s) you want to style.
  * @see {@link https://www.w3schools.com/cssref/css_selectors.asp|CSS Seelctor}
  * @example
  item.selector = ".scene .item li:first-child";
  const element = item.element;
  const element2 = document.querySelectorAll(".scene .item li:first-child");
  //element[0] and element2[0] are the same.
  */

	}, {
		key: "setId",
		value: function setId(_id) {
			var element = this.element;

			this.options.id = _id;
			if (!element) {
				return this;
			}
			if (element instanceof NodeList) {
				var length = element.length;
				var i = void 0;

				for (i = 0; i < length; ++i) {
					element[i].setAttribute("data-scene-id", _id);
				}
			} else {
				element.setAttribute("data-scene-id", _id);
			}
			return this;
		}
	}, {
		key: "setSelector",
		value: function setSelector(_selector) {
			var selector = _selector;

			if (!selector) {
				selector = this.id;
			}
			this.options.selector = selector;
			this.element = document.querySelectorAll(selector);
			return this;
		}
	}, {
		key: "setElement",
		value: function setElement(_element) {
			var element = _element;

			if (element instanceof NodeList) {
				element = element[0];
			}
			if (!element) {
				return this;
			}
			var id = this.id;
			var checkElement = void 0;

			this.options.element = _element;
			if (!id || id === "null") {
				for (;;) {
					id = parseInt(Math.random() * 10000, 10);
					checkElement = document.querySelector("[data-scene-id=\"" + id + "\"]");
					if (!checkElement) {
						break;
					}
				}
			}
			this.id = id;
			return this;
		}
		/**
  * adds css style of items's element to the frame at that time.
  * @param {Number} time - frame's time
  * @example
  // html
  // <div id="item1" style="opacity:0.5;display:none;border-left:10px solid black;">
  const item = new Scene.SceneItem();
  item.selector = "#item1";
  item.copyCSSStyle(0);
  const frame = item.getFrame(0);
  frame.getProperty("opacity"); // 0.5
  frame.getProperty("display"); // "none"
  frame.getProperty("border-left").toValue(); // "10px solid black"
  */

	}, {
		key: "copyCSSStyle",
		value: function copyCSSStyle(time) {
			var element = this.element;

			if (element instanceof NodeList) {
				element = element[0];
			}
			if (!element) {
				return this;
			}
			var cssText = element.style.cssText;
			var cssArray = cssText.split(";");
			var length = cssArray.length;
			var cssObject = {};
			var i = void 0;
			var matches = void 0;

			for (i = 0; i < length; ++i) {
				matches = /([^:]*):([\S\s]*)/g.exec(cssArray[i]);
				if (!matches || matches.length < 3) {
					continue;
				}
				cssObject[matches[1]] = matches[2];
			}
			this.set(time, cssObject);
			return this;
		}
		/**
  * adds css property of items's element to the frame at that time.
  * @param {Number} time - frame's time
  * @param {String} property - the name of property or the names of properties to copy.
  * @example
  // css
  // #item1 {display: inline-block; width: 100px; height: 100px;}
  // html
  // <div id="item1" style="opacity:0.5;border-left:10px solid black;"></div>
  const item = new Scene.SceneItem();
  item.selector = "#item1";
  item.copyCSSProperty(0, "display");
  item.copyCSSProperty(0, ["width", "opacity"]);
  const frame = item.getFrame(0);
  frame.getProperty("width"); // 100px;
  frame.getProperty("display"); // "inline-block"
  frame.getProperty("opacity"); // 0.5
  	*/

	}, {
		key: "copyCSSProperty",
		value: function copyCSSProperty(time, property) {
			var element = this.element;

			if (element instanceof NodeList) {
				element = element[0];
			}
			if (!element) {
				return this;
			}
			var style = element.style;
			var cssObject = {};

			if ((0, _Util.isObject)(property)) {
				var name = void 0;

				for (var i = 0, length = property.length; i < length; ++i) {
					name = property[i];
					cssObject[property] = style && style[name] || window.getComputedStyle(element)[name];
				}
			} else {
				cssObject[property] = style && style[property] || window.getComputedStyle(element)[property];
			}
			this.set(time, cssObject);

			return this;
		}
	}, {
		key: "setOptions",
		value: function setOptions(options) {
			_get(CSSItem.prototype.__proto__ || Object.getPrototypeOf(CSSItem.prototype), "setOptions", this).call(this, options);
			var selector = options && options.selector;

			if (!selector) {
				return this;
			}
			if (selector === true) {
				this.setSelector();
			} else {
				this.setSelector(selector);
			}
			return this;
		}
	}, {
		key: "selector",
		get: function get() {
			return this.options.selector;
		},
		set: function set(value) {
			this.setSelector(value);
		}
	}, {
		key: "element",
		set: function set(_element) {
			this.setElement(_element);
		}
	}]);

	return CSSItem;
}(_SceneItem3.default);

/**
* get transform'value in the sceneItem at that time
* @param {Number} time - time
* @param {String|Object} property - property's name
* @method CSSItem#getTransform
* @return {Object} property's value
* @example
item.getTransform(10, "scale");
*/
/**
* set transform to the sceneItem at that time
* @param {Number} time - time
* @param {String} [property] - property's name or properties
* @param {Object} [value] - property's value
* @method SceneItem#setTransform
* @return {SceneItem} An instance itself
* @example
item.setTransform(10, "scale", "1,1");
*/


CSSItem.addRole("transform");
/**
* get filter's value in the sceneItem at that time
* @param {Number} time - time
* @param {String|Object} property - property's name
* @method SceneItem#getFilter
* @return {Object} property's value
* @example
item.getFilter(10, "opacity");
*/
/**
* set filter to the sceneItem at that time
* @param {Number} time - time
* @param {String} [property] - property's name or properties
* @param {Object} [value] - property's value
* @method CSSItem#setFilter
* @return {SceneItem} An instance itself
* @example
item.setFilter(10, "opacity", "50%");
*/
CSSItem.addRole("filter");

/**
* Specifies an element to synchronize sceneItem's timeline.
* @memberof CSSItem
* @instance
* @name element
* @example
item.selector = ".scene .item li:first-child";

// same
item.element = document.querySelector(".scene .item li:first-child");
*/
(0, _Util.defineGetter)({ target: CSSItem.prototype, name: "element", parent: "options" });

exports.default = CSSItem;

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Animator2 = __webpack_require__(6);

var _Animator3 = _interopRequireDefault(_Animator2);

var _SceneItem = __webpack_require__(7);

var _SceneItem2 = _interopRequireDefault(_SceneItem);

var _Frame = __webpack_require__(3);

var _Frame2 = _interopRequireDefault(_Frame);

var _Timeline = __webpack_require__(8);

var _Timeline2 = _interopRequireDefault(_Timeline);

var _Constant = __webpack_require__(2);

var Constant = _interopRequireWildcard(_Constant);

var _Util = __webpack_require__(0);

var Util = _interopRequireWildcard(_Util);

var _Dot = __webpack_require__(10);

var Dot = _interopRequireWildcard(_Dot);

var _Property = __webpack_require__(4);

var Property = _interopRequireWildcard(_Property);

var _PropertyObject = __webpack_require__(1);

var _PropertyObject2 = _interopRequireDefault(_PropertyObject);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
* manage sceneItems and play Scene.
* @extends Animator
*/
var Scene = function (_Animator) {
	_inherits(Scene, _Animator);

	_createClass(Scene, null, [{
		key: "addRole",

		/**
  * add Role to Scene.
  * @static
  * @param {String} role - property role(property, transform, filter)
  * @example
  Scene.addRole("property");
  Scene.addRole("transform");
  Scene.addRole("filter");
  */
		value: function addRole(role) {
			_SceneItem2.default.addRole(role);
		}
		/**
  * Create a Scene
  * @param {Object} [properties] - properties
  * @example
  const scene = new Scene({
  item1: {
  	0: {
  		display: "none",
  	},
  	1: {
  		display: "block",
  		opacity: 0,
  	},
  	2: {
  		opacity: 1,
  	},
  },
  item2: {
  	2: {
  		opacity: 1,
  	},
  }
  });
  */

	}]);

	function Scene(properties) {
		_classCallCheck(this, Scene);

		var _this = _possibleConstructorReturn(this, (Scene.__proto__ || Object.getPrototypeOf(Scene)).call(this));

		_this.items = {};
		_this.load(properties);
		return _this;
	}
	/**
 * Specifies how many seconds an items'animation takes to complete one cycle
 * Specifies timeline's lastTime
 * @override
 * @example
 item.duration; // = item.timeline.last
 */


	_createClass(Scene, [{
		key: "getItem",

		/**
  * get item in scene by name
  * @param {String} name - item's name
  * @example
  const item = scene.getItem("item1")
  */
		value: function getItem(name) {
			return this.items[name];
		}
		/**
  * create item in scene
  * @param {String} name - name of item to create
  * @example
  const item = scene.newItem("item1")
  */

	}, {
		key: "newItem",
		value: function newItem(name) {
			if (Util.has(this.items, name)) {
				return this.items[name];
			}
			var item = new _SceneItem2.default();

			this.setItem(name, item);
			return item;
		}
		/**
  * add a sceneItem to the scene
  * @param {String} name - name of item to create
  * @param {SceneItem} item - sceneItem
  * @example
  const item = scene.newItem("item1")
  */

	}, {
		key: "setItem",
		value: function setItem(name, item) {
			item.id = name;
			this.items[name] = item;
			return this;
		}
	}, {
		key: "setIterationTime",
		value: function setIterationTime(_time) {
			_get(Scene.prototype.__proto__ || Object.getPrototypeOf(Scene.prototype), "setIterationTime", this).call(this, _time);
			var time = this.currentIterationTime;
			var items = this.items;
			var item = void 0;
			var id = void 0;

			for (id in items) {
				item = items[id];
				item.currentTime = time * item.playSpeed;
			}
			return this;
		}
		/**
  * load properties
  * @param {Object} properties - properties
  * @example
  scene.load({
  item1: {
  	0: {
  		display: "none",
  	},
  	1: {
  		display: "block",
  		opacity: 0,
  	},
  	2: {
  		opacity: 1,
  	},
  },
  item2: {
  	2: {
  		opacity: 1,
  	},
  }
  });
  */

	}, {
		key: "load",
		value: function load(properties) {
			if (!Util.isObject(properties)) {
				return this;
			}
			var item = void 0;
			var isOptions = void 0;
			var name = void 0;

			for (name in properties) {
				if (name === "options") {
					isOptions = true;
					continue;
				}
				item = this.newItem(name);
				item.load(properties[name]);
			}
			if (isOptions) {
				this.setOptions(properties.options);
			}
			return this;
		}
	}, {
		key: "duration",
		get: function get() {
			var items = this.items;
			var item = void 0;
			var time = 0;
			var id = void 0;

			for (id in items) {
				item = items[id];
				time = Math.max(time, item.totalDuration / item.playSpeed);
			}
			return time;
		}
	}]);

	return Scene;
}(_Animator3.default);

Scene.Util = Util;
Scene.Frame = _Frame2.default;
Scene.SceneItem = _SceneItem2.default;
Scene.Dot = Dot;
Scene.Constant = Constant;
Scene.Property = Property;
Scene.PropertyObject = _PropertyObject2.default;
Scene.Timeline = _Timeline2.default;
Scene.Animator = _Animator3.default;
exports.default = Scene;

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _Scene2 = __webpack_require__(12);

var _Scene3 = _interopRequireDefault(_Scene2);

var _CSSItem = __webpack_require__(11);

var _CSSItem2 = _interopRequireDefault(_CSSItem);

var _CSSFrame = __webpack_require__(5);

var _CSSFrame2 = _interopRequireDefault(_CSSFrame);

var _Util = __webpack_require__(0);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var CSSScene = function (_Scene) {
	_inherits(CSSScene, _Scene);

	function CSSScene() {
		_classCallCheck(this, CSSScene);

		return _possibleConstructorReturn(this, (CSSScene.__proto__ || Object.getPrototypeOf(CSSScene)).apply(this, arguments));
	}

	_createClass(CSSScene, [{
		key: "newItem",
		value: function newItem(name) {
			if ((0, _Util.has)(this.items, name)) {
				return this.items[name];
			}
			var item = new _CSSItem2.default();

			this.setItem(name, item);
			return item;
		}
	}, {
		key: "setSelector",
		value: function setSelector(selectors, _itemName) {
			var item = void 0;
			var selector = void 0;
			var itemName = _itemName;

			if (typeof selectors === "string") {
				item = this.getItem(itemName);
				if (!item) {
					return this;
				}
				item.setSelector(selectors);
				return this;
			}
			for (selector in selectors) {
				itemName = selectors[selector];
				item = this.getItem(itemName);
				if (!item) {
					continue;
				}
				item.selector = selector;
			}
			return this;
		}
	}, {
		key: "load",
		value: function load(properties) {
			_get(CSSScene.prototype.__proto__ || Object.getPrototypeOf(CSSScene.prototype), "load", this).call(this, properties);
			var isSelector = properties && properties.options && properties.options.selector;

			if (!isSelector) {
				return this;
			}
			var name = void 0;
			var item = void 0;

			for (name in properties) {
				if (name === "options") {
					continue;
				}
				item = this.getItem(name);
				if (!item) {
					continue;
				}
				item.setSelector(name);
			}
			return this;
		}
	}]);

	return CSSScene;
}(_Scene3.default);

CSSScene.SceneItem = _CSSItem2.default;
CSSScene.Frame = _CSSFrame2.default;

exports.default = CSSScene;

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Util = __webpack_require__(0);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
* attach and trigger event handlers.
*/
var EventTrigger = function () {
	function EventTrigger() {
		_classCallCheck(this, EventTrigger);

		this._events = {};
	}
	/**
 * Attach an event handler function for one or more events to target
 * @param {String} name - event's name
 * @param {Function} callback -  function to execute when the event is triggered.
 * @return {EventTrigger} An Instance itself.
 * @example
 target.on("animate", function() {
 console.log("animate");
 });
 target.trigger("animate");
 	*/


	_createClass(EventTrigger, [{
		key: "on",
		value: function on(name, callback) {
			var events = this._events;
			var i = void 0;
			var j = void 0;

			if ((0, _Util.isObject)(name)) {
				for (i in name) {
					this.on(i, name[i]);
				}
				return this;
			}
			if (!(0, _Util.has)(events, name)) {
				events[name] = [];
			}

			if ((0, _Util.isObject)(callback)) {
				for (j in callback) {
					this.on(name, callback[j]);
				}
				return this;
			}
			var event = events[name];

			event.push(callback);

			return this;
		}
		/**
  * execute event handler
  * @param {String} name - event's name
  * @param {Function} [data] - event handler's additional parameter
  * @return {EventTrigger} An Instance itself.
  * @example
  target.on("animate", function(a1, a2) {
  console.log("animate", a1, a2);
  });
  target.trigger("animate", [1, 2]); // log => "animate", 1, 2
  	*/

	}, {
		key: "trigger",
		value: function trigger(name, data) {
			var _this = this;

			var events = this._events;

			if (!(0, _Util.has)(events, name)) {
				return this;
			}

			var event = events[name];

			event.forEach(function (callback) {
				callback.apply(_this, data);
			});

			return this;
		}
	}]);

	return EventTrigger;
}();

EventTrigger.defaultEvents = {};
exports.default = EventTrigger;

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _Timeline2 = __webpack_require__(8);

var _Timeline3 = _interopRequireDefault(_Timeline2);

var _Constant = __webpack_require__(2);

var _Util = __webpack_require__(0);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
* Animation's Timeline with Frame
* @extends Timeline
*/
var FrameTimeline = function (_Timeline) {
	_inherits(FrameTimeline, _Timeline);

	function FrameTimeline() {
		_classCallCheck(this, FrameTimeline);

		var _this = _possibleConstructorReturn(this, (FrameTimeline.__proto__ || Object.getPrototypeOf(FrameTimeline)).call(this));

		_this.updateNumber = {};
		_this.names = {};
		var names = _this.names;

		for (var role in _Constant.SCENE_ROLES) {
			names[role] = {};
		}
		return _this;
	}

	_createClass(FrameTimeline, [{
		key: "addTime",
		value: function addTime(time) {
			_get(FrameTimeline.prototype.__proto__ || Object.getPrototypeOf(FrameTimeline.prototype), "addTime", this).call(this, time);

			if ((0, _Util.has)(this.updateNumber, time)) {
				return this;
			}
			this.updateNumber[time] = 0;

			return this;
		}
	}, {
		key: "removeTime",
		value: function removeTime(time) {
			_get(FrameTimeline.prototype.__proto__ || Object.getPrototypeOf(FrameTimeline.prototype), "removeTime", this).call(this, time);
			delete this.updateNumber[time];
		}
		/**
  * update property names used in frames.
  * @return {FrameTimeline} An instance itself
  * @example
  timeline.update();
  */

	}, {
		key: "update",
		value: function update() {
			var updateNumber = this.updateNumber;
			var frame = void 0;
			var time = void 0;

			for (time in updateNumber) {
				frame = this.get(time);
				if (updateNumber[time] === frame.updateNumber) {
					continue;
				}
				this.updateFrame(time, frame);
			}
			return this;
		}
		/**
  * update property names used in frame.
  * @param {Number} time - frame's time
  * @param {Frame} [frame] - frame of that time.
  * @return {FrameTimeline} An instance itself
  * @example
  timeline.updateFrame(time, this.get(time));
  */

	}, {
		key: "updateFrame",
		value: function updateFrame(time) {
			var frame = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.get(time);

			if (!frame) {
				return this;
			}
			var frameRoles = frame.properties;
			var itemNames = this.names;
			var frameProperties = void 0;
			var itemPropertyNames = void 0;
			var name = void 0;

			for (var role in frameRoles) {
				frameProperties = frameRoles[role];
				itemPropertyNames = itemNames[role];

				for (name in frameProperties) {
					if ((0, _Util.has)(itemPropertyNames, name)) {
						continue;
					}
					itemPropertyNames[name] = true;
				}
			}
			this.updateNumber[time] = frame.updateNumber;
			return this;
		}
	}]);

	return FrameTimeline;
}(_Timeline3.default);

exports.default = FrameTimeline;

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
/**
* @namespace
* @name Color
*/
var COLOR_MODELS = exports.COLOR_MODELS = ["rgb", "rgba", "hsl", "hsla"];

/**
* Remove the # from the hex color.
* @memberof Color
* @function cutHex
* @param {String} hex - hex color
* @return {String} hex color
* @example
console.log(cutHex("#000000"))
// "000000"
*/
var cutHex = exports.cutHex = function cutHex(hex) {
	return hex.charAt(0) === "#" ? hex.substring(1, 9) : hex;
};
/**
* convert hex color to rgb color.
* @memberof Color
* @function hexToRGB
* @param {String} hex - hex color
* @return {Array} rgb color
* @example
console.log(hexToRGB("#000000"));
// [0, 0, 0]
console.log(hexToRGB("#201045"));
// [32, 16, 69]
*/
var hexToRGB = exports.hexToRGB = function hexToRGB(hex) {
	var h = cutHex(hex);
	var r = parseInt(h.substring(0, 2), 16);
	var g = parseInt(h.substring(2, 4), 16);
	var b = parseInt(h.substring(4, 6), 16);
	var a = parseInt(h.substring(6, 8), 16) / 255;

	if (isNaN(a)) {
		a = 1;
	}
	return [r, g, b, a];
};

/**
* convert 3-digit hex color to 6-digit hex color.
* @memberof Color
* @function hex3to6
* @param {String} hex - 3-digit hex color
* @return {String} 6-digit hex color
* @example
console.log(hex3to6("#123"));
// "#112233"
*/
var hex3to6 = exports.hex3to6 = function hex3to6(h) {
	var r = h.charAt(1);
	var g = h.charAt(2);
	var b = h.charAt(3);
	var arr = ["#", r, r, g, g, b, b];

	return arr.join("");
};
/**
* convert hsl color to rgb color.
* @memberof Color
* @function hslToRGB
* @param {Array} hsl - hsl color(hue: 0 ~ 360, saturation: 0 ~ 1, lightness: 0 ~ 1)
* @return {Array} rgb color
* @example
console.log(hslToRGB([150, 0.5, 0.4]));
// [51, 153, 102]
*/
var hslToRGB = exports.hslToRGB = function hslToRGB(hsl) {
	var h = hsl[0];
	var s = hsl[1];
	var l = hsl[2];

	if (h < 0) {
		h += parseInt((Math.abs(h) + 360) / 360, 10) * 360;
	}
	h %= 360;

	var c = (1 - Math.abs(2 * l - 1)) * s;
	var x = c * (1 - Math.abs(h / 60 % 2 - 1));
	var m = l - c / 2;
	var rgb = void 0;

	if (h < 60) {
		rgb = [c, x, 0];
	} else if (h < 120) {
		rgb = [x, c, 0];
	} else if (h < 180) {
		rgb = [0, c, x];
	} else if (h < 240) {
		rgb = [0, x, c];
	} else if (h < 300) {
		rgb = [x, 0, c];
	} else if (h < 360) {
		rgb = [c, 0, x];
	}
	var result = [Math.round((rgb[0] + m) * 255), Math.round((rgb[1] + m) * 255), Math.round((rgb[2] + m) * 255)];

	if (hsl.length > 3) {
		result[3] = hsl[3];
	}
	return result;
};

/***/ })
/******/ ]);
});
        
        if(Scene.hasOwnProperty("default")) {
            var a = Scene;
            var b = window.Scene = a.default;
            for(var c in a) {
                if(c === "default")
                    continue;
                b[c] = a[c];
            }
        }
    ;
    })();