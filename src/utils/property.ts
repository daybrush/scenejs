/**
* @namespace
* @name Property
*/

import PropertyObject from "../PropertyObject";
import {
  COLOR_MODELS, isString,
  splitComma, splitSpace, stringToRGBA,
  RGBA, splitBracket, IObject, isArray
} from "@daybrush/utils";

export function splitStyle(str: string) {
  const properties = str.split(";");
  const obj: IObject<string | PropertyObject> = {};
  let length = properties.length;

  for (let i = 0; i < length; ++i) {
    const matches = /([^:]*):([\S\s]*)/g.exec(properties[i]);

    if (!matches || matches.length < 3 || !matches[1]) {
      --length;
      continue;
    }
    obj[matches[1].trim()] = toPropertyObject(matches[2].trim());
  }
  return {styles: obj, length};
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
  const model = RGBA;

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
* convert text with parentheses to object.
* @memberof Property
* @function stringToBracketObject
* @param {String} value ex) "rgba(0,0,0,1)"
* @return {PropertyObject} PropertyObject
* @example
stringToBracketObject("abcde(0, 0, 0,1)")
// => PropertyObject(model="abcde", value=[0, 0, 0,1], separator=",")
*/
export function stringToBracketObject(text: string) {
  // [prefix, value, other]
  const { prefix: model, value, suffix: afterModel } = splitBracket(text);

  if (typeof value === "undefined") {
    return text;
  }
  if (COLOR_MODELS.indexOf(model) !== -1) {
    return arrayToColorObject(stringToRGBA(text));
  }
  // divide comma(,)
  const obj = toPropertyObject(value);

  let arr = [value];
  let separator = ",";
  let prefix = `${model}(`;
  let suffix = `)${afterModel}`;

  if (obj instanceof PropertyObject) {
    separator = obj.separator;
    arr = obj.value;
    prefix += obj.prefix;
    suffix = obj.suffix + suffix;
  }
  return new PropertyObject(arr, {
    separator,
    model,
    prefix,
    suffix,
  });
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
  const result = stringToRGBA(value);

  return result ? arrayToColorObject(result) : value;
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
export function toPropertyObject(value: any[]): PropertyObject;
export function toPropertyObject(value: IObject<any>): IObject<any>;
export function toPropertyObject(value: string): PropertyObject | string;
export function toPropertyObject(value: string | IObject<any> | any[]) {
  if (!isString(value)) {
    if (isArray(value)) {
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
  }
  values = /^(['"])([^'"]*)(['"])$/g.exec(value);
  if (values && values[1] === values[3]) {
    // Quotes
    return new PropertyObject([toPropertyObject(values[2])], {
      prefix: values[1],
      suffix: values[1],
    });
  } else if (value.indexOf("(") !== -1) {
    // color
    return stringToBracketObject(value);
  } else if (value.charAt(0) === "#") {
    return stringToColorObject(value);
  }
  return value;
}
export function toObject(object: PropertyObject, result: IObject<any> = {}) {
  const model = object.model;

  if (model) {
    object.setOptions({
      model: "",
      suffix: "",
      prefix: "",
    });
    const value = object.size() > 1 ? object : object.get(0);

    result[model] = value;
  } else {
    object.forEach(obj => {
      toObject(obj, result);
    });
  }
  return result;
}
