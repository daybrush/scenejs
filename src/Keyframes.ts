import { ObjectInterface, RoleInterface } from "./consts";
import { isInProperties, toFixed } from "./utils";
import PropertyObject from "./PropertyObject";
import Frame from "./Frame";
import { isObject, isArray } from "@daybrush/utils";

function getNames(names: ObjectInterface<any>, stack: string[]) {
  let arr: string[][] = [];

  for (const name in names) {
    stack.push(name);

    if (isObject(names[name])) {
      arr = arr.concat(getNames(names[name], stack));
    } else {
      arr.push(stack.slice());
    }
    stack.pop();
  }
  return arr;
}
function updateFrame(names: ObjectInterface<any>, properties: ObjectInterface<any>) {
  for (const name in properties) {
    const value = properties[name];

    if (!isObject(value) || isArray(value) || value instanceof PropertyObject) {
      names[name] = true;
      continue;
    }
    if (!isObject(names[name])) {
      names[name] = {};
    }
    updateFrame(names[name], properties[name]);
  }
}
/**
* a list of objects in chronological order.
* @memberof Scene
*/
class Keyframes {
  public times: number[];
  public items: ObjectInterface<any>;
  public names: RoleInterface;
  /**
	 */
  constructor() {
    this.times = [];
    this.items = {};
    this.names = {};
  }
  /**
	* A list of names
	* @return {string[][]} names
	* @example
keyframes.getNames(); // [["a"], ["transform", "translate"], ["transform", "scale"]]
	*/
  public getNames() {
    const names = this.names;

    return getNames(names, []);
  }
  /**
	* Check if keyframes has propery's name
	* @param {...string[]} name - property's time
	* @return {Boolean} true: if has property, false: not
	* @example
keyframes.hasName("transform", "translate"); // true or not
	*/
  public hasName(...args: string[]) {
    return isInProperties(this.names, args, true);
  }
  /**
	 * update property names used in frames.
	 * @return {Scene.Keyframes} An instance itself
	 */
  public update() {
    const items = this.items;

    for (const time in items) {
      this.updateFrame(items[time]);
    }
    return this;
  }
  /**
	 * executes a provided function once for each scene item.
	 * @param {Function} callback Function to execute for each element, taking three arguments
	 * @param {Scene.Frame} [callback.item] The value of the item being processed in the keyframes.
	 * @param {string} [callback.time] The time of the item being processed in the keyframes.
	 * @param {object} [callback.items] The object that forEach() is being applied to.
	 * @return {Scene.Keyframes} An instance itself
	 */
  public forEach(callback: (item: any, time: number, items: ObjectInterface<any>) => void) {
    const times = this.times;
    const items = this.items;

    times.forEach(time => {
      callback(items[time], time, items);
    });
  }
  /**
	* update property names used in frame.
	* @param {Scene.Frame} [frame] - frame of that time.
	* @return {Scene.Keyframes} An instance itself
	* @example
keyframes.updateFrame(frame);
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
	 * Get how long an animation should take to complete one cycle.
	 * @return {number} duration
	 */
  public getDuration() {
    const times = this.times;

    return times.length === 0 ? 0 : times[times.length - 1];
  }
  /**
	 * Set how long an animation should take to complete one cycle.
	 * @param {number} duration - duration
	 * @return {Scene.Keyframes} An instance itself.
	 */
  public setDuration(duration: number, originalDuration: number = this.getDuration()) {
    const ratio = duration / originalDuration;
    const { times, items } = this;
    const obj: ObjectInterface<any> = {};

    this.times = times.map(time => {
      const time2 = toFixed(time * ratio);

      obj[time2] = items[time];

      return time2;
    });
    this.items = obj;
  }
  /**
	 * Set how much time you want to push ahead.
	 * @param {number} time - time
	 * @return {Scene.Keyframes} An instance itself.
	 */
  public unshift(time: number) {
    const { times, items } = this;
    const obj: ObjectInterface<any> = {};

    this.times = times.map(t => {
      const time2 = toFixed(time + t);

      obj[time2] = items[t];
      return time2;
    });
    this.items = obj;
    return this;
  }
  /**
	* get size of list
	* @return {Number} length of list
	*/
  public size() {
    return this.times.length;
  }
  /**
	* add object in list
	* @param {Number} time - frame's time
	* @param {Object} object - target
	* @return {Scene.Keyframes} An instance itself
	*/
  public add(time: number, object: any) {
    this.items[time] = object;
    this.addTime(time);
    return this;
  }
  /**
	* Check if keyframes has object at that time.
	* @param {Number} time - object's time
	* @return {Boolean} true: if has time, false: not
	*/
  public has(time: number) {
    return time in this.items;
  }
  /**
	* get object at that time.
	* @param {Number} time - object's time
	* @return {Object} object at that time
	*/
  public get(time: number) {
    return this.items[time];
  }
  /**
	* remove object at that time.
	* @param {Number} time - object's time
	* @return {Keyframes} An instance itself
	*/
  public remove(time: number) {
    const items = this.items;

    delete items[time];
    this.removeTime(time);
    return this;
  }
  private addTime(time: number) {
    const times = this.times;
    const length = times.length;
    let pushIndex = length;

    for (let i = 0; i < length; ++i) {
      // if time is smaller than times[i], add time to index
      if (time === times[i]) {
        return this;
      } else if (time < times[i]) {
        pushIndex = i;
        break;
      }
    }
    this.times.splice(pushIndex, 0, time);
    return this;
  }
  private removeTime(time: number) {
    const index = this.times.indexOf(time);

    if (index > -1) {
      this.times.splice(index, 1);
    }
    return this;
  }
}
export default Keyframes;
