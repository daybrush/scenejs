import SceneItem from "../SceneItem";
import {PREFIX} from "../consts";
import {isObject, isUndefined} from "../utils";
import {convertCrossBrowserCSSArray, toId} from "./utils";
import Frame from "./Frame";

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
		const elements = this._elements;

		super.setId(id);
		const sceneId = toId(this.options.id);

		this.options.selector || (this.options.selector = `[data-scene-id="${sceneId}"]`);

		if (!elements) {
			return this;
		}
		const length = elements.length;

		if (!length) {
			return this;
		}
		for (let i = 0; i < length; ++i) {
			elements[i].setAttribute("data-scene-id", sceneId);
		}
		return this;
	}
	animate(time, parentEasing) {
		const frame = super.animate(time, parentEasing);
		const elements = this._elements;

		if (!elements || !elements.length) {
			return frame;
		}
		const cssText = frame.toCSS();

		if (this.state.cssText === cssText) {
			return frame;
		}
		this.state.cssText = cssText;
		const length = elements.length;

		for (let i = 0; i < length; ++i) {
			elements[i].style.cssText += cssText;
		}
		return frame;
	}
	setSelector(selector) {
		this.options.selector = selector === true ? this.options.id :
			(selector || `[data-scene-id="${this.options.id}"]`);
		this.setElement(document.querySelectorAll(selector));
		return this;
	}
	setElement(elements) {
		if (!elements) {
			return this;
		}
		if (typeof elements === "string") {
			return this.setSelector(elements);
		}
		const id = this.id;

		this._elements = (elements instanceof Element) ? [elements] : elements;
		this.setId((!id || id === "null") ? makeId() : id);
		return this;
	}
	setCSS(time, properties) {
		if (!properties || !properties.length) {
			return this;
		}
		const elements = this._elements;

		if (!elements || !elements.length) {
			return this;
		}
		const cssObject = {};
		const styles = window.getComputedStyle(elements[0]);
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
		const elements = this._elements;

		if (!elements || !elements.length) {
			return this;
		}
		const style = elements[0].style;
		const cssObject = {};

		if (isObject(property)) {
			let name;

			for (let i = 0, length = property.length; i < length; ++i) {
				name = property[i];
				cssObject[property] = (style && style[name]) || window.getComputedStyle(elements[0])[name];
			}
		} else {
			cssObject[property] = (style && style[property]) ||
				window.getComputedStyle(elements[0])[property];
		}
		this.set(time, cssObject);

		return this;
	}
	setOptions(options) {
		super.setOptions(options);
		const selector = options && options.selector;
		const elements = this.options.elements || this.options.element;

		if (!selector && !elements) {
			return this;
		}
		if (elements) {
			this.setElement(elements);
		} if (selector === true) {
			this.setSelector(this.options.id);
		} else {
			this.setSelector(selector);
		}
		return this;
	}
	toKeyframes(duration = this.getDuration()) {
		const id = this.options.id || this.setId(makeId()).options.id;

		if (!id) {
			return "";
		}
		const itemDuration = this.getDuration();
		const times = this.timeline.times;
		const playSpeed = this.state.playSpeed;

		const keyframes = times.map(time => {
			const frame = this.getNowFrame(time, false);

			return `${time / playSpeed / duration * 100}%{${frame.toCSS()}}`;
		});

		if (itemDuration !== duration) {
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

		const isZeroDuration = duration === 0;
		const selector = this.options.selector;
		const playSpeed = (options.playSpeed || 1);
		const delay = ((options.delay || 0) + this.state.delay) / playSpeed;
		const easingName = (!isZeroDuration && options.easing && options.easingName) ||
			this.state.easingName;
		const count = (!isZeroDuration && options.iterationCount) || this.state.iterationCount;
		const fillMode = (options.fillMode !== "forwards" && options.fillMode) || this.state.fillMode;
		const direction = (options.direction !== "none" && options.direction) || this.state.direction;
		const cssArray = [];

		convertCrossBrowserCSSArray(cssArray, "animation-name", `${PREFIX}KEYFRAMES_${toId(id)}`);
		convertCrossBrowserCSSArray(cssArray, "animation-duration", `${duration / playSpeed}s`);
		convertCrossBrowserCSSArray(cssArray, "animation-delay", `${delay}s`);
		convertCrossBrowserCSSArray(cssArray, "animation-timing-function", easingName);
		convertCrossBrowserCSSArray(cssArray, "animation-fill-mode", fillMode);
		convertCrossBrowserCSSArray(cssArray, "animation-direction", direction);
		convertCrossBrowserCSSArray(cssArray, "animation-iteration-count", count);

		const css = `${selector}.startAnimation {
			${cssArray.join("")}
		}
		${this.toKeyframes(duration, options)}`;

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
	playCSS(exportCSS = true) {
		exportCSS && this.exportCSS();
		const elements = this._elements;

		if (!elements || !elements.length) {
			return this;
		}
		const length = elements.length;

		for (let i = 0; i < length; ++i) {
			elements[i].className += " startAnimation";
		}
		return this;
	}
}

/**
* Specifies an element to synchronize sceneItem's timeline.
* @memberof CSSItem
* @instance
* @name element
* @example
item.setSelector(".scene .item li:first-child");

// same
item.setElement(document.querySelector(".scene .item li:first-child"));
*/

export default CSSItem;
