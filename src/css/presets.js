import SceneItem from "./SceneItem";

function fade(target, isFadeIn, options) {
	const start = options.start || 0;
	const end = start + (options.duration || 1);
	const {from, to} = options;
	const isFrom = typeof from !== "undefined";
	let item = target;
	let opacity = -1;

	if (target instanceof Element) {
		item = new SceneItem();
		item.setElement(target);
	} else if (target instanceof SceneItem) {
		const isOpacity = target.timeline.hasName("property", "opacity");

		if (isFrom) {
			opacity = from;
		} else if (isOpacity) {
			opacity = target.getNowValue("property", "opacity", start);
		}
	} else {
		return null;
	}
	const element = target.getElement();

	if (opacity !== -1) {
		if (element && element.length) {
			opacity = target.fromCSS(["opacity"]).opacity;
		} else {
			opacity = isFadeIn ? 0 : 1;
		}
	}
	target.set(start, "opacity", isFrom ? from : opacity);
	target.set(end, "opacity", to || (isFadeIn ? 1 : 0));
	return item;
}
export function fadeOut(target, options = {}) {
	return fade(target, false, options);
}

export function fadeIn(target, options = {}) {
	return fade(target, true, options);
}
