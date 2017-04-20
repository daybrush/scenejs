import {SCENE_ROLES} from "./Constant.js";
import {
	camelize,
	isObject,
	isString,
	isUndefined,
	has,
} from "./Util.js";
import {toPropertyObject} from "./Util/Property.js";
import PropertyObject from "./PropertyObject";
/**
 * Animation's Frame
 */
class Frame {
	/**
	* add Role to Frame.
	* @static
	* @param {String} role - property role(property, transform, filter)
	* @example
Scene.Frame.addRole("property");
Scene.Frame.addRole("transform");
Scene.Frame.addRole("filter");
	*/
	static addRole(role) {
		const framePrototype = Frame.prototype;
		const _role = camelize(` ${role}`);

		framePrototype[`set ${_role}`] = function(property, value) {
			this.set(role, property, value);
		};
		framePrototype[`get ${_role}`] = function(property) {
			return this.get(role, property);
		};
		framePrototype[`remove ${_role}`] = function(property) {
			this.remove(role, property);
			return this;
		};
		SCENE_ROLES[role] = true;
	}
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
		this.updateNumber = 0;

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
		return this.properties[role][property];
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
		delete this.properties[role][property];
	}
	_set(role, property, value) {
		let _value = value;

		++this.updateNumber;
		if (isString(_value)) {
			_value = toPropertyObject(_value);
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
	set(role, property, value) {
		let name;
		let _value = value;

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


		if (isString(property) && isUndefined(_value)) {
			_value = toPropertyObject(property);
			if (!isObject(value)) {
				return this;
			}

			_value.each((obj, index) => {
				if (!isObject(obj)) {
					return;
				}

				if (!obj.model) {
					return;
				}

				if (obj.length === 1) {
					this._set(role, obj.model, obj.value[0]);
					return;
				}
				this._set(role, obj.model, new PropertyObject(obj.value, {
					separator: _value.separator,
				}));
			});
			return this;
		}
		this._set(role, property, _value);
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
	copy() {
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

		let _properties;
		let property;
		let value;
		let name;

		for (name in properties) {
			if (!has(frameProperties, name)) {
				continue;
			}
			_properties = frameProperties[name];
			for (property in _properties) {
				value = _properties[property];
				if (value instanceof PropertyObject) {
					value = value.copy();
				}

				this.set(name, property, value);
			}
		}

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
