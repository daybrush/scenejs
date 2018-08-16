import { SCENE_ROLES, ObjectInterface, MAXIMUM, FIXED } from "./consts";

export function toFixed(num: number) {
	return Math.round(num * MAXIMUM) / MAXIMUM;
}
export function isInProperties(roles: ObjectInterface<any>, args: any[]) {
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
		if (!role) {
			return false;
		}
	}
	return true;
}
export function isRole(args: any[]) {
	return isInProperties(SCENE_ROLES, args);
}
export function isFixed(args: any[]) {
	return isInProperties(FIXED, args);
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
	const v = text;
	const matches = v.match(/([0-9]|\.|-|e-|e\+)+/g);
	const value = matches ? matches[0] : text;
	const unit = v.replace(value, "") || "";

	return {unit, value: parseFloat(value)};
}
export function camelize(str: string) {
	return str.replace(/[\s-_]([a-z])/g, (all, letter) => letter.toUpperCase());
}
export function decamelize(str: string) {
	return str.replace(/([a-z])([A-Z])/g, (all, letter, letter2) => `${letter}-${letter2.toLowerCase()}`);
}
export function defineGetter(target: any, name: string, parent?: string) {
	target[camelize(`get ${name}`)] = function() {
		return (parent ? this[parent] : this)[name];
	};
}
export function defineSetter(target: any, name: string, parent?: string) {
	target[camelize(`set ${name}`)] = function(value: any) {
		parent ? (this[parent][name] = value) : (this[name] = value);
		return this;
	};
}
export function defineGetterSetter(target: any, name: string, parent?: string) {
	defineGetter(target, name, parent);
	defineSetter(target, name, parent);
}
