const FUNCTIONS = {
	"get": function(parent, property, prefix = "") {
		const _property = prefix + property;

		if (parent) {
			return function() {
				return this[parent][_property];
			};
		}
		return function() {
			return this[_property];
		}
	},
	"set": function(parent, property, prefix = "") {
		property = prefix + property;
		if(parent) {
			return function(value) {
				this[parent][property] = value;
				return this;
			}
		}
		return function(value) {
			this[property] = value;
			
			return this;
		}
	}
}
export const has = function has(object, name) {
	return Object.prototype.hasOwnProperty.call(object, name);
}
export const splitUnit = function splitUnit(v) {
	v += "";
	try {
		let value = v.match(/([0-9]|\.|\-|e\-|e\+)+/g, "")[0];
		let unit = v.replace(value, "") || "";

		value = parseFloat(value);


		return {unit:unit, value:value};
	} catch(e) {
		return {unit:v}
	}
}

export const camelize = function camelize(str) {
	return str.replace(/[\s-_]([a-z])/g, function(all, letter) {
		return letter.toUpperCase();
	});
}
export const assign = function(object, ...objects) {
	const length = objects.length;
	let i, j, obj;
	for(i = 0; i < length; ++i) {
		obj = objects[i];
		if(!isObject(obj))
			continue;

		for(j in obj) {
			objects[j] = obj[j];
		}
	}
}
export const defineProperty = function(target, name, func) {
	Object.defineProperty(target, name, func);
}
export const defineGetter = function({target, name, parent, prefix}) {
	defineProperty(target, name, {
		get: FUNCTIONS["get"](parent, name, prefix)
	});
}
export const defineSetter = function({target, name, parent, prefix}) {
	defineProperty(target, name, {
		set: FUNCTIONS["set"](parent, name, prefix)
	});
}
export const defineGetterSetter = function({target, name, parent, prefix}) {
	defineProperty(target, name, {
		get: FUNCTIONS["get"](parent, name, prefix),
		set: FUNCTIONS["set"](parent, name, prefix)
	});
}





export const isUndefined = function(value) {
	return (typeof value === "undefined");
}

export const isObject = function(value) {
	return (typeof value === "object");
}

export const isString = function(value) {
	return (typeof value === "string");
}
