import Animator from "./Animator";
import Frame from "./Frame";
import {
	camelize,
	isUndefined,
	isObject,
	defineGetter,
} from "./Util";
import FrameTimeline from "./FrameTimeline";
import {dot} from "./Util/Dot";
import {SCENE_ROLES} from "./Constant.js";

/**
* manage Frame Timeline and play Timeline.
* @extends Animator
*/
class SceneItem extends Animator {
	static addGetterSetter(role) {
		this.prototype[camelize(`set ${role}`)] = function(time, properties, value) {
			this.set(time, role, properties, value);
			return this;
		};
		this.prototype[camelize(`get ${role}`)] = function(time, property) {
			const frame = this.getFrame(time);

			if (!frame) {
				return 0;
			}
			return frame.get(role, property);
		};
	}
	/**
	* add Role to SceneItem.
	* @static
	* @param {String} role - property role(property, transform, filter)
	* @example
Scene.SceneItem.addRole("property");
Scene.SceneItem.addRole("transform");
Scene.SceneItem.addRole("filter");
	*/
	static addRole(role) {
		Frame.addRole(role);
		this.addGetterSetter(role);
	}
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
	constructor(properties) {
		super();
		this.timeline = new FrameTimeline();
		this.load(properties);
	}
	/**
	* Specifies how many seconds an animation takes to complete one cycle
	* Specifies timeline's lastTime
	* @override
	* @example
item.duration; // = item.timeline.last
	*/
	get duration() {
		return this.timeline.last;
	}
	set id(_id) {
		this.setId(_id);
	}
	setId(_id) {
		this.options.id = _id;
	}
	/**
	* set properties to the sceneItem at that time
	* @param {Number} time - time
	* @param {String|Object} role - property role or properties
	* @param {String|Object} [properties] - property's name or properties
	* @param {Object} [value] - property's value
	* @return {SceneItem} An instance itself
	* @example
item.duration; // = item.timeline.last
	*/
	set(time, role, properties, value) {
		if (isObject(time)) {
			this.load(time);
			return this;
		}
		let frame = this.getFrame(time);

		if (!frame) {
			frame = this.newFrame(time);
		}
		frame.set(role, properties, value);
		this.updateFrame(time, frame);
		return this;
	}
	setIterationTime(_time) {
		super.setIterationTime(_time);
		const time = this.currentIterationTime;
		const frame = this.getNowFrame(time);

		if (!frame) {
			return this;
		}
		this.trigger("animate", [time, this.getNowFrame(time), this.currentTime]);
		return this;
	}
	/**
	* update property names used in frames.
	* @override
	* @return {SceneItem} An instance itself
	* @example
item.update();
	*/
	update() {
		this.timeline.update();
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
	updateFrame(time, frame = this.getFrame(time)) {
		this.timeline.updateFrame(time, frame);
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
		if (!isUndefined(time)) {
			this.setFrame(time, frame);
		}
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
		this.timeline.add(time, frame);
		return this;
	}
	/**
	* get sceneItem's frame at that time
	* @param {Number} time - frame's time
	* @return {Frame} sceneItem's frame at that time
	* @example
const frame = item.getFrame(time);
	*/
	getFrame(time) {
		return this.timeline.get(time);
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
		return this.timeline.has(time);
	}
	/**
	* remove sceneItem's frame at that time
	* @param {Number} time - frame's time
	* @return {SceneItem} An instance itself
	* @example
item.removeFrame(time);
	*/
	removeFrame(time) {
		const timeline = this.timeline;

		timeline.remove(time);
		delete this.frames[time];

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
		let time;

		if (isObject(fromTime)) {
			for (time in fromTime) {
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
		let time;

		if (isObject(fromTime)) {
			for (time in fromTime) {
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
	getNowValue(role, property, time, left = 0, right = this.timeline.length) {
		const timeline = this.timeline;
		const times = timeline.times;
		const length = times.length;

		let prevFrame;
		let nextFrame;
		let i;

		let prevTime = times[left];
		let nextTime = times[right];

		if (time < prevTime) {
			return undefined;
		}
		for (i = left; i >= 0; --i) {
			prevTime = times[i];
			prevFrame = timeline.get(prevTime);
			if (prevFrame.has(role, property)) {
				break;
			}
		}
		for (i = right; i < length; ++i) {
			nextTime = times[i];
			nextFrame = timeline.get(nextTime);
			if (nextFrame.has(role, property)) {
				break;
			}
		}

		const prevValue = prevFrame.get(role, property);

		if (isUndefined(prevValue)) {
			return undefined;
		}
		if (!nextFrame) {
			return prevValue;
		}
		const nextValue = nextFrame.get(role, property);

		if (isUndefined(nextValue)) {
			return prevValue;
		}

		if (prevTime < 0) {
			prevTime = 0;
		}

		const value = dot(prevValue, nextValue, time - prevTime, nextTime - time);

		return value;
	}
	getLeftRightIndex(time) {
		const timeline = this.timeline;
		const {times, last, length} = timeline;

		if (length === 0) {
			return undefined;
		}
		// index : length = time : last
		let index = parseInt(last > 0 ? time * length / last : 0, 10);
		let right = length - 1;
		let left = 0;


		if (index < 0) {
			index = 0;
		} else if (index > right) {
			index = right;
		}
		if (time < times[right]) {
			// Binary Search
			while (left < right) {
				if ((left === index || right === index) && (left + 1 === right)) {
					break;
				} else if (times[index] > time) {
					right = index;
				} else if (times[index] < time) {
					left = index;
				} else {
					right = index;
					left = right;
					break;
				}
				index = parseInt((left + right) / 2, 10);
			}
		} else {
			index = right;
			left = index;
		}
		return {left, right};
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
	getNowFrame(time) {
		this.update();

		const indices = this.getLeftRightIndex(time);

		if (!indices) {
			return indices;
		}
		const {left, right} = indices;
		const frame = this.newFrame();

		const names = this.timeline.names;
		let role;
		let propertyNames;
		let property;
		let value;

		for (role in SCENE_ROLES) {
			propertyNames = names[role];
			for (property in propertyNames) {
				value = this.getNowValue(role, property, time, left, right);

				if (isUndefined(value)) {
					continue;
				}
				frame.set(role, property, value);
			}
		}
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
	load(properties) {
		if (!isObject(properties)) {
			return this;
		}
		let isOptions = false;
		let time;
		let _properties;

		for (time in properties) {
			if (time === "options") {
				isOptions = true;
				continue;
			}
			_properties = properties[time];
			if (typeof _properties === "number") {
				this.mergeFrame(_properties, time);
				continue;
			}
			this.set(time, properties[time]);
		}
		if (isOptions) {
			this.setOptions(properties.options);
		}
		return this;
	}
}
/**
* Specifies the item's id to synchronize the element.
* @memberof SceneItem
* @instance
* @name id
*/
defineGetter({target: SceneItem.prototype, name: "id", parent: "options"});

SceneItem.addRole("property");
export default SceneItem;
