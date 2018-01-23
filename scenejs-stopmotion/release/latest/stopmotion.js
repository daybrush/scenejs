(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("Scene"));
	else if(typeof define === 'function' && define.amd)
		define("StopMotion", ["Scene"], factory);
	else if(typeof exports === 'object')
		exports["StopMotion"] = factory(require("Scene"));
	else
		root["StopMotion"] = factory(root["Scene"]);
})(typeof self !== 'undefined' ? self : this, function(__WEBPACK_EXTERNAL_MODULE_2__) {
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
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _StopMotion = __webpack_require__(1);

var _StopMotion2 = _interopRequireDefault(_StopMotion);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_StopMotion2.default.Item = _StopMotion.StopMotionItem;
module.exports = _StopMotion2.default;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = StopMotion;

var _scenejs = __webpack_require__(2);

var _scenejs2 = _interopRequireDefault(_scenejs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var interval = 0.00001;

function stopMotion(item) {
	var start = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
	var end = arguments[2];
	var count = arguments[3];

	if (!count || count < 1) {
		return;
	}
	var depth = (end - start) / count;

	for (var i = 1; i <= count - 1; ++i) {
		item.setFrame(start + i * depth, item.getNowFrame(start + i * depth));
	}
	for (var _i = 1; _i <= count; ++_i) {
		item.setFrame(start + _i * depth - interval, item.getFrame(start + (_i - 1) * depth));
	}
}

function test(inst, target) {
	if (Array.isArray(inst)) {
		return inst.indexOf(target);
	} else if (typeof inst === "string") {
		return inst === target;
	} else {
		return inst.test(target);
	}
}
function StopMotion(obj) {
	var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
	var include = options.include,
	    exclude = options.exclude;


	if (obj instanceof _scenejs2.default) {
		var items = obj.items;

		for (var id in items) {
			var item = items[id];

			if (include && !test(include, id) || exclude && test(exclude, id)) {
				continue;
			}
			stopMotion(item, 0, item.getDuration(), options.count);
		}
	} else if (obj instanceof _scenejs.SceneItem) {
		stopMotion(obj, 0, obj.getDuration(), options.count);
	} else {
		var scene = new _scenejs2.default(obj, options);

		return StopMotion(scene, options);
	}
	return obj;
}

_scenejs2.default.prototype.setStopMotion = function setStopMotion(options) {
	StopMotion(this, options);
	return this;
};

_scenejs.SceneItem.prototype.setStopMotion = function setStopMotion(options) {
	StopMotion(this, options);
	return this;
};

/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_2__;

/***/ })
/******/ ]);
});