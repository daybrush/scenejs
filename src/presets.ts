
import { StateInterface } from "./Animator";
import SceneItem from "./SceneItem";
import { ObjectInterface } from "./consts";

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
export function set(property: string | string[], values: any[], options: StateInterface) {
  const item = new SceneItem({}, options);
  const length = values.length;

  for (let i = 0; i < length; ++i) {
    item.set(`${i / (length - 1) * 100}%`, property, values[i]);
  }
  return item;
}

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
export function zoomIn({ from = 0, to = 1 }: StateInterface) {
  return set(["transform", "scale"], [from, to], arguments[0]);
}

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
export function zoomOut({ from = 1, to = 0 }: StateInterface) {
  return set(["transform", "scale"], [from, to], arguments[0]);
}

/**
 * Make a wipe in effect.
 * @memberof Scene
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
export function wipeIn({ from = "-100%", to = "0%", property = "left" }: StateInterface) {
  return set(property, [from, to], arguments[0]);
}

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
export function wipeOut({ from = "0%", to = "100%", property = "left" }: StateInterface) {
  return set(property, [from, to], arguments[0]);
}

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
export function transition(item1: SceneItem, item2: SceneItem, {
  from,
  to,
  duration = item1.getDuration(),
  time = Math.max(item1.getDuration() - duration, 0),
}: { from: ObjectInterface<any>, to: ObjectInterface<any>, duration?: number, time: number }) {
  item1.set({
    [time]: from,
    [time + duration]: to,
  });
  item2.set({
    0: to,
    [duration]: from,
  });
}

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
export function fadeIn({ from = 0, to = 1 }: StateInterface) {
  return set("opacity", [from, to], arguments[0]);
}

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
export function fadeOut({ from = 1, to = 0 }: StateInterface) {
  return set("opacity", [from, to], arguments[0]);
}
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
export function blink({ from = 0, to = 1 }: StateInterface) {
  return set("opacity", [from, to, from], arguments[0]);
}
