import set from "./set";

/**
 * Make a fade out effect.
 * @memberof Scene.presets
 * @func fadeOut
 * @param {AnimatorOptions} options
 * @param {number} [options.from = 1] start opacity
 * @param {number}[options.to = 0] end opacity
 * @param {number} options.duration animation's duration
 * @example
// import {presets} from "scenejs";
// presets.fadeOut({duration: 2});
Scene.presets.fadeOut({duration: 2});
// Same
new SceneItem({
	"0%": {
		opacity: 1,
	},
	"100%": {
		opacity: 0,
	}
}, {
	duration: 2,
});
 */
export default function fadeOut(_ref) {
  var _ref$from = _ref.from,
      from = _ref$from === void 0 ? 1 : _ref$from,
      _ref$to = _ref.to,
      to = _ref$to === void 0 ? 0 : _ref$to;
  return set("opacity", [from, to], arguments[0]);
}