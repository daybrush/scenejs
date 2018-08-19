import set from "./set";
import { StateInterface } from "../Animator";

/**
 * Make a fade in effect.
 * @memberof Scene.presets
 * @func fadeIn
 * @param {AnimatorOptions} options
 * @param {number} [options.from = 0] start opacity
 * @param {number}[options.to = 1] end opacity
 * @param {number} options.duration animation's duration
 * @example
// import {presets} from "scenejs";
// presets.fadeIn({duration: 2});
Scene.presets.fadeIn({duration: 2});
// Same
new SceneItem({
	"0%": {
		opacity: 0,
	},
	"100%": {
		opacity: 1,
	}
}, {
	duration: 2,
});
 */
export default function fadeIn({from = 0, to = 1}: StateInterface) {
	return set("opacity", [from, to], arguments[0]);
}
