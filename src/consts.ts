export type Role = true | RoleInterface;
export interface RoleInterface {
  [role: string]: Role;
}
export interface ObjectInterface<T> {
  [name: string]: T;
}
export type NameType = string | number;

export const PREFIX = "__SCENEJS_";
export const timingFunction = "animation-timing-function";
export const ROLES: RoleInterface = { transform: {}, filter: {}, attribute: {} };
export const ALIAS: ObjectInterface<string[]> = { easing: ["animation-timing-function"] };
export const FIXED = { "animation-timing-function": true, "contents": true };
export const MAXIMUM = 1000000;
export const THRESHOLD = 0.000001;
type OptionType = ["duration", "fillMode", "direction", "iterationCount", "delay", "easing", "playSpeed"];
type EventType = ["paused", "ended", "timeupdate", "animate", "play", "iteration"];

export const DURATION = "duration";
export const FILL_MODE = "fillMode";
export const DIRECTION = "direction";
export const ITERATION_COUNT = "iterationCount";
export const DELAY = "delay";
export const EASING = "easing";
export const PLAY_SPEED = "playSpeed";
export const EASING_NAME = "easingName";
export const ITERATION_TIME = "iterationTime";
export const PAUSED = "paused";
export const ENDED = "ended";
export const TIMEUPDATE = "timeupdate";
export const ANIMATE = "animate";
export const PLAY = "play";
export const RUNNING = "running";
export const ITERATION = "iteration";
export const RGBA = "rgba";
export const START_ANIMATION = "startAnimation";
export const ALTERNATE = "alternate";
export const REVERSE = "reverse";
export const ALTERNATE_REVERSE = "alternate-reverse";
export const NORMAL = "normal";
export const INFINITE = "infinite";
export const PLAY_STATE = "playState";
/**
* option name list
* @name Scene.OPTIONS
* @memberof Scene
* @static
* @type {string[]}
* @example
* Scene.OPTIONS // ["duration", "fillMode", "direction", "iterationCount", "delay", "easing", "playSpeed"]
*/
export const OPTIONS: OptionType = [DURATION, FILL_MODE, DIRECTION, ITERATION_COUNT, DELAY, EASING, PLAY_SPEED];

/**
* Event name list
* @name Scene.EVENTS
* @memberof Scene
* @static
* @type {string[]}
* @example
* Scene.EVENTS // ["paused", "ended", "timeupdate", "animate", "play", "iteration"];
*/
export const EVENTS: EventType = [PAUSED, ENDED, TIMEUPDATE, ANIMATE, PLAY, ITERATION];

const prefixes: string[] = ["webkit", "ms", "moz", "o"];
const checkProperties = (property: string) => {
  const styles = (document.body || document.documentElement).style as any;
  const length = prefixes.length;

  if (typeof styles[property] !== "undefined") {
    return property;
  }
  for (let i = 0; i < length; ++i) {
    const name = `-${prefixes[i]}-${property}`;

    if (typeof styles[name] !== "undefined") {
      return name;
    }
  }
  return "";
};

export const TRANSFORM = /*#__PURE__*/checkProperties("transform");
export const FILTER = /*#__PURE__*/checkProperties("filter");
export const ANIMATION = /*#__PURE__*/checkProperties("animation");
export const KEYFRAMES = /*#__PURE__*/ANIMATION.replace("animation", "keyframes");
