import {
  ALIAS, TIMING_FUNCTION, TRANSFORM_NAME, EASING_NAME
} from "./consts";
import { isRole, getType, isPropertyObject, getValueByNames } from "./utils";
import { toPropertyObject, splitStyle, toObject } from "./utils/property";
import { isObject, isArray, isString,
  ANIMATION, TRANSFORM, FILTER, PROPERTY, FUNCTION, ARRAY, OBJECT, IObject, isUndefined } from "@daybrush/utils";
import { NameType } from "./types";

function toInnerProperties(obj: IObject<string>) {
  if (!obj) {
    return "";
  }
  const arrObj = [];

  for (const name in obj) {
    arrObj.push(`${name.replace(/\d/g, "")}(${obj[name]})`);
  }
  return arrObj.join(" ");
}

/* eslint-disable */
function clone(target: IObject<any>, toValue = false) {
  return merge({}, target, toValue);
}
function merge(to: IObject<any>, from: IObject<any>, toValue = false) {
  for (const name in from) {
    const value = from[name];
    const type = getType(value);

    if (type === PROPERTY) {
      to[name] = toValue ? value.toValue() : value.clone();
    } else if (type === FUNCTION) {
      to[name] = toValue ? getValue([name], value) : value;
    } else if (type === ARRAY) {
      to[name] = value.slice();
    } else if (type === OBJECT) {
      if (isObject(to[name]) && !isPropertyObject(to[name])) {
        merge(to[name], value, toValue);
      } else {
        to[name] = clone(value, toValue);
      }
    } else {
      to[name] = from[name];
    }
  }
  return to;
}
/* eslint-enable */

function getPropertyName(args: NameType[]) {
  return args[0] in ALIAS ? ALIAS[args[0]] : args;
}
function getValue(names: NameType[], value: any): any {
  const type = getType(value);

  if (type === PROPERTY) {
    return value.toValue();
  } else if (type === FUNCTION) {
    if (names[0] !== TIMING_FUNCTION) {
      return getValue(names, value());
    }
  } else if (type === OBJECT) {
    return clone(value, true);
  }
  return value;
}
/**
* Animation's Frame
*/
class Frame {
  public properties: IObject<any>;
  /**
   * @param - properties
   * @example
const frame = new Scene.Frame({
	display: "none"
	transform: {
		translate: "50px",
		scale: "5, 5",
	}
});
   */
  constructor(properties: IObject<any> = {}) {
    this.properties = {};
    this.set(properties);
  }
  /**
	* get property value
	* @param {...Number|String|PropertyObject} args - property name or value
	* @example
	frame.get("display") // => "none", "block", ....
	frame.get("transform", "translate") // => "10px,10px"
	*/
  public get(...args: NameType[]) {
    const value = this.raw(...args);

    return getValue(getPropertyName(args), value);
  }

  public raw(...args: NameType[]) {
    return getValueByNames(getPropertyName(args), this.properties);
  }
  /**
	* remove property value
	* @param {...String} args - property name
	* @return {Frame} An instance itself
	* @example
	frame.remove("display")
	*/
  public remove(...args: NameType[]) {
    const params = getPropertyName(args);
    const length = params.length;

    if (!length) {
      return this;
    }
    const value = getValueByNames(params, this.properties, length - 1);

    if (isObject(value)) {
      delete value[params[length - 1]];
    }
    return this;
  }
  /**
	* set property
	* @param {...Number|String|PropertyObject} args - property names or values
	* @return {Frame} An instance itself
	* @example
// one parameter
frame.set({
	display: "none",
	transform: {
		translate: "10px, 10px",
		scale: "1",
	},
	filter: {
		brightness: "50%",
		grayscale: "100%"
	}
});

// two parameters
frame.set("transform", {
	translate: "10px, 10px",
	scale: "1",
});

// three parameters
frame.set("transform", "translate", "50px");
  */
  public set(...args: any[]) {
    const self = this;
    const length = args.length;
    const params = args.slice(0, -1);
    const value = args[length - 1];

    if (params[0] in ALIAS) {
      self._set(ALIAS[params[0]], value);
    } else if (length === 2 && isArray(params[0])) {
      self._set(params[0], value);
    } else if (isArray(value)) {
      self._set(params, value);
    } else if (isPropertyObject(value)) {
      if (isRole(params)) {
        self.set(...params, toObject(value));
      } else {
        self._set(params, value);
      }
    } else if (isObject(value)) {
      for (const name in value) {
        self.set(...params, name, value[name]);
      }
    } else if (isString(value)) {
      if (isRole(params)) {
        const obj = toPropertyObject(value);

        if (isObject(obj)) {
          self.set(...params, obj);
        }
        return this;
      } else {
        const {styles, length: stylesLength} = splitStyle(value);

        for (const name in styles) {
          self.set(...params, name, styles[name]);
        }
        if (stylesLength) {
          return this;
        }
      }
      self._set(params, value);
    } else {
      self._set(params, value);
    }
    return self;
  }
  /**
	* check that has property.
	* @param {...String} args - property name
	* @example
	frame.has("property", "display") // => true or false
	*/
  public has(...args: NameType[]) {
    const params = getPropertyName(args);
    const length = params.length;

    if (!length) {
      return false;
    }
    return !isUndefined(getValueByNames(params, this.properties, length));
  }
  /**
	* clone frame.
	* @return {Frame} An instance of clone
	* @example
	frame.clone();
	*/
  public clone() {
    const frame = new Frame();

    return frame.merge(this);
  }
  /**
	* merge one frame to other frame.
	* @param - target frame.
	* @return {Frame} An instance itself
	* @example
	frame.merge(frame2);
	*/
  public merge(frame: Frame) {
    const properties = this.properties;
    const frameProperties = frame.properties;

    if (!frameProperties) {
      return this;
    }
    merge(properties, frameProperties);

    return this;
  }
  /**
	* Specifies an css object that coverted the frame.
	* @return {object} cssObject
	*/
  public toCSSObject() {
    const properties = this.get();
    const cssObject: IObject<string> = {};

    for (const name in properties) {
      if (isRole([name], true)) {
        continue;
      }
      const value = properties[name];

      if (name === TIMING_FUNCTION) {
        cssObject[TIMING_FUNCTION.replace("animation", ANIMATION)] =
          (isString(value) ? value : value[EASING_NAME]) || "initial";
        continue;
      }
      cssObject[name] = value;
    }
    const transform = toInnerProperties(properties[TRANSFORM_NAME]);
    const filter = toInnerProperties(properties.filter);

    TRANSFORM && transform && (cssObject[TRANSFORM] = transform);
    FILTER && filter && (cssObject[FILTER] = filter);
    return cssObject;
  }
  /**
	* Specifies an css text that coverted the frame.
	* @return {string} cssText
	*/
  public toCSS() {
    const cssObject = this.toCSSObject();
    const cssArray = [];

    for (const name in cssObject) {
      cssArray.push(`${name}:${cssObject[name]};`);
    }
    return cssArray.join("");
  }
  private _set(args: NameType[], value: any) {
    let properties = this.properties;
    const length = args.length;

    for (let i = 0; i < length - 1; ++i) {
      const name = args[i];

      !(name in properties) && (properties[name] = {});
      properties = properties[name];
    }
    if (!length) {
      return;
    }
    properties[args[length - 1]] = isString(value) ? toPropertyObject(value) : value;
  }
}
export default Frame;
