import PropertyObject from "./PropertyObject";
import Timeline from "./Timeline";
import {TYPE_PROPERTY_OBJECT, TYPE_ARRAY, TYPE_TEXT} from "./consts";

function getType(value) {
	if (value instanceof PropertyObject) {
		return TYPE_PROPERTY_OBJECT;
	} else if (Array.isArray(value)) {
		return TYPE_ARRAY;
	}
	return TYPE_TEXT;
}

class FrameTimeline extends Timeline {
	constructor() {
		super();
		this.names = {};
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
				const value = properties[name];
				const type = getType(value);
				const size = (type === TYPE_PROPERTY_OBJECT && value.size()) ||
					(type === TYPE_ARRAY && value.length) || 0;
				const separator = (type === TYPE_PROPERTY_OBJECT && value.separator) || "";

				names[role][name] = {type, size, separator};
			}
		}
		return this;
	}
}

export default FrameTimeline;
