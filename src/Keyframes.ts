import { ObjectInterface, RoleInterface } from "./consts";
import {isObject, isArray} from "./utils";
import PropertyObject from "./PropertyObject";
import Frame from "./Frame";

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
*/
export default class Keyframes {
	public times: number[];
	public items: ObjectInterface<any>;
	public names: RoleInterface;

	constructor() {
		this.times = [];
		this.items = {};
		this.names = {};
	}
	// hasName(...args) {
	// 	const length = args.length;
	// 	let names = this.names;

	// 	if (!length) {
	// 		return false;
	// 	}
	// 	for (let i = 0; i < length; ++i) {
	// 		if (!isObject(names) || !(args[i] in names)) {
	// 			return false;
	// 		}
	// 		names = names[args[i]];
	// 	}
	// 	return true;
	// }
	public getNames() {
		const names = this.names;

		return getNames(names, []);
	}
	public update() {
		const items = this.items;

		for (const time in items) {
			this.updateFrame(items[time]);
		}
		return this;
	}
	public each(callback: (item: any, time: number, items: ObjectInterface<any>) => void) {
		const times = this.times;
		const items = this.items;

		times.forEach(time => {
			callback(items[time], time, items);
		});
	}
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
	* get last time of list
	* @return {Number} last time
	*/
	public getDuration() {
		const times = this.times;

		return times.length === 0 ? 0 : times[times.length - 1];
	}
	public setDuration(duration: number, originalDuration: number = this.getDuration()) {
		const ratio = duration / originalDuration;
		const {times, items} = this;
		const obj: ObjectInterface<any> = {};

		this.times = times.map(time => {
			const time2 = time * ratio;

			obj[time2] = items[time];

			return time2;
		});
		this.items = obj;
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
	* @return {Keyframes} An instance itself
	*/
	public add(time: number, object: any) {
		this.items[time] = object;
		this.addTime(time);
		return this;
	}
	public addTime(time: number) {
		const times = this.times;
		const length = times.length;
		let pushIndex = length;
		let i;

		for (i = 0; i < length; ++i) {
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
	public removeTime(time: number) {
		const index = this.times.indexOf(time);

		if (index === -1) {
			return this;
		}
		this.times.splice(index, 1);
		return this;
	}
}
