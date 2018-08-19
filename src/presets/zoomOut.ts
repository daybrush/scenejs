import set from "./set";
import { StateInterface } from "../Animator";

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
export default function zoomOut({from = 1, to = 0}: StateInterface) {
	return set(["transform", "scale"], [from, to], arguments[0]);
}
