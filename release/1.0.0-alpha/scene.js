/*!
 * Copyright (c) 2018 Daybrush
 * license: MIT
 * author: Daybrush
 * repository: https://github.com/daybrush/scenejs.git
 * @version 1.0.0-alpha
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

var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var index_1 = __importStar(__webpack_require__(1)), others = index_1;
for (var name_1 in others) {
    index_1["default"][name_1] = others[name_1];
}
module.exports = index_1["default"];


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
exports.__esModule = true;
var Scene_1 = __importDefault(__webpack_require__(2));
var SceneItem_1 = __importDefault(__webpack_require__(8));
exports.SceneItem = SceneItem_1["default"];
var Frame_1 = __importDefault(__webpack_require__(9));
exports.Frame = Frame_1["default"];
var Keyframes_1 = __importDefault(__webpack_require__(13));
exports.Keyframes = Keyframes_1["default"];
var PropertyObject_1 = __importDefault(__webpack_require__(11));
exports.PropertyObject = PropertyObject_1["default"];
var easing = __importStar(__webpack_require__(7));
exports.easing = easing;
var Animator_1 = __importDefault(__webpack_require__(3));
exports.Animator = Animator_1["default"];
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var Animator_1 = __importDefault(__webpack_require__(3));
var SceneItem_1 = __importDefault(__webpack_require__(8));
var consts_1 = __webpack_require__(6);
var utils_1 = __webpack_require__(5);
/**
* manage sceneItems and play Scene.
* @class Scene
* @extends Scene.Animator
* @param {Object} [properties] - properties
* @param {AnimatorOptions} [options] - options
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
var Scene = /** @class */ (function (_super) {
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
        if (!isFinite(sceneDuration)) {
            return this;
        }
        var ratio = duration / sceneDuration;
        for (var id in items) {
            var item = items[id];
            item.setDelay(item.getDelay() * ratio);
            item.setDuration(item.getDuration() * ratio);
        }
        return this;
    };
    /**
    * get item in scene by name
    * @method Scene#getItem
    * @param {string} name - item's name
    * @return {Scene.SceneItem} item
    * @example
const item = scene.getItem("item1")
    */
    Scene.prototype.getItem = function (name) {
        return this.items[name];
    };
    /**
    * create item in scene
    * @method Scene#newItem
    * @param {String} name - name of item to create
    * @param {StateOptions} options - The option object of SceneItem
    * @return {Sceme.SceneItem} Newly created item
    * @example
const item = scene.newItem("item1")
    */
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
    /**
    * add a sceneItem to the scene
    * @param {String} name - name of item to create
    * @param {Scene.SceneItem} item - sceneItem
    * @example
const item = scene.newItem("item1")
    */
    Scene.prototype.setItem = function (name, item) {
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
            /**
             * This event is fired when timeupdate and animate.
             * @event Scene#animate
             * @param {Number} param.currentTime The total time that the animator is running.
             * @param {Number} param.time The iteration time during duration that the animator is running.
             * @param {Frame} param.frame frame of that time.
             * @param {Scene.SceneItem} param.target The scene item that timeupdate and animate.
             */
            item.setTime(iterationTime * item.state.playSpeed, easing, this);
        }
        return this;
    };
    /**
     * executes a provided function once for each scene item.
     * @method Scene#forEach
     * @param {Function} func Function to execute for each element, taking three arguments
     * @param {Scene.SceneItem} [func.item] The value of the item being processed in the scene.
     * @param {string} [func.name] The name of the item being processed in the scene.
     * @param {object} [func.items] The object that forEach() is being applied to.
     * @return {Scene} An instance itself
     */
    Scene.prototype.forEach = function (func) {
        var items = this.items;
        for (var name_1 in items) {
            func(items[name_1], name_1, items);
        }
        return this;
    };
    /**
     * Export the CSS of the items to the style.
     * @method Scene#exportCSS
     * @return {Scene} An instance itself
     */
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
    /**
    * Play using the css animation and keyframes.
    * @method Scene#playCSS
    * @param {boolean} [exportCSS=true] Check if you want to export css.
    * @param {Object} [properties={}] The shorthand properties for six of the animation properties.
    * @param {Object} [properties.duration] The duration property defines how long an animation should take to complete one cycle.
    * @param {Object} [properties.fillMode] The fillMode property specifies a style for the element when the animation is not playing (before it starts, after it ends, or both).
    * @param {Object} [properties.iterationCount] The iterationCount property specifies the number of times an animation should be played.
    * @param {String} [properties.easing] The easing(timing-function) specifies the speed curve of an animation.
    * @param {Object} [properties.delay] The delay property specifies a delay for the start of an animation.
    * @param {Object} [properties.direction] The direction property defines whether an animation should be played forwards, backwards or in alternate cycles.
    * @return {Scene} An instance itself
    * @see {@link https://www.w3schools.com/cssref/css3_pr_animation.asp}
    * @example
scene.playCSS();
scene.playCSS(false, {
    direction: "reverse",
    fillMode: "forwards",
});
    */
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
    /**
    * version info
    * @name Scene.VERSION
    * @memberof Scene
    * @static
    * @type {string}
    * @example
    * Scene.VERSION // #__VERSION__#
    */
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var EventTrigger_1 = __importDefault(__webpack_require__(4));
var easing_1 = __webpack_require__(7);
var utils_1 = __webpack_require__(5);
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
/**
* @typedef {Object} AnimatorOptions The Animator options. Properties used in css animation.
* @property {number} [duration] The duration property defines how long an animation should take to complete one cycle.
* @property {"none"|"forwards"|"backwards"|"both"} [fillMode] The fillMode property specifies a style for the element when the animation is not playing (before it starts, after it ends, or both).
* @property {"infinite"|number} [iterationCount] The iterationCount property specifies the number of times an animation should be played.
* @property {array|function} [easing] The easing(timing-function) specifies the speed curve of an animation.
* @property {number} [delay] The delay property specifies a delay for the start of an animation.
* @property {"normal"|"reverse"|"alternate"|"alternate-reverse"} [direction] The direction property defines whether an animation should be played forwards, backwards or in alternate cycles.
*/
/**
* play video, animation, the others
* @memberof Scene
* @class Animator
* @extends Scene.EventTrigger
* @see {@link https://www.w3schools.com/css/css3_animations.asp|CSS3 Animation}
* @param {AnimatorOptions} [options] - animator's options
* @example
const animator = new Animator({
    delay: 2,
    diretion: "alternate",
    duration: 2,
    fillMode: "forwards",
    iterationCount: 3,
    easing: Scene.eaasing.EASE,
});
*/
var Animator = /** @class */ (function (_super) {
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
    /**
    * set animator's easing.
    * @method Scene.Animator#setEasing
    * @param {array| function} curverArray - The speed curve of an animation.
    * @return {Scene.Animator} An instance itself.
    * @example
animator.({
    delay: 2,
    diretion: "alternate",
    duration: 2,
    fillMode: "forwards",
    iterationCount: 3,
    easing: Scene.easing.EASE,
});
    */
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
    /**
    * set animator's options.
    * @method Scene.Animator#setOptions
    * @see {@link https://www.w3schools.com/css/css3_animations.asp|CSS3 Animation}
    * @param {Object} [AnimatorOptions] - animator's options
    * @return {Scene.Animator} An instance itself.
    * @example
animator.({
    delay: 2,
    diretion: "alternate",
    duration: 2,
    fillMode: "forwards",
    iterationCount: 3,
    easing: Scene.eaasing.EASE,
});
    */
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
    /**
    * Get the animator's total duration including delay
    * @method Scene.Animator#getTotalDuration
    * @return {number} Total duration
    * @example
animator.getTotalDuration();
    */
    Animator.prototype.getTotalDuration = function () {
        if (this.state.iterationCount === "infinite") {
            return Infinity;
        }
        return this.state.delay + this.getActiveDuration();
    };
    /**
    * Get the animator's total duration excluding delay
    * @method Scene.Animator#getActiveDuration
    * @return {number} Total duration excluding delay
    * @example
animator.getTotalDuration();
    */
    Animator.prototype.getActiveDuration = function () {
        if (this.state.iterationCount === "infinite") {
            return Infinity;
        }
        return this.getDuration() * this.state.iterationCount;
    };
    /**
    * Check if the animator has reached the end.
    * @method Scene.Animator#isEnded
    * @return {boolean} ended
    * @example
animator.isEnded(); // true or false
    */
    Animator.prototype.isEnded = function () {
        if (this.getTime() === 0 && this.state.playState === "paused") {
            return true;
        }
        else if (this.getTime() < this.getTotalDuration()) {
            return false;
        }
        return true;
    };
    /**
    *Check if the animator is paused:
    * @method Scene.Animator#isPaused
    * @return {boolean} paused
    * @example
animator.isPaused(); // true or false
    */
    Animator.prototype.isPaused = function () {
        return this.state.playState === "paused";
    };
    Animator.prototype.setNext = function (animator) {
        this.on("ended", function () {
            animator.play();
        });
        return this;
    };
    /**
    * play animator
    * @method Scene.Animator#play
    * @return {Scene.Animator} An instance itself.
    */
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
        /**
         * This event is fired when play animator.
         * @event Scene.Animator#play
         */
        this.trigger("play");
        return this;
    };
    /**
    * pause animator
    * @method Scene.Animator#pause
    * @return {Scene.Animator} An instance itself.
    */
    Animator.prototype.pause = function () {
        this.state.playState = "paused";
        /**
         * This event is fired when animator is paused.
         * @event Scene.Animator#paused
         */
        this.trigger("paused");
        return this;
    };
    /**
     * end animator
     * @method Scene.Animator#end
     * @return {Scene.Animator} An instance itself.
    */
    Animator.prototype.end = function () {
        this.pause();
        /**
         * This event is fired when animator is ended.
         * @event Scene.Animator#ended
         */
        this.trigger("ended");
        return this;
    };
    /**
    * reset animator
    * @method Scene.Animator#reset
    * @return {Scene.Animator} An instance itself.
    */
    Animator.prototype.reset = function () {
        this.setTime(0);
        this.pause();
        return this;
    };
    /**
    * set currentTime
    * @method Scene.Animator#setTime
    * @param {Number} time - currentTime
    * @return {Scene.Animator} An instance itself.
    * @example
animator.setTime(10);

animator.getTime() // 10
    */
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
        /**
         * This event is fired when the animator updates the time.
         * @event Scene.Animator#timeupdate
         * @param {Object} param The object of data to be sent to an event.
         * @param {Number} param.currentTime The total time that the animator is running.
         * @param {Number} param.time The iteration time during duration that the animator is running.
         * @param {Number} param.iterationCount The iteration count that the animator is running.
         */
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
    /**
    * Get the animator's current time
    * @method Scene.Animator#getTime
    * @return {number} current time
    * @example
animator.getTime();
    */
    Animator.prototype.getTime = function () {
        return this.state.currentTime;
    };
    /**
    * Get the animator's current time excluding delay
    * @method Scene.Animator#getActiveTime
    * @return {number} current time excluding delay
    * @example
animator.getActiveTime();
    */
    Animator.prototype.getActiveTime = function () {
        return utils_1.toFixed(Math.max(this.state.currentTime - this.state.delay, 0));
    };
    /**
    * Get the animator's current iteration time
    * @method Scene.Animator#getIterationTime
    * @return {number} current iteration time
    * @example
animator.getIterationTime();
    */
    Animator.prototype.getIterationTime = function () {
        return this.state.currentIterationTime;
    };
    Animator.prototype.setCurrentIterationCount = function (iterationCount) {
        var state = this.state;
        var passIterationCount = Math.floor(iterationCount);
        if (state.currentIterationCount < passIterationCount) {
            /**
            * The event is fired when an iteration of an animation ends.
            * @event Scene.Animator#iteration
            * @param {Object} param The object of data to be sent to an event.
            * @param {Number} param.currentTime The total time that the animator is running.
            * @param {Number} param.iterationCount The iteration count that the animator is running.
            */
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
        // direction : normal, reverse, alternate, alternate-reverse
        // fillMode : forwards, backwards, both, none
        var isReverse = isDirectionReverse(currentIterationCount, direction);
        if (isReverse) {
            currentIterationTime = duration - currentIterationTime;
        }
        if (iterationCount !== "infinite") {
            var isForwards = fillMode === "both" || fillMode === "forwards";
            // fill forwards
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
/**
 * Set a delay for the start of an animation.
 * @method Scene.Animator#setDelay
 * @param {number} delay - delay
 * @return {Scene.Animator} An instance itself.
 */
/**
 * Get a delay for the start of an animation.
 * @method Scene.Animator#getDelay
 * @return {number} delay
 */
/**
 * Set fill mode for the item when the animation is not playing (before it starts, after it ends, or both)
 * @method Scene.Animator#setFillMode
 * @param {"none"|"forwards"|"backwards"|"both"} fillMode - fillMode
 * @return {Scene.Animator} An instance itself.
 */
/**
 * Get fill mode for the item when the animation is not playing (before it starts, after it ends, or both)
 * @method Scene.Animator#getFillMode
 * @return {"none"|"forwards"|"backwards"|"both"} fillMode
 */
/**
 * Set the number of times an animation should be played.
 * @method Scene.Animator#setIterationCount
 * @param {"inifnite"|number} iterationCount - iterationCount
 * @return {Scene.Animator} An instance itself.
 */
/**
 * Get the number of times an animation should be played.
 * @method Scene.Animator#getIterationCount
 * @return {"inifnite"|number} iterationCount
 */
/**
 * Set whether an animation should be played forwards, backwards or in alternate cycles.
 * @method Scene.Animator#setDirection
 * @param {"normal"|"reverse"|"alternate"|"alternate-reverse"} direction - direction
 * @return {Scene.Animator} An instance itself.
 */
/**
 * Get whether an animation should be played forwards, backwards or in alternate cycles.
 * @method Scene.Animator#getDirection
 * @return {"normal"|"reverse"|"alternate"|"alternate-reverse"} direction
 */
/**
 * Set whether the animation is running or paused.
 * @method Scene.Animator#setPlayState
 * @param {"paused"|"running"} playState - playState
 * @return {Scene.Animator} An instance itself.
 */
/**
 * Get whether the animation is running or paused.
 * @method Scene.Animator#getPlayState
 * @return {"paused"|"running"} playState
 */
/**
 * Set the animator's play speed
 * @method Scene.Animator#setPlaySpeed
 * @param {number} playSpeed - playSpeed
 * @return {Scene.Animator} An instance itself.
 */
/**
 * Get the animator's play speed
 * @method Scene.Animator#getPlaySpeed
 * @return {number} playSpeed
 */
/**
 * Set how long an animation should take to complete one cycle.
 * @method Scene.Animator#setDuration
 * @param {number} duration - duration
 * @return {Scene.Animator} An instance itself.
 */
/**
 * Get how long an animation should take to complete one cycle.
 * @method Scene.Animator#getDuration
 * @return {number} duration
 */
/**
 * Get the speed curve of an animation.
 * @method Scene.Animator#getEasing
 * @return {0|function} easing
 */
/**
 * Get the speed curve's name
 * @method Scene.Animator#getEasingName
 * @return {string} the curve's name.
 */
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
var utils_1 = __webpack_require__(5);
/**
* attach and trigger event handlers.
* @memberof Scene
* @class Scene.EventTrigger
*/
var EventTrigger = /** @class */ (function () {
    function EventTrigger() {
        this.events = {};
    }
    /**
    * Attach an event handler function for one or more events to target
    * @method Scene.EventTrigger#on
    * @param {String} name - event's name
    * @param {Function} callback -  function to execute when the event is triggered.
    * @return {Scene.EventTrigger} An Instance itself.
    * @example
target.on("animate", function() {
    console.log("animate");
});

target.trigger("animate");

    */
    EventTrigger.prototype.on = function (name, callback) {
        var _this = this;
        var events = this.events;
        if (typeof name === "object") {
            for (var i in name) {
                this.on(i, name[i]);
            }
            return this;
        }
        if (!utils_1.has(events, name)) {
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
    /**
    * Dettach an event handler function for one or more events to target
    * @method Scene.EventTrigger#off
    * @param {String} name - event's name
    * @param {Function} callback -  function to execute when the event is triggered.
    * @return {Scene.EventTrigger} An Instance itself.
    * @example
const callback = function() {
    console.log("animate");
};
target.on("animate", callback);

target.off("animate", callback);
target.off("animate");

    */
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
    /**
    * execute event handler
    * @method Scene.EventTrigger#triiger
    * @param {String} name - event's name
    * @param {Function} [...data] - event handler's additional parameter
    * @return {Scene.EventTrigger} An Instance itself.
    * @example
target.on("animate", function(a1, a2) {
    console.log("animate", a1, a2);
});

target.trigger("animate", [1, 2]); // log => "animate", 1, 2

    */
    EventTrigger.prototype.trigger = function (name) {
        var _this = this;
        var data = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            data[_i - 1] = arguments[_i];
        }
        var events = this.events;
        if (!utils_1.has(events, name)) {
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
var consts_1 = __webpack_require__(6);
function toFixed(num) {
    return Math.round(num * consts_1.MAXIMUM) / consts_1.MAXIMUM;
}
exports.toFixed = toFixed;
function isRole(args) {
    var length = args.length;
    var role = consts_1.SCENE_ROLES;
    if (length === 0) {
        return false;
    }
    for (var i = 0; i < length; ++i) {
        if (!role || !isObject(role) || !(args[i] in role)) {
            return false;
        }
        role = role[args[i]];
    }
    return true;
}
exports.isRole = isRole;
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
    var v = text;
    var matches = v.match(/([0-9]|\.|-|e-|e\+)+/g);
    var value = matches ? matches[0] : text;
    var unit = v.replace(value, "") || "";
    return { unit: unit, value: parseFloat(value) };
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
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
exports.PREFIX = "__SCENEJS_";
exports.SCENE_ROLES = { transform: true, filter: true };
exports.MAXIMUM = 1000000;
exports.THRESHOLD = 0.000001;
var checkProperties = function (prefixes, property) {
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
exports.TRANSFORM = checkProperties(["webkit", "ms", "moz", "o"], "transform");
exports.FILTER = checkProperties(["webkit", "ms", "moz", "o"], "filter");
exports.ANIMATION = checkProperties(["webkit", "ms", "moz", "o"], "animation");
exports.KEYFRAMES = exports.ANIMATION.replace("animation", "keyframes");
exports.START_ANIMATION = "startAnimation";


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
function cubic(y1, y2, t) {
    var t2 = 1 - t;
    // Bezier Curve Formula
    return t * t * t + 3 * t * t * t2 * y2 + 3 * t * t2 * t2 * y1;
}
function solveFromX(x1, x2, x) {
    // x  0 ~ 1
    // t 0 ~ 1
    var t = x;
    var solveX = x;
    var dx = 1;
    while (Math.abs(dx) > 1 / 1000) {
        // 예상 t초에 의한 _x값
        solveX = cubic(x1, x2, t);
        dx = solveX - x;
        // 차이가 미세하면 그 값을 t로 지정
        if (Math.abs(dx) < 1 / 1000) {
            return t;
        }
        t -= dx / 2;
    }
    return t;
}
/**
 * @namespace Scene.easing
 */
/**
* Cubic Bezier curve.
* @memberof Scene.easing
* @func Scene.easing.bezier
* @param {number} [x1] - point1's x
* @param {number} [y1] - point1's y
* @param {number} [x2] - point2's x
* @param {number} [y2] - point2's y
* @return {function} the curve function
* @example
Scene.easing.bezier(0, 0, 1, 1) // LINEAR
Scene.easing.bezier(0.25, 0.1, 0.25, 1) // EASE
*/
function bezier(x1, y1, x2, y2) {
    /*
        x = f(t)
        calculate inverse function by x
        t = f-1(x)
    */
    var func = function (x) {
        var t = solveFromX(x1, x2, Math.max(Math.min(1, x), 0));
        return cubic(y1, y2, t);
    };
    func.easingName = "cubic-bezier(" + x1 + ", " + y1 + ", " + x2 + ", " + y2 + ")";
    return func;
}
exports.bezier = bezier;
/**
* Linear Speed (0, 0, 1, 1)
* @name Scene.easing.LINEAR
* @memberof Scene.easing
* @static
* @type {function}
* @example
Scene.easing.LINEAR
*/
exports.LINEAR = bezier(0, 0, 1, 1);
/**
* Ease Speed (0.25, 0.1, 0.25, 1)
* @name Scene.easing.EASE
* @memberof Scene.easing
* @static
* @type {function}
* @example
Scene.easing.EASE
*/
exports.EASE = bezier(0.25, 0.1, 0.25, 1);
exports.EASE_IN = bezier(0.42, 0, 1, 1);
exports.EASE_OUT = bezier(0, 0, 0.58, 1);
exports.EASE_IN_OUT = bezier(0.42, 0, 0.58, 1);


/***/ }),
/* 8 */
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
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var Animator_1 = __importStar(__webpack_require__(3));
var Frame_1 = __importDefault(__webpack_require__(9));
var utils_1 = __webpack_require__(5);
var Keyframes_1 = __importDefault(__webpack_require__(13));
var dot_1 = __webpack_require__(14);
var consts_1 = __webpack_require__(6);
var css_1 = __webpack_require__(15);
function toId(text) {
    return text.match(/[0-9a-zA-Z]+/g).join("");
}
function makeId() {
    for (;;) {
        var id = "" + Math.floor(Math.random() * 100000);
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
/**
* manage Frame Keyframes and play keyframes.
* @class Scene.SceneItem
* @param {Object} [properties] - properties
* @param {AnimatorOptions} [options] - options
* @extends Scene.Animator
* @example
const item = new Scene.SceneItem({
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
var SceneItem = /** @class */ (function (_super) {
    __extends(SceneItem, _super);
    function SceneItem(properties, options) {
        var _this = _super.call(this) || this;
        _this.keyframes = new Keyframes_1["default"]();
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
        _super.prototype.setDuration.call(this, duration);
        return this;
    };
    /**
    * set the unique indicator of the item.
    * @method Scene.SceneItem#setId
    * @param {String} id - the indicator of the item.
    * @return {Scene.SceneItem} An instance itself
    * @example
const item = new SceneItem();

item.setId("item");
console.log(item.getId()); // item
    */
    SceneItem.prototype.setId = function (id) {
        var elements = this.elements;
        this.setState({ id: id });
        var sceneId = toId(this.state.id);
        this.options.selector || (this.options.selector = "[data-scene-id=\"" + sceneId + "\"]");
        if (!elements) {
            return this;
        }
        var length = elements.length;
        if (!length) {
            return this;
        }
        for (var i = 0; i < length; ++i) {
            elements[i].setAttribute("data-scene-id", sceneId);
        }
        return this;
    };
    /**
    * Specifies the unique indicator of the item.
    * @method Scene.SceneItem#getId
    * @return {String} the indicator of the item.
    * @example
const item = scene.newItem("item");
console.log(item.getId()); // item
    */
    SceneItem.prototype.getId = function () {
        return this.state.id;
    };
    /**
    * Set properties to the sceneItem at that time
    * @method Scene.SceneItem#set
    * @param {Number} time - time
    * @param {...String|Object} [properties] - property names or values
    * @return {Scene.SceneItem} An instance itself
    * @example
item.set(0, "a", "b") // item.getFrame(0).set("a", "b")
console.log(item.get(0, "a")); // "b"
    */
    SceneItem.prototype.set = function (time) {
        var _this = this;
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        if (utils_1.isArray(time)) {
            time.forEach(function (t) {
                _this.set.apply(_this, [t].concat(args));
            });
            return this;
        }
        else if (utils_1.isObject(time)) {
            this.load(time);
            return this;
        }
        var frame = this.newFrame(time);
        frame.set.apply(frame, args);
        this.updateFrame(frame);
        return this;
    };
    /**
    * Get properties of the sceneItem at that time
    * @param {Number} time - time
    * @param {...String|Object} args property's name or properties
    * @return {Number|String|Scene.PropertyObejct} property value
    * @example
item.get(0, "a"); // item.getFrame(0).get("a");
item.get(0, "transform", "translate"); // item.getFrame(0).get("transform", "translate");
    */
    SceneItem.prototype.get = function (time) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        var frame = this.getFrame(time);
        return frame && frame.get.apply(frame, args);
    };
    /**
    * remove properties to the sceneItem at that time
    * @method Scene.SceneItem#remove
    * @param {Number} time - time
    * @param {...String|Object} [properties] - property names or values
    * @return {Scene.SceneItem} An instance itself
    * @example
item.remove(0, "a");
    */
    SceneItem.prototype.remove = function (time) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        var frame = this.getFrame(time);
        frame && frame.remove.apply(frame, args);
        return this;
    };
    /**
    * Specifies an element to synchronize items' keyframes.
    * @method Scene.SceneItem#setSelector
    * @param {string} selectors - Selectors to find elements in items.
    * @return {Scene.SceneItem} An instance itself
    * @example
item.setSelector("#id.class");
    */
    SceneItem.prototype.setSelector = function (selector) {
        this.options.selector = selector === true ? this.state.id :
            (selector || "[data-scene-id=\"" + this.state.id + "\"]");
        this.setElement(document.querySelectorAll(this.options.selector));
        return this;
    };
    /**
    * Specifies an element to synchronize item's keyframes.
    * @method Scene.SceneItem#setElement
    * @param {Element|Array|string} elements - elements to synchronize item's keyframes.
    * @return {Scene.SceneItem} An instance itself
    * @example
item.setElement(document.querySelector("#id.class"));
item.setElement(document.querySelectorAll(".class"));
    */
    SceneItem.prototype.setElement = function (elements) {
        if (!elements) {
            return this;
        }
        if (typeof elements === "string") {
            return this.setSelector(elements);
        }
        var id = this.state.id;
        this.elements = (elements instanceof Element) ? [elements] : elements;
        this.setId((!id || id === "null") ? makeId() : id);
        return this;
    };
    /**
    * add css styles of items's element to the frame at that time.
    * @method Scene.SceneItem#setCSS
    * @param {Array} properties - elements to synchronize item's keyframes.
    * @return {Scene.SceneItem} An instance itself
    * @example
item.setElement(document.querySelector("#id.class"));
item.setCSS(0, ["opacity"]);
item.setCSS(0, ["opacity", "width", "height"]);
    */
    SceneItem.prototype.setCSS = function (time, properties) {
        this.set(time, this.fromCSS(properties));
        return this;
    };
    /**
    * get css styles of items's element
    * @method Scene.SceneItem#fromCSS
    * @param {Array} properties - elements to synchronize item's keyframes.
    * @return {Scene.SceneItem} An instance itself
    * @example
item.setElement(document.querySelector("#id.class"));
item.fromCSS(["opacity"]); // {opacity: 1}
item.fromCSS(["opacity", "width", "height"]); // {opacity: 1, width: "100px", height: "100px"}
    */
    SceneItem.prototype.fromCSS = function (properties) {
        return css_1.fromCSS(this.elements, properties);
    };
    SceneItem.prototype.setTime = function (time, parentEasing, parent) {
        _super.prototype.setTime.call(this, time);
        this.animate(parentEasing, parent);
        return this;
    };
    /**
    * update property names used in frames.
    * @method Scene.SceneItem#update
    * @return {Scene.SceneItem} An instance itself
    * @example
item.update();
    */
    SceneItem.prototype.update = function () {
        this.keyframes.update();
        return this;
    };
    /**
    * update property names used in frame.
    * @method Scene.SceneItem#updateFrame
    * @param {Scene.Frame} [frame] - frame of that time.
    * @return {Scene.SceneItem} An instance itself
    * @example
item.updateFrame(time, this.get(time));
    */
    SceneItem.prototype.updateFrame = function (frame) {
        this.keyframes.updateFrame(frame);
        return this;
    };
    /**
    * Create and add a frame to the sceneItem at that time
    * @method Scene.SceneItem#newFrame
    * @param {Number} time - frame's time
    * @return {Scene.Frame} Created frame.
    * @example
item.newFrame(time);
    */
    SceneItem.prototype.newFrame = function (time) {
        var frame = this.getFrame(time);
        if (frame) {
            return frame;
        }
        frame = new Frame_1["default"]();
        this.setFrame(time, frame);
        return frame;
    };
    /**
    * Add a frame to the sceneItem at that time
    * @method Scene.SceneItem#setFrame
    * @param {Number} time - frame's time
    * @return {Scene.SceneItem} An instance itself
    * @example
item.setFrame(time, frame);
    */
    SceneItem.prototype.setFrame = function (time, frame) {
        this.keyframes.add(this._getTime(time), frame);
        this.keyframes.update();
        return this;
    };
    /**
    * get sceneItem's frame at that time
    * @method Scene.SceneItem#getFrame
    * @param {Number} time - frame's time
    * @return {Scene.Frame} sceneItem's frame at that time
    * @example
const frame = item.getFrame(time);
    */
    SceneItem.prototype.getFrame = function (time) {
        return this.keyframes.get(this._getTime(time));
    };
    /**
    * check if the item has a frame at that time
    * @method Scene.SceneItem#hasFrame
    * @param {Number} time - frame's time
    * @return {Boolean} true: the item has a frame // false: not
    * @example
if (item.hasFrame(10)) {
    // has
} else {
    // not
}
    */
    SceneItem.prototype.hasFrame = function (time) {
        return this.keyframes.has(time);
    };
    /**
    * remove sceneItem's frame at that time
    * @method Scene.SceneItem#removeFrame
    * @param {Number} time - frame's time
    * @return {Scene.SceneItem} An instance itself
    * @example
item.removeFrame(time);
    */
    SceneItem.prototype.removeFrame = function (time) {
        var keyframes = this.keyframes;
        keyframes.remove(time);
        keyframes.update();
        return this;
    };
    /**
    * Copy frame of the previous time at the next time.
    * @method Scene.SceneItem#copyFrame
    * @param {number|string|object} fromTime - the previous time
    * @param {number} toTime - the next time
    * @return {Scene.SceneItem} An instance itself
    * @example
// getFrame(0) equal getFrame(1)
item.copyFrame(0, 1);
    */
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
    /**
    * merge frame of the previous time at the next time.
    * @method Scene.SceneItem#mergeFrame
    * @param {number|string|object} fromTime - the previous time
    * @param {number|string} toTime - the next time
    * @return {Scene.SceneItem} An instance itself
    * @example
// getFrame(1) contains getFrame(0)
item.merge(0, 1);
    */
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
    /**
    * Get frame of the current time
    * @method Scene.SceneItem#getNowFrame
    * @param {Number} time - the current time
    * @param {function} easing - the speed curve of an animation
    * @return {Scene.Frame} frame of the current time
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
    SceneItem.prototype.getNowFrame = function (time, easing) {
        var _this = this;
        var frame = new Frame_1["default"]();
        var names = this.keyframes.getNames();
        var _a = this._getNearTimeIndex(time), left = _a.left, right = _a.right;
        names.forEach(function (properties) {
            var value = _this._getNowValue(time, left, right, properties, easing);
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
                var time = length_1 === 1 ? 0 : this._getTime(i / (length_1 - 1) * 100 + "%", options);
                this.set(time, properties[i]);
            }
            return this;
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
    /**
     * clone SceneItem.
     * @method Scene.SceneItem#clone
     * @param {AnimatorOptions} [options] animator options
     * @return {Scene.SceneItem} An instance of clone
     * @example
     * item.clone();
     */
    SceneItem.prototype.clone = function (options) {
        if (options === void 0) { options = {}; }
        var item = new SceneItem();
        item.setOptions(this.state);
        item.setOptions(options);
        this.keyframes.forEach(function (frame, time) { return item.setFrame(time, frame.clone()); });
        return item;
    };
    SceneItem.prototype.setOptions = function (options) {
        _super.prototype.setOptions.call(this, options);
        var selector = options && options.selector;
        var elements = this.options.elements || this.options.element;
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
            return { keys: [], values: {}, times: [] };
        }
        var keytimes = [];
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
                    // pass duplicate
                    continue;
                }
                // isStartZero is keytimes[0] is 0 (i === 0 & j === 0)
                var threshold = j === 0 && (i === 0 ? !isStartZero : !isShuffle) ? consts_1.THRESHOLD : 0;
                var keyvalue = isReverse ? times[length - 1 - j] : times[j];
                var time = utils_1.toFixed(isReverse ? duration - keyvalue : keyvalue);
                var keytime = utils_1.toFixed(start + time + threshold);
                if (totalDuration < keytime) {
                    break;
                }
                keys.push(keytime);
                values[keytime] = keyvalue;
                (keytimes.indexOf(keyvalue) === -1) && keytimes.push(keyvalue);
            }
        }
        if (keys[keys.length - 1] < totalDuration) {
            // last time === totalDuration
            var isReverse = Animator_1.isDirectionReverse(iterationCount, direction);
            var keyvalue = utils_1.toFixed(duration * (isReverse ? 1 - iterationCount % 1 : iterationCount % 1));
            keys.push(totalDuration);
            values[totalDuration] = keyvalue;
            (keytimes.indexOf(keyvalue) === -1) && keytimes.push(keyvalue);
        }
        return { keys: keys, values: values, times: keytimes };
    };
    /**
    * Specifies an css text that coverted the keyframes of the item.
    * @param {Array} [duration=this.getDuration()] - elements to synchronize item's keyframes.
    * @param {Array} [options={}] - parent options to unify options of items.
    * @example
item.setCSS(0, ["opacity"]);
item.setCSS(0, ["opacity", "width", "height"]);
    */
    SceneItem.prototype.toCSS = function (duration, options) {
        if (duration === void 0) { duration = this.getDuration(); }
        if (options === void 0) { options = {}; }
        var state = this.state;
        var id = state.id || this.setId(makeId()).state.id;
        if (!id) {
            return "";
        }
        var isZeroDuration = duration === 0;
        var selector = this.options.selector;
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
        var id = toId(this.state.id || this.setId(makeId()).state.id || "");
        if (!id) {
            return;
        }
        var styleElement = document.querySelector("#" + consts_1.PREFIX + id);
        var css = this.toCSS(duration, options);
        if (styleElement) {
            styleElement.innerText = css;
        }
        else {
            document.body.insertAdjacentHTML("beforeend", "<style id=\"" + consts_1.PREFIX + "STYLE_" + id + "\">" + css + "</style>");
        }
    };
    /**
    * Play using the css animation and keyframes.
    * @param {boolean} [exportCSS=true] Check if you want to export css.
    * @param {Object} [properties={}] The shorthand properties for six of the animation properties.
    * @param {Object} [properties.duration] The duration property defines how long an animation should take to complete one cycle.
    * @param {Object} [properties.fillMode] The fillMode property specifies a style for the element when the animation is not playing (before it starts, after it ends, or both).
    * @param {Object} [properties.iterationCount] The iterationCount property specifies the number of times an animation should be played.
    * @param {String} [properties.easing] The easing(timing-function) specifies the speed curve of an animation.
    * @param {Object} [properties.delay] The delay property specifies a delay for the start of an animation.
    * @param {Object} [properties.direction] The direction property defines whether an animation should be played forwards, backwards or in alternate cycles.
    * @see {@link https://www.w3schools.com/cssref/css3_pr_animation.asp}
    * @example
item.playCSS();
item.playCSS(false, {
    direction: "reverse",
    fillMode: "forwards",
});
    */
    SceneItem.prototype.playCSS = function (exportCSS, properties) {
        var _this = this;
        if (exportCSS === void 0) { exportCSS = true; }
        if (properties === void 0) { properties = {}; }
        if (!consts_1.ANIMATION || this.getPlayState() === "running") {
            return this;
        }
        var elements = this.elements;
        if (!elements || !elements.length) {
            return this;
        }
        if (this.isEnded()) {
            this.setTime(0);
        }
        exportCSS && this.exportCSS();
        var length = elements.length;
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
        /**
         * This event is fired when timeupdate and animate.
         * @event Scene.SceneItem#animate
         * @param {Number} param.currentTime The total time that the animator is running.
         * @param {Number} param.time The iteration time during duration that the animator is running.
         * @param {Scene.Frame} param.frame frame of that time.
         */
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
        if (!elements || !elements.length) {
            return frame;
        }
        var cssText = frame.toCSS();
        if (this.state.cssText === cssText) {
            return frame;
        }
        this.state.cssText = cssText;
        var length = elements.length;
        for (var i = 0; i < length; ++i) {
            elements[i].style.cssText += cssText;
        }
        return frame;
    };
    SceneItem.prototype._getTime = function (time, options) {
        var duration = (options && options.duration) || this.getDuration() || 100;
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
            return time;
        }
    };
    SceneItem.prototype._toKeyframes = function (duration, options) {
        var _this = this;
        if (duration === void 0) { duration = this.getDuration(); }
        if (options === void 0) { options = {}; }
        var id = this.state.id || this.setId(makeId()).state.id;
        if (!id) {
            return "";
        }
        var playSpeed = this.state.playSpeed;
        var isParent = typeof options.iterationCount !== "undefined";
        var iterationCount = this.state.iterationCount;
        var delay = isParent ? this.state.delay : 0;
        var direction = isParent ? this.state.direction : "normal";
        var frames = {};
        var _a = this.getAllTimes(true, {
            duration: duration,
            delay: delay,
            direction: direction,
            iterationCount: isParent && iterationCount !== "infinite" ? iterationCount : 1
        }), keys = _a.keys, values = _a.values, times = _a.times;
        var length = keys.length;
        var keyframes = [];
        if (!keys.length) {
            return "";
        }
        times.forEach(function (time) {
            frames[time] = _this.getNowFrame(time).toCSS();
        });
        if (delay) {
            keyframes.push("0%{" + frames[0] + "}");
            if (direction === "reverse" || direction === "alternate-reverse") {
                keyframes.push(delay / playSpeed / duration * 100 - 0.00001 + "%{" + frames[0] + "}");
            }
        }
        keys.forEach(function (time) {
            keyframes.push((delay + time) / playSpeed / duration * 100 + "%{" + frames[values[time]] + "}");
        });
        var lastTime = keys[length - 1];
        if ((delay + lastTime) / playSpeed < duration) {
            // not 100%
            keyframes.push("100%{" + frames[values[lastTime]]);
        }
        return "@" + consts_1.KEYFRAMES + " " + consts_1.PREFIX + "KEYFRAMES_" + toId(id) + "{\n\t\t\t" + keyframes.join("\n") + "\n\t\t}";
    };
    SceneItem.prototype._getNowValue = function (time, left, right, properties, easing) {
        if (easing === void 0) { easing = this.state.easing; }
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
        for (var i = right; i < length; ++i) {
            var frame = keyframes.get(times[i]);
            if (frame.has.apply(frame, properties)) {
                nextTime = times[i];
                nextFrame = frame;
                break;
            }
        }
        var prevValue = prevFrame && prevFrame.get.apply(prevFrame, properties);
        var nextValue = nextFrame && nextFrame.get.apply(nextFrame, properties);
        if (!prevFrame || utils_1.isUndefined(prevValue)) {
            return nextValue;
        }
        if (!nextFrame || utils_1.isUndefined(nextValue) || prevValue === nextValue) {
            return prevValue;
        }
        if (prevTime < 0) {
            prevTime = 0;
        }
        var easingFunction = this.state.easing || easing;
        return dot_1.dotValue(time, prevTime, nextTime, prevValue, nextValue, easingFunction);
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
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var consts_1 = __webpack_require__(6);
var utils_1 = __webpack_require__(5);
var property_1 = __webpack_require__(10);
var PropertyObject_1 = __importDefault(__webpack_require__(11));
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
/* eslint-disable */
function clone(target, toValue) {
    if (toValue === void 0) { toValue = false; }
    return merge({}, target, toValue);
}
function merge(to, from, toValue) {
    if (toValue === void 0) { toValue = false; }
    for (var name_2 in from) {
        var value = from[name_2];
        if (utils_1.isObject(value)) {
            if (value instanceof PropertyObject_1["default"]) {
                to[name_2] = toValue ? value.toValue() : value.clone();
            }
            else if (utils_1.isArray(value)) {
                to[name_2] = value.slice();
            }
            else if (utils_1.isObject(to[name_2]) && !(to[name_2] instanceof PropertyObject_1["default"])) {
                merge(to[name_2], value, toValue);
            }
            else {
                to[name_2] = clone(value, toValue);
            }
            continue;
        }
        to[name_2] = from[name_2];
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
var Frame = /** @class */ (function () {
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
        if (length === 2 && utils_1.isArray(params[0])) {
            this._set(params[0], value);
        }
        else if (utils_1.isArray(value)) {
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
        else if (utils_1.isObject(value)) {
            for (var name_3 in value) {
                this.set.apply(this, params.concat([name_3, value[name_3]]));
            }
        }
        else if (utils_1.isString(value)) {
            if (utils_1.isRole(params)) {
                this.set.apply(this, params.concat([property_1.toPropertyObject(value)]));
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
            if (utils_1.isRole([name_4])) {
                continue;
            }
            cssObject[name_4] = properties[name_4];
        }
        var transform = toInnerProperties(properties.transform);
        var filter = toInnerProperties(properties.filter);
        consts_1.TRANSFORM && transform && (cssObject[consts_1.TRANSFORM] = transform);
        consts_1.FILTER && filter && (cssObject[consts_1.FILTER] = filter);
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
        properties[args[length - 1]] = utils_1.isString(value) ? property_1.toPropertyObject(value) : value;
    };
    return Frame;
}());
exports["default"] = Frame;


/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/**
* @namespace
* @name Property
*/
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var PropertyObject_1 = __importDefault(__webpack_require__(11));
var color_1 = __webpack_require__(12);
var utils_1 = __webpack_require__(5);
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
function splitSpace(text) {
    // divide comma(,)
    var matches = text.split(/("[^"]*"|'[^']*'|[^\s()]*(?:\((?:[^()]*|\([^()]*\))*\))[^\s()]*)|\s+/g);
    var length = matches.length;
    var arr = [];
    var index = 0;
    for (var i = 0; i < length; ++i) {
        var value = matches[i];
        if (utils_1.isUndefined(value)) {
            arr[index] && ++index;
            continue;
        }
        else if (!value) {
            continue;
        }
        var arrValue = arr[index];
        arr[index] = arrValue ? arrValue + value : value;
    }
    return arr;
}
exports.splitSpace = splitSpace;
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
function splitComma(text) {
    // divide comma(,)
    // "[^"]*"|'[^']*'
    var matches = text.split(/("[^"]*"|'[^']*'|[^,\s()]*(?:\((?:[^()]*|\([^()]*\))*\))[^,\s()]*)|\s*,\s*/g);
    var length = matches.length;
    var arr = [];
    var index = 0;
    for (var i = 0; i < length; ++i) {
        var value = matches[i];
        if (utils_1.isUndefined(value)) {
            arr[index] && ++index;
            continue;
        }
        else if (!value) {
            continue;
        }
        var arrValue = arr[index];
        arr[index] = arrValue ? arrValue + value : value;
    }
    return arr;
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
    // rgb hsl model to CHANGE rgba hsla
    // string -> number
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
            // hsl, hsla to rgba
            colorArray = color_1.hslToRGB(colorArray);
            return arrayToColorObject(colorArray);
        default:
    }
    return colorObject;
}
exports.toColorObject = toColorObject;
/**
* convert text with parentheses to object.
* @memberof Property
* @function stringToBracketObject
* @param {String} value ex) "rgba(0,0,0,1)"
* @return {PropertyObject} PropertyObject
* @example
stringToBracketObject("abcde(0, 0, 0,1)")
// => PropertyObject(model="abcde", value=[0, 0, 0,1], separator=",")
*/
function stringToBracketObject(value) {
    // [prefix, value, other]
    var matches = (/([^(]*)\(([\s\S]*)\)([\s\S]*)/g).exec(value);
    if (!matches || matches.length < 4) {
        return value;
    }
    var model = matches[1] || "";
    var prefix = model + "(";
    var text = matches[2];
    var suffix = ")" + matches[3];
    var separator = ",";
    var values;
    // divide comma(,)
    var obj = toPropertyObject(text);
    if (obj instanceof PropertyObject_1["default"]) {
        separator = obj.getOption("separator");
        values = obj.value;
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
function stringToColorObject(value) {
    var colorArray;
    if (value.charAt(0) === "#") {
        if (value.length === 4) {
            colorArray = color_1.hexToRGB(color_1.hex3to6(value));
        }
        else if (value.length === 7) {
            colorArray = color_1.hexToRGB(value);
        }
        else {
            colorArray = color_1.hexToRGB(value);
        }
        return arrayToColorObject(colorArray);
    }
    else if (value.indexOf("(") !== -1) {
        // in bracket.
        return stringToBracketObject(value);
    }
    else {
        throw new Error("Invalid Format : Not a Color - " + value);
    }
}
exports.stringToColorObject = stringToColorObject;
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
    else {
        var chr = value.charAt(0);
        if (chr && (chr === '"' || chr === "'")) {
            // Quotes
            return value;
        }
        else if (value.indexOf("(") !== -1) {
            // color
            return stringToBracketObject(value);
        }
        else if (value.charAt(0) === "#") {
            return stringToColorObject(value);
        }
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
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var utils_1 = __webpack_require__(5);
/**
* Make string, array to PropertyObject for the dot product
* @memberof! Scene
*/
var PropertyObject = /** @class */ (function () {
    /**
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
    /**
    * the number of values.
    * @example
const obj1 = new PropertyObject("1,2,3", ",");

console.log(obj1.length);
// 3
     */
    PropertyObject.prototype.size = function () {
        return this.value.length;
    };
    /**
    * retrieve one of values at the index
    * @param {Number} index - index
    * @return {Object} one of values at the index
    * @example
const obj1 = new PropertyObject("1,2,3", ",");

console.log(obj1.get(0));
// 1
     */
    PropertyObject.prototype.get = function (index) {
        return this.value[index];
    };
    /**
    * Set the value at that index
    * @param {Number} index - index
    * @param {Object} value - text, a number, object to set
    * @return {PropertyObject} An instance itself
    * @example
const obj1 = new PropertyObject("1,2,3", ",");
obj1.set(0, 2);
console.log(obj1.toValue());
// 2,2,3
     */
    PropertyObject.prototype.set = function (index, value) {
        this.value[index] = value;
        return this;
    };
    /**
    * create a copy of an instance itself.
    * @return {PropertyObject} clone
    * @example
const obj1 = new PropertyObject("1,2,3", ",");
const obj2 = obj1.clone();
     */
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
    PropertyObject.prototype.toValue = function () {
        return this.options.prefix + this.join() + this.options.suffix;
    };
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
    PropertyObject.prototype.join = function () {
        return this.value.map(function (v) { return ((v instanceof PropertyObject) ? v.toValue() : v); }).join(this.options.separator);
    };
    /**
    * executes a provided function once per array element.
    * @param {Function} callback - Function to execute for each element, taking three arguments
    * @param {All} [callback.currentValue] The current element being processed in the array.
    * @param {Number} [callback.index] The index of the current element being processed in the array.
    * @param {Array} [callback.array] the array.
    * @return {PropertyObject} An instance itself
    * @see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach|MDN Array.forEach()} reference to MDN document.
    * @example
//rgba(100, 100, 100, 0.5)
var obj4 = new PropertyObject([100,100,100,0.5], {
    "separator" : ",",
    "prefix" : "rgba(",
    "suffix" : ")"
});

obj4.forEach(t => {
    console.log(t);
});  // =>   "100,100,100,0.5"
    */
    PropertyObject.prototype.forEach = function (func) {
        this.value.forEach(func);
        return this;
    };
    PropertyObject.prototype.init = function (value) {
        if (utils_1.isString(value)) {
            this.value = value.split(this.options.separator);
        }
        else if (utils_1.isObject(value)) {
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
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
/**
* @namespace
* @name Color
*/
exports.COLOR_MODELS = ["rgb", "rgba", "hsl", "hsla"];
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
function cutHex(hex) {
    return (hex.charAt(0) === "#") ? hex.substring(1) : hex;
}
exports.cutHex = cutHex;
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
function hex3to6(h) {
    var r = h.charAt(1);
    var g = h.charAt(2);
    var b = h.charAt(3);
    var arr = ["#", r, r, g, g, b, b];
    return arr.join("");
}
exports.hex3to6 = hex3to6;
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

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var utils_1 = __webpack_require__(5);
var PropertyObject_1 = __importDefault(__webpack_require__(11));
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
/**
 * @memberof Scene
* @class Scene.Keyframes
* a list of objects in chronological order.
*/
var Keyframes = /** @class */ (function () {
    function Keyframes() {
        this.times = [];
        this.items = {};
        this.names = {};
    }
    /**
    * A list of names
    * @method Scene.Keyframes#getNames
    * @return {string[][]} names
    * @example
keyframes.getNames(); // [["a"], ["transform", "translate"], ["transform", "scale"]]
    */
    Keyframes.prototype.getNames = function () {
        var names = this.names;
        return getNames(names, []);
    };
    /**
     * update property names used in frames.
     * @method Scene.Keyframes#update
     * @return {Scene.Keyframes} An instance itself
     */
    Keyframes.prototype.update = function () {
        var items = this.items;
        for (var time in items) {
            this.updateFrame(items[time]);
        }
        return this;
    };
    /**
     * executes a provided function once for each scene item.
     * @method Scene.Keyframes#forEach
     * @param {Function} callback Function to execute for each element, taking three arguments
     * @param {Scene.Frame} [callback.item] The value of the item being processed in the keyframes.
     * @param {string} [callback.time] The time of the item being processed in the keyframes.
     * @param {object} [callback.items] The object that forEach() is being applied to.
     * @return {Scene.Keyframes} An instance itself
     */
    Keyframes.prototype.forEach = function (callback) {
        var times = this.times;
        var items = this.items;
        times.forEach(function (time) {
            callback(items[time], time, items);
        });
    };
    /**
    * update property names used in frame.
    * @method Scene.Keyframes#updateFrame
    * @param {Scene.Frame} [frame] - frame of that time.
    * @return {Scene.Keyframes} An instance itself
    * @example
keyframes.updateFrame(frame);
    */
    Keyframes.prototype.updateFrame = function (frame) {
        if (!frame) {
            return this;
        }
        var properties = frame.properties;
        var names = this.names;
        updateFrame(names, properties);
        return this;
    };
    /**
     * Get how long an animation should take to complete one cycle.
     * @method Scene.Keyframes#getDuration
     * @return {number} duration
     */
    Keyframes.prototype.getDuration = function () {
        var times = this.times;
        return times.length === 0 ? 0 : times[times.length - 1];
    };
    /**
     * Set how long an animation should take to complete one cycle.
     * @method Scene.Keyframes#setDuration
     * @param {number} duration - duration
     * @return {Scene.Keyframes} An instance itself.
     */
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
    /**
    * get size of list
    * @method Scene.Keyframes#size
    * @return {Number} length of list
    */
    Keyframes.prototype.size = function () {
        return this.times.length;
    };
    /**
    * add object in list
    * @method Scene.Keyframes#add
    * @param {Number} time - frame's time
    * @param {Object} object - target
    * @return {Scene.Keyframes} An instance itself
    */
    Keyframes.prototype.add = function (time, object) {
        this.items[time] = object;
        this.addTime(time);
        return this;
    };
    /**
    * Check if keyframes has object at that time.
    * @method Scene.Keyframes#has
    * @param {Number} time - object's time
    * @return {Boolean} true: if has time, false: not
    */
    Keyframes.prototype.has = function (time) {
        return time in this.items;
    };
    /**
    * get object at that time.
    * @method Scene.Keyframes#get
    * @param {Number} time - object's time
    * @return {Object} object at that time
    */
    Keyframes.prototype.get = function (time) {
        return this.items[time];
    };
    /**
    * remove object at that time.
    * @method Scene.Keyframes#remove
    * @param {Number} time - object's time
    * @return {Keyframes} An instance itself
    */
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
            // if time is smaller than times[i], add time to index
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

/**
* @namespace
* @name Dot
*/
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var utils_1 = __webpack_require__(5);
var PropertyObject_1 = __importDefault(__webpack_require__(11));
function getType(value) {
    var type = typeof value;
    if (type === "object") {
        if (utils_1.isArray(value)) {
            return "array";
        }
        else if (value instanceof PropertyObject_1["default"]) {
            return "property";
        }
    }
    return type;
}
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
/**
* The dot product of PropertyObject(type=color)
* If the values are not RGBA model, change them RGBA mdoel.
* @memberof Dot
* @function dotColor
* @param {PropertyObject} a1 value1
* @param {PropertyObject} a2 value2
* @param {Number} b1 b1 ratio
* @param {Number} b2 b2 ratio
* @return {PropertyObject} PropertyObject(type=color).
* @example
var colorObject = ......; //PropertyObject(type=color, model="rgba", value=[254, 254, 254, 1]);
dotColor("#000",  colorObject, 0.5, 0.5);
// "#000" => PropertyObject(type=color, model="rgba", value=[0, 0, 0, 1]);
// return => PropertyObject(type=color, model="rgba", value=[127, 127, 127, 1]);
*/
function dotColor(color1, color2, b1, b2) {
    if (b2 === 0) {
        return color2;
    }
    // convert array to PropertyObject(type=color)
    var value1 = color1.value;
    var value2 = color2.value;
    // If the model name is not same, the inner product is impossible.
    var model1 = color1.getOption("model");
    var model2 = color2.getOption("model");
    if (model1 !== model2) {
        // It is recognized as a string.
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
function dot(a1, a2, b1, b2) {
    if (b2 === 0) {
        return a2;
    }
    else if (b1 === 0) {
        return a1;
    }
    // dot Object
    var type1 = getType(a1);
    var type2 = getType(a2);
    if (type1 === type2) {
        if (type1 === "property") {
            return dotObject(a1, a2, b1, b2);
        }
        else if (type1 === "array") {
            return dotArray(a1, a2, b1, b2);
        }
        else if (type1 === "object" || type1 === "boolean") {
            return a1;
        }
    }
    else {
        return a1;
    }
    // prevent division by zero.
    if (b1 + b2 === 0) {
        return a1;
    }
    // split number and unit of the value.
    var r1 = b1 / (b1 + b2);
    var r2 = 1 - r1;
    if (type1 === "number") {
        return a1 * r2 + a2 * r1;
    }
    else if (type1 !== "string") {
        return a1;
    }
    var v1 = utils_1.splitUnit(a1);
    var v2 = utils_1.splitUnit(a2);
    var v;
    // 숫자가 아닐경우 첫번째 값을 반환 b2가 0일경우 두번째 값을 반환
    if (isNaN(v1.value) || isNaN(v2.value)) {
        return r1 >= 1 ? a2 : a1;
    }
    else {
        v = v1.value * r2 + v2.value * r1;
    }
    var unit = v1.unit || v2.unit || false;
    if (unit === false) {
        return v;
    }
    return v + unit.trim();
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


/***/ })
/******/ ]);
});