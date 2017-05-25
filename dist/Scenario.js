(function() {
        (function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("Scenario", [], factory);
	else if(typeof exports === 'object')
		exports["Scenario"] = factory();
	else
		root["Scenario"] = factory();
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
/******/ 	return __webpack_require__(__webpack_require__.s = 3);
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

var _EventTrigger2 = __webpack_require__(2);

var _EventTrigger3 = _interopRequireDefault(_EventTrigger2);

var _TimingFunction = __webpack_require__(4);

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
/* 2 */
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
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _Animator2 = __webpack_require__(1);

var _Animator3 = _interopRequireDefault(_Animator2);

var _Util = __webpack_require__(0);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Scenario = function (_Animator) {
	_inherits(Scenario, _Animator);

	/**
     * create a Scenario
     * @class
     * @param {Object} [scenes=false] scenes.
     * @example
 var scenario = new Scenario({
 0 : scene1,
 0.4 : scene2,
 0.7 : scene3
 });
     */
	function Scenario() {
		var scenes = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

		_classCallCheck(this, Scenario);

		var _this = _possibleConstructorReturn(this, (Scenario.__proto__ || Object.getPrototypeOf(Scenario)).call(this));

		_this.scenes = {};
		_this.addScene(scenes);
		return _this;
	}

	_createClass(Scenario, [{
		key: "setIterationTime",
		value: function setIterationTime(_time) {
			_get(Scenario.prototype.__proto__ || Object.getPrototypeOf(Scenario.prototype), "setIterationTime", this).call(this, _time);
			var time = this.currentIterationTime;
			var scenes = this.scenes;
			var scene = void 0;
			var id = void 0;
			var _scenes = void 0;
			var i = void 0;
			var length = void 0;

			for (id in scenes) {
				/*
    			if (id > time) {
    				continue;
    			}
    */
				_scenes = scenes[id];
				id = parseFloat(id);
				for (length = _scenes.length, i = length - 1; i >= 0; --i) {
					scene = _scenes[i];
					scene.currentTime = time * scene.playSpeed - id;
				}
			}
			return this;
		}
		/**
      * Add Scene in time
      * @param {number} time - Play Time.
      * @param {Scene} Scene - Scene.
      * @return {Scenario} An instance.
      * @example
  var scenario = new Scenario();
  scenario.addScene(0, scene1);
  scenario.addScene(0.5, scene2);
  scenario.addScene(1, scene3);
  scenario.addScene({
  2: scene4,
  3: scene5
  });
      */

	}, {
		key: "addScene",
		value: function addScene(_time, scene) {
			var scenes = this.scenes;

			if ((0, _Util.isObject)(_time)) {
				for (var time in _time) {
					this.addScene(time, _time[time]);
				}
				return this;
			}
			if (!(0, _Util.has)(scenes, _time)) {
				scenes[_time] = [];
			}
			scenes[_time].push(scene);
			return this;
		}
	}, {
		key: "duration",
		get: function get() {
			var scenes = this.scenes;
			var _scenes = void 0;
			var scene = void 0;
			var time = 0;
			var id = void 0;
			var i = void 0;
			var length = void 0;

			for (id in scenes) {
				_scenes = scenes[id];
				id = parseFloat(id);
				for (length = _scenes.length, i = length - 1; i >= 0; --i) {
					scene = _scenes[i];
					time = Math.max(time, id + scene.totalDuration / scene.playSpeed);
				}
			}
			return time;
		}
	}]);

	return Scenario;
}(_Animator3.default);

exports.default = Scenario;

/***/ }),
/* 4 */
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

/***/ })
/******/ ]);
});
        
        if(Scenario.hasOwnProperty("default")) {
            var a = Scenario;
            var b = window.Scenario = a.default;
            for(var c in a) {
                if(c === "default")
                    continue;
                b[c] = a[c];
            }
        }
    ;
    })();