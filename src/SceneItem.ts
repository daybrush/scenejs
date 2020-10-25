import Animator, { isDirectionReverse } from "./Animator";
import Frame from "./Frame";
import {
    toFixed,
    isFixed,
    playCSS,
    toId,
    getRealId,
    makeId,
    isPausedCSS,
    isRole,
    getValueByNames,
    isEndedCSS,
    setPlayCSS,
    getNames,
    updateFrame,
} from "./utils";
import { dotValue } from "./utils/dot";
import {
    START_ANIMATION,
    PREFIX, THRESHOLD,
    TIMING_FUNCTION, ALTERNATE, ALTERNATE_REVERSE, INFINITE,
    REVERSE, EASING, FILL_MODE, DIRECTION, ITERATION_COUNT,
    EASING_NAME, DELAY, PLAY_SPEED, DURATION, PAUSE_ANIMATION,
    DATA_SCENE_ID, SELECTOR, ROLES, NAME_SEPARATOR
} from "./consts";
import {
    isObject, isArray, isUndefined, decamelize,
    ANIMATION, fromCSS, addClass, removeClass, hasClass,
    KEYFRAMES, isFunction,
    IObject, $, splitComma, toArray, isString, IArrayFormat,
    dot as dotNumber,
    find,
    findIndex,
    getKeys,
    sortOrders,
} from "@daybrush/utils";
import {
    NameType, AnimateElement, AnimatorState,
    SceneItemState, SceneItemOptions, EasingType, PlayCondition, DirectionType, SceneItemEvents
} from "./types";
import OrderMap from "order-map";
import styled, { InjectResult, StyledInjector } from "css-styled";

function getNearTimeIndex(times: number[], time: number) {
    const length = times.length;

    for (let i = 0; i < length; ++i) {
        if (times[i] === time) {
            return [i, i];
        } else if (times[i] > time) {
            return [i > 0 ? i - 1 : 0, i];
        }
    }
    return [length - 1, length - 1];
}
function makeAnimationProperties(properties: object) {
    const cssArray = [];

    for (const name in properties) {
        cssArray.push(`${ANIMATION}-${decamelize(name)}:${properties[name]};`);
    }
    return cssArray.join("");
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
function addEntry(entries: number[][], time: number, keytime: number) {
    const prevEntry = entries[entries.length - 1];

    (!prevEntry || prevEntry[0] !== time || prevEntry[1] !== keytime) &&
        entries.push([toFixed(time), toFixed(keytime)]);
}
export function getEntries(times: number[], states: AnimatorState[]) {
    let entries = times.map(time => ([time, time]));
    let nextEntries = [];

    states.forEach(state => {
        const iterationCount = state[ITERATION_COUNT] as number;
        const delay = state[DELAY];
        const playSpeed = state[PLAY_SPEED];
        const direction = state[DIRECTION];
        const intCount = Math.ceil(iterationCount);
        const currentDuration = entries[entries.length - 1][0];
        const length = entries.length;
        const lastTime = currentDuration * iterationCount;

        for (let i = 0; i < intCount; ++i) {
            const isReverse =
                direction === REVERSE ||
                direction === ALTERNATE && i % 2 ||
                direction === ALTERNATE_REVERSE && !(i % 2);

            for (let j = 0; j < length; ++j) {
                const entry = entries[isReverse ? length - j - 1 : j];
                const time = entry[1];
                const currentTime = currentDuration * i + (isReverse ? currentDuration - entry[0] : entry[0]);
                const prevEntry = entries[isReverse ? length - j : j - 1];

                if (currentTime > lastTime) {
                    if (j !== 0) {
                        const prevTime = currentDuration * i +
                            (isReverse ? currentDuration - prevEntry[0] : prevEntry[0]);
                        const divideTime = dotNumber(prevEntry[1], time, lastTime - prevTime, currentTime - lastTime);

                        addEntry(nextEntries, (delay + currentDuration * iterationCount) / playSpeed, divideTime);
                    }
                    break;
                } else if (
                    currentTime === lastTime
                    && nextEntries.length
                    && nextEntries[nextEntries.length - 1][0] === lastTime + delay
                ) {
                    break;
                }
                addEntry(nextEntries, (delay + currentTime) / playSpeed, time);
            }
        }
        // delay time
        delay && nextEntries.unshift([0, nextEntries[0][1]]);

        entries = nextEntries;
        nextEntries = [];
    });

    return entries;
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
class SceneItem extends Animator<SceneItemOptions, SceneItemState, SceneItemEvents> {
    public times: number[] = [];
    public items: IObject<Frame> = {};
    public nameMap = new OrderMap(NAME_SEPARATOR);
    public elements: AnimateElement[] = [];
    public styled: StyledInjector;
    public styledInjector: InjectResult;
    public temp: Frame;
    private needUpdate: boolean = true;
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
    constructor(properties?: any, options?: Partial<SceneItemOptions>) {
        super();
        this.load(properties, options);
    }
    public getDuration() {
        const times = this.times;
        const length = times.length;

        return (length === 0 ? 0 : times[length - 1]) || this.state[DURATION];
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
            const obj: IObject<Frame> = {};

            this.times = times.map(time => {
                const time2 = toFixed(time * ratio);

                obj[time2] = items[time];

                return time2;
            });
            this.items = obj;
        } else {
            this.newFrame(duration);
        }
        return this;
    }
    public setId(id?: number | string) {
        const state = this.state;
        const elements = this.elements;
        const length = elements.length;

        state.id = id || makeId(!!length);

        if (length && !state[SELECTOR]) {
            const sceneId = toId(this.getId());

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
        if (time instanceof SceneItem) {
            return this.set(0, time);
        } else if (isArray(time)) {
            const length = time.length;

            for (let i = 0; i < length; ++i) {
                const t = length === 1 ? 0 : this.getUnitTime(`${i / (length - 1) * 100}%`);

                this.set(t, time[i]);
            }
        } else if (isObject(time)) {
            for (const t in time) {
                const value = time[t];

                splitComma(t).forEach(eachTime => {
                    const realTime = this.getUnitTime(eachTime);

                    if (isNaN(realTime)) {
                        getNames(value, [eachTime]).forEach(names => {
                            const innerValue = getValueByNames(names.slice(1), value);
                            const arr = isArray(innerValue) ?
                                innerValue : [getValueByNames(names, this.target), innerValue];
                            const length = arr.length;

                            for (let i = 0; i < length; ++i) {
                                this.newFrame(`${i / (length - 1) * 100}%`).set(...names, arr[i]);
                            }
                        });
                    } else {
                        this.set(realTime, value);
                    }
                });
            }
        } else if (!isUndefined(time)) {
            const value = args[0];

            splitComma(time + "").forEach(eachTime => {
                const realTime = this.getUnitTime(eachTime);

                if (value instanceof SceneItem) {
                    const delay = value.getDelay();
                    const frames = value.toObject(!this.hasFrame(realTime + delay));
                    const duration = value.getDuration();
                    const direction = value.getDirection();
                    const isReverse = direction.indexOf("reverse") > -1;

                    for (const frameTime in frames) {
                        const nextTime = isReverse ? duration - parseFloat(frameTime) : parseFloat(frameTime);
                        this.set(realTime + nextTime, frames[frameTime]);
                    }
                } else if (args.length === 1 && isArray(value)) {
                    value.forEach((item: any) => {
                        this.set(realTime, item);
                    });
                } else {
                    const frame = this.newFrame(realTime);

                    frame.set(...args);
                }
            });
        }
        this.needUpdate = true;
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
      * get properties orders
      * @param - property names
      * @example
      item.getOrders(["display"]) // => []
      item.getOrders(["transform"]) // => ["translate", "scale"]
      */
    public getOrders(names: NameType[]): NameType[] | undefined {
        this.needUpdate && this.update();

        return this.nameMap.get(names);
    }
    /**
      * set properties orders
      * @param - property names
      * @param - orders
      * @example
      item.getOrders(["transform"]) // => ["translate", "scale"]
      item.setOrders(["transform"], ["scale", "tralsate"])
      */
    public setOrders(names: NameType[], orders: NameType[]): NameType[] {
        this.needUpdate && this.update();

        const result = this.nameMap.set(names, orders);

        this.updateFrameOrders();

        return result;
    }
    /**
      * get properties order object
      * @example
      console.log(item.getOrderObject());
      */
     public getOrderObject() {
        return this.nameMap.getObject();
    }
    /**
      * set properties orders object
      * @param - properties orders object
      * @example
      item.setOrderObject({
          "": ["transform"],
          "transform": ["scale", "tralsate"],
      });
      */
    public setOrderObject(obj: IObject<NameType[]>) {
        this.nameMap.setObject(obj);

        this.updateFrameOrders();
    }
    public remove(time: string | number, ...args: any[]): this;
    /**
      * remove properties to the sceneItem at that time
      * @param {Number} time - time
      * @param {...String|Object} [properties] - property names or values
      * @return {SceneItem} An instance itself
      * @example
  item.remove(0, "a");
      */
    public remove(time: string | number, ...args: NameType[]) {
        if (args.length) {
            const frame = this.getFrame(time);

            frame && frame.remove(...args);
        } else {
            this.removeFrame(time);
        }
        this.needUpdate = true;
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
        if (item instanceof SceneItem) {
            this.set(this.getDuration(), item);
        } else {
            this.append(new SceneItem(item));
        }
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
        return this;
    }
    /**
     * Get the frames in the item in object form.
     * @return {}
     * @example
 item.toObject();
 // {0: {display: "none"}, 1: {display: "block"}}
     */
    public toObject(isStartZero = true): IObject<Frame> {
        const obj: IObject<Frame> = {};
        const delay = this.getDelay();

        this.forEach((frame: Frame, time: number) => {
            obj[(!time && !isStartZero ? THRESHOLD : 0) + delay + time] = frame.clone();
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
    public setSelector(target: string | boolean | ((id: number | string) => string)) {
        if (isFunction(target)) {
            this.setElement(target(this.getId()));
        } else {
            this.setElement(target);
        }
        return this;
    }
    /**
     * Get the elements connected to SceneItem.
     */
    public getElements(): AnimateElement[] {
        return this.elements;
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
    public setElements(target: boolean | string | AnimateElement | IArrayFormat<AnimateElement>): this {
        return this.setElement(target);
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
            if (frame.has("html")) {
                const html = frame.get("html");

                elements.forEach(el => {
                    el.innerHTML = html;
                });
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
      * @param - Time to synchronize and set css
      * @param - elements to synchronize item's keyframes.
      * @return {SceneItem} An instance itself
      * @example
  item.setElement(document.querySelector("#id.class"));
  item.setCSS(0, ["opacity"]);
  item.setCSS(0, ["opacity", "width", "height"]);
      */
    public setCSS(time: number, properties: string[] = []) {
        this.set(time, fromCSS(this.elements, properties));
        return this;
    }
    public setTime(time: number | string, isTick?: boolean, isParent?: boolean, parentEasing?: EasingType) {
        super.setTime(time, isTick, isParent);

        const iterationTime = this.getIterationTime();
        const easing = this.getEasing() || parentEasing;
        const frame = this.getNowFrame(iterationTime, easing);
        const currentTime = this.getTime();

        this.temp = frame;
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
        return this;
    }
    /**
      * update property names used in frames.
      * @return {SceneItem} An instance itself
      * @example
  item.update();
      */
    public update() {
        const prevNameMap = this.nameMap;
        const names = {};
        this.forEach(frame => {
            updateFrame(names, frame.properties);
        });

        const nameMap = new OrderMap(NAME_SEPARATOR);

        function pushKeys(map: IObject<any>, stack: NameType[]) {
            const keys = getKeys(map);

            sortOrders(keys, prevNameMap.get(stack));

            nameMap.set(stack, keys);
            keys.forEach(key => {
                const nextMap = map[key];
                if (isObject(nextMap)) {
                    pushKeys(nextMap, [...stack, key]);
                }
            });
        }
        pushKeys(names, []);

        this.nameMap = nameMap;

        this.forEach(frame => {
            frame.setOrderObject(nameMap.orderMap);
        });
        this.needUpdate = false;
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
        this.needUpdate = true;
        return this;
    }
    public getFrame(time: number | string, ...names: any[]): Frame;
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
    public removeFrame(time: number | string, ...names: any[]): this;
    /**
      * remove sceneItem's frame at that time
      * @param - frame's time
      * @return {SceneItem} An instance itself
      * @example
  item.removeFrame(time);
      */
    public removeFrame(time: number | string) {
        const realTime = this.getUnitTime(time);
        const items = this.items;
        const index = this.times.indexOf(realTime);

        delete items[realTime];

        // remove time
        if (index > -1) {
            this.times.splice(index, 1);
        }
        this.needUpdate = true;
        return this;
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
        this.needUpdate && this.update();
        return !!this.nameMap.get(args);
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
        this.needUpdate && this.update();
        const frame = new Frame();
        const [left, right] = getNearTimeIndex(this.times, time);
        let realEasing = this.getEasing() || easing;
        let nameMap = this.nameMap;

        if (this.hasName([TIMING_FUNCTION])) {
            const nowEasing = this.getNowValue(time, [TIMING_FUNCTION], left, right, false, 0, true);

            isFunction(nowEasing) && (realEasing = nowEasing);
        }
        if (isAccurate) {
            const prevFrame = this.getFrame(time);
            const prevOrderMap = prevFrame.orderMap.filter([], orders => {
                return prevFrame.has(...orders);
            });

            for (const name in ROLES) {
                const orders = nameMap.get([name]);
                if (prevOrderMap.get([name]) && orders) {
                    prevOrderMap.set([name], orders);
                }
            }
            nameMap = prevOrderMap;
        }
        const names = nameMap.gets([]);

        frame.setOrderObject(nameMap.orderMap);
        names.forEach(properties => {
            const value = this.getNowValue(time, properties, left, right, isAccurate, realEasing, isFixed(properties));

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
                if (time !== "options") {
                    this.set({
                        [time]: properties[time],
                    });
                }
            }
        }
        if (options && options[DURATION]) {
            this.setDuration(options[DURATION]);
        }
        return this;
    }
    /**
       * clone SceneItem.
       * @return {SceneItem} An instance of clone
       * @example
       * item.clone();
       */
    public clone() {
        const item = new SceneItem();

        item.setOptions(this.state);
        item.setOrderObject(this.nameMap.orderMap);

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
        } else if (selector) {
            this.setSelector(selector);
        } else if (elements || element) {
            this.setElement(elements || element);
        }
        return this;
    }
    public toCSS(
        playCondition: PlayCondition = { className: START_ANIMATION },
        parentDuration = this.getDuration(), states: AnimatorState[] = []) {
        const itemState = this.state;
        const selector = itemState[SELECTOR];

        if (!selector) {
            return "";
        }
        const originalDuration = this.getDuration();
        itemState[DURATION] = originalDuration;
        states.push(itemState);

        const reversedStates = toArray(states).reverse();
        const id = toId(getRealId(this));
        const superParent = states[0];
        const infiniteIndex = findIndex(reversedStates, state => {
            return state[ITERATION_COUNT] === INFINITE || !isFinite(state[DURATION]);
        }, states.length - 1);
        const finiteStates = reversedStates.slice(0, infiniteIndex);
        const duration = parentDuration || finiteStates.reduce((prev, cur) => {
            return (cur[DELAY] + prev * (cur[ITERATION_COUNT] as number)) / cur[PLAY_SPEED];
        }, originalDuration);
        const delay = reversedStates.slice(infiniteIndex).reduce((prev, cur) => {
            return (prev + cur[DELAY]) / cur[PLAY_SPEED];
        }, 0);
        const easingName = find(reversedStates, state => (state[EASING] && state[EASING_NAME]), itemState)[EASING_NAME];
        const iterationCount = reversedStates[infiniteIndex][ITERATION_COUNT];
        const fillMode = superParent[FILL_MODE];
        const direction = reversedStates[infiniteIndex][DIRECTION];
        const cssText = makeAnimationProperties({
            fillMode,
            direction,
            iterationCount,
            delay: `${delay}s`,
            name: `${PREFIX}KEYFRAMES_${id}`,
            duration: `${duration / superParent[PLAY_SPEED]}s`,
            timingFunction: easingName,
        });
        const selectors = splitComma(selector).map(sel => {
            const matches = /([\s\S]+)(:+[a-zA-Z]+)$/g.exec(sel);

            if (matches) {
                return [matches[1], matches[2]];
            } else {
                return [sel, ""];
            }
        });
        const className = playCondition.className;
        const selectorCallback = playCondition.selector;
        const preselector = isFunction(selectorCallback) ? selectorCallback(this, selector) : selectorCallback;

        return `
    ${preselector || selectors.map(([sel, peusdo]) => `${sel}.${className}${peusdo}`)} {${cssText}}
    ${selectors.map(([sel, peusdo]) => `${sel}.${PAUSE_ANIMATION}${peusdo}`)} {${ANIMATION}-play-state: paused;}
    @${KEYFRAMES} ${PREFIX}KEYFRAMES_${id}{${this._toKeyframes(duration, finiteStates, direction)}}`;
    }
    /**
     * Export the CSS of the items to the style.
     * @param - Add a selector or className to play.
     * @return {SceneItem} An instance itself
     */
    public exportCSS(
        playCondition?: PlayCondition,
        duration?: number, options?: AnimatorState[]) {
        if (!this.elements.length) {
            return "";
        }
        const css = this.toCSS(playCondition, duration, options);
        const isParent = options && !isUndefined(options[ITERATION_COUNT]);

        if (!isParent) {
            if (this.styledInjector) {
                this.styledInjector.destroy();
                this.styledInjector = null;
            }
            this.styled = styled(css);
            this.styledInjector = this.styled.inject(this.getAnimationElement(), { original: true });
        }
        return this;
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
      * @param - Check if you want to export css.
      * @param [playClassName="startAnimation"] - Add a class name to play.
      * @param - The shorthand properties for six of the animation properties.
      * @see {@link https://www.w3schools.com/cssref/css3_pr_animation.asp}
      * @example
  item.playCSS();
  item.playCSS(false, "startAnimation", {
      direction: "reverse",
      fillMode: "forwards",
  });
      */
    public playCSS(isExportCSS = true, playClassName?: string, properties: object = {}) {
        playCSS(this, isExportCSS, playClassName, properties);
        return this;
    }
    public getAnimationElement(): AnimateElement {
        return this.elements[0];
    }
    public addPlayClass(isPaused: boolean, playClassName?: string, properties: object = {}) {
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
                }
            });
            elements.forEach(element => {
                element.clientWidth;
            });
            elements.forEach(element => {
                addClass(element, START_ANIMATION);
            });
        }
        return elements[0];
    }
    /**
      * Clear All Frames
      * @return {SceneItem} An instance itself
      */
    public clear() {
        this.times = [];
        this.items = {};
        this.nameMap = new OrderMap(NAME_SEPARATOR);

        if (this.styledInjector) {
            this.styledInjector.destroy();
        }
        this.styled = null;
        this.styledInjector = null;
        this.temp = null;
        this.needUpdate = true;
        return this;
    }
    public getNowValue(
        time: number,
        properties: NameType[],
        left?: number,
        right?: number,
        isAccurate?: boolean,
        easing?: EasingType,
        usePrevValue?: boolean,
    ) {
        const times = this.times;
        const length = times.length;

        let prevTime: number;
        let nextTime: number;
        let prevFrame: Frame;
        let nextFrame: Frame;
        const isUndefinedLeft = isUndefined(left);
        const isUndefinedRight = isUndefined(right);
        if (isUndefinedLeft || isUndefinedRight) {
            const indicies = getNearTimeIndex(times, time);
            isUndefinedLeft && (left = indicies[0]);
            isUndefinedRight && (right = indicies[1]);
        }

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
        return dotValue(time, Math.max(prevTime, 0), nextTime, prevValue, nextValue, easing);
    }
    private _toKeyframes(duration: number, states: AnimatorState[], direction: DirectionType) {
        const frames: IObject<string> = {};
        const times = this.times.slice();

        if (!times.length) {
            return "";
        }
        const originalDuration = this.getDuration();
        (!this.getFrame(0)) && times.unshift(0);
        (!this.getFrame(originalDuration)) && times.push(originalDuration);
        const entries = getEntries(times, states);
        const lastEntry = entries[entries.length - 1];

        // end delay time
        lastEntry[0] < duration && addEntry(entries, duration, lastEntry[1]);
        let prevTime = -1;

        return entries.map(([time, keytime]) => {
            if (!frames[keytime]) {
                frames[keytime] =
                    (!this.hasFrame(keytime) || keytime === 0 || keytime === originalDuration ?
                        this.getNowFrame(keytime) : this.getNowFrame(keytime, 0, true)).toCSS();
            }

            let frameTime = time / duration * 100;

            if (frameTime - prevTime < THRESHOLD) {
                frameTime += THRESHOLD;
            }
            prevTime = frameTime;
            return `${Math.min(frameTime, 100)}%{
                ${time === 0 && !isDirectionReverse(0, 1, direction) ? "" : frames[keytime]}
            }`;
        }).join("");
    }
    private updateFrameOrders() {
        const nameMap = this.nameMap.orderMap;

        this.forEach(frame => {
            frame.setOrderObject(nameMap);
        });
    }
}

export default SceneItem;
