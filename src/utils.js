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

export const isUndefined = function(value) {
	return (typeof value === "undefined");
};
export const isObject = function(value) {
	return (typeof value === "object");
};
export const isArray = function(value) {
	return Array.isArray(value);
};
export const isString = function(value) {
	return (typeof value === "string");
};
export const has = function(object, name) {
	return Object.prototype.hasOwnProperty.call(object, name);
};
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

export const camelize = function camelize(str) {
	return str.replace(/[\s-_]([a-z])/g, (all, letter) => letter.toUpperCase());
};
export const defineProperty = function(target, name, descriptor) {
	Object.defineProperty(target, name, descriptor);
};
export const defineGetter = function({target, name, parent, prefix}) {
	defineProperty(target, name, {
		get: FUNCTIONS.get(parent, name, prefix),
	});
};
export const defineSetter = function({target, name, parent, prefix}) {
	defineProperty(target, name, {
		set: FUNCTIONS.set(parent, name, prefix),
	});
};
export const defineGetterSetter = function({target, name, parent, prefix}) {
	defineProperty(target, name, {
		get: FUNCTIONS.get(parent, name, prefix),
		set: FUNCTIONS.set(parent, name, prefix),
	});
};
