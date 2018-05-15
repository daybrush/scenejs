import {PROPERTY, SCENE_ROLES} from "./consts";
import {isObject, isString, isUndefined, isArray, has} from "./utils";
import {toPropertyObject, splitSpace} from "./utils/property";
import PropertyObject from "./PropertyObject";

function isPropertyObject(value) {
	return value instanceof PropertyObject;
}
/* eslint-disable */
function clone(target, toValue = false) {
	return merge({}, target, toValue);
}
function merge(to, from, toValue = false) {
	for (const name in from) {
		const value = from[name];

		if (isObject(value)) {
			if (value instanceof PropertyObject) {
				to[name] = toValue ? value.toValue() : value.clone();
			} else if (isArray(value)) {
				to[name] = value.slice();
			} else if (isObject(to[name]) && !(to[name] instanceof PropertyObject)) {
				merge(to[name], value, toValue);
			} else {
				to[name] = clone(value, toValue);
			}
			continue;
		}
		to[name] = from[name];
	}
	return to;
}
/* eslint-enable */
/**
 * Animation's Frame
 */
class Frame {
	/**
	* Create an animation's frame.
	* @param {Object} properties - properties
	* @example
let frame = new Scene.Frame({
	display: "none"
});
	*/
	constructor(properties) {
		this.properties = {};
		for (const role in SCENE_ROLES) {
			this.properties[role] = {};
		}
		this.load(properties);
	}
	/**
	* load json of properties.
	* @param {Object} properties - properties
	* @return {Frame} An instance itself
	* @example
frame.load({
	display: "none"
});
	*/
	load(properties) {
		if (properties && !isObject(properties)) {
			return this;
		}
		for (const property in properties) {
			const value = properties[property];

			if (has(SCENE_ROLES, property)) {
				// role, properties
				this.set(property, value);
				continue;
			}
			if (isObject(value) && !isArray(value) && !isPropertyObject(value)) {
				this.set(property, value);
				continue;
			}
			// role, property, value
			this._set(PROPERTY, property, value);
		}
		return this;
	}
	/**
	* get property value
	* @param {String} role - property role(property, transform, filter)
	* @param {String} property - property name
	* @return {Number|String|Scene.PropertyObejct} property value
	* @example
	frame.get("display") // => "none", "block", ....
	*/
	get(role, property) {
		const properties = this.properties;

		if (property) {
			return properties[role] && properties[role][property];
		} else if (role in SCENE_ROLES) {
			return properties[role];
		}
		return properties[PROPERTY][role];
	}
	/**
	* remove property value
	* @param {String} role - property role(property, transform, filter)
	* @param {String} property - property name
	* @return {Frame} An instance itself
	* @example
	frame.remove("display")
	*/
	remove(role, property) {
		if (property) {
			delete this.properties[role][property];
		} else if (role in SCENE_ROLES) {
			delete this.properties[role];
		} else {
			delete this.properties[PROPERTY][role];
		}
		return this;
	}
	_set(role, property, value) {
		const name = role.trim();
		const properties = this.properties;

		!(name in properties) && (properties[name] = {});
		properties[name][property] = isString(value) ? toPropertyObject(value) : value;
	}

	/**
	* set property
	* @param {Object|String} role - property role(property, transform, filter)
	* @param {Object|String} property - property name
	* @param {Object|String} value - property value
	* @return {Frame} An instance itself
	* @example
// one parameter
frame.set({
	display: "none",
	transform: {
		translate: "10px, 10px",
		scale: "1",
	},
	filter: {
		brightness: "50%",
		grayscale: "100%"
	}
});

// two parameters
frame.set("transform", {
	translate: "10px, 10px",
	scale: "1",
});

// three parameters
frame.set("property", "display", "none");
	*/
	set(role, property, value) {
		if (isObject(role)) {
			this.load(role);
			return this;
		} else if (isUndefined(property)) {
			const properties = role.split(";");
			const length = properties.length;

			for (let i = 0; i < length; ++i) {
				const matches = /([^:]*):([\S\s]*)/g.exec(properties[i]);

				if (!matches || matches.length < 3 || !matches[1]) {
					continue;
				}

				this.set(matches[1].trim(), matches[2]);
			}
			return this;
		}
		if (isObject(property)) {
			// role, properties
			for (const name in property) {
				// role, property, value
				this._set(role, name, property[name]);
			}
			return this;
		}
		if (isUndefined(value)) {
			if (isString(property)) {
				const arr = splitSpace(property).map(v => toPropertyObject(v));
				const isProperties = arr.every(v => v.model && v.type !== "color");

				if (isProperties) {
					arr.forEach(v => {
						const model = v.model;

						v.model = "";
						v.prefix = "";
						v.suffix = "";
						this._set(role, model, v.size() === 1 ? v.get(0) : v);
					});
					return this;
				}
			}
			this._set("property", role, property);
			return this;
		}
		this._set(role, property, value);
		return this;
	}
	/**
	* check that has property.
	* @param {String} role - property role(property, transform, filter)
	* @param {String} property - property name
	* @return {Boolean} true : has property, false : has not property
	* @example
	frame.has("property", "display") // => true or false
	*/
	has(role, property) {
		return this.properties[role] && has(this.properties[role], property);
	}
	/**
	* clone frame.
	* @return {Scene.Frame} An instance of clone
	* @example
	frame.clone();
	*/
	clone() {
		const frame = new this.constructor();

		frame.merge(this);

		return frame;
	}
	/**
	* merge one frame to other frame.
	* @param {Scene.Frame} frame - target frame.
	* @return {Scene.Frame} An instance itself
	* @example
	frame.merge(frame2);
	*/
	merge(frame) {
		const properties = this.properties;
		const frameProperties = frame.properties;

		if (!frameProperties) {
			return this;
		}
		merge(properties, frameProperties);

		return this;
	}
	toObject() {
		return clone(this.properties, true);
	}
}
export default Frame;
