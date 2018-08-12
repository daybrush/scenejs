import Animator from "./Animator";
import Frame from "./Frame";
import {
	isUndefined,
	isObject,
	isString,
	isArray,
	isPercent,
	decamelize,
} from "./utils";
import Keyframes from "./Keyframes";
import {dotValue} from "./utils/dot";
import {KEYFRAMES, ANIMATION, START_ANIMATION, PREFIX} from "./consts";
import {toId, addClass, removeClass, hasClass, fromCSS} from "./utils/css";


function makeId() {
	for (;;) {
		const id = `${parseInt(Math.random() * 100000, 10)}`;
		const checkElement = document.querySelector(`[data-scene-id="${id}"]`);

		if (!checkElement) {
			return id;
		}
	}
}
function makeAnimationProperties(properties) {
	const cssArray = [];

	for (const name in properties) {
		cssArray.push(`${ANIMATION}-${decamelize(name)} : ${properties[name]};`);
	}
	return cssArray.join("");
}


/**
* manage Frame Keyframes and play keyframes.
* @extends Animator
*/
class SceneItem extends Animator {
	/**
	* Create a scene's item.
	* @param {Object} properties - properties
	* @example
let item = new Scene.SceneItem({
	0: {
		display: "none",
	},
	1: {
		display: "block",
		opacity: 0,
	},
	2: {
		opacity: 1,
	}
});
	*/
	constructor(properties, options) {
		super();
		this.keyframes = new Keyframes();
		this.load(properties, options);
	}
	/**
	* Specifies how many seconds an animation takes to complete one cycle
	* Specifies keyframes' lastTime
	*/
	getDuration() {
		return Math.max(this.state.duration, this.keyframes.getDuration());
	}
	setDuration(duration) {
		if (duration === 0) {
			return this;
		}
		const originalDuration = this.getDuration();

		if (originalDuration > 0) {
			this.keyframes.setDuration(duration, originalDuration);
		}
		super.setDuration(duration);
		return this;
	}
	/**
	* set the unique indicator of the item.
	* @param {String} id - the indicator of the item.
	* @example
const item = new SceneItem();

item.setId("item");
console.log(item.getId()); // item
	*/
	setId(id) {
		const elements = this._elements;

		this.state.id = id;
		const sceneId = toId(this.state.id);

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
	/**
	* Specifies the unique indicator of the item.
	* @example
const item = scene.newItem("item");
console.log(item.getId()); // item
	*/
	getId() {
		return this.state.id;
	}
	/**
	* set properties to the sceneItem at that time
	* @param {Number} time - time
	* @param {String|Object} role - property role or properties
	* @param {...String|Object} [properties] - property names or values
	* @return {SceneItem} An instance itself
	* @example
item.duration; // = item.keyframes.size()
	*/
	set(time, ...args) {
		if (isArray(time)) {
			time.forEach(t => {
				this.set(t, ...args);
			});
			return this;
		} else if (isObject(time)) {
			this.load(time);
			return this;
		} else if (args[0] instanceof SceneItem) {
			const item = args[0];

			item.keyframes.each((frame, frameTime) => {
				this.set(time + frameTime, frame.toObject());
			});
			return this;
		}
		const frame = this.getFrame(time) || this.newFrame(time);

		frame.set(...args);
		this.updateFrame(frame);
		return this;
	}
	/**
	* get properties of the sceneItem at that time
	* @param {Number} time - time
	* @param {...String|Object} args property's name or properties
	* @return {Number|String|Scene.PropertyObejct} property value
	* @example
item.duration; // = item.keyframes.size()
	*/
	get(time, ...args) {
		const frame = this.getFrame(time);

		return frame && frame.get(...args);
	}
	remove(time, ...args) {
		const frame = this.getFrame(time);

		frame && frame.remove(...args);
		return this;
	}
	animate(parentEasing, parent) {
		const iterationTime = this.getIterationTime();
		const easing = this.getEasing() || parentEasing;
		const frame = this.getNowFrame(iterationTime, easing);
		const currentTime = this.getTime();

		/**
		 * This event is fired when timeupdate and animate.
		 * @event SceneItem#animate
		 * @param {Number} param.currentTime The total time that the animator is running.
		 * @param {Number} param.time The iteration time during duration that the animator is running.
		 * @param {Frame} param.frame frame of that time.
		 */
		this.trigger("animate", {
			frame,
			currentTime,
			time: iterationTime,
		});

		parent && parent.trigger("animate", {
			frame,
			currentTime,
			target: this,
			time: iterationTime,
		});
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
	* Specifies an element to synchronize items' keyframes.
	* @param {string} selectors - Selectors to find elements in items.
	* @example
item.setSelector("#id.class");
	*/
	setSelector(selector) {
		this.options.selector = selector === true ? this.state.id :
			(selector || `[data-scene-id="${this.state.id}"]`);
		this.setElement(document.querySelectorAll(selector));
		return this;
	}
	/**
	* Specifies an element to synchronize item's keyframes.
	* @param {Element|Array|string} elements - elements to synchronize item's keyframes.
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
		const id = this.state.id;

		this._elements = (elements instanceof Element) ? [elements] : elements;
		this.setId((!id || id === "null") ? makeId() : id);
		return this;
	}
	/**
	* add css styles of items's element to the frame at that time.
	* @param {Array} properties - elements to synchronize item's keyframes.
	* @example
item.setElement(document.querySelector("#id.class"));
item.setCSS(0, ["opacity"]);
item.setCSS(0, ["opacity", "width", "height"]);
	*/
	setCSS(time, properties) {
		this.set(time, this.fromCSS(properties));
		return this;
	}
	/**
	* get css styles of items's element
	* @param {Array} properties - elements to synchronize item's keyframes.
	* @example
item.setElement(document.querySelector("#id.class"));
item.fromCSS(["opacity"]); // {opacity: 1}
item.fromCSS(["opacity", "width", "height"]); // {opacity: 1, width: "100px", height: "100px"}
	*/
	fromCSS(properties) {
		return fromCSS(this._elements, properties);
	}
	setTime(time, parentEasing, parent) {
		super.setTime(time);

		this.animate(parentEasing, parent);
		return this;
	}
	/**
	* update property names used in frames.
	* @return {SceneItem} An instance itself
	* @example
item.update();
	*/
	update() {
		this.keyframes.update();
		return this;
	}
	/**
	* update property names used in frame.
	* @param {Number} time - frame's time
	* @param {Frame} [frame] - frame of that time.
	* @return {SceneItem} An instance itself
	* @example
item.updateFrame(time, this.get(time));
	*/
	updateFrame(frame) {
		this.keyframes.updateFrame(frame);
		return this;
	}
	/**
	* create and add a frame to the sceneItem at that time
	* @param {Number} time - frame's time
	* @return {Frame} Created frame.
	* @example
item.newFrame(time);
	*/
	newFrame(time) {
		let frame = this.getFrame(time);

		if (frame) {
			return frame;
		}
		frame = new Frame();
		this.setFrame(time, frame);
		return frame;
	}
	/**
	* add a frame to the sceneItem at that time
	* @param {Number} time - frame's time
	* @return {SceneItem} An instance itself
	* @example
item.setFrame(time, frame);
	*/
	setFrame(time, frame) {
		this.keyframes.add(time, frame);
		this.keyframes.update();
		return this;
	}
	_getTime(time, options = {}) {
		const duration = options.duration || this.getDuration() || 100;

		if (isString(time)) {
			if (isPercent(time)) {
				!this.getDuration() && (this.state.duration = duration);
				return parseFloat(time) / 100 * duration;
			} else if (time === "from") {
				return 0;
			} else if (time === "to") {
				return duration;
			}
		}
		return parseFloat(time);
	}
	/**
	* get sceneItem's frame at that time
	* @param {Number} time - frame's time
	* @return {Frame} sceneItem's frame at that time
	* @example
const frame = item.getFrame(time);
	*/
	getFrame(time) {
		return this.keyframes.get(this._getTime(time));
	}
	/**
	* check if the item has a frame at that time
	* @param {Number} time - frame's time
	* @return {Boolean} true: the item has a frame // false: not
	* @example
if (item.hasFrame(10)) {
	// has
} else {
	// not
}
	*/
	hasFrame(time) {
		return this.keyframes.has(time);
	}
	/**
	* remove sceneItem's frame at that time
	* @param {Number} time - frame's time
	* @return {SceneItem} An instance itself
	* @example
item.removeFrame(time);
	*/
	removeFrame(time) {
		const keyframes = this.keyframes;

		keyframes.remove(time);
		keyframes.update();

		return this;
	}
	/**
	* Copy frame of the previous time at the next time.
	* @param {Number} fromTime - the previous time
	* @param {Number} toTime - the next time
	* @return {SceneItem} An instance itself
	* @example
// getFrame(0) equal getFrame(1)
item.copyFrame(0, 1);
	*/
	copyFrame(fromTime, toTime) {
		if (isObject(fromTime)) {
			for (const time in fromTime) {
				this.copyFrame(time, fromTime[time]);
			}
			return this;
		}
		const frame = this.getFrame(fromTime);

		if (!frame) {
			return this;
		}
		const copyFrame = frame.clone();

		this.setFrame(toTime, copyFrame);
		return this;
	}
	/**
	* merge frame of the previous time at the next time.
	* @param {Number} fromTime - the previous time
	* @param {Number} toTime - the next time
	* @return {SceneItem} An instance itself
	* @example
// getFrame(1) contains getFrame(0)
item.merge(0, 1);
	*/
	mergeFrame(fromTime, toTime) {
		if (isObject(fromTime)) {
			for (const time in fromTime) {
				this.mergeFrame(time, fromTime[time]);
			}
			return this;
		}
		const frame = this.getFrame(fromTime);

		if (!frame) {
			return this;
		}
		const toFrame = this.newFrame(toTime);

		toFrame.merge(frame);
		return this;
	}
	_getNowValue(time, left, right, properties, easing = this.state.easing) {
		const keyframes = this.keyframes;
		const times = keyframes.times;
		const length = times.length;

		let prevTime;
		let nextTime;
		let prevFrame;
		let nextFrame;

		for (let i = left; i >= 0; --i) {
			const frame = keyframes.get(times[i]);

			if (frame.has(...properties)) {
				prevTime = times[i];
				prevFrame = frame;
				break;
			}
		}
		for (let i = right; i < length; ++i) {
			const frame = keyframes.get(times[i]);

			if (frame.has(...properties)) {
				nextTime = times[i];
				nextFrame = frame;
				break;
			}
		}

		const prevValue = prevFrame && prevFrame.get(...properties);
		const nextValue = nextFrame && nextFrame.get(...properties);

		if (!prevFrame || isUndefined(prevValue)) {
			return nextValue;
		}
		if (!nextFrame || isUndefined(nextValue) || prevValue === nextValue) {
			return prevValue;
		}
		if (prevTime < 0) {
			prevTime = 0;
		}
		const easingFunction = this.state.easing || easing;

		return dotValue({
			time,
			prevTime,
			nextTime,
			prevValue,
			nextValue,
			easing: easingFunction,
		});
	}
	getNearTimeIndex(time) {
		const keyframes = this.keyframes;
		const times = keyframes.times;
		const length = times.length;

		for (let i = 0; i < length; ++i) {
			if (times[i] === time) {
				return {left: i, right: i};
			} else if (times[i] > time) {
				return {left: i === 0 ? 0 : i - 1, right: i};
			}
		}
		return {left: length - 1, right: length - 1};
	}
	/**
	* Get frame of the current time
	* @param {Number} time - the current time
	* @return {Frame} frame of the current time
	* @example
let item = new Scene.SceneItem({
	0: {
		display: "none",
	},
	1: {
		display: "block",
		opacity: 0,
	},
	2: {
		opacity: 1,
	}
});
// opacity: 0.7; display:"block";
const frame = item.getNowFrame(1.7);
	*/
	getNowFrame(time, easing) {
		const frame = new Frame();
		const names = this.keyframes.getNames();
		const {left, right} = this.getNearTimeIndex(time);

		names.forEach(properties => {
			const value = this._getNowValue(time, left, right, properties, easing);

			if (isUndefined(value)) {
				return;
			}
			frame.set(...properties, value);
		});
		return frame;
	}
	/**
	* load properties
	* @param {Object} properties - properties
	* @example
item.load({
	0: {
		display: "none",
	},
	1: {
		display: "block",
		opacity: 0,
	},
	2: {
		opacity: 1,
	}
});
	*/
	load(properties = {}, options = properties.options) {
		if (isArray(properties)) {
			const length = properties.length;

			for (let i = 0; i < length; ++i) {
				const time = length === 1 ? 0 : this._getTime(`${i / (length - 1) * 100}%`, options);

				this.set(time, properties[i]);
			}
			return this;
		} else if (properties.keyframes) {
			this.set(properties.keyframes);
		} else {
			for (const time in properties) {
				if (time === "options" || time === "keyframes") {
					continue;
				}
				const value = properties[time];
				const realTime = this._getTime(time);

				if (typeof value === "number") {
					this.mergeFrame(value, realTime);
					continue;
				}
				this.set(realTime, value);
			}
		}
		options && this.setOptions(options);
		return this;
	}
	/**
	* clone SceneItem.
	* @return {Scene.SceneItem} An instance of clone
	* @example
	item.clone();
	*/
	clone(options = {}) {
		const item = new this.constructor();

		item.setOptions(this.state);
		item.setOptions(options);
		this.keyframes.each((frame, time) => item.setFrame(time, frame.clone()));
	

		return item;
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
			this.setSelector(this.state.id);
		} else {
			this.setSelector(selector);
		}
		return this;
	}
	_times() {
		const duration = this.getDuration();
		const times = this.keyframes.times;
		const length = times.length;
		const direction = this.state.direction;
		const keyframes = [];
		let iterationCount = this.state.iterationCount;

		iterationCount = iterationCount !== "infinite" ? iterationCount : 1;

		if (!length) {
			return keyframes;
		}
		for (let i = 0; i < iterationCount; ++i) {
			const isReverse = direction === "reverse" || direction === (i % 2 ? "alternate-reverse" : "alternate");
			const start = i * duration;

			for (let j = 0; j < length; ++j) {
				keyframes.push(start + (isReverse ? times[length - 1 - j] : times[j]));
				// normal 0: 0 => 1: 1 => 1.00001: 0 => 2: 1
				// alternate 0: 0 => 1: 1 => 0: 0 => 1: 1
			}
		}
		return keyframes;

	}
	_toKeyframes(duration = this.getDuration(), options = {}) {
		const id = this.state.id || this.setId(makeId()).state.id;

		if (!id) {
			return "";
		}
		const itemDuration = this.getDuration();
		const times = this.keyframes.times.slice();
		const playSpeed = this.state.playSpeed;
		const isParent = typeof options.iterationCount !== "undefined";
		const delay = (isParent && this.state.delay) || 0;
		const direction = isParent && this.state.direction;
		const keyframes = [];
		let iterationCount = this.state.iterationCount;

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

				if (percentage > 100) {
					break;
				}
				percentage === 100 && (percent100 = true);
				if (i !== 0 && j === 0) {
					if (!shuttle) {
						// not alternate and iterationCount > 1
						keyframes.push(`${percentage + 0.0001}%{${frame}}`);
					}
				} else {
					keyframes.push(`${percentage}%{${frame}}`);
				}
			}
			if (i + 1 >= iterationCount && !percent100) {
				const remain = iterationCount % 1;
				const cssText = remain ?
					this.getNowFrame(itemDuration * (reverse ? 1 - remain : remain)).toCSS() :
					frames[reverse ? 0 : length - 1];

				remain && keyframes.push(`${iterationCount * itemDuration / playSpeed / duration * 100}%{${cssText}}`);
				keyframes.push(`100%{${cssText}}`);
			}
		}
		return `@${KEYFRAMES} ${PREFIX}KEYFRAMES_${toId(id)}{
			${keyframes.join("\n")}
		}`;
	}
	/**
	* Specifies an css text that coverted the keyframes of the item.
	* @param {Array} [duration=this.getDuration()] - elements to synchronize item's keyframes.
	* @param {Array} [options={}] - parent options to unify options of items.
	* @example
item.setCSS(0, ["opacity"]);
item.setCSS(0, ["opacity", "width", "height"]);
	*/
	toCSS(duration = this.getDuration(), options = {}) {
		const id = this.state.id || this.setId(makeId()).state.id;

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


		const cssText = makeAnimationProperties({
			fillMode,
			direction,
			delay: `${delay}s`,
			name: `${PREFIX}KEYFRAMES_${toId(id)}`,
			duration: `${duration / playSpeed}s`,
			easing: easingName,
			iterationCount: count,
		});

		const css = `${selector}.${START_ANIMATION} {
			${cssText}
		}
		${this._toKeyframes(duration, options)}`;

		return css;
	}
	exportCSS(duration = this.getDuration(), options = {}) {
		const id = toId(this.state.id || this.setId(makeId()).state.id || "");

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
	* Play using the css animation and keyframes.
	* @param {boolean} [exportCSS=true] Check if you want to export css.
	* @param {Object} [properties={}] The shorthand properties for six of the animation properties.
	* @param {Object} [properties.duration] The duration property defines how long an animation should take to complete one cycle.
	* @param {Object} [properties.fillMode] The fillMode property specifies a style for the element when the animation is not playing (before it starts, after it ends, or both).
	* @param {Object} [properties.iterationCount] The iterationCount property specifies the number of times an animation should be played.
	* @param {String} [properties.easing] The easing(timing-function) specifies the speed curve of an animation.
	* @param {Object} [properties.delay] The delay property specifies a delay for the start of an animation.
	* @param {Object} [properties.direction] The direction property defines whether an animation should be played forwards, backwards or in alternate cycles.
	* @see {@link https://www.w3schools.com/cssref/css3_pr_animation.asp}
	* @example
item.playCSS();
item.playCSS(false, {
	direction: "reverse",
	fillMode: "forwards",
});
	*/
	playCSS(exportCSS = true, properties = {}) {
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
		const cssText = makeAnimationProperties(properties);

		for (let i = 0; i < length; ++i) {
			const element = elements[i];

			element.style.cssText += cssText;
			if (hasClass(element, START_ANIMATION)) {
				removeClass(element, START_ANIMATION);
				(el => {
					requestAnimationFrame(() => {
						requestAnimationFrame(() => {
							addClass(el, START_ANIMATION);
						});
					});
				})(element);
			} else {
				addClass(element, START_ANIMATION);
			}
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
