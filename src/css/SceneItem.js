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
	const cssText = frame.cssText;

	if (this.options.cssText === cssText) {
		return;
	}
	this.options.cssText = cssText;
	const length = element.length;

	for (let i = 0; i < length; ++i) {
		element[i].style.cssText = cssText;
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
	return -1;
}

/**
* manage CSSFrame
* @extends SceneItem
*/
class CSSItem extends SceneItem {
	constructor(properties) {
		super(properties);

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
		let id = this.id;

		this.options.element = (element instanceof Element) ? [element] : element;
		this.setId((!id || id === "null") ? makeId() : id);
		return this;
	}
	/**
	* adds css style of items's element to the frame at that time.
	* @param {Number} time - frame's time
	* @example
// html
// <div id="item1" style="opacity:0.5;display:none;border-left:10px solid black;">
const item = new Scene.SceneItem();

item.selector = "#item1";
item.copyCSSStyle(0);

const frame = item.getFrame(0);
frame.getProperty("opacity"); // 0.5
frame.getProperty("display"); // "none"
frame.getProperty("border-left").toValue(); // "10px solid black"
	*/
	copyCSSStyle(time) {
		let element = this.element;

		if (element instanceof NodeList) {
			element = element[0];
		}
		if (!element) {
			return this;
		}
		const cssText = element.style.cssText;
		const cssArray = cssText.split(";");
		const length = cssArray.length;
		const cssObject = {};
		let i;
		let matches;

		for (i = 0; i < length; ++i) {
			matches = /([^:]*):([\S\s]*)/g.exec(cssArray[i]);
			if (!matches || matches.length < 3) {
				continue;
			}
			cssObject[matches[1]] = matches[2];
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
		const element = this.element && this.element[0]

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

		if (!selector) {
			return this;
		}
		if (selector === true) {
			this.setSelector(this.options.id);
		} else {
			this.setSelector(selector);
		}
		return this;
	}
	toKeyframes(duration = this.duration, options = {}) {
		const id = this.options.id || this.setId(makeId()).options.id;

		if (!id) {
			return;
		}
		const itemDuration = this.duration;
		const ratio = itemDuration / duration;
		const times = this.timeline.times;

		const keyframes = times.map(time => {
			const frame = this.getFrame(time);

			return `${time / itemDuration * ratio * 100}%{${frame.toCSS()}}`;
		});

		if (ratio < 1) {
			keyframes.push(`100%{${this.getFrame(itemDuration).toCSS()}}`);
		}
		return `@keyframes ${PREFIX}KEYFRAMES_${toId(id)}{${keyframes.join("")}}`;
	}
	toCSS(duration = this.duration, options = {}) {
		const id = this.options.id || this.setId(makeId()).options.id;

		if (!id) {
			return "";
		}
		const selector = this.options.selector;
		const easing = options.easingName || this.options.easingName;
		const fillMode = options.fillMode || this.options.fillMode;
		const count = options.iterationCount || this.options.iterationCount;
		const cssArray = [];

		convertCrossBrowserCSSArray(cssArray, "animation", `${PREFIX}KEYFRAMES_${toId(id)} ${duration} ${easing}`);
		convertCrossBrowserCSSArray(cssArray, "animation-fill-mode", fillMode);
		convertCrossBrowserCSSArray(cssArray, "animation-iteration-count", count);

		const css = `${selector}.startAnimation {${cssArray.join("")}}
			${this.toKeyframes()}`;

		return css;
	}
	exportCSS(duration = this.duration, options = {}) {
		const id = toId(this.options.id || this.setId(makeId()).options.id || "");

		if (!id) {
			return;
		}
		const styleElement = document.querySelector(`#${PREFIX}${id}`);


		const css = this.toCSS();

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
