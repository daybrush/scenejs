export var PREFIX = "__SCENEJS_";
export var timingFunction = "animation-timing-function";
export var ROLES = { transform: {}, filter: {}, attribute: {} };
export var ALIAS = { easing: ["animation-timing-function"] };
export var FIXED = { "animation-timing-function": true, "contents": true };
export var MAXIMUM = 1000000;
export var THRESHOLD = 0.000001;
/**
* option name list
* @name Scene.OPTIONS
* @memberof Scene
* @static
* @type {string[]}
* @example
* Scene.OPTIONS // ["duration", "fillMode", "direction", "iterationCount", "delay", "easing", "playSpeed"]
*/
export var OPTIONS = ["duration", "fillMode", "direction", "iterationCount", "delay", "easing", "playSpeed"];
/**
* Event name list
* @name Scene.EVENTS
* @memberof Scene
* @static
* @type {string[]}
* @example
* Scene.EVENTS // ["paused", "ended", "timeupdate", "animate", "play"];
*/
export var EVENTS = ["paused", "ended", "timeupdate", "animate", "play"];
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
export var TRANSFORM = checkProperties("transform");
export var FILTER = checkProperties("filter");
export var ANIMATION = checkProperties("animation");
export var KEYFRAMES = ANIMATION.replace("animation", "keyframes");
export var START_ANIMATION = "startAnimation";
//# sourceMappingURL=consts.js.map