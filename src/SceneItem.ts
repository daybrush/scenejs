import Animator, { AnimatorState, EasingType, isDirectionReverse } from "./Animator";
import Frame from "./Frame";
import {
  toFixed,
  isFixed,
  playCSS,
  toId,
  exportCSS,
  getRealId,
  makeId,
  isPausedCSS,
  isRole,
  isInProperties,
  getValueByNames,
  isEndedCSS,
  setPlayCSS,
} from "./utils";
import { dotValue } from "./utils/dot";
import {
  START_ANIMATION,
  PREFIX, THRESHOLD,
  TIMING_FUNCTION, ALTERNATE, ALTERNATE_REVERSE, NORMAL, INFINITE,
  REVERSE, EASING, FILL_MODE, DIRECTION, ITERATION_COUNT,
  EASING_NAME, DELAY, PLAY_SPEED, DURATION, PAUSE_ANIMATION, DATA_SCENE_ID, PLAY_CSS, SELECTOR, ROLES
} from "./consts";
import { isObject, isArray, isUndefined, decamelize,
  ANIMATION, fromCSS, addClass, removeClass, hasClass,
  KEYFRAMES, requestAnimationFrame, isFunction,
  IObject, $, splitComma, toArray, isString, IArrayFormat } from "@daybrush/utils";
import { NameType, RoleObject, AnimateElement } from "./types";

export interface SceneItemState extends AnimatorState {
  playCSS: boolean;
  cssText: string;
  selector: string;
}
export interface SceneItemOptions extends AnimatorState {
  selector: boolean | string;
  elements: IArrayFormat<AnimateElement> | AnimateElement;
  element: IArrayFormat<AnimateElement> | AnimateElement;
  target: any;
}

function makeAnimationProperties(properties: IObject<string | number>) {
  const cssArray = [];

  for (const name in properties) {
    cssArray.push(`${ANIMATION}-${decamelize(name)}:${properties[name]};`);
  }
  return cssArray.join("");
}
function isPureObject(obj: any): obj is object  {
  return isObject(obj) && obj.constructor === Object;
}
function getNames(names: IObject<any>, stack: string[]) {
  let arr: string[][] = [];

  if (isPureObject(names)) {
    for (const name in names) {
      stack.push(name);
      arr = arr.concat(getNames(names[name], stack));
      stack.pop();
    }
  } else {
    arr.push(stack.slice());
  }
  return arr;
}
function updateFrame(names: IObject<any>, properties: IObject<any>) {
  for (const name in properties) {
    const value = properties[name];

    if (!isPureObject(value)) {
      names[name] = true;
      continue;
    }
    if (!isObject(names[name])) {
      names[name] = {};
    }
    updateFrame(names[name], properties[name]);
  }
  return names;
}
function addTime(times: number[], time: number) {
  const length = times.length;
  for (let i = 0; i < length; ++i) {
    if (time < times[i]) {
      times.splice(i, 0, time);
      return;
    }
  }
  times[length] = time;
}
function getNearTimeIndex(times: number[], time: number) {
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
/**
* manage Frame Keyframes and play keyframes.
* @extends Animator
* @example
const item = new SceneItem({
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
class SceneItem extends Animator<SceneItemState> {
  public times: number[] = [];
  public items: IObject<Frame> = {};
  public names: RoleObject = {};
  public elements: AnimateElement[] = [];
  private target: any;
  private targetFunc: (frame: Frame) => void;

  /**
	* @param - properties
	* @param - options
	* @example
	const item = new SceneItem({
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
  constructor(properties?: IObject<any>, options?: Partial<SceneItemOptions>) {
    super();
    this.load(properties, options);
  }
  public getDuration() {
    const times = this.times;
    const length = times.length;

    return Math.max(this.state[DURATION], length === 0 ? 0 : times[length - 1]);
  }
  /**
	* get size of list
	* @return {Number} length of list
	*/
  public size() {
    return this.times.length;
  }
  public setDuration(duration: number) {
    if (!duration) {
      return this;
    }
    const originalDuration = this.getDuration();

    if (originalDuration > 0) {
      const ratio = duration / originalDuration;
      const { times, items } = this;
      const obj: IObject<any> = {};

      this.times = times.map(time => {
        const time2 = toFixed(time * ratio);

        obj[time2] = items[time];

        return time2;
      });
      this.items = obj;
    }
    super.setDuration(toFixed(duration));
    return this;
  }
  public setId(id?: number | string) {
    const state = this.state;

    state.id = id || makeId(!!length);
    const sceneId = toId(this.getId());

    const elements = this.elements;

    if (elements.length && !state[SELECTOR]) {
      state[SELECTOR] = `[${DATA_SCENE_ID}="${sceneId}"]`;
      elements.forEach(element => {
        element.setAttribute(DATA_SCENE_ID, sceneId);
      });
    }
    return this;
  }

  /**
	* Set properties to the sceneItem at that time
	* @param {Number} time - time
	* @param {...String|Object} [properties] - property names or values
	* @return {SceneItem} An instance itself
	* @example
item.set(0, "a", "b") // item.getFrame(0).set("a", "b")
console.log(item.get(0, "a")); // "b"
	*/
  public set(time: any, ...args: any[]) {
    if (isArray(time)) {
      const length = time.length;

      for (let i = 0; i < length; ++i) {
        const t = length === 1 ? 0 : this.getUnitTime(`${i / (length - 1) * 100}%`);

        this.set(t, time[i]);
      }
    } else if (isObject(time)) {
      for (const t in time) {
        const value = time[t];
        const realTime = this.getUnitTime(t);

        if (isNaN(realTime)) {
          getNames(value, [t]).forEach(names => {
            const innerValue = getValueByNames(names.slice(1), value);
            const arr = isArray(innerValue) ? innerValue : [getValueByNames(names, this.target), innerValue];
            const length = arr.length;

            for (let i = 0; i < length; ++i) {
              this.newFrame(`${i / (length - 1) * 100}%`).set(names, arr[i]);
            }
          });
        } else {
          this.set(realTime, value);
        }
      }
    } else {
      const value = args[0];

      if (value instanceof Frame) {
        this.setFrame(time, value);
      } else if (value instanceof SceneItem) {
        const delay = value.getDelay();
        const realTime = this.getUnitTime(time);
        const frames = value.toObject(!this.hasFrame(realTime + delay), realTime);

        for (const frameTime in frames) {
          this.set(frameTime, frames[frameTime]);
        }
      } else if (args.length === 1 && isArray(value)) {
        value.forEach((item: any) => {
          this.set(time, item);
        });
      } else {
        const frame = this.newFrame(time);

        frame.set(...args);
        this.updateFrame(frame);
      }
    }
    return this;
  }
  /**
	* Get properties of the sceneItem at that time
	* @param {Number} time - time
	* @param {...String|Object} args property's name or properties
	* @return {Number|String|PropertyObejct} property value
	* @example
item.get(0, "a"); // item.getFrame(0).get("a");
item.get(0, "transform", "translate"); // item.getFrame(0).get("transform", "translate");
	*/
  public get(time: string | number, ...args: NameType[]) {
    const frame = this.getFrame(time);

    return frame && frame.get(...args);
  }
  /**
	* remove properties to the sceneItem at that time
	* @param {Number} time - time
	* @param {...String|Object} [properties] - property names or values
	* @return {SceneItem} An instance itself
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
	* @param - the scene item or item object
	* @return An instance itself
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
  public append(item: SceneItem | IObject<any>) {
    this.set(this.getDuration(), item);
    return this;
  }
  /**
	* Push the front frames for the time and prepend the scene item or item object.
	* @param - the scene item or item object
	* @return An instance itself
	*/
  public prepend(item: SceneItem | IObject<any>) {
    if (item instanceof SceneItem) {
      const unshiftTime = item.getDuration() + item.getDelay();
      const firstFrame = this.getFrame(0);
      // remove first frame
      this.removeFrame(0);
      this.unshift(unshiftTime);
      this.set(0, item);
      this.set(unshiftTime + THRESHOLD, firstFrame);
    } else {
      this.prepend(new SceneItem(item));
    }
    return this;
  }
   /**
  * Push out the amount of time.
  * @param - time to push
	* @return {}
	* @example
  item.get(0); // frame 0
  item.unshift(3);
  item.get(3) // frame 0
	*/
  public unshift(time: number) {
    const { times, items } = this;
    const obj: IObject<Frame> = {};

    this.times = times.map(t => {
      const time2 = toFixed(time + t);

      obj[time2] = items[t];
      return time2;
    });
    this.items = obj;
  }
   /**
	* Get the frames in the item in object form.
	* @return {}
	* @example
item.toObject();
// {0: {display: "none"}, 1: {display: "block"}}
	*/
  public toObject(isStartZero = true, startTime = 0): IObject<Frame> {
    const obj: IObject<Frame> = {};
    const delay = this.getDelay();

    this.forEach((frame: Frame, time: number) => {
      obj[(!time && !isStartZero ? THRESHOLD : 0) + delay + startTime + time] = frame.clone();
    });
    return obj;
  }
   /**
	* Specifies an element to synchronize items' keyframes.
	* @param {string} selectors - Selectors to find elements in items.
	* @return {SceneItem} An instance itself
	* @example
item.setSelector("#id.class");
	*/
  public setSelector(target: string | boolean) {
    this.setElement(target);
  }
  /**
	* Specifies an element to synchronize item's keyframes.
  * @param - elements to synchronize item's keyframes.
  * @param - Make sure that you have peusdo.
	* @return {SceneItem} An instance itself
	* @example
item.setElement(document.querySelector("#id.class"));
item.setElement(document.querySelectorAll(".class"));
	*/
  public setElement(target: boolean | string | AnimateElement | IArrayFormat<AnimateElement>) {
    const state = this.state;
    let elements: AnimateElement[] = [];

    if (!target) {
      return this;
    } else if (target === true || isString(target)) {
      const selector = target === true ? `${state.id}` : target;
      const matches = /([\s\S]+)(:+[a-zA-Z]+)$/g.exec(selector);

      elements = toArray($(matches ? matches[1] : selector, true));
      state[SELECTOR] = selector;
    } else {
      elements = (target instanceof Element) ? [target] : toArray(target);
    }
    if (!elements.length) {
      return this;
    }
    this.elements = elements;
    this.setId(this.getId());
    this.target = elements[0].style;
    this.targetFunc = (frame: Frame) => {
      const attributes = frame.get("attribute");

      if (attributes) {
        for (const name in attributes) {
          elements.forEach(el => {
            el.setAttribute(name, attributes[name]);
          });
        }
      }
      const cssText = frame.toCSS();

      if (state.cssText !== cssText) {
        state.cssText = cssText;

        elements.forEach(el => {
          el.style.cssText += cssText;
        });
        return frame;
      }
    };
    return this;
  }
  public setTarget(target: any): this {
    this.target = target;
    this.targetFunc = (frame: Frame) => {
      const obj = frame.get();

      for (const name in obj) {
        target[name] = obj[name];
      }
    };
    return this;
  }
  /**
	* add css styles of items's element to the frame at that time.
	* @param {Array} properties - elements to synchronize item's keyframes.
	* @return {SceneItem} An instance itself
	* @example
item.setElement(document.querySelector("#id.class"));
item.setCSS(0, ["opacity"]);
item.setCSS(0, ["opacity", "width", "height"]);
	*/
  public setCSS(time: number, properties: string[]) {
    this.set(time, fromCSS(this.elements, properties));
    return this;
  }
  public setTime(time: number | string, isNumber?: boolean, parentEasing?: EasingType) {
    this.animate(time, isNumber, parentEasing);
    return this;
  }
  public animate(time: number | string, isNumber?: boolean, parentEasing?: EasingType) {
    super.setTime(time, isNumber);

    const iterationTime = this.getIterationTime();
    const easing = this.getEasing() || parentEasing;
    const frame = this.getNowFrame(iterationTime, easing);
    const currentTime = this.getTime();
    const state = this.state;

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
    this.targetFunc && this.targetFunc(frame);
    return frame;
  }
  /**
	* update property names used in frames.
	* @return {SceneItem} An instance itself
	* @example
item.update();
	*/
  public update() {
    this.forEach(frame => {
      this.updateFrame(frame);
    });
    return this;
  }
  /**
	* update property names used in frame.
	* @param {Frame} [frame] - frame of that time.
	* @return {SceneItem} An instance itself
	* @example
item.updateFrame(time, this.get(time));
	*/
  public updateFrame(frame: Frame) {
    if (!frame) {
      return this;
    }
    const properties = frame.properties;
    const names = this.names;

    updateFrame(names, properties);
    return this;
  }
  /**
	* Create and add a frame to the sceneItem at that time
	* @param {Number} time - frame's time
	* @return {Frame} Created frame.
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
	* @param {Number} time - frame's time
	* @return {SceneItem} An instance itself
	* @example
item.setFrame(time, frame);
	*/
  public setFrame(time: string | number, frame: Frame) {
    const realTime = this.getUnitTime(time);

    this.items[realTime] = frame;
    addTime(this.times, realTime);
    this.update();
    return this;
  }
  /**
	* get sceneItem's frame at that time
	* @param {Number} time - frame's time
	* @return {Frame} sceneItem's frame at that time
	* @example
const frame = item.getFrame(time);
	*/
  public getFrame(time: number | string) {
    return this.items[this.getUnitTime(time)];
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
  public hasFrame(time: number | string) {
    return this.getUnitTime(time) in this.items;
  }
  /**
	* Check if keyframes has propery's name
	* @param - property's time
	* @return {boolean} true: if has property, false: not
	* @example
  item.hasName(["transform", "translate"]); // true or not
	*/
  public hasName(args: string[]) {
    return isInProperties(this.names, args, true);
  }
  /**
	* remove sceneItem's frame at that time
	* @param {Number} time - frame's time
	* @return {SceneItem} An instance itself
	* @example
item.removeFrame(time);
	*/
  public removeFrame(time: number) {
    const items = this.items;
    const index = this.times.indexOf(time);

    delete items[time];

    // remove time
    if (index > -1) {
      this.times.splice(index, 1);
    }
    this.update();
    return this;
  }
  /**
	* merge frame of the previous time at the next time.
  * @param - The time of the frame to merge
  * @param - The target frame
	* @return {SceneItem} An instance itself
	* @example
// getFrame(1) contains getFrame(0)
item.merge(0, 1);
	*/
  public mergeFrame(time: number | string, frame: Frame) {
    if (frame) {
      const toFrame = this.newFrame(time);

      toFrame.merge(frame);
    }
    return this;
  }
  /**
	* Get frame of the current time
	* @param {Number} time - the current time
	* @param {function} easing - the speed curve of an animation
	* @return {Frame} frame of the current time
	* @example
let item = new SceneItem({
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
  public getNowFrame(time: number, easing?: EasingType, isAccurate?: boolean) {
    const frame = new Frame();
    const { left, right } = getNearTimeIndex(this.times, time);
    let realEasing = this.getEasing() || easing;
    let nameObject = this.names;

    if (this.hasName([TIMING_FUNCTION])) {
      const nowEasing = this._getNowValue(time, [TIMING_FUNCTION], left, right, false, 0, true);

      isFunction(nowEasing) && (realEasing = nowEasing);
    }
    if (isAccurate) {
      const prevFrame = this.getFrame(time);
      const prevNames = updateFrame({}, prevFrame.properties);

      for (const name in ROLES) {
        if (name in prevNames) {
          prevNames[name] = nameObject[name];
        }
      }
      nameObject = prevNames;
    }
    const names = getNames(nameObject, []);

    names.forEach(properties => {
      const value = this._getNowValue(time, properties, left, right, isAccurate, realEasing);

      if (isUndefined(value)) {
        return;
      }
      frame.set(properties, value);
    });
    return frame;
  }
  public load(properties: any = {}, options = properties.options) {
    options && this.setOptions(options);
    if (isArray(properties)) {
      this.set(properties);
    } else if (properties.keyframes) {
      this.set(properties.keyframes);
    } else {
      for (const time in properties) {
        if (time === "options") {
          continue;
        }
        this.set({
          [time]: properties[time],
        });
      }
    }
    if (options && options[DURATION]) {
      this.setDuration(options[DURATION]);
    }
    return this;
  }
  /**
	 * clone SceneItem.
	 * @param - animator options
	 * @return {SceneItem} An instance of clone
	 * @example
	 * item.clone();
	 */
  public clone(options: Partial<SceneItemState> = {}) {
    const item = new SceneItem();

    item.setOptions(this.state);
    item.setOptions(options);
    this.forEach((frame: Frame, time: number) => {
      item.setFrame(time, frame.clone());
    });
    return item;
  }
  /**
	 * executes a provided function once for each scene item.
	 * @param - Function to execute for each element, taking three arguments
	 * @return {Keyframes} An instance itself
	 */
  public forEach(callback: (item: Frame, time: number, items: IObject<Frame>) => void) {
    const times = this.times;
    const items = this.items;

    times.forEach(time => {
      callback(items[time], time, items);
    });
    return this;
  }
  public setOptions(options: Partial<SceneItemOptions> = {}) {
    super.setOptions(options);
    const { id, selector, elements, element, target } = options;

    id && this.setId(id);
    if (target) {
      this.setTarget(target);
    } else if (elements || element || selector) {
      this.setElement(elements || element || selector);
    }
    return this;
  }
  /**
	* Specifies an css text that coverted the keyframes of the item.
	* @param {Array} [duration=this.getDuration()] - elements to synchronize item's keyframes.
	* @param {Array} [options={}] - parent options to unify options of items.
	* @example
item.setCSS(0, ["opacity"]);
item.setCSS(0, ["opacity", "width", "height"]);
	*/
  public toCSS(parentDuration = this.getDuration(), options: Partial<AnimatorState> = {}) {
    const state = this.state;
    const selector = state[SELECTOR];

    if (!selector) {
      return "";
    }
    const id = toId(getRealId(this));
    // infinity or zero
    const isInfinite = state[ITERATION_COUNT] === INFINITE;
    const isParent = !isUndefined(options[ITERATION_COUNT]);
    const isZeroDuration = parentDuration === 0;
    const duration = isZeroDuration ? this.getDuration() : parentDuration;
    const playSpeed = (options[PLAY_SPEED] || 1);
    const delay = ((options[DELAY] || 0) + (isZeroDuration ? state[DELAY] : 0)) / playSpeed;
    const easingName = (state[EASING] && state[EASING_NAME]) ||
      (isParent && options[EASING] && options[EASING_NAME]) || state[EASING_NAME];
    const iterationCount = isInfinite ? INFINITE :
      (!isZeroDuration && options[ITERATION_COUNT]) || state[ITERATION_COUNT];
    const fillMode = (options[FILL_MODE] !== "forwards" && options[FILL_MODE]) || state[FILL_MODE];
    const direction = isInfinite ? state[DIRECTION] : options[DIRECTION] || state[DIRECTION];
    const cssText = makeAnimationProperties({
      fillMode,
      direction,
      iterationCount,
      delay: `${delay}s`,
      name: `${PREFIX}KEYFRAMES_${id}`,
      duration: `${duration / playSpeed}s`,
      timingFunction: easingName,
    });
    const selectors = splitComma(selector).map(sel => {
      const matches = /([\s\S]+)(:+[a-zA-Z]+)$/g.exec(sel);

      if (matches) {
        return [matches[0], matches[1]];
      } else {
        return [sel, ""];
      }
    });

    return `${selectors.map(([sel, peusdo]) => `${sel}.${START_ANIMATION}${peusdo}`)} {
			${cssText}
		}${selectors.map(([sel, peusdo]) => `${sel}.${PAUSE_ANIMATION}${peusdo}`)} {
      ${ANIMATION}-play-state: paused;
    }
    @${KEYFRAMES} ${PREFIX}KEYFRAMES_${id}{
			${this._toKeyframes(duration, !isZeroDuration && isParent).join("\n")}
		}`;
  }
  public exportCSS(duration?: number, options?: Partial<AnimatorState>) {
    if (!this.elements.length) {
      return "";
    }
    const css = this.toCSS(duration, options);
    const isParent = options && !isUndefined(options[ITERATION_COUNT]);

    !isParent && exportCSS(getRealId(this), css);
    return css;
  }
  public pause() {
    super.pause();
    isPausedCSS(this) && this.pauseCSS();
    return this;
  }
  public pauseCSS() {
    this.elements.forEach(element => {
      addClass(element, PAUSE_ANIMATION);
    });
    return this;
  }
  public endCSS() {
    this.elements.forEach(element => {
      removeClass(element, PAUSE_ANIMATION);
      removeClass(element, START_ANIMATION);
    });
    setPlayCSS(this, false);
    return this;
  }
  public end() {
    isEndedCSS(this) && this.endCSS();
    super.end();
    return this;
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
item[PLAY_CSS]();
item[PLAY_CSS](false, {
	direction: "reverse",
	fillMode: "forwards",
});
	*/
  public playCSS(isExportCSS = true, properties = {}) {
    playCSS(this, isExportCSS, properties);
    return this;
  }
  public addPlayClass(isPaused: boolean, properties = {}) {
    const elements = this.elements;
    const length = elements.length;
    const cssText = makeAnimationProperties(properties);

    if (!length) {
      return;
    }
    if (isPaused) {
      elements.forEach(element => {
        removeClass(element, PAUSE_ANIMATION);
      });
    } else {
      elements.forEach(element => {
        element.style.cssText += cssText;
        if (hasClass(element, START_ANIMATION)) {
          removeClass(element, START_ANIMATION);
          requestAnimationFrame(() => {
            requestAnimationFrame(() => {
              addClass(element, START_ANIMATION);
            });
          });
        } else {
          addClass(element, START_ANIMATION);
        }
      });
    }
    return elements[0];
  }
  private _toKeyframes(duration = this.getDuration(), isParent: boolean) {
    const state = this.state;
    const playSpeed = state[PLAY_SPEED];
    const fillMode = state[FILL_MODE];
    const delay = isParent ? state[DELAY] : 0;
    const direction = isParent ? state[DIRECTION] : NORMAL;
    const stateIterationCount = state[ITERATION_COUNT];
    const iterationCount = isParent && stateIterationCount !== INFINITE ? stateIterationCount : 1;
    const times = this.times.slice();
    const entries: number[][] = [];

    if (!times.length) {
      return [];
    }
    const frames: IObject<Frame> = {};
    const originalDuration = this.getDuration();
    const isShuffle = direction === ALTERNATE || direction === ALTERNATE_REVERSE;
    const totalDuration = iterationCount * originalDuration;

    (!this.getFrame(0)) && times.unshift(0);
    (!this.getFrame(originalDuration)) && times.push(originalDuration);

    const length = times.length;

    for (let i = 0; i < iterationCount; ++i) {
      const isReverse = isDirectionReverse(i, iterationCount, direction);
      const start = i * originalDuration;

      for (let j = 0; j < length; ++j) {
        if (isShuffle && i !== 0 && j === 0) {
          // pass duplicate
          continue;
        }
        // shuffle 0 1 0 1
        // not suffle 0 1 0.001 1 0.001 1
        // i> 0 || j > 0 || !suffle
        const threshold = j === 0 && (i > 0 && !isShuffle) ? THRESHOLD : 0;
        const keyvalue = toFixed(isReverse ? times[length - 1 - j] : times[j]);
        const keytime = toFixed(start + (isReverse ? originalDuration - keyvalue : keyvalue) + threshold);

        if (totalDuration < keytime) {
          break;
        }
        entries.push([keytime, keyvalue]);

        if (!frames[keyvalue]) {
          if (!this.hasFrame(keyvalue) || j === 0 || j === length - 1) {
            frames[keyvalue] = this.getNowFrame(keyvalue);
          } else {
            frames[keyvalue] = this.getNowFrame(keyvalue, 0, true);
          }
        }
      }
    }
    if (!entries.length || entries[entries.length - 1][0] < totalDuration) {
      // last time === totalDuration
      const isReverse = isDirectionReverse(iterationCount, iterationCount, direction);
      const keyvalue = toFixed(originalDuration * (isReverse ? 1 - iterationCount % 1 : iterationCount % 1));

      entries.push([totalDuration, keyvalue]);
      !frames[keyvalue] && (frames[keyvalue] = this.getNowFrame(keyvalue));
    }

    const css: IObject<string> = {};
    const keyframes = [];
    let lastTime = entries[entries.length - 1][0];

    if (delay) {
      const isReverse = direction === REVERSE || direction === ALTERNATE_REVERSE;
      const delayTime = isReverse && (fillMode === "both" || fillMode === "backwards") ? originalDuration : 0;

      !frames[delayTime] && (frames[delayTime] = this.getNowFrame(delayTime));
      (entries[0][1] !== delayTime) && entries.unshift([-THRESHOLD, delayTime]);
      entries.unshift([-delay, 0]);
    }
    for (const time in frames) {
      css[time] = frames[time].toCSS();
    }
    if ((delay + lastTime) / playSpeed < duration) {
      entries.push([duration * playSpeed - delay, entries[entries.length - 1][1]]);

      lastTime = entries[entries.length - 1][0];
    }
    entries.forEach(([time, keyvalue]) => {
      const keyTime = (delay + time) / playSpeed / (delay + lastTime) * 100;
      keyframes.push(`${keyTime}%{${keyTime === 0 ? "" : css[keyvalue]}}`);
    });

    return keyframes;
  }
  private _getNowValue(
    time: number,
    properties: string[],
    left: number,
    right: number,
    isAccurate?: boolean,
    easing?: EasingType,
    usePrevValue: boolean = isFixed(properties),
  ) {
    const times = this.times;
    const length = times.length;

    let prevTime: number;
    let nextTime: number;
    let prevFrame: Frame;
    let nextFrame: Frame;

    for (let i = left; i >= 0; --i) {
      const frame = this.getFrame(times[i]);

      if (frame.has(...properties)) {
        prevTime = times[i];
        prevFrame = frame;
        break;
      }
    }
    const prevValue = prevFrame && prevFrame.raw(...properties);

    if (isAccurate && !isRole([properties[0]])) {
      return prevTime === time ? prevValue : undefined;
    }
    if (usePrevValue) {
      return prevValue;
    }
    for (let i = right; i < length; ++i) {
      const frame = this.getFrame(times[i]);

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
}

export default SceneItem;
