import { SCENE_ROLES } from "./consts";

export const isRole = function(args) {
	const length = args.length;
	let role = SCENE_ROLES;

	if (length === 0) {
		return false;
	}
	for (let i = 0; i < length; ++i) {
		role = role[args[i]];
		if (!role) {
			return false;
		}
	}
	return true;
}
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
export const decamelize = function decamelize(str) {
	return str.replace(/([a-z])([A-Z])/g, (all, letter, letter2) => `${letter}-${letter2.toLowerCase()}`);
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
