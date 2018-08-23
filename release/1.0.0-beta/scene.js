/*!
 * Copyright (c) 2018 Daybrush
 * license: MIT
 * author: Daybrush
 * repository: https://github.com/daybrush/scenejs.git
 * @version 1.0.0-beta
 */
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("Scene", [], factory);
	else if(typeof exports === 'object')
		exports["Scene"] = factory();
	else
		root["Scene"] = factory();
})(window, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
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
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
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
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var index_1 = __webpack_require__(1), others = index_1;
for (var name_1 in others) {
    index_1["default"][name_1] = others[name_1];
}
module.exports = index_1["default"];


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var Scene_1 = __webpack_require__(2);
var SceneItem_1 = __webpack_require__(9);
exports.SceneItem = SceneItem_1["default"];
var Frame_1 = __webpack_require__(10);
exports.Frame = Frame_1["default"];
var Keyframes_1 = __webpack_require__(13);
exports.Keyframes = Keyframes_1["default"];
var PropertyObject_1 = __webpack_require__(8);
exports.PropertyObject = PropertyObject_1["default"];
var easing = __webpack_require__(5);
exports.easing = easing;
var Animator_1 = __webpack_require__(3);
exports.Animator = Animator_1["default"];
var presets = __webpack_require__(16);
exports.presets = presets;
exports["default"] = Scene_1["default"];


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
var Animator_1 = __webpack_require__(3);
var SceneItem_1 = __webpack_require__(9);
var consts_1 = __webpack_require__(7);
var utils_1 = __webpack_require__(6);
var Scene = (function (_super) {
    __extends(Scene, _super);
    function Scene(properties, options) {
        var _this = _super.call(this) || this;
        _this.items = {};
        _this.load(properties, options);
        return _this;
    }
    Scene.prototype.getDuration = function () {
        var items = this.items;
        var time = 0;
        for (var id in items) {
            var item = items[id];
            time = Math.max(time, item.getTotalDuration() / item.getPlaySpeed());
        }
        return time;
    };
    Scene.prototype.setDuration = function (duration) {
        var items = this.items;
        var sceneDuration = this.getDuration();
        if (duration === 0 || !isFinite(sceneDuration)) {
            return this;
        }
        if (sceneDuration === 0) {
            for (var id in items) {
                var item = items[id];
                item.setDuration(duration);
            }
        }
        else {
            var ratio = duration / sceneDuration;
            for (var id in items) {
                var item = items[id];
                item.setDelay(item.getDelay() * ratio);
                item.setDuration(item.getDuration() * ratio);
            }
        }
        return this;
    };
    Scene.prototype.getItem = function (name) {
        return this.items[name];
    };
    Scene.prototype.newItem = function (name, options) {
        if (options === void 0) { options = {}; }
        if (utils_1.has(this.items, name)) {
            return this.items[name];
        }
        var item = new SceneItem_1["default"]();
        this.setItem(name, item);
        item.setOptions(options);
        return item;
    };
    Scene.prototype.setItem = function (name, item) {
        if (name instanceof SceneItem_1["default"]) {
            var id = name.getId() || name.setId().getId();
            this.items[id] = name;
            return this;
        }
        item.setId(name);
        this.items[name] = item;
        return this;
    };
    Scene.prototype.setIterationTime = function (time) {
        _super.prototype.setIterationTime.call(this, time);
        var iterationTime = this.getIterationTime();
        var items = this.items;
        var easing = this.state.easing;
        for (var id in items) {
            var item = items[id];
            item.setTime(iterationTime * item.state.playSpeed, easing, this);
        }
        return this;
    };
    Scene.prototype.forEach = function (func) {
        var items = this.items;
        for (var name_1 in items) {
            func(items[name_1], name_1, items);
        }
        return this;
    };
    Scene.prototype.exportCSS = function () {
        var items = this.items;
        var duration = this.getDuration();
        if (!duration || !isFinite(duration)) {
            duration = 0;
        }
        for (var id in items) {
            var item = items[id];
            item.exportCSS(duration, this.state);
        }
        return this;
    };
    Scene.prototype.append = function (item) {
        item.setDelay(item.getDelay() + this.getDuration());
        this.setItem(item);
    };
    Scene.prototype.playCSS = function (exportCSS, properties) {
        var _this = this;
        if (exportCSS === void 0) { exportCSS = true; }
        if (properties === void 0) { properties = {}; }
        if (!consts_1.ANIMATION || this.getPlayState() === "running") {
            return this;
        }
        exportCSS && this.exportCSS();
        var items = this.items;
        var animationItem;
        for (var id in items) {
            var item = items[id];
            item.playCSS(false, properties);
            if (item.getState("playCSS")) {
                animationItem = item;
            }
        }
        if (!animationItem) {
            return this;
        }
        var animationiteration = function (_a) {
            var currentTime = _a.currentTime, iterationCount = _a.iterationCount;
            _this.state.currentTime = currentTime;
            _this.setCurrentIterationCount(iterationCount);
        };
        var animationend = function () {
            _this.end();
            _this.setState({ playCSS: false });
            animationItem.off("ended", animationend);
            animationItem.off("iteration", animationiteration);
        };
        animationItem.on("ended", animationend);
        animationItem.on("iteration", animationiteration);
        this.setState({ playCSS: true });
        this.setPlayState("running");
        this.trigger("play");
        return this;
    };
    Scene.prototype.load = function (properties, options) {
        if (properties === void 0) { properties = {}; }
        if (options === void 0) { options = properties.options; }
        var isSelector = options && options.selector;
        for (var name_2 in properties) {
            if (name_2 === "options") {
                continue;
            }
            var object = properties[name_2];
            var item = void 0;
            if (object instanceof SceneItem_1["default"]) {
                this.setItem(name_2, object);
                item = object;
            }
            else {
                item = this.newItem(name_2);
                item.load(object);
            }
            isSelector && item.setSelector(name_2);
        }
        this.setOptions(options);
    };
    Scene.VERSION = "#__VERSION__#";
    return Scene;
}(Animator_1["default"]));
exports["default"] = Scene;


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
var EventTrigger_1 = __webpack_require__(4);
var easing_1 = __webpack_require__(5);
var utils_1 = __webpack_require__(6);
var lastTime = 0;
var requestAnimFrame = (function () {
    return window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        (function (callback) {
            var currTime = Date.now();
            var timeToCall = Math.max(0, 16 - (currTime - lastTime));
            var id = window.setTimeout(function () {
                callback(currTime + timeToCall);
            }, 1000 / 60);
            lastTime = currTime + timeToCall;
            return id;
        });
})();
function isDirectionReverse(iterationCount, direction) {
    return direction === "reverse" ||
        direction === (iterationCount % 2 >= 1 ? "alternate" : "alternate-reverse");
}
exports.isDirectionReverse = isDirectionReverse;
var Animator = (function (_super) {
    __extends(Animator, _super);
    function Animator(options) {
        var _this = _super.call(this) || this;
        _this.options = {};
        _this.state = {
            easing: 0,
            easingName: "linear",
            iterationCount: 1,
            delay: 0,
            fillMode: "forwards",
            direction: "normal",
            playSpeed: 1,
            currentTime: 0,
            currentIterationTime: -1,
            currentIterationCount: 0,
            prevTime: 0,
            playState: "paused",
            duration: 0
        };
        _this.setOptions(options);
        return _this;
    }
    Animator.prototype.setEasing = function (curveArray) {
        this.setState(Array.isArray(curveArray) ? {
            easingName: "cubic-bezier(" + curveArray.join(",") + ")",
            easing: easing_1.bezier(curveArray[0], curveArray[1], curveArray[2], curveArray[3])
        } : {
            easing: curveArray,
            easingName: curveArray.easingName || "linear"
        });
        return this;
    };
    Animator.prototype.setOptions = function (options) {
        if (!options) {
            return this;
        }
        for (var name_1 in options) {
            var value = options[name_1];
            if (name_1 === "easing") {
                this.setEasing(value);
                continue;
            }
            else if (name_1 === "duration") {
                value && this.setDuration(value);
                continue;
            }
            (name_1 in this.state ? this.state : this.options)[name_1] = value;
        }
        return this;
    };
    Animator.prototype.getTotalDuration = function () {
        if (this.state.iterationCount === "infinite") {
            return Infinity;
        }
        return this.state.delay + this.getActiveDuration();
    };
    Animator.prototype.getActiveDuration = function () {
        if (this.state.iterationCount === "infinite") {
            return Infinity;
        }
        return this.getDuration() * this.state.iterationCount;
    };
    Animator.prototype.isEnded = function () {
        if (this.getTime() === 0 && this.state.playState === "paused") {
            return true;
        }
        else if (this.getTime() < this.getTotalDuration()) {
            return false;
        }
        return true;
    };
    Animator.prototype.isPaused = function () {
        return this.state.playState === "paused";
    };
    Animator.prototype.setNext = function (animator) {
        this.on("ended", function () {
            animator.play();
        });
        return this;
    };
    Animator.prototype.play = function () {
        var _this = this;
        if (this.isEnded()) {
            this.setTime(0);
        }
        this.state.playState = "running";
        requestAnimFrame(function (time) {
            _this.state.prevTime = time;
            _this.tick(time);
        });
        this.trigger("play");
        return this;
    };
    Animator.prototype.pause = function () {
        this.state.playState = "paused";
        this.trigger("paused");
        return this;
    };
    Animator.prototype.end = function () {
        this.pause();
        this.trigger("ended");
        return this;
    };
    Animator.prototype.reset = function () {
        this.setTime(0);
        this.pause();
        return this;
    };
    Animator.prototype.setTime = function (time) {
        var totalDuration = this.getTotalDuration();
        var currentTime = time;
        if (currentTime < 0) {
            currentTime = 0;
        }
        else if (currentTime > totalDuration) {
            currentTime = totalDuration;
        }
        this.state.currentTime = currentTime;
        this.calculateIterationTime();
        this.trigger("timeupdate", {
            currentTime: currentTime,
            time: this.getIterationTime(),
            iterationCount: this.getIterationCount()
        });
        return this;
    };
    Animator.prototype.getState = function (name) {
        return this.state[name];
    };
    Animator.prototype.setState = function (object) {
        for (var name_2 in object) {
            this.state[name_2] = object[name_2];
        }
        return this;
    };
    Animator.prototype.getTime = function () {
        return this.state.currentTime;
    };
    Animator.prototype.getActiveTime = function () {
        return utils_1.toFixed(Math.max(this.state.currentTime - this.state.delay, 0));
    };
    Animator.prototype.getIterationTime = function () {
        return this.state.currentIterationTime;
    };
    Animator.prototype.setCurrentIterationCount = function (iterationCount) {
        var state = this.state;
        var passIterationCount = Math.floor(iterationCount);
        if (state.currentIterationCount < passIterationCount) {
            this.trigger("iteration", {
                currentTime: state.currentTime,
                iterationCount: passIterationCount
            });
        }
        state.currentIterationCount = iterationCount;
        return this;
    };
    Animator.prototype.setIterationTime = function (time) {
        this.state.currentIterationTime = time;
        return this;
    };
    Animator.prototype.calculateIterationTime = function () {
        var _a = this.state, iterationCount = _a.iterationCount, fillMode = _a.fillMode, direction = _a.direction, currentTime = _a.currentTime, delay = _a.delay;
        var duration = this.getDuration();
        var activeTime = this.getActiveTime();
        var isDelay = currentTime - delay < 0;
        var currentIterationCount = duration === 0 ? 0 : activeTime / duration;
        var currentIterationTime = duration ? activeTime % duration : 0;
        if (isDelay || !currentIterationCount) {
            this.setIterationTime(0);
            return this;
        }
        this.setCurrentIterationCount(currentIterationCount);
        var isReverse = isDirectionReverse(currentIterationCount, direction);
        if (isReverse) {
            currentIterationTime = duration - currentIterationTime;
        }
        if (iterationCount !== "infinite") {
            var isForwards = fillMode === "both" || fillMode === "forwards";
            if (currentIterationCount >= iterationCount) {
                currentIterationTime = duration * (isForwards ? (iterationCount % 1) || 1 : 0);
                isReverse && (currentIterationTime = duration - currentIterationTime);
            }
        }
        this.setIterationTime(currentIterationTime);
        return this;
    };
    Animator.prototype.caculateEasing = function (time) {
        if (!this.state.easing) {
            return time;
        }
        var duration = this.getDuration();
        var easing = this.state.easing;
        var ratio = duration === 0 ? 0 : time / duration;
        var easingTime = easing(ratio) * time;
        return easingTime;
    };
    Animator.prototype.tick = function (now) {
        var _this = this;
        var state = this.state;
        var playSpeed = state.playSpeed, prevTime = state.prevTime;
        var currentTime = this.getTime() + Math.min(1000, now * playSpeed - prevTime) / 1000;
        state.prevTime = now * playSpeed;
        this.setTime(currentTime);
        if (this.isEnded()) {
            this.end();
        }
        if (state.playState === "paused") {
            return;
        }
        requestAnimFrame(function (time) {
            _this.tick(time);
        });
    };
    return Animator;
}(EventTrigger_1["default"]));
var AnimatorPrototype = Animator.prototype;
utils_1.defineGetterSetter(AnimatorPrototype, "delay", "state");
utils_1.defineGetterSetter(AnimatorPrototype, "fillMode", "state");
utils_1.defineGetterSetter(AnimatorPrototype, "iterationCount", "state");
utils_1.defineGetterSetter(AnimatorPrototype, "direction", "state");
utils_1.defineGetterSetter(AnimatorPrototype, "playState", "state");
utils_1.defineGetterSetter(AnimatorPrototype, "playSpeed", "state");
utils_1.defineGetterSetter(AnimatorPrototype, "duration", "state");
utils_1.defineGetter(AnimatorPrototype, "easingName", "state");
utils_1.defineGetter(AnimatorPrototype, "easing", "state");
exports["default"] = Animator;


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var EventTrigger = (function () {
    function EventTrigger() {
        this.events = {};
    }
    EventTrigger.prototype.on = function (name, callback) {
        var _this = this;
        var events = this.events;
        if (typeof name === "object") {
            for (var i in name) {
                this.on(i, name[i]);
            }
            return this;
        }
        if (!(name in events)) {
            events[name] = [];
        }
        if (!callback) {
            return this;
        }
        if (typeof callback === "object") {
            callback.forEach(function (func) { return _this.on(name, func); });
            return this;
        }
        var event = events[name];
        event.push(callback);
        return this;
    };
    EventTrigger.prototype.off = function (name, callback) {
        if (!name) {
            this.events = {};
        }
        else if (!callback) {
            this.events[name] = [];
        }
        else {
            var callbacks = this.events[name];
            if (!callbacks) {
                return this;
            }
            var index = callbacks.indexOf(callback);
            if (index !== -1) {
                callbacks.splice(index, 1);
            }
        }
        return this;
    };
    EventTrigger.prototype.trigger = function (name) {
        var _this = this;
        var data = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            data[_i - 1] = arguments[_i];
        }
        var events = this.events;
        if (!(name in events)) {
            return this;
        }
        var event = events[name];
        if (data.length) {
            var target = data[0];
            target.type = name;
            target.currentTarget = this;
            !target.target && (target.target = this);
        }
        event.forEach(function (callback) {
            callback.apply(_this, data);
        });
        return this;
    };
    return EventTrigger;
}());
exports["default"] = EventTrigger;


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
function cubic(y1, y2, t) {
    var t2 = 1 - t;
    return t * t * t + 3 * t * t * t2 * y2 + 3 * t * t2 * t2 * y1;
}
function solveFromX(x1, x2, x) {
    var t = x;
    var solveX = x;
    var dx = 1;
    while (Math.abs(dx) > 1 / 1000) {
        solveX = cubic(x1, x2, t);
        dx = solveX - x;
        if (Math.abs(dx) < 1 / 1000) {
            return t;
        }
        t -= dx / 2;
    }
    return t;
}
function bezier(x1, y1, x2, y2) {
    var func = function (x) {
        var t = solveFromX(x1, x2, Math.max(Math.min(1, x), 0));
        return cubic(y1, y2, t);
    };
    func.easingName = "cubic-bezier(" + x1 + ", " + y1 + ", " + x2 + ", " + y2 + ")";
    return func;
}
exports.bezier = bezier;
exports.LINEAR = bezier(0, 0, 1, 1);
exports.EASE = bezier(0.25, 0.1, 0.25, 1);
exports.EASE_IN = bezier(0.42, 0, 1, 1);
exports.EASE_OUT = bezier(0, 0, 0.58, 1);
exports.EASE_IN_OUT = bezier(0.42, 0, 0.58, 1);


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var consts_1 = __webpack_require__(7);
var PropertyObject_1 = __webpack_require__(8);
function getType(value) {
    var type = typeof value;
    if (type === "object") {
        if (isArray(value)) {
            return "array";
        }
        else if (value instanceof PropertyObject_1["default"]) {
            return "property";
        }
    }
    else if (type === "string" || type === "number") {
        return "value";
    }
    return type;
}
exports.getType = getType;
function toFixed(num) {
    return Math.round(num * consts_1.MAXIMUM) / consts_1.MAXIMUM;
}
exports.toFixed = toFixed;
function isInProperties(roles, args, isCheckTrue) {
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
exports.isInProperties = isInProperties;
function isRole(args, isCheckTrue) {
    return isInProperties(consts_1.SCENE_ROLES, args, isCheckTrue);
}
exports.isRole = isRole;
function isFixed(args) {
    return isInProperties(consts_1.FIXED, args, true);
}
exports.isFixed = isFixed;
function isUndefined(value) {
    return (typeof value === "undefined");
}
exports.isUndefined = isUndefined;
function isObject(value) {
    return value && (typeof value === "object");
}
exports.isObject = isObject;
function isArray(value) {
    return Array.isArray(value);
}
exports.isArray = isArray;
function isString(value) {
    return typeof value === "string";
}
exports.isString = isString;
function has(object, name) {
    return Object.prototype.hasOwnProperty.call(object, name);
}
exports.has = has;
function splitUnit(text) {
    var matches = /^([^\d|e|-|\+]*)((?:\d|\.|-|e-|e\+)+)(\S*)$/g.exec(text);
    if (!matches) {
        return { prefix: "", unit: "", value: NaN };
    }
    var prefix = matches[1];
    var value = matches[2];
    var unit = matches[3];
    return { prefix: prefix, unit: unit, value: parseFloat(value) };
}
exports.splitUnit = splitUnit;
function camelize(str) {
    return str.replace(/[\s-_]([a-z])/g, function (all, letter) { return letter.toUpperCase(); });
}
exports.camelize = camelize;
function decamelize(str) {
    return str.replace(/([a-z])([A-Z])/g, function (all, letter, letter2) { return letter + "-" + letter2.toLowerCase(); });
}
exports.decamelize = decamelize;
function defineGetter(target, name, parent) {
    target[camelize("get " + name)] = function () {
        return (parent ? this[parent] : this)[name];
    };
}
exports.defineGetter = defineGetter;
function defineSetter(target, name, parent) {
    target[camelize("set " + name)] = function (value) {
        parent ? (this[parent][name] = value) : (this[name] = value);
        return this;
    };
}
exports.defineSetter = defineSetter;
function defineGetterSetter(target, name, parent) {
    defineGetter(target, name, parent);
    defineSetter(target, name, parent);
}
exports.defineGetterSetter = defineGetterSetter;


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
exports.PREFIX = "__SCENEJS_";
exports.timingFunction = "animation-timing-function";
exports.SCENE_ROLES = { transform: {}, filter: {}, attribute: {} };
exports.FIXED = { "animation-timing-function": true, "contents": true };
exports.MAXIMUM = 1000000;
exports.THRESHOLD = 0.000001;
var prefixes = ["webkit", "ms", "moz", "o"];
var checkProperties = function (property) {
    var styles = (document.body || document.documentElement).style;
    var length = prefixes.length;
    if (typeof styles[property] !== "undefined") {
        return property;
    }
    for (var i = 0; i < length; ++i) {
        var name_1 = "-" + prefixes[i] + "-" + property;
        if (typeof styles[name_1] !== "undefined") {
            return name_1;
        }
    }
    return "";
};
exports.TRANSFORM = checkProperties("transform");
exports.FILTER = checkProperties("filter");
exports.ANIMATION = checkProperties("animation");
exports.KEYFRAMES = exports.ANIMATION.replace("animation", "keyframes");
exports.START_ANIMATION = "startAnimation";


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var PropertyObject = (function () {
    function PropertyObject(value, options) {
        if (options === void 0) { options = {}; }
        this.options = {
            prefix: "",
            suffix: "",
            model: "",
            type: "",
            separator: ","
        };
        this.setOptions(options);
        this.init(value);
    }
    PropertyObject.prototype.setOptions = function (options) {
        Object.assign(this.options, options);
        return this;
    };
    PropertyObject.prototype.getOption = function (name) {
        return this.options[name];
    };
    PropertyObject.prototype.size = function () {
        return this.value.length;
    };
    PropertyObject.prototype.get = function (index) {
        return this.value[index];
    };
    PropertyObject.prototype.set = function (index, value) {
        this.value[index] = value;
        return this;
    };
    PropertyObject.prototype.clone = function () {
        var arr = this.value.map(function (v) { return ((v instanceof PropertyObject) ? v.clone() : v); });
        return new PropertyObject(arr, {
            separator: this.options.separator,
            prefix: this.options.prefix,
            suffix: this.options.suffix,
            model: this.options.model,
            type: this.options.type
        });
    };
    PropertyObject.prototype.toValue = function () {
        return this.options.prefix + this.join() + this.options.suffix;
    };
    PropertyObject.prototype.join = function () {
        return this.value.map(function (v) { return ((v instanceof PropertyObject) ? v.toValue() : v); }).join(this.options.separator);
    };
    PropertyObject.prototype.forEach = function (func) {
        this.value.forEach(func);
        return this;
    };
    PropertyObject.prototype.init = function (value) {
        var type = typeof value;
        if (type === "string") {
            this.value = value.split(this.options.separator);
        }
        else if (type === "object") {
            this.value = value;
        }
        else {
            this.value = [value];
        }
        return this;
    };
    return PropertyObject;
}());
exports["default"] = PropertyObject;


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
var Animator_1 = __webpack_require__(3);
var Frame_1 = __webpack_require__(10);
var utils_1 = __webpack_require__(6);
var Keyframes_1 = __webpack_require__(13);
var dot_1 = __webpack_require__(14);
var consts_1 = __webpack_require__(7);
var css_1 = __webpack_require__(15);
function toId(text) {
    return text.match(/[0-9a-zA-Z]+/g).join("");
}
function makeId(selector) {
    for (;;) {
        var id = "" + Math.floor(Math.random() * 100000);
        if (!selector) {
            return id;
        }
        var checkElement = document.querySelector("[data-scene-id=\"" + id + "\"]");
        if (!checkElement) {
            return id;
        }
    }
}
function makeAnimationProperties(properties) {
    var cssArray = [];
    for (var name_1 in properties) {
        cssArray.push(consts_1.ANIMATION + "-" + utils_1.decamelize(name_1) + " : " + properties[name_1] + ";");
    }
    return cssArray.join("");
}
var SceneItem = (function (_super) {
    __extends(SceneItem, _super);
    function SceneItem(properties, options) {
        var _this = _super.call(this) || this;
        _this.keyframes = new Keyframes_1["default"]();
        _this.elements = [];
        _this.load(properties, options);
        return _this;
    }
    SceneItem.prototype.getDuration = function () {
        return Math.max(this.state.duration, this.keyframes.getDuration());
    };
    SceneItem.prototype.setDuration = function (duration) {
        if (duration === 0) {
            return this;
        }
        var originalDuration = this.getDuration();
        if (originalDuration > 0) {
            this.keyframes.setDuration(duration, originalDuration);
        }
        _super.prototype.setDuration.call(this, utils_1.toFixed(duration));
        return this;
    };
    SceneItem.prototype.setId = function (id) {
        var elements = this.elements;
        var length = elements.length;
        this.setState({ id: id || makeId(!!length) });
        var sceneId = toId(this.state.id);
        this.options.selector || (this.options.selector = "[data-scene-id=\"" + sceneId + "\"]");
        if (!length) {
            return this;
        }
        for (var i = 0; i < length; ++i) {
            elements[i].setAttribute("data-scene-id", sceneId);
        }
        return this;
    };
    SceneItem.prototype.getId = function () {
        return this.state.id;
    };
    SceneItem.prototype.set = function (time) {
        var _this = this;
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        if (utils_1.isObject(time)) {
            this.load(time);
            return this;
        }
        else if (args[0]) {
            if (args[0] instanceof SceneItem) {
                var item = args[0];
                var delay = item.getDelay();
                var realTime_1 = this._getTime(time) + delay;
                var _a = item.getAllTimes(!!delay || !this.hasFrame(time)), keys = _a.keys, values_1 = _a.values, frames_1 = _a.frames;
                var easing = this.getEasingName() !== item.getEasingName() ? item.getEasing() : 0;
                keys.forEach(function (t) {
                    _this.set(realTime_1 + t, frames_1[values_1[t]]);
                });
                if (easing) {
                    this.set(realTime_1, consts_1.timingFunction, easing);
                    this.set(realTime_1 + keys[keys.length - 1], consts_1.timingFunction, "initial");
                }
                return this;
            }
            else if (args.length === 1 && utils_1.isArray(args[0])) {
                args[0].forEach(function (item) {
                    _this.set(time, item);
                });
                return this;
            }
        }
        var frame = this.newFrame(time);
        frame.set.apply(frame, args);
        this.updateFrame(frame);
        return this;
    };
    SceneItem.prototype.get = function (time) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        var frame = this.getFrame(time);
        return frame && frame.get.apply(frame, args);
    };
    SceneItem.prototype.remove = function (time) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        var frame = this.getFrame(time);
        frame && frame.remove.apply(frame, args);
        return this;
    };
    SceneItem.prototype.append = function (item) {
        this.set(this.getDuration(), item);
        return this;
    };
    SceneItem.prototype.prepend = function (item) {
        if (item instanceof SceneItem) {
            var delay = item.getDelay();
            var duration = item.getIterationCount() === "infinite" ? item.getDuration() : item.getActiveDuration();
            this.keyframes.unshift(duration + delay);
            this.set(0, item);
        }
        else {
            this.prepend(new SceneItem(item));
        }
        return this;
    };
    SceneItem.prototype.setSelector = function (selector) {
        this.options.selector = selector === true ? this.state.id :
            (selector || "[data-scene-id=\"" + this.state.id + "\"]");
        this.setElement(document.querySelectorAll(this.options.selector));
        return this;
    };
    SceneItem.prototype.setElement = function (elements) {
        if (!elements) {
            return this;
        }
        this.elements = (elements instanceof Element) ? [elements] : elements;
        this.setId();
        return this;
    };
    SceneItem.prototype.setCSS = function (time, properties) {
        this.set(time, css_1.fromCSS(this.elements, properties));
        return this;
    };
    SceneItem.prototype.setTime = function (time, parentEasing, parent) {
        _super.prototype.setTime.call(this, time);
        this.animate(parentEasing, parent);
        return this;
    };
    SceneItem.prototype.update = function () {
        this.keyframes.update();
        return this;
    };
    SceneItem.prototype.updateFrame = function (frame) {
        this.keyframes.updateFrame(frame);
        return this;
    };
    SceneItem.prototype.newFrame = function (time) {
        var frame = this.getFrame(time);
        if (frame) {
            return frame;
        }
        frame = new Frame_1["default"]();
        this.setFrame(time, frame);
        return frame;
    };
    SceneItem.prototype.setFrame = function (time, frame) {
        this.keyframes.add(this._getTime(time), frame);
        this.keyframes.update();
        return this;
    };
    SceneItem.prototype.getFrame = function (time) {
        return this.keyframes.get(this._getTime(time));
    };
    SceneItem.prototype.hasFrame = function (time) {
        return this.keyframes.has(this._getTime(time));
    };
    SceneItem.prototype.removeFrame = function (time) {
        var keyframes = this.keyframes;
        keyframes.remove(time);
        keyframes.update();
        return this;
    };
    SceneItem.prototype.copyFrame = function (fromTime, toTime) {
        if (utils_1.isObject(fromTime)) {
            for (var time in fromTime) {
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
    };
    SceneItem.prototype.mergeFrame = function (fromTime, toTime) {
        if (utils_1.isObject(fromTime)) {
            for (var time in fromTime) {
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
    };
    SceneItem.prototype.getNowFrame = function (time, easing) {
        var _this = this;
        var frame = new Frame_1["default"]();
        var names = this.keyframes.getNames();
        var _a = this._getNearTimeIndex(time), left = _a.left, right = _a.right;
        var realEasing = this._getEasing(time, left, right, this.state.easing || easing);
        names.forEach(function (properties) {
            var value = _this._getNowValue(time, left, right, properties, realEasing);
            if (utils_1.isUndefined(value)) {
                return;
            }
            frame.set(properties, value);
        });
        return frame;
    };
    SceneItem.prototype.load = function (properties, options) {
        if (properties === void 0) { properties = {}; }
        if (options === void 0) { options = properties.options; }
        if (utils_1.isArray(properties)) {
            var length_1 = properties.length;
            for (var i = 0; i < length_1; ++i) {
                var time = length_1 === 1 ? 0 : this._getTime(i / (length_1 - 1) * 100 + "%");
                this.set(time, properties[i]);
            }
        }
        else if (properties.keyframes) {
            this.set(properties.keyframes);
        }
        else {
            for (var time in properties) {
                if (time === "options" || time === "keyframes") {
                    continue;
                }
                var value = properties[time];
                var realTime = this._getTime(time);
                if (typeof value === "number") {
                    this.mergeFrame(value, realTime);
                    continue;
                }
                this.set(realTime, value);
            }
        }
        options && this.setOptions(options);
        return this;
    };
    SceneItem.prototype.clone = function (options) {
        if (options === void 0) { options = {}; }
        var item = new SceneItem();
        item.setOptions(this.state);
        item.setOptions(options);
        this.keyframes.forEach(function (frame, time) { return item.setFrame(time, frame.clone()); });
        return item;
    };
    SceneItem.prototype.setOptions = function (options) {
        if (options === void 0) { options = {}; }
        _super.prototype.setOptions.call(this, options);
        var id = options.id, selector = options.selector, duration = options.duration, elements = options.elements;
        duration && this.setDuration(duration);
        id && this.setId(id);
        if (elements) {
            this.setElement(elements);
        }
        else if (selector) {
            this.setSelector(selector === true ? this.state.id : selector);
        }
        return this;
    };
    SceneItem.prototype.getAllTimes = function (isStartZero, options) {
        if (isStartZero === void 0) { isStartZero = true; }
        if (options === void 0) { options = {}; }
        var times = this.keyframes.times.slice();
        var length = times.length;
        var keys = [];
        var values = {};
        if (!length) {
            return { keys: [], values: {}, frames: {} };
        }
        var frames = {};
        var duration = this.getDuration();
        var direction = options.direction || this.state.direction;
        var isShuffle = direction === "alternate" || direction === "alternate-reverse";
        (!this.getFrame(0)) && times.unshift(0);
        (!this.getFrame(duration)) && times.push(duration);
        length = times.length;
        var iterationCount = options.iterationCount || this.state.iterationCount;
        iterationCount = iterationCount !== "infinite" ? iterationCount : 1;
        var totalDuration = iterationCount * duration;
        for (var i = 0; i < iterationCount; ++i) {
            var isReverse = Animator_1.isDirectionReverse(i, direction);
            var start = i * duration;
            for (var j = 0; j < length; ++j) {
                if (isShuffle && i !== 0 && j === 0) {
                    continue;
                }
                var threshold = j === 0 && (i === 0 ? !isStartZero : !isShuffle) ? consts_1.THRESHOLD : 0;
                var keyvalue = isReverse ? times[length - 1 - j] : times[j];
                var time = utils_1.toFixed(isReverse ? duration - keyvalue : keyvalue);
                var keytime = utils_1.toFixed(start + time + threshold);
                if (totalDuration < keytime) {
                    break;
                }
                keys.push(keytime);
                values[keytime] = keyvalue;
                if (!frames[keyvalue]) {
                    var frame = this.getFrame(keyvalue);
                    if (j === 0 || j === length - 1 || frame.has("transform") || frame.has("filter")) {
                        frames[keyvalue] = this.getNowFrame(keyvalue);
                    }
                    else {
                        frames[keyvalue] = frame;
                    }
                }
            }
        }
        if (keys[keys.length - 1] < totalDuration) {
            var isReverse = Animator_1.isDirectionReverse(iterationCount, direction);
            var keyvalue = utils_1.toFixed(duration * (isReverse ? 1 - iterationCount % 1 : iterationCount % 1));
            keys.push(totalDuration);
            values[totalDuration] = keyvalue;
            !frames[keyvalue] && (frames[keyvalue] = this.getNowFrame(keyvalue));
        }
        return { keys: keys, values: values, frames: frames };
    };
    SceneItem.prototype.toCSS = function (duration, options) {
        if (duration === void 0) { duration = this.getDuration(); }
        if (options === void 0) { options = {}; }
        var state = this.state;
        var selector = state.selector || this.options.selector;
        if (!selector) {
            return "";
        }
        var id = this._getId();
        var isZeroDuration = duration === 0;
        var playSpeed = (options.playSpeed || 1);
        var delay = ((typeof options.delay === "undefined" ? state.delay : options.delay) || 0) / playSpeed;
        var easingName = (!isZeroDuration && options.easing && options.easingName) || state.easingName;
        var count = (!isZeroDuration && options.iterationCount) || state.iterationCount;
        var fillMode = (options.fillMode !== "forwards" && options.fillMode) || state.fillMode;
        var direction = (options.direction !== "normal" && options.direction) || state.direction;
        var cssText = makeAnimationProperties({
            fillMode: fillMode,
            direction: direction,
            delay: delay + "s",
            name: consts_1.PREFIX + "KEYFRAMES_" + toId(id),
            duration: duration / playSpeed + "s",
            timingFunction: easingName,
            iterationCount: count
        });
        var css = selector + "." + consts_1.START_ANIMATION + " {\n\t\t\t" + cssText + "\n\t\t}\n\t\t" + this._toKeyframes(duration, options);
        return css;
    };
    SceneItem.prototype.exportCSS = function (duration, options) {
        if (duration === void 0) { duration = this.getDuration(); }
        if (options === void 0) { options = {}; }
        if (!this.elements.length) {
            return;
        }
        var id = this._getId();
        var styleElement = document.querySelector("#" + consts_1.PREFIX + id);
        var css = this.toCSS(duration, options);
        if (styleElement) {
            styleElement.innerText = css;
        }
        else {
            document.body.insertAdjacentHTML("beforeend", "<style id=\"" + consts_1.PREFIX + "STYLE_" + id + "\">" + css + "</style>");
        }
    };
    SceneItem.prototype.playCSS = function (exportCSS, properties) {
        var _this = this;
        if (exportCSS === void 0) { exportCSS = true; }
        if (properties === void 0) { properties = {}; }
        if (!consts_1.ANIMATION || this.getPlayState() === "running") {
            return this;
        }
        var elements = this.elements;
        var length = elements.length;
        if (!length) {
            return this;
        }
        if (this.isEnded()) {
            this.setTime(0);
        }
        exportCSS && this.exportCSS();
        var cssText = makeAnimationProperties(properties);
        for (var i = 0; i < length; ++i) {
            var element = elements[i];
            element.style.cssText += cssText;
            if (css_1.hasClass(element, consts_1.START_ANIMATION)) {
                css_1.removeClass(element, consts_1.START_ANIMATION);
                (function (el) {
                    requestAnimationFrame(function () {
                        requestAnimationFrame(function () {
                            css_1.addClass(el, consts_1.START_ANIMATION);
                        });
                    });
                })(element);
            }
            else {
                css_1.addClass(element, consts_1.START_ANIMATION);
            }
        }
        this.setState({ playCSS: true });
        this.setPlayState("running");
        this.trigger("play");
        var duration = this.getDuration();
        var animatedElement = elements[0];
        var animationend = function () {
            _this.end();
            if (!animatedElement) {
                return;
            }
            animatedElement.removeEventListener("animationend", animationend);
            animatedElement.removeEventListener("animationiteration", animationiteration);
        };
        var animationiteration = function (_a) {
            var elapsedTime = _a.elapsedTime;
            var currentTime = elapsedTime;
            var iterationCount = currentTime / duration;
            _this.state.currentTime = currentTime;
            _this.setCurrentIterationCount(iterationCount);
        };
        animatedElement.addEventListener("animationend", animationend);
        animatedElement.addEventListener("animationiteration", animationiteration);
        return this;
    };
    SceneItem.prototype.animate = function (parentEasing, parent) {
        var iterationTime = this.getIterationTime();
        var easing = this.getEasing() || parentEasing;
        var frame = this.getNowFrame(iterationTime, easing);
        var currentTime = this.getTime();
        this.trigger("animate", {
            frame: frame,
            currentTime: currentTime,
            time: iterationTime
        });
        parent && parent.trigger("animate", {
            frame: frame,
            currentTime: currentTime,
            target: this,
            time: iterationTime
        });
        var elements = this.elements;
        var length = elements.length;
        if (!length) {
            return frame;
        }
        var attributes = frame.get("attribute");
        if (attributes) {
            for (var name_2 in attributes) {
                for (var i = 0; i < length; ++i) {
                    elements[i].setAttribute(name_2, attributes[name_2]);
                }
            }
        }
        var cssText = frame.toCSS();
        if (this.state.cssText !== cssText) {
            this.state.cssText = cssText;
            for (var i = 0; i < length; ++i) {
                elements[i].style.cssText += cssText;
            }
            return frame;
        }
    };
    SceneItem.prototype._getId = function () {
        return this.state.id || this.setId().getId();
    };
    SceneItem.prototype._getEasing = function (time, left, right, easing) {
        if (this.keyframes.hasName(consts_1.timingFunction)) {
            var nowEasing = this._getNowValue(time, left, right, [consts_1.timingFunction], 0, true);
            return typeof nowEasing === "function" ? nowEasing : easing;
        }
        return easing;
    };
    SceneItem.prototype._getTime = function (time) {
        var duration = this.getDuration() || 100;
        if (utils_1.isString(time)) {
            if (time === "from") {
                return 0;
            }
            else if (time === "to") {
                return duration;
            }
            var _a = utils_1.splitUnit(time), unit = _a.unit, value = _a.value;
            if (unit === "%") {
                !this.getDuration() && (this.state.duration = duration);
                return parseFloat(time) / 100 * duration;
            }
            else if (unit === ">") {
                return value + consts_1.THRESHOLD;
            }
            else {
                return value;
            }
        }
        else {
            return utils_1.toFixed(time);
        }
    };
    SceneItem.prototype._toKeyframes = function (duration, options) {
        if (duration === void 0) { duration = this.getDuration(); }
        if (options === void 0) { options = {}; }
        var id = this._getId();
        var state = this.state;
        var playSpeed = state.playSpeed;
        var isParent = typeof options.iterationCount !== "undefined";
        var iterationCount = state.iterationCount;
        var delay = isParent ? state.delay : 0;
        var direction = isParent ? state.direction : "normal";
        var _a = this.getAllTimes(true, {
            duration: duration,
            delay: delay,
            direction: direction,
            iterationCount: isParent && iterationCount !== "infinite" ? iterationCount : 1,
            isCSS: true
        }), keys = _a.keys, values = _a.values, frames = _a.frames;
        var length = keys.length;
        var css = {};
        var keyframes = [];
        for (var time in frames) {
            css[time] = frames[time].toCSS();
        }
        if (!keys.length) {
            return "";
        }
        if (delay) {
            keyframes.push("0%{" + frames[0] + "}");
            if (direction === "reverse" || direction === "alternate-reverse") {
                keyframes.push(delay / playSpeed / duration * 100 - 0.00001 + "%{" + css[0] + "}");
            }
        }
        keys.forEach(function (time) {
            keyframes.push((delay + time) / playSpeed / duration * 100 + "%{" + css[values[time]] + "}");
        });
        var lastTime = keys[length - 1];
        if ((delay + lastTime) / playSpeed < duration) {
            keyframes.push("100%{" + css[values[lastTime]]);
        }
        return "@" + consts_1.KEYFRAMES + " " + consts_1.PREFIX + "KEYFRAMES_" + toId(id) + "{\n\t\t\t" + keyframes.join("\n") + "\n\t\t}";
    };
    SceneItem.prototype._getNowValue = function (time, left, right, properties, easing, usePrevValue) {
        if (easing === void 0) { easing = this.state.easing; }
        if (usePrevValue === void 0) { usePrevValue = utils_1.isFixed(properties); }
        var keyframes = this.keyframes;
        var times = keyframes.times;
        var length = times.length;
        var prevTime;
        var nextTime;
        var prevFrame;
        var nextFrame;
        for (var i = left; i >= 0; --i) {
            var frame = keyframes.get(times[i]);
            if (frame.has.apply(frame, properties)) {
                prevTime = times[i];
                prevFrame = frame;
                break;
            }
        }
        var prevValue = prevFrame && prevFrame.raw.apply(prevFrame, properties);
        if (usePrevValue) {
            return prevValue;
        }
        for (var i = right; i < length; ++i) {
            var frame = keyframes.get(times[i]);
            if (frame.has.apply(frame, properties)) {
                nextTime = times[i];
                nextFrame = frame;
                break;
            }
        }
        var nextValue = nextFrame && nextFrame.raw.apply(nextFrame, properties);
        if (!prevFrame || utils_1.isUndefined(prevValue)) {
            return nextValue;
        }
        if (!nextFrame || utils_1.isUndefined(nextValue) || prevValue === nextValue) {
            return prevValue;
        }
        if (prevTime < 0) {
            prevTime = 0;
        }
        return dot_1.dotValue(time, prevTime, nextTime, prevValue, nextValue, easing);
    };
    SceneItem.prototype._getNearTimeIndex = function (time) {
        var keyframes = this.keyframes;
        var times = keyframes.times;
        var length = times.length;
        for (var i = 0; i < length; ++i) {
            if (times[i] === time) {
                return { left: i, right: i };
            }
            else if (times[i] > time) {
                return { left: i === 0 ? 0 : i - 1, right: i };
            }
        }
        return { left: length - 1, right: length - 1 };
    };
    return SceneItem;
}(Animator_1["default"]));
exports["default"] = SceneItem;


/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var consts_1 = __webpack_require__(7);
var utils_1 = __webpack_require__(6);
var property_1 = __webpack_require__(11);
var PropertyObject_1 = __webpack_require__(8);
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
    return value instanceof PropertyObject_1["default"];
}
function clone(target, toValue) {
    if (toValue === void 0) { toValue = false; }
    return merge({}, target, toValue);
}
function merge(to, from, toValue) {
    if (toValue === void 0) { toValue = false; }
    for (var name_2 in from) {
        var value = from[name_2];
        var type = utils_1.getType(value);
        if (type === "property") {
            to[name_2] = toValue ? value.toValue() : value.clone();
        }
        else if (type === "array") {
            to[name_2] = value.slice();
        }
        else if (type === "object") {
            if (utils_1.isObject(to[name_2]) && !(to[name_2] instanceof PropertyObject_1["default"])) {
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
var Frame = (function () {
    function Frame(properties) {
        if (properties === void 0) { properties = {}; }
        this.properties = {};
        this.set(properties);
    }
    Frame.prototype.get = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var value = this.raw.apply(this, args);
        var type = utils_1.getType(value);
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
        var length = args.length;
        for (var i = 0; i < length; ++i) {
            if (!utils_1.isObject(properties)) {
                return undefined;
            }
            properties = properties[args[i]];
        }
        return properties;
    };
    Frame.prototype.remove = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var properties = this.properties;
        var length = args.length;
        if (!length) {
            return this;
        }
        for (var i = 0; i < length - 1; ++i) {
            if (!utils_1.isObject(properties)) {
                return this;
            }
            properties = properties[args[i]];
        }
        delete properties[args[length - 1]];
        return this;
    };
    Frame.prototype.set = function () {
        var _this = this;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var length = args.length;
        var params = args.slice(0, -1);
        var value = args[length - 1];
        if (length === 2 && utils_1.isArray(params[0])) {
            this._set(params[0], value);
        }
        else if (utils_1.isObject(value)) {
            if (utils_1.isArray(value)) {
                this._set(params, value);
            }
            else if (isPropertyObject(value)) {
                if (utils_1.isRole(params)) {
                    this.set.apply(this, params.concat([property_1.toObject(value)]));
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
        else if (utils_1.isString(value)) {
            if (utils_1.isRole(params)) {
                var obj = property_1.toPropertyObject(value);
                if (utils_1.isObject(obj)) {
                    this.set.apply(this, params.concat([obj]));
                }
                return this;
            }
            else {
                var styles = property_1.splitStyle(value);
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
    Frame.prototype.has = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var properties = this.properties;
        var length = args.length;
        if (!length) {
            return false;
        }
        for (var i = 0; i < length; ++i) {
            if (!utils_1.isObject(properties) || !(args[i] in properties)) {
                return false;
            }
            properties = properties[args[i]];
        }
        return true;
    };
    Frame.prototype.clone = function () {
        var frame = new Frame();
        frame.merge(this);
        return frame;
    };
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
    Frame.prototype.toCSSObject = function () {
        var properties = this.toObject();
        var cssObject = {};
        for (var name_4 in properties) {
            if (utils_1.isRole([name_4], true)) {
                continue;
            }
            var value = properties[name_4];
            if (name_4 === consts_1.timingFunction) {
                cssObject[consts_1.timingFunction.replace("animation", consts_1.ANIMATION)] =
                    (utils_1.isString(value) ? value : value.easingName) || "initial";
                continue;
            }
            cssObject[name_4] = value;
        }
        var transform = toInnerProperties(properties.transform);
        var filter = toInnerProperties(properties.filter);
        consts_1.TRANSFORM && transform && (cssObject[consts_1.TRANSFORM] = transform);
        consts_1.FILTER && filter && (cssObject[consts_1.FILTER] = filter);
        return cssObject;
    };
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
        properties[args[length - 1]] = utils_1.isString(value) ? property_1.toPropertyObject(value) : value;
    };
    return Frame;
}());
exports["default"] = Frame;


/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var PropertyObject_1 = __webpack_require__(8);
var color_1 = __webpack_require__(12);
var utils_1 = __webpack_require__(6);
function splitSpace(text) {
    var matches = text.match(/("[^"]*")|('[^']*')|([^\s()]*(?:\((?:[^()]*|\([^()]*\))*\))[^\s()]*)|\S+/g);
    return matches || [];
}
exports.splitSpace = splitSpace;
function splitComma(text) {
    var matches = text.match(/("[^"]*"|'[^']*'|[^,\s()]*\((?:[^()]*|\([^()]*\))*\)[^,\s()]*|[^,])+/g);
    return matches ? matches.map(function (str) { return str.trim(); }) : [];
}
exports.splitComma = splitComma;
function splitStyle(str) {
    var _a;
    var properties = str.split(";");
    var length = properties.length;
    var obj = [];
    for (var i = 0; i < length; ++i) {
        var matches = /([^:]*):([\S\s]*)/g.exec(properties[i]);
        if (!matches || matches.length < 3 || !matches[1]) {
            continue;
        }
        obj.push((_a = {}, _a[matches[1].trim()] = toPropertyObject(matches[2].trim()), _a));
    }
    return obj;
}
exports.splitStyle = splitStyle;
function arrayToColorObject(arr) {
    var model = "rgba";
    if (arr.length === 3) {
        arr[3] = 1;
    }
    return new PropertyObject_1["default"](arr, {
        model: model,
        separator: ",",
        type: "color",
        prefix: model + "(",
        suffix: ")"
    });
}
exports.arrayToColorObject = arrayToColorObject;
function toColorObject(value) {
    var colorObject;
    if (value instanceof PropertyObject_1["default"]) {
        colorObject = value;
    }
    else if (utils_1.isArray(value)) {
        colorObject = arrayToColorObject(value);
    }
    else if (utils_1.isString(value)) {
        return stringToColorObject(value);
    }
    var colorArray = colorObject.value;
    var length = colorArray.length;
    if (length === 4) {
        colorArray[3] = parseFloat(colorArray[3]);
    }
    else if (length === 3) {
        colorArray[3] = 1;
    }
    colorObject.setOptions({ type: "color" });
    var colorModel = colorObject.getOption("model").toLowerCase();
    if (colorModel === "rgb") {
        colorObject.setOptions({
            type: "color",
            model: "rgba",
            prefix: "rgba(",
            suffix: ")"
        });
    }
    switch (colorModel) {
        case "rgb":
        case "rgba":
            for (var i = 0; i < 3; ++i) {
                colorArray[i] = parseInt(colorArray[i], 10);
            }
            break;
        case "hsl":
        case "hsla":
            for (var i = 1; i < 3; ++i) {
                if (colorArray[i].indexOf("%") !== -1) {
                    colorArray[i] = parseFloat(colorArray[i]) / 100;
                }
            }
            colorArray = color_1.hslToRGB(colorArray);
            return arrayToColorObject(colorArray);
        default:
    }
    return colorObject;
}
exports.toColorObject = toColorObject;
function stringToBracketObject(value) {
    var matches = (/([^(]*)\(([\s\S]*)\)([\s\S]*)/g).exec(value);
    if (!matches || matches.length < 4) {
        return value;
    }
    var model = matches[1] || "";
    var text = matches[2];
    var prefix = model + "(";
    var suffix = ")" + matches[3];
    var separator = ",";
    var values;
    var obj = toPropertyObject(text);
    if (obj instanceof PropertyObject_1["default"]) {
        separator = obj.getOption("separator");
        values = obj.value;
        prefix += obj.getOption("prefix");
        suffix = obj.getOption("suffix") + suffix;
    }
    else {
        values = [text];
    }
    var result = new PropertyObject_1["default"](values, {
        separator: separator,
        model: model,
        prefix: prefix,
        suffix: suffix
    });
    if (color_1.COLOR_MODELS.indexOf(model) !== -1) {
        return toColorObject(result);
    }
    else {
        return result;
    }
}
exports.stringToBracketObject = stringToBracketObject;
function arrayToPropertyObject(arr, separator) {
    return new PropertyObject_1["default"](arr, {
        type: "array",
        separator: separator
    });
}
exports.arrayToPropertyObject = arrayToPropertyObject;
function stringToColorObject(value) {
    var colorArray;
    if (value.charAt(0) === "#") {
        if (value.length === 4) {
            colorArray = color_1.hexToRGB(color_1.hex3to6(value));
        }
        else {
            colorArray = color_1.hexToRGB(value);
        }
        return arrayToColorObject(colorArray);
    }
    else if (value.indexOf("(") !== -1) {
        return stringToBracketObject(value);
    }
    else {
        throw new Error("Invalid Format : Not a Color - " + value);
    }
}
exports.stringToColorObject = stringToColorObject;
function toPropertyObject(value) {
    if (!utils_1.isString(value)) {
        if (Array.isArray(value)) {
            return arrayToPropertyObject(value, ",");
        }
        return value;
    }
    var values = splitComma(value);
    if (values.length > 1) {
        return arrayToPropertyObject(values.map(function (v) { return toPropertyObject(v); }), ",");
    }
    values = splitSpace(value);
    if (values.length > 1) {
        return arrayToPropertyObject(values.map(function (v) { return toPropertyObject(v); }), " ");
    }
    values = /^(['"])([^'"]*)(['"])$/g.exec(value);
    if (values && values[1] === values[3]) {
        return new PropertyObject_1["default"]([toPropertyObject(values[2])], {
            prefix: values[1],
            suffix: values[1]
        });
    }
    else if (value.indexOf("(") !== -1) {
        return stringToBracketObject(value);
    }
    else if (value.charAt(0) === "#") {
        return stringToColorObject(value);
    }
    return value;
}
exports.toPropertyObject = toPropertyObject;
function toObject(object, result) {
    if (result === void 0) { result = {}; }
    var model = object.getOption("model");
    if (model) {
        object.setOptions({
            model: "",
            suffix: "",
            prefix: ""
        });
        var value = object.size() > 1 ? object : object.get(0);
        result[model] = value;
    }
    else {
        object.forEach(function (obj) { return toObject(obj, result); });
    }
    return result;
}
exports.toObject = toObject;


/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
exports.COLOR_MODELS = ["rgb", "rgba", "hsl", "hsla"];
function cutHex(hex) {
    return (hex.charAt(0) === "#") ? hex.substring(1) : hex;
}
exports.cutHex = cutHex;
function hexToRGB(hex) {
    var h = cutHex(hex);
    var r = parseInt(h.substring(0, 2), 16);
    var g = parseInt(h.substring(2, 4), 16);
    var b = parseInt(h.substring(4, 6), 16);
    var a = parseInt(h.substring(6, 8), 16) / 255;
    if (isNaN(a)) {
        a = 1;
    }
    return [r, g, b, a];
}
exports.hexToRGB = hexToRGB;
function hex3to6(h) {
    var r = h.charAt(1);
    var g = h.charAt(2);
    var b = h.charAt(3);
    var arr = ["#", r, r, g, g, b, b];
    return arr.join("");
}
exports.hex3to6 = hex3to6;
function hslToRGB(hsl) {
    var h = hsl[0];
    var s = hsl[1];
    var l = hsl[2];
    if (h < 0) {
        h += Math.floor((Math.abs(h) + 360) / 360) * 360;
    }
    h %= 360;
    var c = (1 - Math.abs(2 * l - 1)) * s;
    var x = c * (1 - Math.abs((h / 60) % 2 - 1));
    var m = l - c / 2;
    var rgb;
    if (h < 60) {
        rgb = [c, x, 0];
    }
    else if (h < 120) {
        rgb = [x, c, 0];
    }
    else if (h < 180) {
        rgb = [0, c, x];
    }
    else if (h < 240) {
        rgb = [0, x, c];
    }
    else if (h < 300) {
        rgb = [x, 0, c];
    }
    else if (h < 360) {
        rgb = [c, 0, x];
    }
    var result = [
        Math.round((rgb[0] + m) * 255),
        Math.round((rgb[1] + m) * 255),
        Math.round((rgb[2] + m) * 255),
    ];
    if (hsl.length > 3) {
        result[3] = hsl[3];
    }
    return result;
}
exports.hslToRGB = hslToRGB;


/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var utils_1 = __webpack_require__(6);
var PropertyObject_1 = __webpack_require__(8);
function getNames(names, stack) {
    var arr = [];
    for (var name_1 in names) {
        stack.push(name_1);
        if (utils_1.isObject(names[name_1])) {
            arr = arr.concat(getNames(names[name_1], stack));
        }
        else {
            arr.push(stack.slice());
        }
        stack.pop();
    }
    return arr;
}
function updateFrame(names, properties) {
    for (var name_2 in properties) {
        var value = properties[name_2];
        if (!utils_1.isObject(value) || utils_1.isArray(value) || value instanceof PropertyObject_1["default"]) {
            names[name_2] = true;
            continue;
        }
        if (!utils_1.isObject(names[name_2])) {
            names[name_2] = {};
        }
        updateFrame(names[name_2], properties[name_2]);
    }
}
var Keyframes = (function () {
    function Keyframes() {
        this.times = [];
        this.items = {};
        this.names = {};
    }
    Keyframes.prototype.getNames = function () {
        var names = this.names;
        return getNames(names, []);
    };
    Keyframes.prototype.hasName = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return utils_1.isInProperties(this.names, args, true);
    };
    Keyframes.prototype.update = function () {
        var items = this.items;
        for (var time in items) {
            this.updateFrame(items[time]);
        }
        return this;
    };
    Keyframes.prototype.forEach = function (callback) {
        var times = this.times;
        var items = this.items;
        times.forEach(function (time) {
            callback(items[time], time, items);
        });
    };
    Keyframes.prototype.updateFrame = function (frame) {
        if (!frame) {
            return this;
        }
        var properties = frame.properties;
        var names = this.names;
        updateFrame(names, properties);
        return this;
    };
    Keyframes.prototype.getDuration = function () {
        var times = this.times;
        return times.length === 0 ? 0 : times[times.length - 1];
    };
    Keyframes.prototype.setDuration = function (duration, originalDuration) {
        if (originalDuration === void 0) { originalDuration = this.getDuration(); }
        var ratio = duration / originalDuration;
        var _a = this, times = _a.times, items = _a.items;
        var obj = {};
        this.times = times.map(function (time) {
            var time2 = time * ratio;
            obj[time2] = items[time];
            return time2;
        });
        this.items = obj;
    };
    Keyframes.prototype.unshift = function (time) {
        var _a = this, times = _a.times, items = _a.items;
        var obj = {};
        this.times = times.map(function (t) {
            var time2 = utils_1.toFixed(time + t);
            obj[time2] = items[t];
            return time2;
        });
        this.items = obj;
        return this;
    };
    Keyframes.prototype.size = function () {
        return this.times.length;
    };
    Keyframes.prototype.add = function (time, object) {
        this.items[time] = object;
        this.addTime(time);
        return this;
    };
    Keyframes.prototype.has = function (time) {
        return time in this.items;
    };
    Keyframes.prototype.get = function (time) {
        return this.items[time];
    };
    Keyframes.prototype.remove = function (time) {
        var items = this.items;
        delete items[time];
        this.removeTime(time);
        return this;
    };
    Keyframes.prototype.addTime = function (time) {
        var times = this.times;
        var length = times.length;
        var pushIndex = length;
        for (var i = 0; i < length; ++i) {
            if (time === times[i]) {
                return this;
            }
            else if (time < times[i]) {
                pushIndex = i;
                break;
            }
        }
        this.times.splice(pushIndex, 0, time);
        return this;
    };
    Keyframes.prototype.removeTime = function (time) {
        var index = this.times.indexOf(time);
        if (index > -1) {
            this.times.splice(index, 1);
        }
        return this;
    };
    return Keyframes;
}());
exports["default"] = Keyframes;


/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var utils_1 = __webpack_require__(6);
var PropertyObject_1 = __webpack_require__(8);
var utils_2 = __webpack_require__(6);
function dotArray(a1, a2, b1, b2) {
    if (b2 === 0) {
        return a2;
    }
    if (!utils_1.isArray(a2)) {
        return a1;
    }
    var length = a2.length;
    return a1.map(function (v1, i) {
        if (i >= length) {
            return v1;
        }
        else {
            return dot(v1, a2[i], b1, b2);
        }
    });
}
exports.dotArray = dotArray;
function dotColor(color1, color2, b1, b2) {
    if (b2 === 0) {
        return color2;
    }
    var value1 = color1.value;
    var value2 = color2.value;
    var model1 = color1.getOption("model");
    var model2 = color2.getOption("model");
    if (model1 !== model2) {
        return dot(color1.toValue(), color2.toValue(), b1, b2);
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
    var object = new PropertyObject_1["default"](v, {
        type: "color",
        model: colorModel,
        prefix: colorModel + "(",
        suffix: ")"
    });
    return object;
}
exports.dotColor = dotColor;
function dotObject(a1, a2, b1, b2) {
    var a1Type = a1.getOption("type");
    if (a1Type === "color") {
        return dotColor(a1, a2, b1, b2);
    }
    var value1 = a1.value;
    var value2 = a2.value;
    var arr = dotArray(value1, value2, b1, b2);
    return new PropertyObject_1["default"](arr, {
        type: a1Type,
        separator: a1.getOption("separator") || a2.getOption("separator"),
        prefix: a1.getOption("prefix") || a2.getOption("prefix"),
        suffix: a1.getOption("suffix") || a2.getOption("suffix"),
        model: a1.getOption("model") || a2.getOption("model")
    });
}
exports.dotObject = dotObject;
function dot(a1, a2, b1, b2) {
    if (b2 === 0) {
        return a2;
    }
    else if (b1 === 0 || b1 + b2 === 0) {
        return a1;
    }
    var type1 = utils_2.getType(a1);
    var type2 = utils_2.getType(a2);
    if (type1 === type2) {
        if (type1 === "property") {
            return dotObject(a1, a2, b1, b2);
        }
        else if (type1 === "array") {
            return dotArray(a1, a2, b1, b2);
        }
        else if (type1 === "object" || type1 === "boolean" || type1 === "function") {
            return a1;
        }
    }
    else {
        return a1;
    }
    var r1 = b1 / (b1 + b2);
    var r2 = 1 - r1;
    var v1 = utils_1.splitUnit("" + a1);
    var v2 = utils_1.splitUnit("" + a2);
    var v;
    if (isNaN(v1.value) || isNaN(v2.value)) {
        return a1;
    }
    else {
        v = v1.value * r2 + v2.value * r1;
    }
    var prefix = v1.prefix || v2.prefix;
    var unit = v1.unit || v2.unit;
    if (!prefix && !unit) {
        return v;
    }
    return prefix + v + unit;
}
exports.dot = dot;
function dotValue(time, prevTime, nextTime, prevValue, nextValue, easing) {
    if (time === prevTime) {
        return prevValue;
    }
    else if (time === nextTime) {
        return nextValue;
    }
    else if (!easing) {
        return dot(prevValue, nextValue, time - prevTime, nextTime - time);
    }
    var ratio = easing((time - prevTime) / (nextTime - prevTime));
    var value = dot(prevValue, nextValue, ratio, 1 - ratio);
    return value;
}
exports.dotValue = dotValue;


/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
function hasClass(element, className) {
    if (element.classList) {
        return element.classList.contains(className);
    }
    return !!element.className.match(new RegExp("(\\s|^)" + className + "(\\s|$)"));
}
exports.hasClass = hasClass;
function addClass(element, className) {
    if (element.classList) {
        element.classList.add(className);
    }
    else {
        element.className += " " + className;
    }
}
exports.addClass = addClass;
function removeClass(element, className) {
    if (element.classList) {
        element.classList.remove(className);
    }
    else {
        var reg = new RegExp("(\\s|^)" + className + "(\\s|$)");
        element.className = element.className.replace(reg, " ");
    }
}
exports.removeClass = removeClass;
function fromCSS(elements, properties) {
    if (!elements || !properties || !properties.length) {
        return {};
    }
    var element;
    if (elements instanceof Element) {
        element = elements;
    }
    else if (elements.length) {
        element = elements[0];
    }
    else {
        return {};
    }
    var cssObject = {};
    var styles = window.getComputedStyle(element);
    var length = properties.length;
    for (var i = 0; i < length; ++i) {
        cssObject[properties[i]] = styles[properties[i]];
    }
    return cssObject;
}
exports.fromCSS = fromCSS;


/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var blink_1 = __webpack_require__(17);
exports.blink = blink_1["default"];
var fadeIn_1 = __webpack_require__(19);
exports.fadeIn = fadeIn_1["default"];
var fadeOut_1 = __webpack_require__(20);
exports.fadeOut = fadeOut_1["default"];
var wipeIn_1 = __webpack_require__(21);
exports.wipeIn = wipeIn_1["default"];
var wipeOut_1 = __webpack_require__(22);
exports.wipeOut = wipeOut_1["default"];
var zoomIn_1 = __webpack_require__(23);
exports.zoomIn = zoomIn_1["default"];
var zoomOut_1 = __webpack_require__(24);
exports.zoomOut = zoomOut_1["default"];
var set_1 = __webpack_require__(18);
exports.set = set_1["default"];
var transition_1 = __webpack_require__(25);
exports.transition = transition_1["default"];


/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var set_1 = __webpack_require__(18);
function blink(_a) {
    var _b = _a.from, from = _b === void 0 ? 0 : _b, _c = _a.to, to = _c === void 0 ? 1 : _c;
    return set_1["default"]("opacity", [from, to, from], arguments[0]);
}
exports["default"] = blink;


/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var index_1 = __webpack_require__(1);
function set(property, values, options) {
    var item = new index_1.SceneItem({}, options);
    var length = values.length;
    for (var i = 0; i < length; ++i) {
        item.set(i / (length - 1) * 100 + "%", property, values[i]);
    }
    return item;
}
exports["default"] = set;


/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var set_1 = __webpack_require__(18);
function fadeIn(_a) {
    var _b = _a.from, from = _b === void 0 ? 0 : _b, _c = _a.to, to = _c === void 0 ? 1 : _c;
    return set_1["default"]("opacity", [from, to], arguments[0]);
}
exports["default"] = fadeIn;


/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var set_1 = __webpack_require__(18);
function fadeOut(_a) {
    var _b = _a.from, from = _b === void 0 ? 1 : _b, _c = _a.to, to = _c === void 0 ? 0 : _c;
    return set_1["default"]("opacity", [from, to], arguments[0]);
}
exports["default"] = fadeOut;


/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var set_1 = __webpack_require__(18);
function wipeIn(_a) {
    var _b = _a.from, from = _b === void 0 ? "-100%" : _b, _c = _a.to, to = _c === void 0 ? "0%" : _c, _d = _a.property, property = _d === void 0 ? "left" : _d;
    return set_1["default"](property, [from, to], arguments[0]);
}
exports["default"] = wipeIn;


/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var set_1 = __webpack_require__(18);
function wipeOut(_a) {
    var _b = _a.from, from = _b === void 0 ? "0%" : _b, _c = _a.to, to = _c === void 0 ? "100%" : _c, _d = _a.property, property = _d === void 0 ? "left" : _d;
    return set_1["default"](property, [from, to], arguments[0]);
}
exports["default"] = wipeOut;


/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var set_1 = __webpack_require__(18);
function zoomIn(_a) {
    var _b = _a.from, from = _b === void 0 ? 0 : _b, _c = _a.to, to = _c === void 0 ? 1 : _c;
    return set_1["default"](["transform", "scale"], [from, to], arguments[0]);
}
exports["default"] = zoomIn;


/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var set_1 = __webpack_require__(18);
function zoomOut(_a) {
    var _b = _a.from, from = _b === void 0 ? 1 : _b, _c = _a.to, to = _c === void 0 ? 0 : _c;
    return set_1["default"](["transform", "scale"], [from, to], arguments[0]);
}
exports["default"] = zoomOut;


/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
function transition(item1, item2, _a) {
    var from = _a.from, to = _a.to, _b = _a.duration, duration = _b === void 0 ? item1.getDuration() : _b, _c = _a.time, time = _c === void 0 ? Math.max(item1.getDuration() - duration, 0) : _c;
    var _d, _e;
    item1.set((_d = {},
        _d[time] = from,
        _d[time + duration] = to,
        _d));
    item2.set((_e = {
            0: to
        },
        _e[duration] = from,
        _e));
}
exports["default"] = transition;


/***/ })
/******/ ]);
});