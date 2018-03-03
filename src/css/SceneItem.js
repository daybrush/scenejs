import SceneItem from "../SceneItem";
import {PREFIX} from "../consts";
import {defineGetter, isObject, isUndefined} from "../utils";
import {convertCrossBrowserCSSArray, toId} from "./utils";
import Frame from "./Frame";

function animateFunction({time, frame}) {
	const element = this.options.element;

	if (!element) {
		return;
	}
	const cssText = frame.cssText();

	if (this.state.cssText === cssText) {
		return;
	}
	this.state.cssText = cssText;
	const length = element.length;

	for (let i = 0; i < length; ++i) {
		element[i].style.cssText += cssText;
	}
}
function makeId() {
	for (;;) {
		const id = `${parseInt(Math.random() * 100000, 10)}`;
		const checkElement = document.querySelector(`[data-scene-id="${id}"]`);

		if (!checkElement) {
			return id;
		}
	}
}

/**
* manage CSSFrame
* @extends SceneItem
*/
class CSSItem extends SceneItem {
	constructor(properties, options) {
		super(properties, options);

		this.on("animate", animateFunction);
	}
	newFrame(time) {
		let frame = this.getFrame(time);

		if (frame) {
			return frame;
		}
		frame = new Frame();
		if (!isUndefined(time)) {
			this.setFrame(time, frame);
		}
		return frame;
	}
	setId(id) {
		const element = this.element;

		super.setId(id);
		const sceneId = toId(this.options.id);

		this.options.selector || (this.options.selector = `[data-scene-id="${sceneId}"]`);

		if (!element) {
			return this;
		}
		const length = element.length;

		for (let i = 0; i < length; ++i) {
			element[i].setAttribute("data-scene-id", sceneId);
		}
		return this;
	}
	setSelector(selector) {
		this.options.selector = selector || `[data-scene-id="${this.options.id}"]`;
		this.setElement(document.querySelectorAll(selector));
		return this;
	}
	setElement(element) {
		if (!element) {
			return this;
		}
		const id = this.id;

		this.options.element = (element instanceof Element) ? [element] : element;
		this.setId((!id || id === "null") ? makeId() : id);
		return this;
	}
	setCSS(time, properties) {
		if (!properties || !properties.length) {
			return this;
		}
		const element = this.options.element && this.options.element[0];

		if (!element) {
			return this;
		}
		const cssObject = {};
		const styles = window.getComputedStyle(element);
		const length = properties.length;


		for (let i = 0; i < length; ++i) {
			cssObject[properties[i]] = styles[properties[i]];
		}
		this.set(time, cssObject);
		return this;
	}
	/**
	* adds css property of items's element to the frame at that time.
	* @param {Number} time - frame's time
	* @param {String} property - the name of property or the names of properties to copy.
	* @example
// css
// #item1 {display: inline-block; width: 100px; height: 100px;}

// html
// <div id="item1" style="opacity:0.5;border-left:10px solid black;"></div>

const item = new Scene.SceneItem();

item.selector = "#item1";
item.copyCSSProperty(0, "display");
item.copyCSSProperty(0, ["width", "opacity"]);

const frame = item.getFrame(0);

frame.getProperty("width"); // 100px;
frame.getProperty("display"); // "inline-block"
frame.getProperty("opacity"); // 0.5

	*/
	copyCSSProperty(time, property) {
		const element = this.element && this.element[0];

		if (!element) {
			return this;
		}
		const style = element.style;
		const cssObject = {};

		if (isObject(property)) {
			let name;

			for (let i = 0, length = property.length; i < length; ++i) {
				name = property[i];
				cssObject[property] = (style && style[name]) || window.getComputedStyle(element)[name];
			}
		} else {
			cssObject[property] = (style && style[property]) || window.getComputedStyle(element)[property];
		}
		this.set(time, cssObject);

		return this;
	}
	setOptions(options) {
		super.setOptions(options);
		const selector = options && options.selector;
		const element = options && options.element;

		if (!selector && !element) {
			return this;
		}
		if (element) {
			this.setElement(element);
		} if (selector === true) {
			this.setSelector(this.options.id);
		} else {
			this.setSelector(selector);
		}
		return this;
	}
	toKeyframes(duration = this.getDuration(), options = {}) {
		const id = this.options.id || this.setId(makeId()).options.id;

		if (!id) {
			return "";
		}
		const itemDuration = this.getDuration();
		const ratio = itemDuration / duration;
		const times = this.timeline.times;

		const keyframes = times.map(time => {
			const frame = this.getNowFrame(time, false);

			return `${time / itemDuration * ratio * 100}%{${frame.toCSS()}}`;
		});

		if (ratio < 1) {
			keyframes.push(`100%{${this.getNowFrame(itemDuration, false).toCSS()}}`);
		}
		return `@keyframes ${PREFIX}KEYFRAMES_${toId(id)}{
			${keyframes.join("\n")}
		}`;
	}
	toCSS(duration = this.getDuration(), options = {}) {
		const id = this.options.id || this.setId(makeId()).options.id;

		if (!id) {
			return "";
		}
		const selector = this.options.selector;
		const easing = options.easingName || this.state.easingName;
		const fillMode = options.fillMode || this.state.fillMode;
		const count = options.iterationCount || this.state.iterationCount;
		const cssArray = [];

		convertCrossBrowserCSSArray(cssArray, "animation-name", `${PREFIX}KEYFRAMES_${toId(id)}`);
		convertCrossBrowserCSSArray(cssArray, "animation-duration", `${duration}s`);
		convertCrossBrowserCSSArray(cssArray, "animation-timing-function", easing);
		convertCrossBrowserCSSArray(cssArray, "animation-fill-mode", fillMode);
		convertCrossBrowserCSSArray(cssArray, "animation-iteration-count", count);

		const css = `${selector}.startAnimation {
			${cssArray.join("")}
		}
		${this.toKeyframes()}`;

		return css;
	}
	exportCSS(duration = this.getDuration(), options = {}) {
		const id = toId(this.options.id || this.setId(makeId()).options.id || "");

		if (!id) {
			return;
		}
		const styleElement = document.querySelector(`#${PREFIX}${id}`);


		const css = this.toCSS(duration, options);

		if (styleElement) {
			styleElement.innerText = css;
		} else {
			document.body.insertAdjacentHTML("beforeend",
				`<style id="${PREFIX}STYLE_${id}">${css}</style>`);
		}
	}
}

/**
* Specifies an element to synchronize sceneItem's timeline.
* @memberof CSSItem
* @instance
* @name element
* @example
item.selector = ".scene .item li:first-child";

// same
item.element = document.querySelector(".scene .item li:first-child");
*/
defineGetter({target: CSSItem.prototype, name: "element", parent: "options"});

export default CSSItem;
