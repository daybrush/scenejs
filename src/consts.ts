import cubicBezier from "./cubicBezier";

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
export const ANIMATION_PLAY_STATE = ["idle", "pending", "paused", "running", "finished"];
export const FILL_MODE = ["none", "forwards", "backwards", "both", "auto"];
export const PLAY_DIRECTION = ["normal", "reverse", "alternate", "alternate-reverse"];
export const LINEAR = cubicBezier(0, 0, 1, 1);
export const EASE = cubicBezier(0.25, 0.1, 0.25, 1);
export const EASE_IN = cubicBezier(0.42, 0, 1, 1);
export const EASE_OUT = cubicBezier(0, 0, 0.58, 1);
export const EASE_IN_OUT = cubicBezier(0.42, 0, 0.58, 1);
export const THRESHOLD = 0.00001;

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

// export const TYPE_PROPERTY_OBJECT = "propertyobject";
// export const TYPE_ARRAY = "array";
// export const TYPE_TEXT = "text";
