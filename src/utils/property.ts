/**
* @namespace
* @name Property
*/

import PropertyObject from "../PropertyObject";
import {COLOR_MODELS, hexToRGB, hex3to6, hslToRGB} from "./color";
import {isString, isUndefined, isArray} from "../utils";
import { ObjectInterface } from "../consts";

/**
* divide text by space.
* @memberof Property
* @function splitSpace
* @param {String} text - text to divide
* @return {Array} divided texts
* @example
console.log(splitSpace("a b c d e f g"));
// ["a", "b", "c", "d", "e", "f", "g"]
console.log(splitSpace("'a,b' c 'd,e' f g"));
// ["'a,b'", "c", "'d,e'", "f", "g"]
*/
export function splitSpace(text: string) {
	// divide comma(,)
	const matches = text.split(/("[^"]*"|'[^']*'|[^\s()]*(?:\((?:[^()]*|\([^()]*\))*\))[^\s()]*)|\s+/g);
	const length = matches.length;
	const arr: any[] = [];
	let index = 0;

	for (let i = 0; i < length; ++i) {
		const value = matches[i];

		if (isUndefined(value)) {
			arr[index] && ++index;
			continue;
		} else if (!value) {
			continue;
		}
		const arrValue = arr[index];

		arr[index] = arrValue ? arrValue + value : value;
	}
	return arr;
}
/**
* divide text by comma.
* @memberof Property
* @function splitComma
* @param {String} text - text to divide
* @return {Array} divided texts
* @example
console.log(splitComma("a,b,c,d,e,f,g"));
// ["a", "b", "c", "d", "e", "f", "g"]
console.log(splitComma("'a,b',c,'d,e',f,g"));
// ["'a,b'", "c", "'d,e'", "f", "g"]
*/
export function splitComma(text: string) {
	// divide comma(,)
	// "[^"]*"|'[^']*'
	const matches = text.split(/("[^"]*"|'[^']*'|[^,\s()]*(?:\((?:[^()]*|\([^()]*\))*\))[^,\s()]*)|\s*,\s*/g);
	const length = matches.length;
	const arr: any[] = [];
	let index = 0;

	for (let i = 0; i < length; ++i) {
		const value = matches[i];

		if (isUndefined(value)) {
			arr[index] && ++index;
			continue;
		} else if (!value) {
			continue;
		}
		const arrValue = arr[index];

		arr[index] = arrValue ? arrValue + value : value;
	}
	return arr;
}
export function splitStyle(str: string) {
	const properties = str.split(";");
	const length = properties.length;
	const obj = [];

	for (let i = 0; i < length; ++i) {
		const matches = /([^:]*):([\S\s]*)/g.exec(properties[i]);

		if (!matches || matches.length < 3 || !matches[1]) {
			continue;
		}
		obj.push({[matches[1].trim()]: toPropertyObject(matches[2].trim())});
	}
	return obj;
}
/**
* convert array to PropertyObject[type=color].
* default model "rgba"
* @memberof Property
* @function arrayToColorObject
* @param {Array|PropertyObject} value ex) [0, 0, 0, 1]
* @return {PropertyObject} PropertyObject[type=color]
* @example
arrayToColorObject([0, 0, 0])
// => PropertyObject(type="color", model="rgba", value=[0, 0, 0, 1], separator=",")
*/
export function arrayToColorObject(arr: number[]) {
	const model = "rgba";

	if (arr.length === 3) {
		arr[3] = 1;
	}
	return new PropertyObject(arr, {
		model,
		separator: ",",
		type: "color",
		prefix: `${model}(`,
		suffix: ")",
	});
}
/**
	* convert text with parentheses to PropertyObject[type=color].
	* If the values are not RGBA model, change them RGBA mdoel.
	* @memberof Property
	* @function toColorObject
	* @param {String|PropertyObject} value - color value "rgba(0,0,0,1)"
	* @return {PropertyObject} PropertyObject[type=color]
	* @example
toColorObject("rgba(0, 0, 0,1)")
// => PropertyObject(type="color", model="rgba", value=[0, 0, 0,1], separator=",")
*/
export function toColorObject(value: PropertyObject | number[] | string) {
	let colorObject;

	if (value instanceof PropertyObject) {
		colorObject = value;
	} else if (isArray(value)) {
		colorObject = arrayToColorObject(value);
	} else if (isString(value)) {
		return stringToColorObject(value);
	}
	let colorArray = colorObject.value;
	const length = colorArray.length;

	if (length === 4) {
		colorArray[3] = parseFloat(colorArray[3]);
	} else if (length === 3) {
		colorArray[3] = 1;
	}
	colorObject.setOptions({type: "color"});
	const colorModel = colorObject.getOption("model").toLowerCase();

	// rgb hsl model to CHANGE rgba hsla
	// string -> number
	if (colorModel === "rgb") {
		colorObject.setOptions({
			type: "color",
			model: "rgba",
			prefix: `rgba(`,
			suffix: ")",
		});
	}
	switch (colorModel) {
		case "rgb":
		case "rgba":
			for (let i = 0; i < 3; ++i) {
				colorArray[i] = parseInt(colorArray[i], 10);
			}
			break;
		case "hsl":
		case "hsla":
			for (let i = 1; i < 3; ++i) {
				if (colorArray[i].indexOf("%") !== -1) {
					colorArray[i] = parseFloat(colorArray[i]) / 100;
				}
			}
			// hsl, hsla to rgba
			colorArray = hslToRGB(colorArray);
			return arrayToColorObject(colorArray);
		default:
	}
	return colorObject;
}
/**
* convert text with parentheses to object.
* @memberof Property
* @function stringToBracketObject
* @param {String} value ex) "rgba(0,0,0,1)"
* @return {PropertyObject} PropertyObject
* @example
stringToBracketObject("abcde(0, 0, 0,1)")
// => PropertyObject(model="abcde", value=[0, 0, 0,1], separator=",")
*/
export function stringToBracketObject(value: string) {
	// [prefix, value, other]
	const matches = (/([^(]*)\(([\s\S]*)\)([\s\S]*)/g).exec(value);

	if (!matches || matches.length < 4) {
		return value;
	}
	const model = matches[1] || "";
	const prefix = `${model}(`;
	const text = matches[2];
	const suffix = `)${matches[3]}`;
	let separator = ",";
	let values;
	// divide comma(,)
	const obj = toPropertyObject(text);

	if (obj instanceof PropertyObject) {
		separator = obj.getOption("separator");
		values = obj.value;
	} else {
		values = [text];
	}
	const result = new PropertyObject(values, {
		separator,
		model,
		prefix,
		suffix,
	});

	if (COLOR_MODELS.indexOf(model) !== -1) {
		return toColorObject(result);
	} else {
		return result;
	}
}

export function arrayToPropertyObject(arr: any[], separator: string) {
	return new PropertyObject(arr, {
		type: "array",
		separator,
	});
}

/**
* convert text with parentheses to PropertyObject[type=color].
* If the values are not RGBA model, change them RGBA mdoel.
* @memberof Property
* @function stringToColorObject
* @param {String|PropertyObject} value ex) "rgba(0,0,0,1)"
* @return {PropertyObject} PropertyObject[type=color]
* @example
stringToColorObject("rgba(0, 0, 0,1)")
// => PropertyObject(type="color", model="rgba", value=[0, 0, 0,1], separator=",")
*/
export function stringToColorObject(value: string): string | PropertyObject {
	let colorArray: number[];

	if (value.charAt(0) === "#") {
		if (value.length === 4) {
			colorArray = hexToRGB(hex3to6(value));
		} else if (value.length === 7) {
			colorArray = hexToRGB(value);
		} else {
			colorArray = hexToRGB(value);
		}
		return arrayToColorObject(colorArray);
	} else if (value.indexOf("(") !== -1) {
		// in bracket.
		return stringToBracketObject(value);
	} else {
		throw new Error(`Invalid Format : Not a Color - ${value}`);
	}
}
/**
* convert CSS Value to PropertyObject
* @memberof Property
* @function toPropertyObject
* @param {String} value it's text contains the array.
* @return {String} Not Array, Not Separator, Only Number & Unit
* @return {PropertyObject} Array with Separator.
* @see referenced regular expression {@link http://stackoverflow.com/questions/20215440/parse-css-gradient-rule-with-javascript-regex}
* @example
toPropertyObject("1px solid #000");
// => PropertyObject(["1px", "solid", rgba(0, 0, 0, 1)])
*/
export function toPropertyObject(value: any): any {
	if (!isString(value)) {
		if (Array.isArray(value)) {
			return arrayToPropertyObject(value, ",");
		}
		return value;
	}
	let values = splitComma(value);

	if (values.length > 1) {
		return arrayToPropertyObject(values.map(v => toPropertyObject(v)), ",");
	}
	values = splitSpace(value);
	if (values.length > 1) {
		return arrayToPropertyObject(values.map(v => toPropertyObject(v)), " ");
	} else {
		const chr = value.charAt(0);

		if (chr && (chr === '"' || chr === "'")) {
			// Quotes
			return value;
		} else if (value.indexOf("(") !== -1) {
			// color
			return stringToBracketObject(value);
		} else if (value.charAt(0) === "#") {
			return stringToColorObject(value);
		}
	}
	return value;
}
export function toObject(object: PropertyObject, result: ObjectInterface<any> = {}) {
	const model = object.getOption("model");

	if (model) {
		object.setOptions({
			model: "",
			suffix: "",
			prefix: "",
		});
		const value = object.size() > 1 ? object : object.get(0);

		result[model] = value;
	} else {
		object.forEach(obj => toObject(obj, result));
	}
	return result;
}
