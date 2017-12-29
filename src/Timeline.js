import {has} from "./utils";
// import TimelineStep from "./TimelineStep";
/**
* a list of objects in chronological order.
*/
class Timeline {
	constructor() {
		this.times = [];
		this.item = {};
	}
	/**
	* get last time of list
	* @readonly
	* @return {Number} last time
	*/
	get last() {
		const times = this.times;

		return times.length === 0 ? 0 : times[times.length - 1];
	}
	/**
	* get last time of list
	* @readonly
	* @return {Number} length of list
	*/
	get length() {
		return this.times.length;
	}
	/**
	* add object in list
	* @param {Number} time - frame's time
	* @param {Object} object - target
	* @return {Timeline} An instance itself
	*/
	add(time, object) {
		this.item[time] = object;
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
	* Check if timeline has object at that time.
	* @param {Number} time - object's time
	* @return {Boolean} true: if has time, false: not
	*/
	has(time) {
		return has(this.item, time);
	}
	/**
	* get object at that time.
	* @param {Number} time - object's time
	* @return {Object} object at that time
	*/
	get(time) {
		return this.item[time];
	}
	/**
	* remove object at that time.
	* @param {Number} time - object's time
	* @return {Timeline} An instance itself
	*/
	remove(time) {
		delete this.item[time];
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
export default Timeline;
