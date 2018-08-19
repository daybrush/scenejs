import set from "./set";
import { StateInterface } from "../Animator";

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
export default function fadeOut({from = 1, to = 0}: StateInterface) {
	return set("opacity", [from, to], arguments[0]);
}
