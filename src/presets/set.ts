import SceneItem from "../SceneItem";
import { StateInterface } from "../Animator";

/**
 * Use the property to create an effect.
 * @memberof Scene.presets
 * @func set
 * @param {string | string[]} property - property to set effect
 * @param {any[]} values - values of 100%
 * @param {AnimatorOptions} [options]
 * @example
// import {presets} from "scenejs";
// presets.set("opacity", [0, 1, 0], {duration: 2});
Scene.presets.set("opacity", [0, 1, 0], {duration: 2});

// Same
Scene.presets.blink({duration: 2});

// Same
new SceneItem({
	"0%": {
		opacity: 0,
	},
	"50%": {
		opacity: 1,
	}
	"100%": {
		opacity: 0,
	}
}, {
	duration: 2,
});
 */
export default function set(property: string | string[], values: any[], options: StateInterface) {
	const item = new SceneItem({}, options);
	const length = values.length;

	for (let i = 0; i < length; ++i) {
		item.set(`${i / (length - 1) * 100}%`, property, values[i]);
	}
	return item;
}
