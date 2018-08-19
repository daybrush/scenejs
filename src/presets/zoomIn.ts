import set from "./set";
import { StateInterface } from "../Animator";

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
export default function zoomIn({from = 0, to = 1}: StateInterface) {
	return set(["transform", "scale"], [from, to], arguments[0]);
}
