import { ROLES, ObjectInterface, MAXIMUM, FIXED, ALIAS } from "./consts";
import PropertyObject from "./PropertyObject";

export function setAlias(name: string, alias: string[]) {
	ALIAS[name] = alias;
}
export function setRole(names: string[], isProperty?: boolean, isFixedProperty?: boolean) {
	const length = names.length;
	let roles: any = ROLES;
	let fixed: any  = FIXED;

	for (let i = 0; i < length - 1; ++i) {
		!roles[names[i]] && (roles[names[i]] = {});
		roles = roles[names[i]];
		if (isFixedProperty) {
			!fixed[names[i]] && (fixed[names[i]] = {});
			fixed = fixed[names[i]];
		}
	}
	isFixedProperty && (fixed[names[length - 1]] = true);
	roles[names[length - 1]] = isProperty ? true : {};
}
export function getType(value: any) {
	const type = typeof value;

	if (type === "object") {
		if (isArray(value)) {
			return "array";
		} else if (value instanceof PropertyObject) {
			return "property";
		}
	} else if (type === "string" || type === "number") {
		return "value";
	}
	return type;
}
export function toFixed(num: number) {
	return Math.round(num * MAXIMUM) / MAXIMUM;
}
export function isInProperties(roles: ObjectInterface<any>, args: any[], isCheckTrue?: boolean) {
	const length = args.length;
	let role: any = roles;

	if (length === 0) {
		return false;
	}
	for (let i = 0; i < length; ++i) {
		if (role === true) {
			return false;
		}
		role = role[args[i]];
		if (!role || (!isCheckTrue && role === true)) {
			return false;
		}
	}
	return true;
}
export function isRole(args: any[], isCheckTrue?: boolean) {
	return isInProperties(ROLES, args, isCheckTrue);
}
export function isFixed(args: any[]) {
	return isInProperties(FIXED, args, true);
}
export function isUndefined(value: any): value is undefined {
	return (typeof value === "undefined");
}
export function isObject(value: any): value is ObjectInterface<any> {
	return value && (typeof value === "object");
}
export function isArray(value: any): value is any[] {
	return Array.isArray(value);
}
export function isString(value: any): value is string {
	return typeof value === "string";
}
export function has(object: object, name: string) {
	return Object.prototype.hasOwnProperty.call(object, name);
}
export function splitUnit(text: string) {
	const matches = /^([^\d|e|\-|\+]*)((?:\d|\.|-|e-|e\+)+)(\S*)$/g.exec(text);

	if (!matches) {
		return {prefix: "", unit: "", value: NaN};
	}
	const prefix = matches[1];
	const value = matches[2];
	const unit = matches[3];

	return {prefix, unit, value: parseFloat(value)};
}
// export function camelize(str: string) {
// 	return str.replace(/[\s-_]([a-z])/g, (all, letter) => letter.toUpperCase());
// }
export function decamelize(str: string) {
	return str.replace(/([a-z])([A-Z])/g, (all, letter, letter2) => `${letter}-${letter2.toLowerCase()}`);
}
