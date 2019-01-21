
import { IState } from "./Animator";
import SceneItem from "./SceneItem";
import { IObject } from "@daybrush/utils";
import { TRANSFORM_NAME } from "./consts";

/**
 * @namespace presets
 */
/**
 * Use the property to create an effect.
 * @memberof presets
 * @param - property to set effect
 * @param - values of 100%
 * @example
// import {set, blink} from "scenejs";
// set("opacity", [0, 1, 0], {duration: 2});
Scene.set("opacity", [0, 1, 0], {duration: 2});

// Same
Scene.blink({duration: 2});

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
export function set(property: string | string[], values: any[], options: IState) {
  const item = new SceneItem({}, options);
  const length = values.length;

  for (let i = 0; i < length; ++i) {
    item.set(`${i / (length - 1) * 100}%`, property, values[i]);
  }
  return item;
}

/**
 * Make a zoom in effect.
 * @memberof presets
 * @param {AnimatorOptions} options
 * @param {number} [options.from = 0] start zoom
 * @param {number}[options.to = 1] end zoom
 * @param {number} options.duration animation's duration
 * @example
// import {set, zoomIn} from "scenejs";
// zoomIn({duration: 2});
Scene.zoomIn({duration: 2});
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
export function zoomIn({ from = 0, to = 1 }: IState) {
  return set([TRANSFORM_NAME, "scale"], [from, to], arguments[0]);
}

/**
 * Make a zoom out effect.
 * @memberof presets
 * @param {AnimatorOptions} options
 * @param {number} [options.from = 1] start zoom
 * @param {number}[options.to = 0] end zoom
 * @param {number} options.duration animation's duration
 * @example
// import {zoomOut} from "scenejs";
// zoomOut({duration: 2});
Scene.zoomOut({duration: 2});
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
export function zoomOut({ from = 1, to = 0 }: IState) {
  return set([TRANSFORM_NAME, "scale"], [from, to], arguments[0]);
}

/**
 * Make a wipe in effect.
 * @memberof presets
 * @param {AnimatorOptions} options
 * @param {string|string[]} [options.property = "left"] position property
 * @param {number|string} [options.from = "-100%"] start position
 * @param {number|string}[options.to = "0%"] end position
 * @param {number} options.duration animation's duration
 * @example
// import {wipeIn} from "scenejs";
// wipeIn({property: "left", duration: 2});
Scene.wipeIn({property: "left", duration: 2});
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
export function wipeIn({ from = "-100%", to = "0%", property = "left" }: IState) {
  return set(property, [from, to], arguments[0]);
}

/**
 * Make a wipe out effect.
 * @memberof presets
 * @param {AnimatorOptions} options
 * @param {string|string[]} [options.property = "left"] position property
 * @param {number|string} [options.from = "0%"] start position
 * @param {number|string}[options.to = "100%"] end position
 * @param {number} options.duration animation's duration
 * @example
// import {wipeOut} from "scenejs";
// wipeOut({property: "left", duration: 2});
Scene.wipeOut({property: "left", duration: 2});
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
export function wipeOut({ from = "0%", to = "100%", property = "left" }: IState) {
  return set(property, [from, to], arguments[0]);
}

/**
 * Use the property to create an effect.
 * @memberof presets
 * @param {Scene.SceneItem} item1 - Item that end effect
 * @param {Scene.SceneItem} item2 - Item that start effect
 * @param {AnimatorOptions} options
 * @param {object} options.from The starting properties of item1 and end properties of item2
 * @param {object} options.to The starting properties of item2 and end properties of item1
 * @param {number} options.duration animation's duration
 * @param {number} [options.time] start time of item1 <br/> <strong>default: item1.getDuration() - duration</strong>
 * @example
// import {transition} from "scenejs";
transition(item1, item2, {
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
}: { from: IObject<any>, to: IObject<any>, duration?: number, time?: number }) {
  item1.set({
    [time]: to,
    [time + duration]: from,
  });
  item2.set({
    0: from,
    [duration]: to,
  });
}

/**
 * Make a fade in effect.
 * @memberof presets
 * @param {IState} options
 * @param {number} [options.from = 0] start opacity
 * @param {number}[options.to = 1] end opacity
 * @param {number} options.duration animation's duration
 * @example
// import {fadeIn} from "scenejs";
// fadeIn({duration: 2});
Scene.fadeIn({duration: 2});
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
export function fadeIn({ from = 0, to = 1 }: IState) {
  return set("opacity", [from, to], arguments[0]);
}

/**
 * Make a fade out effect.
 * @memberof presets
 * @param {IState} options
 * @param {number} [options.from = 1] start opacity
 * @param {number}[options.to = 0] end opacity
 * @param {number} options.duration animation's duration
 * @example
// import {fadeOut} from "scenejs";
// fadeOut({duration: 2});
Scene.fadeOut({duration: 2});
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
export function fadeOut({ from = 1, to = 0 }: IState) {
  return set("opacity", [from, to], arguments[0]);
}
/**
 * Make a blinking effect.
 * @memberof presets
 * @param {IState} options
 * @param {number} [options.from = 0] start opacity
 * @param {number}[options.to = 1] end opacity
 * @param {number} options.duration animation's duration
 * @example
// import {blink} from "scenejs";
// blink({duration: 2});
Scene.blink({duration: 2});
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
export function blink({ from = 0, to = 1 }: IState) {
  return set("opacity", [from, to, from], arguments[0]);
}
