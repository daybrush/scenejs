import Timeline from "./Timeline";
import {SCENE_ROLES} from "./Constant";
import {has} from "./Util";
/**
* Animation's Timeline with Frame
* @extends Timeline
*/
class FrameTimeline extends Timeline {
	constructor() {
		super();
		this.updateNumber = {};
		this.names = {};
		const names = this.names;

		for (const role in SCENE_ROLES) {
			names[role] = {};
		}
	}
	addTime(time) {
		super.addTime(time);

		if (has(this.updateNumber, time)) {
			return this;
		}
		this.updateNumber[time] = 0;

		return this;
	}
	removeTime(time) {
		super.removeTime(time);
		delete this.updateNumber[time];
	}
	/**
	* update property names used in frames.
	* @return {Scene.Frame} An instance itself
	* @example
timeline.update();
	*/
	update() {
		const updateNumber = this.updateNumber;
		let frame;
		let time;

		for (time in updateNumber) {
			frame = this.get(time);
			if (updateNumber[time] === frame.updateNumber) {
				continue;
			}
			this.updateFrame(time, frame);
		}
		return this;
	}
	/**
	* update property names used in frame.
	* @param {Number} time - frame's time
	* @param {Frame} [frame] - frame of that time.
	* @return {Scene.Frame} An instance itself
	* @example
timeline.updateFrame(time, this.get(time));
	*/
	updateFrame(time, frame = this.get(time)) {
		if (!frame) {
			return this;
		}
		const frameRoles = frame.properties;
		const itemNames = this.names;
		let frameProperties;
		let itemPropertyNames;
		let name;

		for (const role in frameRoles) {
			frameProperties = frameRoles[role];
			itemPropertyNames = itemNames[role];

			for (name in frameProperties) {
				if (has(itemPropertyNames, name)) {
					continue;
				}
				itemPropertyNames[name] = true;
			}
		}
		this.updateNumber[time] = frame.updateNumber;
		return this;
	}
}

export default FrameTimeline;
