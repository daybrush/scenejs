import set from "./set";
import { StateInterface } from "../Animator";

/**
 * Make a blinking effect.
 * @memberof Scene.presets
 * @func blink
 * @param {AnimatorOptions} options
 * @param {number} [options.from = 0] start opacity
 * @param {number}[options.to = 1] end opacity
 * @param {number} options.duration animation's duration
 * @example
// import {presets} from "scenejs";
// presets.blink({duration: 2});
Scene.presets.blink({duration: 2});
// Same
new SceneItem({
	"0%": {
		opacity: 0,
	},
	"50%": {
		opacity: 1,
	},
	"100%": {
		opacity: 0,
	}
}, {
	duration: 2,
});
 */
export default function blink({from = 0, to = 1}: StateInterface) {
	return set("opacity", [from, to, from], arguments[0]);
}
