import { StateInterface } from "../Animator";
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
export default function wipeOut({from = "0%", to = "100%", property = "left"}: StateInterface) {
	return set(property, [from, to], arguments[0]);
}
