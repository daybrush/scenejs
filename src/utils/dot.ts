/**
* @namespace
* @name Dot
*/

import {isArray, splitUnit} from "../utils";
import PropertyObject from "../PropertyObject";
import { EasingType } from "../Animator";

function getType(value: any) {
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
/**
* The dot product of Arrays
* @memberof Dot
* @function dotArray
* @param {Array} a1 value1
* @param {Array} a2 value2
* @param {Number} b1 b1 ratio
* @param {Number} b2 b2 ratio
* @return {Array|Object} Array.
* @example
dotArray([0, 0, 0, 1],[50, 50, 50, 1],0.5, 0.5);
// => [25, 25, 25, 1]
*/
export function dotArray(a1: any[], a2: any, b1: number, b2: number): any {
	if (b2 === 0) {
		return a2;
	}
	if (!isArray(a2)) {
		return a1;
	}
	const length = a2.length;

	return a1.map((v1, i) => {
		if (i >= length) {
			return v1;
		} else {
			return dot(v1, a2[i], b1, b2);
		}
	});
}

/**
* The dot product of PropertyObject(type=color)
* If the values are not RGBA model, change them RGBA mdoel.
* @memberof Dot
* @function dotColor
* @param {PropertyObject} a1 value1
* @param {PropertyObject} a2 value2
* @param {Number} b1 b1 ratio
* @param {Number} b2 b2 ratio
* @return {PropertyObject} PropertyObject(type=color).
* @example
var colorObject = ......; //PropertyObject(type=color, model="rgba", value=[254, 254, 254, 1]);
dotColor("#000",  colorObject, 0.5, 0.5);
// "#000" => PropertyObject(type=color, model="rgba", value=[0, 0, 0, 1]);
// return => PropertyObject(type=color, model="rgba", value=[127, 127, 127, 1]);
*/
export function dotColor(color1: PropertyObject, color2: PropertyObject, b1: number, b2: number) {
	if (b2 === 0) {
		return color2;
	}
	// convert array to PropertyObject(type=color)
	const value1 = color1.value;
	const value2 = color2.value;
	// If the model name is not same, the inner product is impossible.
	const model1 = color1.getOption("model");
	const model2 = color2.getOption("model");

	if (model1 !== model2) {
		// It is recognized as a string.
		return dot(color1.toValue(), color2.toValue(), b1, b2);
	}
	if (value1.length === 3) {
		value1[3] = 1;
	}
	if (value2.length === 3) {
		value2[3] = 1;
	}
	const v = dotArray(value1, value2, b1, b2);
	const colorModel = model1;

	for (let i = 0; i < 3; ++i) {
		v[i] = parseInt(v[i], 10);
	}
	const object = new PropertyObject(v, {
		type: "color",
		model: colorModel,
		prefix: `${colorModel}(`,
		suffix: ")",
	});

	return object;
}
/**
* The dot product of Objects
* @memberof Dot
* @function dotObject
* @param {PropertyObject} a1 value1
* @param {PropertyObject} a2 value2
* @param {Number} b1 b1 ratio
* @param {Number} b2 b2 ratio
* @return {PropertyObject} Array with Separator.
* @example
dotObject(PropertyObject(["1px", "solid", rgba(0, 0, 0, 1)]),
PropertyObject(["9px", "solid", rgba(50, 50, 50, 1)]),
0.5, 0.5);
// => PropertyObject(["5px", "solid", rgba(25, 25, 25, 1)])
*/
export function dotObject(a1: PropertyObject, a2: PropertyObject, b1: number, b2: number) {
	const a1Type = a1.getOption("type");

	if (a1Type === "color") {
		return dotColor(a1, a2, b1, b2);
	}
	const value1 = a1.value;
	const value2 = a2.value;
	const arr = dotArray(value1, value2, b1, b2);

	return new PropertyObject(arr, {
		type: a1Type,
		separator: a1.getOption("separator") || a2.getOption("separator"),
		prefix: a1.getOption("prefix") || a2.getOption("prefix"),
		suffix: a1.getOption("suffix") || a2.getOption("suffix"),
		model: a1.getOption("model") || a2.getOption("model"),
	});
}
/**
* The dot product of a1 and a2 for the b1 and b2.
* @memberof Dot
* @function dot
* @param {String|Number|PropertyObject} a1 value1
* @param {String|Number|PropertyObject} a2 value2
* @param {Number} b1 b1 ratio
* @param {Number} b2 b2 ratio
* @return {String} Not Array, Not Separator, Only Number & Unit
* @return {PropertyObject} Array with Separator.
* @example
dot(1, 3, 0.3, 0.7);
// => 1.6
*/
export function dot(a1: any, a2: any, b1: number, b2: number): any {
	if (b2 === 0) {
		return a2;
	} else if (b1 === 0 || b1 + b2 === 0) {
		// prevent division by zero.
		return a1;
	}
	// dot Object

	const type1 = getType(a1);
	const type2 = getType(a2);

	if (type1 === type2) {
		if (type1 === "property") {
			return dotObject(a1, a2, b1, b2);
		} else if (type1 === "array") {
			return dotArray(a1, a2, b1, b2);
		} else if (type1 === "object" || type1 === "boolean" || type1 === "function") {
			return a1;
		}
	} else {
		return a1;
	}
	// split number and unit of the value.
	const r1 = b1 / (b1 + b2);
	const r2 = 1 - r1;

	const v1 = splitUnit(`${a1}`);
	const v2 = splitUnit(`${a2}`);
	let v;

	// 숫자가 아닐경우 첫번째 값을 반환 b2가 0일경우 두번째 값을 반환
	if (isNaN(v1.value) || isNaN(v2.value)) {
		return a1;
	} else {
		v = v1.value * r2 + v2.value * r1;
	}
	const prefix = v1.prefix || v2.prefix;
	const unit = v1.unit || v2.unit;

	if (!prefix && !unit) {
		return v;
	}
	return prefix + v + unit;
}

export function dotValue(
	time: number,
	prevTime: number,
	nextTime: number,
	prevValue: any,
	nextValue: any,
	easing?: EasingType) {
	if (time === prevTime) {
		return prevValue;
	} else if (time === nextTime) {
		return nextValue;
	} else if (!easing) {
		return dot(prevValue, nextValue, time - prevTime, nextTime - time);
	}
	const ratio = easing((time - prevTime) / (nextTime - prevTime));
	const value = dot(prevValue, nextValue, ratio, 1 - ratio);

	return value;
}
