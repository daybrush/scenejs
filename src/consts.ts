export type Role = true | RoleInterface;
export interface RoleInterface {
	[role: string]: Role;
}
export interface ObjectInterface<T> {
	[name: string]: T;
}
export type NameType = string | number;

export const PREFIX = "__SCENEJS_";
export const SCENE_ROLES: RoleInterface = {transform: true, filter: true};
export const MAXIMUM = 1000000;
export const THRESHOLD = 0.000001;

const checkProperties = (prefixes: string[], property: string) => {
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

export const TRANSFORM = checkProperties(["webkit", "ms", "moz", "o"], "transform");
export const FILTER = checkProperties(["webkit", "ms", "moz", "o"], "filter");
export const ANIMATION = checkProperties(["webkit", "ms", "moz", "o"], "animation");
export const KEYFRAMES = ANIMATION.replace("animation", "keyframes");
export const START_ANIMATION = "startAnimation";
