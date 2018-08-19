import SceneItem from "../SceneItem";
import { ObjectInterface } from "../consts";

/**
 * Use the property to create an effect.
 * @memberof Scene.presets
 * @func transition
 * @param {Scene.SceneItem} item1 - Item that end effect
 * @param {Scene.SceneItem} item2 - Item that start effect
 * @param {AnimatorOptions} options
 * @param {object} options.from The starting properties of item1 and end properties of item2
 * @param {object} options.to The starting properties of item2 and end properties of item1
 * @param {number} options.duration animation's duration
 * @param {number} [options.time] start time of item1 <br/> <strong>default: item1.getDuration() - duration</strong>
 * @example
// import {presets} from "scenejs";
Scene.presets.transition(item1, item2, {
	from: {
		opacity: 1,
	},
	to: {
		opacity: 0,
	},
	duration: 0.1,
});

// Same
item1.set({
	[item1.getDuration() - 0.1]: {
		opacity: 1,
	},
	[item1.getDuration()]: {
		opacity: 0,
	}
});
item2.set({
	0: {
		opacity: 0,
	},
	0.1: {
		opacity: 1,
	}
});
 */
export default function transition(item1: SceneItem, item2: SceneItem, {
		from,
		to,
		duration = item1.getDuration(),
		time = Math.max(item1.getDuration() - duration, 0),
	}: {from: ObjectInterface<any>, to: ObjectInterface<any>, duration?: number, time: number}) {
	item1.set({
		[time]: from,
		[time + duration]: to,
	});
	item2.set({
		0: to,
		[duration]: from,
	});
}
