import Animator, { StateInterface, EasingType, isDirectionReverse } from "./Animator";
import Frame from "./Frame";
import {
	isUndefined,
	isObject,
	isString,
	isArray,
	decamelize,
	splitUnit,
	toFixed,
} from "./utils";
import Keyframes from "./Keyframes";
import {dotValue} from "./utils/dot";
import {
	KEYFRAMES, ANIMATION, START_ANIMATION, PREFIX, THRESHOLD, ObjectInterface, NameType
} from "./consts";
import {addClass, removeClass, hasClass, fromCSS} from "./utils/css";

function toId(text: string) {
	return text.match(/[0-9a-zA-Z]+/g).join("");
}
function makeId(selector?: boolean) {
	for (;;) {
		const id = `${Math.floor(Math.random() * 100000)}`;

		if (!selector) {
			return id;
		}
		const checkElement = document.querySelector(`[data-scene-id="${id}"]`);

		if (!checkElement) {
			return id;
		}
	}
}
function makeAnimationProperties(properties: ObjectInterface<string | number>) {
	const cssArray = [];

	for (const name in properties) {
		cssArray.push(`${ANIMATION}-${decamelize(name)} : ${properties[name]};`);
	}
	return cssArray.join("");
}

type ElementsType = HTMLElement[] | NodeListOf<HTMLElement>;
/**
* manage Frame Keyframes and play keyframes.
* @class Scene.SceneItem
* @param {Object} [properties] - properties
* @param {AnimatorOptions} [options] - options
* @extends Scene.Animator
* @example
const item = new Scene.SceneItem({
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
class SceneItem extends Animator {
	public keyframes: Keyframes;
	private elements: ElementsType;
	constructor(properties?: ObjectInterface<any>, options?: ObjectInterface<any>) {
		super();
		this.keyframes = new Keyframes();
		this.load(properties, options);
	}
	public getDuration() {
		return Math.max(this.state.duration, this.keyframes.getDuration());
	}
	public setDuration(duration: number) {
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
	* @method Scene.SceneItem#setId
	* @param {String} [id] - the indicator of the item.
	* @return {Scene.SceneItem} An instance itself
	* @example
const item = new SceneItem();

item.setId("item");
console.log(item.getId()); // item
	*/
	public setId(id?: string) {
		const elements = this.elements;
		const length = elements && elements.length;

		this.setState({id: id || makeId(!!length)});
		const sceneId = toId(this.state.id);

		this.options.selector || (this.options.selector = `[data-scene-id="${sceneId}"]`);

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
	* @method Scene.SceneItem#getId
	* @return {String} the indicator of the item.
	* @example
const item = scene.newItem("item");
console.log(item.getId()); // item
	*/
	public getId() {
		return this.state.id;
	}
	/**
	* Set properties to the sceneItem at that time
	* @method Scene.SceneItem#set
	* @param {Number} time - time
	* @param {...String|Object} [properties] - property names or values
	* @return {Scene.SceneItem} An instance itself
	* @example
item.set(0, "a", "b") // item.getFrame(0).set("a", "b")
console.log(item.get(0, "a")); // "b"
	*/
	public set(time: any[] | number | string | ObjectInterface<any>, ...args: any[]) {
		if (isArray(time)) {
			(time as number[]).forEach(t => {
				this.set(t, ...args);
			});
			return this;
		} else if (isObject(time)) {
			this.load(time);
			return this;
		} else if (args[0] && args[0] instanceof SceneItem) {
			const realTime = this._getTime(time);
			const item: SceneItem = args[0];
			const isFrame = this.hasFrame(time);
			const {keys, values, times} = item.getAllTimes(!isFrame);
			const frames: ObjectInterface<Frame> = {};

			times.forEach(t => {
				frames[t] = item.getNowFrame(t);
			});
			keys.forEach(t => {
				this.set(realTime + t, frames[values[t]]);
			});
			return this;
		}
		const frame = this.newFrame(this._getTime(time));

		frame.set(...args);
		this.updateFrame(frame);
		return this;
	}
	/**
	* Get properties of the sceneItem at that time
	* @param {Number} time - time
	* @param {...String|Object} args property's name or properties
	* @return {Number|String|Scene.PropertyObejct} property value
	* @example
item.get(0, "a"); // item.getFrame(0).get("a");
item.get(0, "transform", "translate"); // item.getFrame(0).get("transform", "translate");
	*/
	public get(time: number, ...args: NameType[]) {
		const frame = this.getFrame(time);

		return frame && frame.get(...args);
	}
	/**
	* remove properties to the sceneItem at that time
	* @method Scene.SceneItem#remove
	* @param {Number} time - time
	* @param {...String|Object} [properties] - property names or values
	* @return {Scene.SceneItem} An instance itself
	* @example
item.remove(0, "a");
	*/
	public remove(time: number, ...args: NameType[]) {
		const frame = this.getFrame(time);

		frame && frame.remove(...args);
		return this;
	}
	public append(item: SceneItem) {
		this.set(this.getDuration(), item);
	}
	/**
	* Specifies an element to synchronize items' keyframes.
	* @method Scene.SceneItem#setSelector
	* @param {string} selectors - Selectors to find elements in items.
	* @return {Scene.SceneItem} An instance itself
	* @example
item.setSelector("#id.class");
	*/
	public setSelector(selector: boolean | string) {
		this.options.selector = selector === true ? this.state.id :
			(selector || `[data-scene-id="${this.state.id}"]`);
		this.setElement(document.querySelectorAll(this.options.selector));
		return this;
	}
	/**
	* Specifies an element to synchronize item's keyframes.
	* @method Scene.SceneItem#setElement
	* @param {Element|Array|string} elements - elements to synchronize item's keyframes.
	* @return {Scene.SceneItem} An instance itself
	* @example
item.setElement(document.querySelector("#id.class"));
item.setElement(document.querySelectorAll(".class"));
	*/
	public setElement(elements: HTMLElement | ElementsType) {
		if (!elements) {
			return this;
		}
		if (typeof elements === "string") {
			return this.setSelector(elements);
		}
		this.elements = (elements instanceof Element) ? [elements] : elements;
		this.setId();
		return this;
	}
	/**
	* add css styles of items's element to the frame at that time.
	* @method Scene.SceneItem#setCSS
	* @param {Array} properties - elements to synchronize item's keyframes.
	* @return {Scene.SceneItem} An instance itself
	* @example
item.setElement(document.querySelector("#id.class"));
item.setCSS(0, ["opacity"]);
item.setCSS(0, ["opacity", "width", "height"]);
	*/
	public setCSS(time: number, properties: string[]) {
		this.set(time, this.fromCSS(properties));
		return this;
	}
	/**
	* get css styles of items's element
	* @method Scene.SceneItem#fromCSS
	* @param {Array} properties - elements to synchronize item's keyframes.
	* @return {Scene.SceneItem} An instance itself
	* @example
item.setElement(document.querySelector("#id.class"));
item.fromCSS(["opacity"]); // {opacity: 1}
item.fromCSS(["opacity", "width", "height"]); // {opacity: 1, width: "100px", height: "100px"}
	*/
	public fromCSS(properties: string[]) {
		return fromCSS(this.elements, properties);
	}
	public setTime(time: number, parentEasing?: EasingType, parent?: any) {
		super.setTime(time);

		this.animate(parentEasing, parent);
		return this;
	}
	/**
	* update property names used in frames.
	* @method Scene.SceneItem#update
	* @return {Scene.SceneItem} An instance itself
	* @example
item.update();
	*/
	public update() {
		this.keyframes.update();
		return this;
	}
	/**
	* update property names used in frame.
	* @method Scene.SceneItem#updateFrame
	* @param {Scene.Frame} [frame] - frame of that time.
	* @return {Scene.SceneItem} An instance itself
	* @example
item.updateFrame(time, this.get(time));
	*/
	public updateFrame(frame: Frame) {
		this.keyframes.updateFrame(frame);
		return this;
	}
	/**
	* Create and add a frame to the sceneItem at that time
	* @method Scene.SceneItem#newFrame
	* @param {Number} time - frame's time
	* @return {Scene.Frame} Created frame.
	* @example
item.newFrame(time);
	*/
	public newFrame(time: string | number) {
		let frame = this.getFrame(time);

		if (frame) {
			return frame;
		}
		frame = new Frame();
		this.setFrame(time, frame);
		return frame;
	}
	/**
	* Add a frame to the sceneItem at that time
	* @method Scene.SceneItem#setFrame
	* @param {Number} time - frame's time
	* @return {Scene.SceneItem} An instance itself
	* @example
item.setFrame(time, frame);
	*/
	public setFrame(time: string | number, frame: Frame) {
		this.keyframes.add(this._getTime(time), frame);
		this.keyframes.update();
		return this;
	}
	/**
	* get sceneItem's frame at that time
	* @method Scene.SceneItem#getFrame
	* @param {Number} time - frame's time
	* @return {Scene.Frame} sceneItem's frame at that time
	* @example
const frame = item.getFrame(time);
	*/
	public getFrame(time: number | string) {
		return this.keyframes.get(this._getTime(time));
	}
	/**
	* check if the item has a frame at that time
	* @method Scene.SceneItem#hasFrame
	* @param {Number} time - frame's time
	* @return {Boolean} true: the item has a frame // false: not
	* @example
if (item.hasFrame(10)) {
	// has
} else {
	// not
}
	*/
	public hasFrame(time: number | string) {
		return this.keyframes.has(this._getTime(time));
	}
	/**
	* remove sceneItem's frame at that time
	* @method Scene.SceneItem#removeFrame
	* @param {Number} time - frame's time
	* @return {Scene.SceneItem} An instance itself
	* @example
item.removeFrame(time);
	*/
	public removeFrame(time: number) {
		const keyframes = this.keyframes;

		keyframes.remove(time);
		keyframes.update();

		return this;
	}
	/**
	* Copy frame of the previous time at the next time.
	* @method Scene.SceneItem#copyFrame
	* @param {number|string|object} fromTime - the previous time
	* @param {number} toTime - the next time
	* @return {Scene.SceneItem} An instance itself
	* @example
// getFrame(0) equal getFrame(1)
item.copyFrame(0, 1);
	*/
	public copyFrame(fromTime: ObjectInterface<number> | number | string, toTime: number) {
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
	* @method Scene.SceneItem#mergeFrame
	* @param {number|string|object} fromTime - the previous time
	* @param {number|string} toTime - the next time
	* @return {Scene.SceneItem} An instance itself
	* @example
// getFrame(1) contains getFrame(0)
item.merge(0, 1);
	*/
	public mergeFrame(fromTime: ObjectInterface<number> | number | string, toTime: number | string) {
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
	/**
	* Get frame of the current time
	* @method Scene.SceneItem#getNowFrame
	* @param {Number} time - the current time
	* @param {function} easing - the speed curve of an animation
	* @return {Scene.Frame} frame of the current time
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
	public getNowFrame(time: number, easing?: EasingType) {
		const frame = new Frame();
		const names = this.keyframes.getNames();
		const {left, right} = this._getNearTimeIndex(time);

		names.forEach(properties => {
			const value = this._getNowValue(time, left, right, properties, easing);

			if (isUndefined(value)) {
				return;
			}
			frame.set(properties, value);
		});
		return frame;
	}
	public load(properties: any = {}, options = properties.options) {
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
	 * @method Scene.SceneItem#clone
	 * @param {AnimatorOptions} [options] animator options
	 * @return {Scene.SceneItem} An instance of clone
	 * @example
	 * item.clone();
	 */
	public clone(options = {}) {
		const item = new SceneItem();

		item.setOptions(this.state);
		item.setOptions(options);
		this.keyframes.forEach((frame: Frame, time: number) => item.setFrame(time, frame.clone()));
		return item;
	}
	public setOptions(options: StateInterface = {}) {
		super.setOptions(options);
		const selector = options.selector;
		const elements = options.elements || options.element;

		if ("id" in options) {
			this.setId(options.id);
		}
		if (elements) {
			this.setElement(elements);
		} else if (selector) {
			this.setSelector(selector === true ? this.state.id : selector);
		}
		return this;
	}
	public getAllTimes(isStartZero = true, options: StateInterface = {}) {
		const times = this.keyframes.times.slice();
		let length = times.length;
		const keys: number[] = [];
		const values: ObjectInterface<number> = {};

		if (!length) {
			return {keys: [], values: {}, times: []};
		}
		const keytimes: number[] = [];
		const duration = this.getDuration();
		const direction = options.direction || this.state.direction;
		const isShuffle = direction === "alternate" || direction === "alternate-reverse";
		(!this.getFrame(0)) && times.unshift(0);
		(!this.getFrame(duration)) && times.push(duration);
		length = times.length;
		let iterationCount = options.iterationCount || this.state.iterationCount;

		iterationCount = iterationCount !== "infinite" ? iterationCount : 1;
		const totalDuration = iterationCount * duration;

		for (let i = 0; i < iterationCount; ++i) {
			const isReverse = isDirectionReverse(i, direction);
			const start = i * duration;

			for (let j = 0; j < length; ++j) {
				if (isShuffle && i !== 0 && j === 0) {
					// pass duplicate
					continue;
				}
				// isStartZero is keytimes[0] is 0 (i === 0 & j === 0)
				const threshold = j === 0 && (i === 0 ? !isStartZero : !isShuffle) ? THRESHOLD : 0;
				const keyvalue = isReverse ? times[length - 1 - j] : times[j];
				const time = toFixed(isReverse ? duration - keyvalue : keyvalue);
				const keytime = toFixed(start + time + threshold);

				if (totalDuration < keytime) {
					break;
				}
				keys.push(keytime);
				values[keytime] = keyvalue;
				(keytimes.indexOf(keyvalue) === -1) && keytimes.push(keyvalue);
			}
		}
		if (keys[keys.length - 1] < totalDuration) {
			// last time === totalDuration
			const isReverse = isDirectionReverse(iterationCount, direction);
			const keyvalue = toFixed(duration * (isReverse ? 1 - iterationCount % 1 : iterationCount % 1));

			keys.push(totalDuration);
			values[totalDuration] = keyvalue;
			(keytimes.indexOf(keyvalue) === -1) && keytimes.push(keyvalue);
		}
		return {keys, values, times: keytimes};
	}
	/**
	* Specifies an css text that coverted the keyframes of the item.
	* @param {Array} [duration=this.getDuration()] - elements to synchronize item's keyframes.
	* @param {Array} [options={}] - parent options to unify options of items.
	* @example
item.setCSS(0, ["opacity"]);
item.setCSS(0, ["opacity", "width", "height"]);
	*/
	public toCSS(duration = this.getDuration(), options: StateInterface = {}) {
		const state = this.state;
		const id = state.id || this.setId().state.id;

		if (!id) {
			return "";
		}

		const isZeroDuration = duration === 0;
		const selector = this.options.selector;
		const playSpeed = (options.playSpeed || 1);
		const delay = ((typeof options.delay === "undefined" ? state.delay : options.delay) || 0) / playSpeed;
		const easingName = (!isZeroDuration && options.easing && options.easingName) || state.easingName;
		const count = (!isZeroDuration && options.iterationCount) || state.iterationCount;
		const fillMode = (options.fillMode !== "forwards" && options.fillMode) || state.fillMode;
		const direction = (options.direction !== "normal" && options.direction) || state.direction;
		const cssText = makeAnimationProperties({
			fillMode,
			direction,
			delay: `${delay}s`,
			name: `${PREFIX}KEYFRAMES_${toId(id)}`,
			duration: `${duration / playSpeed}s`,
			timingFunction: easingName,
			iterationCount: count,
		});

		const css = `${selector}.${START_ANIMATION} {
			${cssText}
		}
		${this._toKeyframes(duration, options)}`;

		return css;
	}
	public exportCSS(duration = this.getDuration(), options = {}) {
		const id = toId(this.state.id || this.setId().state.id || "");

		if (!id) {
			return;
		}
		const styleElement: HTMLElement = document.querySelector(`#${PREFIX}${id}`);
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
	public playCSS(exportCSS = true, properties = {}) {
		if (!ANIMATION || this.getPlayState() === "running") {
			return this;
		}
		const elements = this.elements;

		if (!elements || !elements.length) {
			return this;
		}
		if (this.isEnded()) {
			this.setTime(0);
		}
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

		this.setState({playCSS: true});
		this.setPlayState("running");
		this.trigger("play");

		const duration = this.getDuration();
		const animatedElement = elements[0];
		const animationend = () => {
			this.end();

			if (!animatedElement) {
				return;
			}
			animatedElement.removeEventListener("animationend", animationend);
			animatedElement.removeEventListener("animationiteration", animationiteration);
		};
		const animationiteration = ({elapsedTime}: any) => {
			const currentTime = elapsedTime;
			const iterationCount = currentTime / duration;

			this.state.currentTime = currentTime;
			this.setCurrentIterationCount(iterationCount);
		};
		animatedElement.addEventListener("animationend", animationend);
		animatedElement.addEventListener("animationiteration", animationiteration);
		return this;
	}
	protected animate(parentEasing: EasingType, parent: any) {
		const iterationTime = this.getIterationTime();
		const easing = this.getEasing() || parentEasing;
		const frame = this.getNowFrame(iterationTime, easing);
		const currentTime = this.getTime();

		/**
		 * This event is fired when timeupdate and animate.
		 * @event Scene.SceneItem#animate
		 * @param {Number} param.currentTime The total time that the animator is running.
		 * @param {Number} param.time The iteration time during duration that the animator is running.
		 * @param {Scene.Frame} param.frame frame of that time.
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
		const elements = this.elements;

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
	private _getTime(time: string | number, options?: StateInterface) {
		const duration = (options && options.duration) || this.getDuration() || 100;

		if (isString(time)) {
			if (time === "from") {
				return 0;
			} else if (time === "to") {
				return duration;
			}
			const {unit, value} = splitUnit(time);

			if (unit === "%") {
				!this.getDuration() && (this.state.duration = duration);
				return parseFloat(time) / 100 * duration;
			} else if (unit === ">") {
				return value + THRESHOLD;
			} else {
				return value;
			}
		} else {
			return time;
		}
	}
	private _toKeyframes(duration = this.getDuration(), options: StateInterface = {}) {
		const id = this.state.id || this.setId().state.id;

		if (!id) {
			return "";
		}
		const playSpeed = this.state.playSpeed;
		const isParent = typeof options.iterationCount !== "undefined";
		const iterationCount =  this.state.iterationCount;
		const delay = isParent ? this.state.delay : 0;
		const direction = isParent ? this.state.direction : "normal";
		const frames: ObjectInterface<string> = {};
		const {keys, values, times} = this.getAllTimes(true, {
			duration,
			delay,
			direction,
			iterationCount: isParent && iterationCount !== "infinite" ? iterationCount : 1,
		});
		const length = keys.length;
		const keyframes: string[] = [];

		if (!keys.length) {
			return "";
		}
		times.forEach(time => {
			frames[time] = this.getNowFrame(time).toCSS();
		});
		if (delay) {
			keyframes.push(`0%{${frames[0]}}`);
			if (direction === "reverse" || direction === "alternate-reverse") {
				keyframes.push(`${delay / playSpeed / duration * 100 - 0.00001}%{${frames[0]}}`);
			}
		}
		keys.forEach(time => {
			keyframes.push(`${(delay + time)  / playSpeed / duration * 100}%{${frames[values[time]]}}`);
		});
		const lastTime = keys[length - 1];

		if ((delay + lastTime) / playSpeed < duration) {
			// not 100%
			keyframes.push(`100%{${frames[values[lastTime]]}`);
		}
		return `@${KEYFRAMES} ${PREFIX}KEYFRAMES_${toId(id)}{
			${keyframes.join("\n")}
		}`;
	}
	private _getNowValue(
		time: number,
		left: number,
		right: number,
		properties: string[],
		easing: EasingType = this.state.easing,
	) {
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

		return dotValue(time, prevTime,	nextTime, prevValue, nextValue,	easingFunction);
	}
	private _getNearTimeIndex(time: number) {
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

}

export default SceneItem;
