/**
* @namespace
* @name Dot
*/

import {isObject, splitUnit} from "../Util";
import PropertyObject from "../PropertyObject";
import {toColorObject} from "./Property";

let dot;

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
export const dotArray = function(a1, a2, b1, b2) {
	const obj = [];
	let v1;
	let i;

	for (i in a1) {
		v1 = a1[i];
		if (!(i in a2)) {
			obj[i] = v1;
		} else {
			obj[i] = dot(v1, a2[i], b1, b2);
		}
	}
	return obj;
};

/**
* The dot product of PropertyObject(type=color)
* If the values are not RGBA model, change them RGBA mdoel.
* @memberof Dot
* @function dotColor
* @param {PropertyObject|String} a1 value1
* @param {PropertyObject|String} a2 value2
* @param {Number} b1 b1 ratio
* @param {Number} b2 b2 ratio
* @return {PropertyObject} PropertyObject(type=color).
* @example
var colorObject = ......; //PropertyObject(type=color, model="rgba", value=[254, 254, 254, 1]);
dotColor("#000",  colorObject, 0.5, 0.5);
// "#000" => PropertyObject(type=color, model="rgba", value=[0, 0, 0, 1]);
// return => PropertyObject(type=color, model="rgba", value=[127, 127, 127, 1]);
*/
export const dotColor = function(_a1, _a2, b1, b2) {
	let a1 = _a1;
	let a2 = _a2;

	// convert array to PropertyObject(type=color)
	if (!(a1 instanceof PropertyObject)) {
		a1 = toColorObject(a1);
	}
	if (!(a2 instanceof PropertyObject)) {
		a2 = toColorObject(a2);
	}
	const value1 = a1.value;
	const value2 = a2.value;
	// If the model name is not same, the inner product is impossible.
	const model1 = a1.model;
	const model2 = a2.model;

	if (model1 !== model2) {
		// It is recognized as a string.
		return dot(a1.toValue(), a2.toValue(), b1, b2);
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
};
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
export const dotObject = function(a1, a2, b1, b2) {
	const a1Type = a1.type;

	if (a1Type === "color") {
		return dotColor(a1, a2, b1, b2);
	}
	const value1 = a1.value;
	const value2 = a2.value;

	if (!isObject(a2)) {
		return a1;
	}
	const arr = dotArray(value1, value2, b1, b2);
	const obj = new PropertyObject(arr, a1.separator);

	obj.prefix = a1.prefix;
	obj.suffix = a1.suffix;
	return obj;
};
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
dot = function(a1, a2, b1, b2) {
	// dot Object
	if (a1 instanceof PropertyObject) {
		return dotObject(a1, a2, b1, b2);
	}
	// prevent division by zero.
	if (b1 + b2 === 0) {
		return a1;
	}
	// split number and unit of the value.
	const v1 = splitUnit(a1);
	const v2 = splitUnit(a2);
	const r1 = b1 / (b1 + b2);
	const r2 = 1 - r1;
	let v;

	// 숫자가 아닐경우 첫번째 값을 반환 b2가 0일경우 두번째 값을 반환
	if (isNaN(v1.value) || isNaN(v2.value)) {
		return r1 >= 1 ? a2 : a1;
	} else {
		v = v1.value * r2 + v2.value * r1;
	}
	const unit = v1.unit || v2.unit || false;

	if (unit === false) {
		return v;
	}
	return v + unit.trim();
};
export {dot};

