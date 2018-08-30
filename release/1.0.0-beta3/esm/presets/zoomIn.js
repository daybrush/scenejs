import set from "./set";

/**
 * Make a zoom in effect.
 * @memberof Scene.presets
 * @func zoomIn
 * @param {AnimatorOptions} options
 * @param {number} [options.from = 0] start zoom
 * @param {number}[options.to = 1] end zoom
 * @param {number} options.duration animation's duration
 * @example
// import {presets} from "scenejs";
// presets.zoomIn({duration: 2});
Scene.presets.zoomIn({duration: 2});
// Same
new SceneItem({
	"0%": {
		"transform": "scale(0)",
	},
	"100%": {
		"transform": "scale(1)",
	}
}, {
	duration: 2,
});
 */
export default function zoomIn(_ref) {
  var _ref$from = _ref.from,
      from = _ref$from === void 0 ? 0 : _ref$from,
      _ref$to = _ref.to,
      to = _ref$to === void 0 ? 1 : _ref$to;
  return set(["transform", "scale"], [from, to], arguments[0]);
}