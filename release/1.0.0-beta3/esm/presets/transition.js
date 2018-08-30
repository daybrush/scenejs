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
export default function transition(item1, item2, _ref) {
  var _item1$set, _item2$set;

  var from = _ref.from,
      to = _ref.to,
      _ref$duration = _ref.duration,
      duration = _ref$duration === void 0 ? item1.getDuration() : _ref$duration,
      _ref$time = _ref.time,
      time = _ref$time === void 0 ? Math.max(item1.getDuration() - duration, 0) : _ref$time;
  item1.set((_item1$set = {}, _item1$set[time] = from, _item1$set[time + duration] = to, _item1$set));
  item2.set((_item2$set = {
    0: to
  }, _item2$set[duration] = from, _item2$set));
}