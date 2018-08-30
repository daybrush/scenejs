export var PREFIX = "__SCENEJS_";
export var timingFunction = "animation-timing-function";
export var ROLES = {
  transform: {},
  filter: {},
  attribute: {}
};
export var ALIAS = {
  easing: ["animation-timing-function"]
};
export var FIXED = {
  "animation-timing-function": true,
  "contents": true
};
export var MAXIMUM = 1000000;
export var THRESHOLD = 0.000001;
var prefixes = ["webkit", "ms", "moz", "o"];

var checkProperties = function checkProperties(property) {
  var styles = (document.body || document.documentElement).style;
  var length = prefixes.length;

  if (typeof styles[property] !== "undefined") {
    return property;
  }

  for (var i = 0; i < length; ++i) {
    var _name = "-" + prefixes[i] + "-" + property;

    if (typeof styles[_name] !== "undefined") {
      return _name;
    }
  }

  return "";
};

export var TRANSFORM = checkProperties("transform");
export var FILTER = checkProperties("filter");
export var ANIMATION = checkProperties("animation");
export var KEYFRAMES = ANIMATION.replace("animation", "keyframes");
export var START_ANIMATION = "startAnimation";