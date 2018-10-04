import Animator, { StateInterface, EasingType, isDirectionReverse } from "./Animator";
import Frame from "./Frame";
import {
  isUndefined,
  isObject,
  isArray,
  decamelize,
  toFixed,
  isFixed,
} from "./utils";
import Keyframes from "./Keyframes";
import { dotValue } from "./utils/dot";
import {
  KEYFRAMES, ANIMATION, START_ANIMATION,
  PREFIX, THRESHOLD, ObjectInterface, NameType,
  TIMING_FUNCTION, ALTERNATE, ALTERNATE_REVERSE, NORMAL, INFINITE,
  REVERSE, EASING, RUNNING, PLAY, FILL_MODE, DIRECTION, ITERATION_COUNT, EASING_NAME, DELAY, PLAY_SPEED, DURATION
} from "./consts";
import { addClass, removeClass, hasClass, fromCSS } from "./utils/css";

function toId(text: string) {
  return text.match(/[0-9a-zA-Z]+/g).join("");
}
function makeId(selector?: boolean) {
  for (; ;) {
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
* @memberof Scene
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
  /**
	* @param {Object} [properties] - properties
	* @param {AnimatorOptions} [options] - options
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
  constructor(properties?: ObjectInterface<any>, options?: ObjectInterface<any>) {
    super();
    this.keyframes = new Keyframes();
    this.elements = [];
    this.load(properties, options);
  }
  public getDuration() {
    return Math.max(this.state[DURATION], this.keyframes.getDuration());
  }
  public setDuration(duration: number) {
    if (duration === 0) {
      return this;
    }
    const originalDuration = this.getDuration();

    if (originalDuration > 0) {
      this.keyframes.setDuration(duration, originalDuration);
    }
    super.setDuration(toFixed(duration));
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
    const length = elements.length;

    this.setState({ id: id || makeId(!!length) });
    const sceneId = toId(this.getId());

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
    if (isObject(time)) {
      this.load(time);
      return this;
    } else if (args[0]) {
      if (args[0] instanceof SceneItem) {
        const item: SceneItem = args[0];
        const delay = item.getDelay();
        const realTime = this.getUnitTime(time) + delay;
        const { keys, values, frames } = item.getAllTimes(!!delay || !this.hasFrame(time));
        const easing = this.getEasingName() !== item.getEasingName() ? item.getEasing() : 0;

        keys.forEach(t => {
          this.set(realTime + t, frames[values[t]]);
        });
        if (easing) {
          this.set(realTime + keys[0], EASING, easing);
          this.set(realTime + keys[keys.length - 1], EASING, "initial");
        }
        return this;
      } else if (args.length === 1 && isArray(args[0])) {
        args[0].forEach((item: any) => {
          this.set(time, item);
        });
        return this;
      }
    }
    const frame = this.newFrame(time);

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
	* @param {Number} time - time
	* @param {...String|Object} [properties] - property names or values
	* @return {Scene.SceneItem} An instance itself
	* @example
item.remove(0, "a");
	*/
  public remove(time: number, ...args: NameType[]) {
    const frame = this.getFrame(time);

    frame && frame.remove(...args);
    this.update();
    return this;
  }
  /**
	* Append the item or object at the last time.
	* @param {SceneItem | object} item - the scene item or item object
	* @return {Scene.SceneItem} An instance itself
	* @example
item.append(new SceneItem({
	0: {
		opacity: 0,
	},
	1: {
		opacity: 1,
	}
}));
item.append({
	0: {
		opacity: 0,
	},
	1: {
		opacity: 1,
	}
});
item.set(item.getDuration(), {
	0: {
		opacity: 0,
	},
	1: {
		opacity: 1,
	}
});
	*/
  public append(item: SceneItem | object) {
    this.set(this.getDuration(), item);
    return this;
  }
  /**
	* Push the front frames for the time and prepend the scene item or item object.
	* @param {SceneItem | object} item - the scene item or item object
	* @return {Scene.SceneItem} An instance itself
	*/
  public prepend(item: SceneItem | object) {
    if (item instanceof SceneItem) {
      const delay = item.getDelay();
      const duration = item.getIterationCount() === INFINITE ? item.getDuration() : item.getActiveDuration();
      const unshiftTime = duration + delay;
      const firstFrame = this.keyframes.get(0);

      if (firstFrame) {
        this.keyframes.remove(0);
      }
      this.keyframes.unshift(unshiftTime);
      this.set(0, item);
      this.set(unshiftTime + THRESHOLD, firstFrame);
    } else {
      this.prepend(new SceneItem(item));
    }
    return this;
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
    this.set(time, fromCSS(this.elements, properties));
    return this;
  }
  public animate(time: number, parentEasing?: EasingType) {
    super.setTime(time, true);
    return this._animate(parentEasing);
  }
  public setTime(time: number | string, isNumber?: boolean, parentEasing?: EasingType) {
    super.setTime(time, isNumber);
    this._animate(parentEasing);
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
    this.keyframes.add(this.getUnitTime(time), frame);
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
    return this.keyframes.get(this.getUnitTime(time));
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
    return this.keyframes.has(this.getUnitTime(time));
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
    const { left, right } = this._getNearTimeIndex(time);
    const realEasing = this._getEasing(time, left, right, this.getEasing() || easing);

    names.forEach(properties => {
      const value = this._getNowValue(time, left, right, properties, realEasing);

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
        const time = length === 1 ? 0 : this.getUnitTime(`${i / (length - 1) * 100}%`);

        this.set(time, properties[i]);
      }
    } else if (properties.keyframes) {
      this.set(properties.keyframes);
    } else {
      for (const time in properties) {
        if (time === "options" || time === "keyframes") {
          continue;
        }
        const value = properties[time];
        const realTime = this.getUnitTime(time);

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
    const { id, selector, duration, elements } = options;

    duration && this.setDuration(duration);
    id && this.setId(id);
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
      return { keys: [], values: {}, frames: {} };
    }
    const frames: ObjectInterface<Frame> = {};
    const duration = this.getDuration();
    const direction = options[DIRECTION] || this.state[DIRECTION];
    const isShuffle = direction === ALTERNATE || direction === ALTERNATE_REVERSE;
    (!this.getFrame(0)) && times.unshift(0);
    (!this.getFrame(duration)) && times.push(duration);
    length = times.length;
    let iterationCount = options[ITERATION_COUNT] || this.state[ITERATION_COUNT];

    iterationCount = iterationCount !== INFINITE ? iterationCount : 1;
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
        const keyvalue = toFixed(isReverse ? times[length - 1 - j] : times[j]);
        const time = toFixed(isReverse ? duration - keyvalue : keyvalue);
        const keytime = toFixed(start + time + threshold);

        if (totalDuration < keytime) {
          break;
        }
        keys.push(keytime);
        values[keytime] = keyvalue;

        if (!frames[keyvalue]) {
          const frame = this.getFrame(keyvalue);

          if (!frame || j === 0 || j === length - 1 || frame.has("transform") || frame.has("filter")) {
            frames[keyvalue] = this.getNowFrame(keyvalue);
          } else {
            frames[keyvalue] = frame;
          }
        }
      }
    }
    if (keys[keys.length - 1] < totalDuration) {
      // last time === totalDuration
      const isReverse = isDirectionReverse(iterationCount, direction);
      const keyvalue = toFixed(duration * (isReverse ? 1 - iterationCount % 1 : iterationCount % 1));

      keys.push(totalDuration);
      values[totalDuration] = keyvalue;
      !frames[keyvalue] && (frames[keyvalue] = this.getNowFrame(keyvalue));
    }
    return { keys, values, frames };
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
    const selector = state.selector || this.options.selector;

    if (!selector) {
      return "";
    }
    const id = this._getId();
    // infinity or zero
    const isParent = !isUndefined(options[ITERATION_COUNT]);
    const isZeroDuration = duration === 0;
    const playSpeed = (options[PLAY_SPEED] || 1);
    const delay = ((isParent ? options[DELAY] : state[DELAY]) || 0) / playSpeed;
    const easingName = (!isZeroDuration && options[EASING] && options[EASING_NAME]) || state[EASING_NAME];
    const iterationCount = (!isZeroDuration && options[ITERATION_COUNT]) || state[ITERATION_COUNT];
    const fillMode = (options[FILL_MODE] !== "forwards" && options[FILL_MODE]) || state[FILL_MODE];
    const direction = (options[DIRECTION] !== NORMAL && options[DIRECTION]) || state[DIRECTION];
    const cssText = makeAnimationProperties({
      fillMode,
      direction,
      iterationCount,
      delay: `${delay}s`,
      name: `${PREFIX}KEYFRAMES_${toId(id)}`,
      duration: `${duration / playSpeed}s`,
      timingFunction: easingName,
    });

    const css = `${selector}.${START_ANIMATION} {
			${cssText}
		}
		${this._toKeyframes(duration, isParent)}`;

    return css;
  }
  public exportCSS(duration = this.getDuration(), options: StateInterface = {}) {
    if (!this.elements.length) {
      return;
    }
    const id = this._getId();
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
    if (!ANIMATION || this.getPlayState() === RUNNING) {
      return this;
    }
    const elements = this.elements;
    const length = elements.length;

    if (!length) {
      return this;
    }
    if (this.isEnded()) {
      this.setTime(0);
    }
    exportCSS && this.exportCSS();

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

    this.setState({ playCSS: true });
    this.setPlayState(RUNNING);
    this.trigger(PLAY);

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
    const animationiteration = ({ elapsedTime }: any) => {
      const currentTime = elapsedTime;
      const iterationCount = currentTime / duration;

      this.state.currentTime = currentTime;
      this.setCurrentIterationCount(iterationCount);
    };
    animatedElement.addEventListener("animationend", animationend);
    animatedElement.addEventListener("animationiteration", animationiteration);
    return this;
  }
  private _getId() {
    return this.state.id || this.setId().getId();
  }
  private _getEasing(time: number, left: number, right: number, easing: EasingType) {
    if (this.keyframes.hasName(TIMING_FUNCTION)) {
      const nowEasing = this._getNowValue(time, left, right, [TIMING_FUNCTION], 0, true);

      return typeof nowEasing === "function" ? nowEasing : easing;
    }
    return easing;
  }
  private _toKeyframes(duration = this.getDuration(), isParent: boolean) {
    const id = this._getId();
    const state = this.state;
    const playSpeed = state[PLAY_SPEED];
    const iterationCount = state[ITERATION_COUNT];
    const delay = isParent ? state[DELAY] : 0;
    const direction = isParent ? state[DIRECTION] : NORMAL;
    const { keys, values, frames } = this.getAllTimes(true, {
      duration,
      delay,
      direction,
      iterationCount: isParent && iterationCount !== INFINITE ? iterationCount : 1,
      isCSS: true,
    });
    const length = keys.length;
    const css: ObjectInterface<string> = {};
    const keyframes: string[] = [];

    for (const time in frames) {
      css[time] = frames[time].toCSS();
    }
    if (!keys.length) {
      return "";
    }
    if (delay) {
      keyframes.push(`0%{${frames[0]}}`);
      if (direction === REVERSE || direction === ALTERNATE_REVERSE) {
        keyframes.push(`${delay / playSpeed / duration * 100 - 0.00001}%{${css[0]}}`);
      }
    }
    keys.forEach(time => {
      keyframes.push(`${(delay + time) / playSpeed / duration * 100}%{${css[values[time]]}}`);
    });
    const lastTime = keys[length - 1];

    if ((delay + lastTime) / playSpeed < duration) {
      // not 100%
      keyframes.push(`100%{${css[values[lastTime]]}`);
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
    easing: EasingType = this.getEasing(),
    usePrevValue: boolean = isFixed(properties),
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
    const prevValue = prevFrame && prevFrame.raw(...properties);

    if (usePrevValue) {
      return prevValue;
    }
    for (let i = right; i < length; ++i) {
      const frame = keyframes.get(times[i]);

      if (frame.has(...properties)) {
        nextTime = times[i];
        nextFrame = frame;
        break;
      }
    }
    const nextValue = nextFrame && nextFrame.raw(...properties);

    if (!prevFrame || isUndefined(prevValue)) {
      return nextValue;
    }
    if (!nextFrame || isUndefined(nextValue) || prevValue === nextValue) {
      return prevValue;
    }
    if (prevTime < 0) {
      prevTime = 0;
    }
    return dotValue(time, prevTime, nextTime, prevValue, nextValue, easing);
  }
  private _getNearTimeIndex(time: number) {
    const keyframes = this.keyframes;
    const times = keyframes.times;
    const length = times.length;

    for (let i = 0; i < length; ++i) {
      if (times[i] === time) {
        return { left: i, right: i };
      } else if (times[i] > time) {
        return { left: i === 0 ? 0 : i - 1, right: i };
      }
    }
    return { left: length - 1, right: length - 1 };
  }
  private _animate(parentEasing?: EasingType) {
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
    const elements = this.elements;
    const length = elements.length;

    if (!length) {
      return frame;
    }
    const attributes = frame.get("attribute");

    if (attributes) {
      for (const name in (attributes as any)) {
        for (let i = 0; i < length; ++i) {
          elements[i].setAttribute(name, attributes[name]);
        }
      }
    }
    const cssText = frame.toCSS();

    if (this.state.cssText !== cssText) {
      this.state.cssText = cssText;

      for (let i = 0; i < length; ++i) {
        elements[i].style.cssText += cssText;
      }
      return frame;
    }
  }
}

export default SceneItem;
