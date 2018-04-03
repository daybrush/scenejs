import SceneItemWrapper from "../SceneItem";
import {PREFIX} from "../consts";
import {toId} from "./utils";
import Frame from "./Frame";
import {KEYFRAMES, ANIMATION} from "./consts";

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
* manage sceneItems and play Scene.
* @alias SceneItem
* @extends Animator
*/
class SceneItem extends SceneItemWrapper {
	newFrame(time) {
		let frame = this.getFrame(time);

		if (frame) {
			return frame;
		}
		frame = new Frame();
		if (typeof time !== "undefined") {
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
	/**
	* Specifies an element to synchronize items' timeline.
	* @param {string} selectors - Selectors to find elements in items.
	* @example
item.setSelector("#id.class");
	*/
	setSelector(selector) {
		this.options.selector = selector === true ? this.options.id :
			(selector || `[data-scene-id="${this.options.id}"]`);
		this.setElement(document.querySelectorAll(selector));
		return this;
	}
	/**
	* Specifies an element to synchronize item's timeline.
	* @param {Element|Array|string} elements - elements to synchronize item's timeline.
	* @example
item.setElement(document.querySelector("#id.class"));
item.setElement(document.querySelectorAll(".class"));
	*/
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
	/**
	* add css styles of items's element to the frame at that time.
	* @param {Array} properties - elements to synchronize item's timeline.
	* @example
item.setElement(document.querySelector("#id.class"));
item.setCSS(0, ["opacity"]);
item.setCSS(0, ["opacity", "width", "height"]);
	*/
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
	_toKeyframes(duration = this.getDuration(), options = {}) {
		const id = this.options.id || this.setId(makeId()).options.id;

		if (!id) {
			return "";
		}
		const itemDuration = this.getDuration();
		const times = this.timeline.times.slice();
		const playSpeed = this.state.playSpeed;
		const isParent = typeof options.iterationCount !== "undefined";
		const delay = (isParent && this.state.delay) || 0;
		const direction = isParent && this.state.direction;
		const keyframes = [];
		let iterationCount = Math.max(parseInt(this.state.iterationCount, 10), 1);

		(!this.getFrame(0)) && times.unshift(0);
		(!this.getFrame(itemDuration)) && times.push(itemDuration);
		const length = times.length;
		const frames = times.map(time => this.getNowFrame(time, false).toCSS());

		iterationCount = isParent && iterationCount !== "infinite" ? iterationCount : 1;

		let shuttle = false;
		let percent100 = false;

		if (direction === "alternate-reverse" || direction === "alternate") {
			shuttle = true;
		}
		if (delay) {
			keyframes.push(`0%{${frames[0]}}`);
			if (direction === "revsere" || direction === "alternate-reverse") {
				keyframes.push(`${delay / playSpeed / duration * 100 - 0.00001}%{${frames[0]}}`);
			}
		}
		for (let i = 0; i < iterationCount; ++i) {
			const isOdd = i % 2 === 0;
			const time = delay + i * itemDuration;
			let reverse = false;

			switch (direction) {
				case "reverse":
					reverse = true;
					break;
				case "alternate":
					if (!isOdd) {
						reverse = true;
					}
					break;
				case "alternate-reverse":
					if (isOdd) {
						reverse = true;
					}
					break;
				default:
			}
			for (let j = 0; j < length; ++j) {
				const iterationIndex = reverse ? length - 1 - j : j;
				const frame = frames[iterationIndex];
				const iterationTime = times[iterationIndex];
				const currentTime = time + (reverse ? itemDuration - iterationTime : iterationTime);
				const percentage = currentTime / playSpeed / duration * 100;

				percentage >= 100 && (percent100 = true);
				if (i !== 0 && j === 0) {
					if (shuttle) {
						continue;
					} else {
						keyframes.push(`${percentage + 0.0001}%{${frame}}`);
					}
				} else {
					keyframes.push(`${percentage}%{${frame}}`);
				}
			}
			if (i + 1 === iterationCount && !percent100) {
				keyframes.push(`100%{${frames[reverse ? 0 : length - 1]}}`);
			}
		}
		return `@${KEYFRAMES} ${PREFIX}KEYFRAMES_${toId(id)}{
			${keyframes.join("\n")}
		}`;
	}
	/**
	* Specifies an css text that coverted the timeline of the item.
	* @param {Array} [duration=this.getDuration()] - elements to synchronize item's timeline.
	* @param {Array} [options={}] - parent options to unify options of items.
	* @example
item.setCSS(0, ["opacity"]);
item.setCSS(0, ["opacity", "width", "height"]);
	*/
	toCSS(duration = this.getDuration(), options = {}) {
		const id = this.options.id || this.setId(makeId()).options.id;

		if (!id) {
			return "";
		}

		const isZeroDuration = duration === 0;
		const selector = this.options.selector;
		const playSpeed = (options.playSpeed || 1);
		const delay = ((typeof options.delay === "undefined" ? this.state.delay : options.delay) || 0) / playSpeed;
		const easingName = (!isZeroDuration && options.easing && options.easingName) ||
			this.state.easingName;
		const count = (!isZeroDuration && options.iterationCount) || this.state.iterationCount;
		const fillMode = (options.fillMode !== "forwards" && options.fillMode) || this.state.fillMode;
		const direction = (options.direction !== "none" && options.direction) || this.state.direction;
		const cssArray = [];

		cssArray.push(`${ANIMATION}-name: ${PREFIX}KEYFRAMES_${toId(id)};`);
		cssArray.push(`${ANIMATION}-duration: ${duration / playSpeed}s;`);
		cssArray.push(`${ANIMATION}-delay: ${delay}s;`);
		cssArray.push(`${ANIMATION}-timing-function: ${easingName};`);
		cssArray.push(`${ANIMATION}-fill-mode: ${fillMode};`);
		cssArray.push(`${ANIMATION}-direction: ${direction};`);
		cssArray.push(`${ANIMATION}-iteration-count: ${count};`);

		const css = `${selector}.startAnimation {
			${cssArray.join("")}
		}
		${this._toKeyframes(duration, options)}`;

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
	/**
	* play using the css animation and keyframes.
	* @param {boolean} [exportCSS=true] Check if you want to export css.
	* @example
scene.playCSS();
	*/
	playCSS(exportCSS = true) {
		if (!ANIMATION || this.getPlayState() === "running") {
			return this;
		}
		const elements = this._elements;

		if (!elements || !elements.length) {
			return this;
		}
		if (this.isEnded()) {
			this.setTime(0);
		}
		this.setPlayState("running");
		exportCSS && this.exportCSS();
		const length = elements.length;

		for (let i = 0; i < length; ++i) {
			elements[i].className += " startAnimation";
		}

		this.setPlayState("running");
		this.trigger("play");

		const duration = this.getDuration();

		this._animationend = e => {
			this.end();
		};
		this._animationiteration = e => {
			const currentTime = e.elapsedTime;
			const iterationCount = currentTime / duration;

			this.state.currentTime = currentTime;
			this.setCurrentIterationCount(iterationCount);
		};
		elements[0].addEventListener("animationend", this._animationend);
		elements[0].addEventListener("animationiteration", this._animationiteration);
		return this;
	}
	end() {
		super.end();
		const elements = this._elements;

		if (!elements || !elements.length || !this._animationend) {
			return this;
		}
		elements[0].removeEventListener("animationend", this._animationend);
		elements[0].removeEventListener("animationiteration", this._animationiteration);

		this._animationend = null;
		this._animationiteration = null;
		return this;
	}
}

export default SceneItem;
