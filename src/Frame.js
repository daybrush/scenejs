import {TRANSFORM, FILTER, SCENE_ROLES} from "./consts";
import {isObject, isString, isUndefined, isArray, isRole} from "./utils";
import {toPropertyObject, splitStyle, toObject} from "./utils/property";
import PropertyObject from "./PropertyObject";

function toInnerProperties(obj) {
	if (!obj) {
		return "";
	}
	const arrObj = [];

	for (const name in obj) {
		arrObj.push(`${name}(${obj[name]})`);
	}
	return arrObj.join(" ");
}
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
	constructor(properties = {}) {
		this.properties = {};
		this.set(properties);
	}
	/**
	* get property value
	* @param {...Number|String|Scene.PropertyObejct} args - property name or value
	* @example
	frame.get("display") // => "none", "block", ....
	frame.get("transform", "translate") // => "10px,10px"
	*/
	get(...args) {
		let properties = this.properties;
		const length = args.length;

		for (let i = 0; i < length; ++i) {
			if (isUndefined(properties)) {
				return properties;
			}
			properties = properties[args[i]];
		}
		return properties;
	}
	/**
	* remove property value
	* @param {...String} args - property name
	* @return {Frame} An instance itself
	* @example
	frame.remove("display")
	*/
	remove(...args) {
		let properties = this.properties;
		const length = args.length;

		if (!length) {
			return this;
		}
		for (let i = 0; i < length - 1; ++i) {
			if (isUndefined(properties)) {
				return this;
			}
			properties = properties[args[i]];
		}
		delete properties[args[length - 1]];
		return this;
	}
	_set(args, value) {
		let properties = this.properties;
		const length = args.length;

		for (let i = 0; i < length - 1; ++i) {
			const name = args[i];

			!(name in properties) && (properties[name] = {});
			properties = properties[name];
		}
		if (!length) {
			return;
		}
		properties[args[length - 1]] = isString(value) ? toPropertyObject(value) : value;
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
	set(...args) {
		const length = args.length;
		const params = args.slice(0, -1);
		const value = args[length - 1];

		if (isArray(value)) {
			this._set(params, value);
			return this;
		}
		if (isPropertyObject(value)) {
			if (isRole(params)) {
				this.set(...params, toObject(value));
			} else {
				this._set(params, value);
			}
			return this;
		}
		if (isObject(value)) {
			const params = args.slice(0, -1);

			for (const name in value) {
				this.set(...params, name, value[name]);
			}
			return this;
		}
		if (isString(value)) {
			const params = args.slice(0, -1);

			if (isRole(params)) {
				this.set(...params, toPropertyObject(value));
				return this;
			} else {
				const styles = splitStyle(value);

				styles.forEach(style => {
					this.set(...params, style);
				});
				if (styles.length) {
					return this;
				}
			}
		}
		this._set(params, value);
		return this;
	}
	/**
	* check that has property.
	* @param {...String} args - property name
	* @example
	frame.has("property", "display") // => true or false
	*/
	has(...args) {
		let properties = this.properties;
		const length = args.length;

		for (let i = 0; i < length; ++i) {
			if (!properties || !(args[i] in properties)) {
				return false;
			}
			properties = properties[args[i]];
		}
		return true;
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
	/**
	* Specifies an css object that coverted the frame.
	* @return {object} cssObject
	*/
	toCSSObject() {
		const properties = this.toObject();
		const cssObject = {};

		for (const name in properties) {
			if (SCENE_ROLES[name]) {
				continue;
			}
			cssObject[name] = properties[name];
		}
		const transform = toInnerProperties(properties.transform);
		const filter = toInnerProperties(properties.filter);

		TRANSFORM && transform && (cssObject[TRANSFORM] = transform);
		FILTER && filter && (cssObject[FILTER] = filter);

		return cssObject;
	}
	/**
	* Specifies an css text that coverted the frame.
	* @return {string} cssText
	*/
	toCSS() {
		const cssObject = this.toCSSObject();
		const cssArray = [];

		for (const name in cssObject) {
			cssArray.push(`${name}:${cssObject[name]};`);
		}
		return cssArray.join("");
	}
}
export default Frame;
