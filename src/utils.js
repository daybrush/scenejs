export const isPercent = function(value) {
	return ~value.search(/([0-9]|\.|-|e-|e\+)+%/g);
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
export const defineGetter = function(target, name, parent) {
	target[camelize(`get ${name}`)] = function() {
		return (parent ? this[parent] : this)[name];
	};
};
export const defineSetter = function(target, name, parent) {
	target[camelize(`set ${name}`)] = function(value) {
		parent ? (this[parent][name] = value) : (this[name] = value);
		return this;
	};
};
export const defineGetterSetter = function(target, name, parent) {
	defineGetter(target, name, parent);
	defineSetter(target, name, parent);
};
export const fill = function(arr, value) {
	const length = arr.length;

	for (let i = 0; i < length; ++i) {
		arr[i] = value;
	}
	return arr;
};
