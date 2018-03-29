/**
* @namespace
* @name Property
*/

import PropertyObject from "../PropertyObject";
import {COLOR_MODELS, hexToRGB, hex3to6, hslToRGB} from "./color";
import {isString, isObject, isUndefined} from "../utils";

let toPropertyObject;
let stringToColorObject;

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
export const splitSpace = function(text) {
	// divide comma(,)
	const matches = text.split(/("[^"]*"|'[^']*'|[^\s()]*(?:\((?:[^()]*|\([^()]*\))*\))[^\s()]*)|\s+/g);
	const length = matches.length;
	const arr = [];
	let value;
	let arrValue;
	let index = 0;

	for (let i = 0; i < length; ++i) {
		value = matches[i];
		if (isUndefined(value)) {
			arr[index] && ++index;
			continue;
		} else if (!value) {
			continue;
		}
		arrValue = arr[index];
		arr[index] = arrValue ? arrValue + value : value;
	}
	return arr;
};
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
export const splitComma = function(text) {
	// divide comma(,)
	// "[^"]*"|'[^']*'
	const matches = text.split(/("[^"]*"|'[^']*'|[^,\s()]*(?:\((?:[^()]*|\([^()]*\))*\))[^,\s()]*)|\s*,\s*/g);
	const length = matches.length;
	const arr = [];
	let value;
	let arrValue;
	let index = 0;

	for (let i = 0; i < length; ++i) {
		value = matches[i];
		if (isUndefined(value)) {
			arr[index] && ++index;
			continue;
		} else if (!value) {
			continue;
		}
		arrValue = arr[index];
		arr[index] = arrValue ? arrValue + value : value;
	}
	return arr;
};
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
export const arrayToColorObject = function(arr) {
	const model = "rgba";

	if (arr instanceof PropertyObject) {
		arr.type = "color";
		arr.model = model;
		arr.prefix = `${model}(`;
		return arr;
	}

	if (arr.length === 3) {
		arr[3] = 1;
	}
	const object = new PropertyObject(arr, {
		model,
		separator: ",",
		type: "color",
		prefix: `${model}(`,
		suffix: ")",
	});

	return object;
};
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
export const toColorObject = function(value) {
	let colorObject;

	if (value instanceof PropertyObject) {
		colorObject = value;
	} else if (isObject(value)) {
		colorObject = arrayToColorObject(value);
	} else if (isString(value)) {
		return stringToColorObject(value);
	} else {
		return value;
	}
	let colorArray = colorObject.value;

	const length = colorArray.length;

	if (length === 4) {
		colorArray[3] = parseFloat(colorArray[3]);
	} else if (length === 3) {
		colorArray[3] = 1;
	}
	colorObject.type = "color";
	const colorModel = colorObject.model.toLowerCase();
	let i;

	// rgb hsl model to CHANGE rgba hsla
	// string -> number
	if (colorModel === "rgb") {
		arrayToColorObject(colorObject);
	}
	switch (colorModel) {
		case "rgb":
		case "rgba":
			for (i = 0; i < 3; ++i) {
				colorArray[i] = parseInt(colorArray[i], 10);
			}
			break;
		case "hsl":
		case "hsla":
			for (i = 1; i < 3; ++i) {
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
};
/**
* convert text with parentheses to PropertyObject.
* @memberof Property
* @function toBracketObject
* @param {String} value ex) "rgba(0,0,0,1)"
* @return {PropertyObject} PropertyObject
* @example
toBracketObject("abcde(0, 0, 0,1)")
// => PropertyObject(model="abcde", value=[0, 0, 0,1], separator=",")
*/
export const toBracketObject = function(value) {
	// [prefix, value, other]
	const matches = (/([^(]*)\(([\s\S]*)\)([\s\S]*)/g).exec(value);

	if (!matches || matches.length < 4) {
		return value;
	}
	const model = matches[1] || "";
	const prefix = `${model}(`;
	const text = matches[2];
	const suffix = `)${matches[3]}`;

	// divide comma(,)
	const texts = splitComma(text);
	const length = texts.length;
	let result;
	let separator = ",";

	if (length === 1) {
		result = toPropertyObject(text);
		if (!result.prefix && !result.suffix) {
			separator = result.separator;
			result = result.value;
		}
	}
	if (!result) {
		result = texts.map(t => toPropertyObject(t));
	}


	return new PropertyObject(result, {
		separator,
		model,
		prefix,
		suffix,
	});
};

export const arrayToPropertyObject = function(arr) {
	return new PropertyObject(arr, {
		type: "array",
	});
};


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
stringToColorObject = function(value) {
	let colorArray = 0;
	let colorObject = 0;

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
		colorObject = toBracketObject(value);
	} else {
		throw new Error(`Invalid Format : Not a Color - ${value}`);
	}

	return toColorObject(colorObject);
};
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
toPropertyObject = function(value) {
	if (!isString(value)) {
		if (Array.isArray(value)) {
			return arrayToPropertyObject(value);
		}
		return value;
	}
	let values = splitComma(value);
	let result;

	if (values.length > 1) {
		result = new PropertyObject(values.map(v => toPropertyObject(v)), ",");
		result.type = "array";
		return result;
	}
	values = splitSpace(value);
	if (values.length > 1) {
		result = new PropertyObject(values.map(v => toPropertyObject(v)), " ");
		result.type = "array";
		return result;
	} else if ((result = value.charAt(0)) && (result === '"' || result === "'")) {
		return value;
	} else if (value.indexOf("(") !== -1) {
		// in bracket.
		result = toBracketObject(value);
		if (!isObject(result)) {
			return result;
		}
		const model = result.model.toLowerCase();

		if (COLOR_MODELS.indexOf(model) !== -1) {
			return toColorObject(result);
		}
		const length = result.length;

		for (let i = 0; i < length; ++i) {
			result.set(i, toPropertyObject(result.get(i)));
		}
		return result;
	} else if (value.indexOf("#") === 0) {
		return toColorObject(value);
	}
	return value;
};

export {toPropertyObject, stringToColorObject};

