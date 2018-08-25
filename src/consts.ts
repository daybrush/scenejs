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
export const SCENE_ROLES: RoleInterface = {transform: {}, filter: {}, attribute: {}};
export const FIXED = {"animation-timing-function": true, "contents": true};
export const MAXIMUM = 1000000;
export const THRESHOLD = 0.000001;
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
