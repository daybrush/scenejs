import Timeline from "./Timeline";

/**
* Animation's Timeline with Frame
* @extends Timeline
*/
class FrameTimeline extends Timeline {
	constructor() {
		super();
		this.names = {};
	}
	/**
	* update property names used in frames.
	* @return {FrameTimeline} An instance itself
	* @example
timeline.update();
	*/
	update() {
		const items = this.items;

		for (const time in items) {
			this.updateFrame(items[time]);
		}
		return this;
	}
	updateFrame(frame) {
		if (!frame) {
			return this;
		}
		const roles = frame.properties;
		const names = this.names;

		for (const role in roles) {
			names[role] = names[role] || {};
			const properties = roles[role];

			for (const name in properties) {
				names[role][name] = true;
			}
		}
		return this;
	}
}

export default FrameTimeline;
