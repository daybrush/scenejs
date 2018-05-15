import Timeline from "./Timeline";

class FrameTimeline extends Timeline {
	constructor() {
		super();
		this.names = {};
	}
	hasName(role, name) {
		const names = this.names;

		return (role in names) && names[role] && (name in names[role]);
	}
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
