import set from "./set";
/**
 * Make a wipe out effect.
 * @memberof Scene.presets
 * @func wipeOut
 * @param {AnimatorOptions} options
 * @param {string|string[]} [options.property = "left"] position property
 * @param {number|string} [options.from = "0%"] start position
 * @param {number|string}[options.to = "100%"] end position
 * @param {number} options.duration animation's duration
 * @example
// import {presets} from "scenejs";
// presets.wipeOut({property: "left", duration: 2});
Scene.presets.wipeOut({property: "left", duration: 2});
// Same
new SceneItem({
	"0%": {
		"left": "0%",
	},
	"100%": {
		"left": "100%",
	}
}, {
	duration: 2,
});
 */

export default function wipeOut(_ref) {
  var _ref$from = _ref.from,
      from = _ref$from === void 0 ? "0%" : _ref$from,
      _ref$to = _ref.to,
      to = _ref$to === void 0 ? "100%" : _ref$to,
      _ref$property = _ref.property,
      property = _ref$property === void 0 ? "left" : _ref$property;
  return set(property, [from, to], arguments[0]);
}