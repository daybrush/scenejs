import { StateInterface } from "../Animator";
import set from "./set";

/**
 * Make a wipe in effect.
 * @memberof Scene.presets
 * @func wipeIn
 * @param {AnimatorOptions} options
 * @param {string|string[]} [options.property = "left"] position property
 * @param {number|string} [options.from = "-100%"] start position
 * @param {number|string}[options.to = "0%"] end position
 * @param {number} options.duration animation's duration
 * @example
// import {presets} from "scenejs";
// presets.wipeIn({property: "left", duration: 2});
Scene.presets.wipeIn({property: "left", duration: 2});
// Same
new SceneItem({
	"0%": {
		"left": "-100%",
	},
	"100%": {
		"left": "0%",
	}
}, {
	duration: 2,
});
 */
export default function wipeIn({from = "-100%", to = "0%", property = "left"}: StateInterface) {
	return set(property, [from, to], arguments[0]);
}
