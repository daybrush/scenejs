/**
* @namespace
* @name Util
*/

const FUNCTIONS = {
	"get": function(parent, _property, prefix = "") {
		const property = prefix + _property;

		if (parent) {
			return function() {
				return this[parent][property];
			};
		}
		return function() {
			return this[property];
		};
	},
	"set": function(parent, _property, prefix = "") {
		const property = prefix + _property;

		if (parent) {
			return function(value) {
				this[parent][property] = value;
				return this;
			};
		}
		return function(value) {
			this[property] = value;
			return this;
		};
	},
};

/**
* check if type of value is undefined.
* @memberof Util
* @function isUndefined
* @param {Object} value - value to check.
* @example
if (!isUndefined("11")) {
	// defined
}
*/
export const isUndefined = function(value) {
	return (typeof value === "undefined");
};
/**
* check if type of value is object.
* @memberof Util
* @function isObject
* @param {Object} value - value to check.
* @example
if (isObject({})) {
	// object
}
*/
export const isObject = function(value) {
	return (typeof value === "object");
};
/**
* check if type of value is string.
* @memberof Util
* @function isString
* @param {Object} value - value to check.
* @example
if (isString("String")) {
	// string
}
*/
export const isString = function(value) {
	return (typeof value === "string");
};
/**
* check if this object has a property.
* @memberof Util
* @function has
* @param {Object} object - target
* @pararm {String} name - the name of the property.
* @example
if (has({a:1}, "a")) {
	// has
}
*/
export const has = function(object, name) {
	return Object.prototype.hasOwnProperty.call(object, name);
};
/**
* split number and unit of the value.
* @memberof Util
* @function splitUnit
* @param {String} value - value with or without unit.
* @example
const v = splitUnit("10px");
console.log(v.value); // 10
console.log(v.unit); // px
*/
export const splitUnit = function splitUnit(_value) {
	const v = `${_value}`;

	try {
		let value = v.match(/([0-9]|\.|-|e-|e\+)+/g, "")[0];
		const unit = v.replace(value, "") || "";

		value = parseFloat(value);


		return {unit, value};
	} catch (e) {
		return {unit: v};
	}
};
/**
* transform strings to camel-case
* @memberof Util
* @function camelize
* @param {String} str - value to transform.
* @example
console.log(camelize(" abcd")); // Abcd
console.log(camelize("abc def ghi")); // abcDefGhi
*/
export const camelize = function camelize(str) {
	return str.replace(/[\s-_]([a-z])/g, (all, letter) => letter.toUpperCase());
};
/**
* define the function or the variable.
* @memberof Util
* @function defineProperty
* @param {Object} target - the target to define the property.
* @param {name} name - the name of the property to be defined.
* @param {Object} descriptor - the descriptor for the property being defined.
* @example
const obj = {};
defineProperty(obj, "test", {
	get: function() {
		return "test2";
	},
});
console.log(obj.test); // test2
*/
export const defineProperty = function(target, name, descriptor) {
	Object.defineProperty(target, name, descriptor);
};
/**
* define getter function.
* @memberof Util
* @function defineGetter
* @param {Object} obj - parameters.
* @param {Object} obj.target - the target to define the property.
* @param {name} obj.name - the name of the property to be defined.
* @param {name} [obj.parent] - the target of the instance to define the property.
* @param {name} [obj.prefix] - the prefix of the name to define the property.
* @example
const obj = {};
defineGetter({target: obj, name: "test", prefix: "_"});
obj._test = 10;
console.log(obj.test); // 10
*/
export const defineGetter = function({target, name, parent, prefix}) {
	defineProperty(target, name, {
		get: FUNCTIONS.get(parent, name, prefix),
	});
};
/**
* define setter function.
* @memberof Util
* @function defineSetter
* @param {Object} obj - parameters.
* @param {Object} obj.target - the target to define the property.
* @param {name} obj.name - the name of the property to be defined.
* @param {name} [obj.parent] - the target of the instance to define the property.
* @param {name} [obj.prefix] - the prefix of the name to define the property.
* @example
const obj = {};
defineSetter({target: obj, name: "test", prefix: "_"});
obj.test = 10;
console.log(obj._test); // 10
*/
export const defineSetter = function({target, name, parent, prefix}) {
	defineProperty(target, name, {
		set: FUNCTIONS.set(parent, name, prefix),
	});
};
/**
* define getter and setter function.
* @memberof Util
* @function defineGetterSetter
* @param {Object} obj - parameters.
* @param {Object} obj.target - the target to define the property.
* @param {name} obj.name - the name of the property to be defined.
* @param {name} [obj.parent] - the target of the instance to define the property.
* @param {name} [obj.prefix] - the prefix of the name to define the property.
* @example
const obj = {};
defineGetterSetter({target: obj, name: "test", prefix: "_"});
obj.test = 10;
console.log(obj.test); // 10
*/
export const defineGetterSetter = function({target, name, parent, prefix}) {
	defineProperty(target, name, {
		get: FUNCTIONS.get(parent, name, prefix),
		set: FUNCTIONS.set(parent, name, prefix),
	});
};
