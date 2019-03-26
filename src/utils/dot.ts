
import PropertyObject from "../PropertyObject";
import { getType } from "../utils";
import { toPropertyObject } from "./property";
import { splitUnit, PROPERTY, FUNCTION, ARRAY } from "@daybrush/utils";
import { EasingType } from "../types";

function dotArray(a1: any[], a2: any, b1: number, b2: number): any {
  const length = a2.length;

  return a1.map((v1, i) => {
    if (i >= length) {
      return v1;
    } else {
      return dot(v1, a2[i], b1, b2);
    }
  });
}

function dotColor(color1: PropertyObject, color2: PropertyObject, b1: number, b2: number) {
  // convert array to PropertyObject(type=color)
  const value1 = color1.value;
  const value2 = color2.value;
  // If the model name is not same, the inner product is impossible.
  const model1 = color1.model;
  const model2 = color2.model;

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

function dotObject(a1: PropertyObject, a2: PropertyObject, b1: number, b2: number) {
  const a1Type = a1.type;

  if (a1Type === "color") {
    return dotColor(a1, a2, b1, b2);
  }
  const value1 = a1.value;
  const value2 = a2.value;
  const arr = dotArray(value1, value2, b1, b2);

  return new PropertyObject(arr, {
    type: a1Type,
    separator: a1.separator || a2.separator,
    prefix: a1.prefix || a2.prefix,
    suffix: a1.suffix || a2.suffix,
    model: a1.model || a2.model,
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
  const isFunction1 = type1 === FUNCTION;
  const isFunction2 = type2 === FUNCTION;

  if (isFunction1 || isFunction2) {
    return () => {
      return dot(isFunction1 ? toPropertyObject(a1()) : a1, isFunction2 ? toPropertyObject(a2()) : a2, b1, b2);
    };
  } else if (type1 === type2) {
    if (type1 === PROPERTY) {
      return dotObject(a1, a2, b1, b2);
    } else if (type1 === ARRAY) {
      return dotArray(a1, a2, b1, b2);
    } else if (type1 !== "value") {
      return a1;
    }
  } else {
    return a1;
  }
  const v1 = splitUnit(`${a1}`);
  const v2 = splitUnit(`${a2}`);
  let v;

  // 숫자가 아닐경우 첫번째 값을 반환 b2가 0일경우 두번째 값을 반환
  if (isNaN(v1.value) || isNaN(v2.value)) {
    return a1;
  } else {
    v = dotNumber(v1.value, v2.value, b1, b2);
  }
  const prefix = v1.prefix || v2.prefix;
  const unit = v1.unit || v2.unit;

  if (!prefix && !unit) {
    return v;
  }
  return prefix + v + unit;
}
export function dotNumber(a1: number, a2: number, b1: number, b2: number) {
  return (a1 * b2 + a2 * b1) / (b1 + b2);
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
