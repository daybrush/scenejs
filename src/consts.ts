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
export const ROLES: RoleInterface = {transform: {}, filter: {}, attribute: {}};
export const ALIAS: ObjectInterface<string[]> = {easing: ["animation-timing-function"]};
export const FIXED = {"animation-timing-function": true, "contents": true};
export const MAXIMUM = 1000000;
export const THRESHOLD = 0.000001;
type OptionType = ["duration", "fillMode", "direction", "iterationCount", "delay", "easing", "playSpeed"];
type EventType = ["paused", "ended", "timeupdate", "animate", "play"];

/**
* option name list
* @name Scene.OPTIONS
* @memberof Scene
* @static
* @type {string[]}
* @example
* Scene.OPTIONS // ["duration", "fillMode", "direction", "iterationCount", "delay", "easing", "playSpeed"]
*/
export const OPTIONS: OptionType =
	["duration", "fillMode", "direction", "iterationCount", "delay", "easing", "playSpeed"];

/**
* Event name list
* @name Scene.EVENTS
* @memberof Scene
* @static
* @type {string[]}
* @example
* Scene.EVENTS // ["paused", "ended", "timeupdate", "animate", "play"];
*/
export const EVENTS: EventType = ["paused", "ended", "timeupdate", "animate", "play"];

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

export const TRANSFORM = checkProperties("transform");
export const FILTER = checkProperties("filter");
export const ANIMATION = checkProperties("animation");
export const KEYFRAMES = ANIMATION.replace("animation", "keyframes");
export const START_ANIMATION = "startAnimation";
