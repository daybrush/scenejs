import {SCENE_ROLES} from "./consts";
import {camelize, isObject, isString, isUndefined, isArray, has} from "./utils";
import {toPropertyObject, splitSpace} from "./Util/Property.js";
import PropertyObject from "./PropertyObject";

function isPropertyObject(value) {
	return value instanceof PropertyObject;
}
function clone(target) {
	return merge({}, target);
}
function merge(to, from) {
	for (let name in from) {
		const value = from[name];

		if (isObject(value)) {
			if (value instanceof PropertyObject) {
				to[name] = value.clone();
			} else if (isArray(value)) {
				to[name] = value.slice();
			} else if (isObject(to[name]) && !(to[name] instanceof PropertyObject)) {
				merge(to[name], value);
			} else {
				to[name] = clone(value);
			}
			continue;
		}
		to[name] = from[name];
	}
	return to;
}
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
		let role;

		this.properties = {};

		for (role in SCENE_ROLES) {
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

		let value;
		let property;

		for (property in properties) {
			value = properties[property];
			if (has(SCENE_ROLES, property)) {
				// role, properties
				this.set(property, value);
				continue;
			}
			if(isObject(value) && !isArray(value) && !isPropertyObject(value)) {
				this.set(property, value);
				continue;
			}
			// role, property, value
			this._set("property", property, value);
		}
		return this;
	}
	/**
	* get property value
	* @param {String} role - property role(property, transform, filter)
	* @param {String} property - property name
	* @return {Number|String|Scene.PropertyObejct} property value
	* @example
	frame.get("property", "display") // => "none", "block", ....
	*/
	get(role, property) {
		if (!property) {
			return this.properties["property"][role];
		}
		return this.properties[role] && this.properties[role][property];
	}
	/**
	* remove property value
	* @param {String} role - property role(property, transform, filter)
	* @param {String} property - property name
	* @return {Frame} An instance itself
	* @example
	frame.remove("property", "display")
	*/
	remove(role, property) {
		if (!property) {
			delete this.properties["property"][role];
		}
		delete this.properties[role][property];
	}
	_set(role, property, value) {
		let _value = value;

		if (isString(_value)) {
			_value = toPropertyObject(_value);
		}
		if (!(role in this.properties)) {
			this.properties[role] = {};
		}
		this.properties[role][property] = _value;
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
	set(role, property, _value) {
		let name;
		let value = _value;

		if (isObject(role)) {
			this.load(role);
			return this;
		}
		if (isObject(property)) {
			// role, properties
			for (name in property) {
				// role, property, value
				this._set(role, name, property[name]);
			}
			return this;
		}
		if (isUndefined(_value)) {
			if (isString(property)) {
				value = splitSpace(property).map(v => toPropertyObject(v));
				const length = value.length;

				const isProperties = value.every(v => v.model && v.type !== "color");

				if (isProperties) {
					value.forEach(v => this._set(role, v.model, v));
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
		return has(this.properties[role], property);
	}
	/**
	* copy frame.
	* @return {Scene.Frame} An instance of copy
	* @example
	frame.copy();
	*/
	clone() {
		const frame = new Frame();

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
	/**
	* get string into format for properties.
	* @param {String} role - property role(property, transform, filter)
	* @param {String} format - string format to get properties.
	* @param {String} separator - separator between properties.
	* @return {Frame} An instance itself
	* @example
var frame = new Scene.Frame({
	a: 1,
	b: 2,
	c: 3,
	transform: {
		translate: "10px, 10px",
		scale: 1,
	}
});
frame.format("property", "$1:$2;", ""); // => a:1;b:2;c:3;
frame.format("transform", "$1($2)", " "); // => translate(10px,10px) scale(1)
	*/
	format(role, format, separator) {
		const properties = this.properties[role];
		const arr = [];
		let value;
		let property;


		for (property in properties) {
			value = properties[property];
			if (value instanceof PropertyObject) {
				value = value.toValue();
			}
			value = format.replace(/\$1/g, property).replace(/\$2/g, value);
			arr.push(value);
		}

		return arr.join(separator);
	}
}
export default Frame;
