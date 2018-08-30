/**
* @namespace
* @name Property
*/
import PropertyObject from "../PropertyObject";
import { COLOR_MODELS, hexToRGB, hex3to6, hslToRGB } from "./color";
import { isString, isArray } from "../utils";

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
export function splitSpace(text) {
  // divide comma(,)
  var matches = text.match(/("[^"]*")|('[^']*')|([^\s()]*(?:\((?:[^()]*|\([^()]*\))*\))[^\s()]*)|\S+/g);
  return matches || [];
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

export function splitComma(text) {
  // divide comma(,)
  // "[^"]*"|'[^']*'
  var matches = text.match(/("[^"]*"|'[^']*'|[^,\s()]*\((?:[^()]*|\([^()]*\))*\)[^,\s()]*|[^,])+/g);
  return matches ? matches.map(function (str) {
    return str.trim();
  }) : [];
}
export function splitStyle(str) {
  var properties = str.split(";");
  var length = properties.length;
  var obj = [];

  for (var i = 0; i < length; ++i) {
    var _obj$push;

    var matches = /([^:]*):([\S\s]*)/g.exec(properties[i]);

    if (!matches || matches.length < 3 || !matches[1]) {
      continue;
    }

    obj.push((_obj$push = {}, _obj$push[matches[1].trim()] = toPropertyObject(matches[2].trim()), _obj$push));
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

export function arrayToColorObject(arr) {
  var model = "rgba";

  if (arr.length === 3) {
    arr[3] = 1;
  }

  return new PropertyObject(arr, {
    model: model,
    separator: ",",
    type: "color",
    prefix: model + "(",
    suffix: ")"
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

export function toColorObject(value) {
  var colorObject;

  if (value instanceof PropertyObject) {
    colorObject = value;
  } else if (isArray(value)) {
    colorObject = arrayToColorObject(value);
  } else if (isString(value)) {
    return stringToColorObject(value);
  }

  var colorArray = colorObject.value;
  var length = colorArray.length;

  if (length === 4) {
    colorArray[3] = parseFloat(colorArray[3]);
  } else if (length === 3) {
    colorArray[3] = 1;
  }

  colorObject.setOptions({
    type: "color"
  });
  var colorModel = colorObject.getOption("model").toLowerCase(); // rgb hsl model to CHANGE rgba hsla
  // string -> number

  if (colorModel === "rgb") {
    colorObject.setOptions({
      type: "color",
      model: "rgba",
      prefix: "rgba(",
      suffix: ")"
    });
  }

  switch (colorModel) {
    case "rgb":
    case "rgba":
      for (var i = 0; i < 3; ++i) {
        colorArray[i] = parseInt(colorArray[i], 10);
      }

      break;

    case "hsl":
    case "hsla":
      for (var _i = 1; _i < 3; ++_i) {
        if (colorArray[_i].indexOf("%") !== -1) {
          colorArray[_i] = parseFloat(colorArray[_i]) / 100;
        }
      } // hsl, hsla to rgba


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

export function stringToBracketObject(value) {
  // [prefix, value, other]
  var matches = /([^(]*)\(([\s\S]*)\)([\s\S]*)/g.exec(value);

  if (!matches || matches.length < 4) {
    return value;
  }

  var model = matches[1] || "";
  var text = matches[2];
  var prefix = model + "(";
  var suffix = ")" + matches[3];
  var separator = ",";
  var values; // divide comma(,)

  var obj = toPropertyObject(text);

  if (obj instanceof PropertyObject) {
    separator = obj.getOption("separator");
    values = obj.value;
    prefix += obj.getOption("prefix");
    suffix = obj.getOption("suffix") + suffix;
  } else {
    values = [text];
  }

  var result = new PropertyObject(values, {
    separator: separator,
    model: model,
    prefix: prefix,
    suffix: suffix
  });

  if (COLOR_MODELS.indexOf(model) !== -1) {
    return toColorObject(result);
  } else {
    return result;
  }
}
export function arrayToPropertyObject(arr, separator) {
  return new PropertyObject(arr, {
    type: "array",
    separator: separator
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

export function stringToColorObject(value) {
  var colorArray;

  if (value.charAt(0) === "#") {
    if (value.length === 4) {
      colorArray = hexToRGB(hex3to6(value));
    } else {
      colorArray = hexToRGB(value);
    }

    return arrayToColorObject(colorArray);
  } else if (value.indexOf("(") !== -1) {
    // in bracket.
    return stringToBracketObject(value);
  } else {
    throw new Error("Invalid Format : Not a Color - " + value);
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

export function toPropertyObject(value) {
  if (!isString(value)) {
    if (Array.isArray(value)) {
      return arrayToPropertyObject(value, ",");
    }

    return value;
  }

  var values = splitComma(value);

  if (values.length > 1) {
    return arrayToPropertyObject(values.map(function (v) {
      return toPropertyObject(v);
    }), ",");
  }

  values = splitSpace(value);

  if (values.length > 1) {
    return arrayToPropertyObject(values.map(function (v) {
      return toPropertyObject(v);
    }), " ");
  }

  values = /^(['"])([^'"]*)(['"])$/g.exec(value);

  if (values && values[1] === values[3]) {
    // Quotes
    return new PropertyObject([toPropertyObject(values[2])], {
      prefix: values[1],
      suffix: values[1]
    });
  } else if (value.indexOf("(") !== -1) {
    // color
    return stringToBracketObject(value);
  } else if (value.charAt(0) === "#") {
    return stringToColorObject(value);
  }

  return value;
}
export function toObject(object, result) {
  if (result === void 0) {
    result = {};
  }

  var model = object.getOption("model");

  if (model) {
    object.setOptions({
      model: "",
      suffix: "",
      prefix: ""
    });
    var value = object.size() > 1 ? object : object.get(0);
    result[model] = value;
  } else {
    object.forEach(function (obj) {
      return toObject(obj, result);
    });
  }

  return result;
}