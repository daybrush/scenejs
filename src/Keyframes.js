import {isObject, isArray} from "./utils";
import PropertyObject from "./PropertyObject";


function getNames(names, stack) {
	let arr = [];

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
function updateFrame(names, properties) {
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
	getNames() {
		const names = this.names;

		return getNames(names, []);
	}
	update() {
		const items = this.items;

		for (const time in items) {
			this.updateFrame(items[time]);
		}
		return this;
	}
	each(callback) {
		const times = this.times;
		const items = this.items;

		times.forEach(time => {
			callback(items[time], time);
		});
	}
	updateFrame(frame) {
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
	getDuration() {
		const times = this.times;

		return times.length === 0 ? 0 : times[times.length - 1];
	}
	setDuration(duration, originalDuration = this.getDuration()) {
		const ratio = duration / originalDuration;
		const {times, items} = this;
		const obj = {};

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
	size() {
		return this.times.length;
	}
	/**
	* add object in list
	* @param {Number} time - frame's time
	* @param {Object} object - target
	* @return {Keyframes} An instance itself
	*/
	add(time, object) {
		this.items[time] = object;
		this.addTime(time);
		return this;
	}
	addTime(time) {
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
	has(time) {
		return time in this.items;
	}
	/**
	* get object at that time.
	* @param {Number} time - object's time
	* @return {Object} object at that time
	*/
	get(time) {
		return this.items[time];
	}
	/**
	* remove object at that time.
	* @param {Number} time - object's time
	* @return {Keyframes} An instance itself
	*/
	remove(time) {
		const items = this.items;

		delete items[time];
		this.removeTime(time);
		return this;
	}
	removeTime(time) {
		const index = this.times.indexOf(time);

		if (index === -1) {
			return this;
		}
		this.times.splice(index, 1);
		return this;
	}
}
