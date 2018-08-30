import set from "./set";

/**
 * Make a zoom out effect.
 * @memberof Scene.presets
 * @func zoomOut
 * @param {AnimatorOptions} options
 * @param {number} [options.from = 1] start zoom
 * @param {number}[options.to = 0] end zoom
 * @param {number} options.duration animation's duration
 * @example
// import {presets} from "scenejs";
// presets.zoomOut({duration: 2});
Scene.presets.zoomOut({duration: 2});
// Same
new SceneItem({
	"0%": {
		"transform": "scale(1)",
	},
	"100%": {
		"transform": "scale(0)",
	}
}, {
	duration: 2,
});
 */
export default function zoomOut(_ref) {
  var _ref$from = _ref.from,
      from = _ref$from === void 0 ? 1 : _ref$from,
      _ref$to = _ref.to,
      to = _ref$to === void 0 ? 0 : _ref$to;
  return set(["transform", "scale"], [from, to], arguments[0]);
}