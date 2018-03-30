
const checkProperties = function(prefixes, property) {
	const styles = (document.body || document.documentElement).style;
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
