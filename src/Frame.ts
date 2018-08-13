import {TRANSFORM, FILTER, ObjectInterface, NameType} from "./consts";
import {isObject, isString, isArray, isRole} from "./utils";
import {toPropertyObject, splitStyle, toObject} from "./utils/property";
import PropertyObject from "./PropertyObject";

function toInnerProperties(obj: ObjectInterface<string>) {
	if (!obj) {
		return "";
	}
	const arrObj = [];

	for (const name in obj) {
		arrObj.push(`${name}(${obj[name]})`);
	}
	return arrObj.join(" ");
}
function isPropertyObject(value: any) {
	return value instanceof PropertyObject;
}
/* eslint-disable */
function clone(target: ObjectInterface<any>, toValue = false) {
	return merge({}, target, toValue);
}
function merge(to: ObjectInterface<any>, from: ObjectInterface<any>, toValue = false) {
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
* @class Scene.Frame
* @param {Object} properties - properties
* @example
const frame = new Scene.Frame({
	display: "none"
	transform: {
		translate: "50px",
		scale: "5, 5",
	}
});
 */
class Frame {
	public properties: ObjectInterface<any>;
	constructor(properties: ObjectInterface<any> = {}) {
		this.properties = {};
		this.set(properties);
	}
	/**
	* get property value
	* @method Scene.Frame#get
	* @param {...Number|String|Scene.PropertyObejct} args - property name or value
	* @example
	frame.get("display") // => "none", "block", ....
	frame.get("transform", "translate") // => "10px,10px"
	*/
	public get(...args: NameType[]) {
		let properties = this.properties;
		const length = args.length;

		for (let i = 0; i < length; ++i) {
			if (!isObject(properties)) {
				return undefined;
			}
			properties = properties[args[i]];
		}
		return properties;
	}
	/**
	* remove property value
	* @method Scene.Frame#remove
	* @param {...String} args - property name
	* @return {Scene.Frame} An instance itself
	* @example
	frame.remove("display")
	*/
	public remove(...args: NameType[]) {
		let properties = this.properties;
		const length = args.length;

		if (!length) {
			return this;
		}
		for (let i = 0; i < length - 1; ++i) {
			if (!isObject(properties)) {
				return this;
			}
			properties = properties[args[i]];
		}
		delete properties[args[length - 1]];
		return this;
	}
	/**
	* set property
	* @method Scene.Frame#set
	* @param {...Number|String|Scene.PropertyObejct} args - property names or values
	* @return {Scene.Frame} An instance itself
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
frame.set("transform", "translate", "50px");
	*/
	public set(...args: any[]) {
		const length = args.length;
		const params = args.slice(0, -1);
		const value = args[length - 1];

		if (length === 2 && isArray(params[0])) {
			this._set(params[0], value);
		} else if (isArray(value)) {
			this._set(params, value);
		} else if (isPropertyObject(value)) {
			if (isRole(params)) {
				this.set(...params, toObject(value));
			} else {
				this._set(params, value);
			}
		} else if (isObject(value)) {
			for (const name in value) {
				this.set(...params, name, value[name]);
			}
		} else if (isString(value)) {
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
			this._set(params, value);
		} else {
			this._set(params, value);
		}
		return this;
	}
	/**
	* check that has property.
	* @method Scene.Frame#has
	* @param {...String} args - property name
	* @example
	frame.has("property", "display") // => true or false
	*/
	public has(...args: NameType[]) {
		let properties = this.properties;
		const length = args.length;

		if (!length) {
			return false;
		}
		for (let i = 0; i < length; ++i) {
			if (!isObject(properties) || !(args[i] in properties)) {
				return false;
			}
			properties = properties[args[i]];
		}
		return true;
	}
	/**
	* clone frame.
	* @method Scene.Frame#clone
	* @return {Scene.Frame} An instance of clone
	* @example
	frame.clone();
	*/
	public clone() {
		const frame = new Frame();

		frame.merge(this);
		return frame;
	}
	/**
	* merge one frame to other frame.
	* @method Scene.Frame#merge
	* @param {Scene.Frame} frame - target frame.
	* @return {Scene.Frame} An instance itself
	* @example
	frame.merge(frame2);
	*/
	public merge(frame: Frame) {
		const properties = this.properties;
		const frameProperties = frame.properties;

		if (!frameProperties) {
			return this;
		}
		merge(properties, frameProperties);

		return this;
	}
	public toObject() {
		return clone(this.properties, true);
	}
	/**
	* Specifies an css object that coverted the frame.
	* @method Scene.Frame#toCSSObject
	* @return {object} cssObject
	*/
	public toCSSObject() {
		const properties = this.toObject();
		const cssObject: ObjectInterface<string> = {};

		for (const name in properties) {
			if (isRole([name])) {
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
	* @method Scene.Frame#toCSS
	* @return {string} cssText
	*/
	public toCSS() {
		const cssObject = this.toCSSObject();
		const cssArray = [];

		for (const name in cssObject) {
			cssArray.push(`${name}:${cssObject[name]};`);
		}
		return cssArray.join("");
	}
	private _set(args: NameType[], value: any) {
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
}
export default Frame;
