import {
    ALIAS, TIMING_FUNCTION, TRANSFORM_NAME, EASING_NAME, NAME_SEPARATOR
} from "./consts";
import { isRole, getType, isPropertyObject, getValueByNames, isFixed, getNames, getEasing, isFrame } from "./utils";
import { toPropertyObject, splitStyle, toObject } from "./utils/property";
import {
    isObject, isArray, isString, getKeys,
    ANIMATION, TRANSFORM, FILTER, PROPERTY, FUNCTION, ARRAY, OBJECT, IObject, isUndefined,
    sortOrders,
} from "@daybrush/utils";
import { NameType, KeyValueChildren } from "./types";
import OrderMap from "order-map";

function toInnerProperties(obj: IObject<string>, orders: NameType[] = []) {
    if (!obj) {
        return "";
    }
    const arrObj = [];

    const keys = getKeys(obj);

    sortOrders(keys, orders);

    keys.forEach(name => {
        arrObj.push(`${name.replace(/\d$/g, "")}(${obj[name]})`);
    });

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
    public properties: IObject<any> = {};
    public orderMap: OrderMap = new OrderMap(NAME_SEPARATOR);
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
    constructor(properties: any = {}) {
        this.properties = {};
        // this.orders = [];
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
    /**
      * get properties orders
      * @param - property names
      * @example
      frame.getOrders(["display"]) // => []
      frame.getOrders(["transform"]) // => ["translate", "scale"]
      */
    public getOrders(names: NameType[]): NameType[] | undefined {
        return this.orderMap.get(names);
    }
    /**
      * set properties orders
      * @param - property names
      * @param - orders
      * @example
      frame.getOrders(["transform"]) // => ["translate", "scale"]
      frame.setOrders(["transform"], ["scale", "tralsate"])
      */
    public setOrders(names: NameType[], orders: NameType[]): NameType[] {
        return this.orderMap.set(names, orders);
    }
    /**
      * get properties order object
      * @example
      console.log(frame.getOrderObject());
      */
    public getOrderObject() {
        return this.orderMap.getObject();
    }
    /**
      * set properties orders object
      * @param - properties orders object
      * @example
      frame.setOrderObject({
          "": ["transform"],
          "transform": ["scale", "tralsate"],
      });
      */
    public setOrderObject(obj: IObject<NameType[]>) {
        this.orderMap.setObject(obj);
    }

    /**
      * get property keys
      * @param - property names
      * @example
      frame.gets("display") // => []
      frame.gets("transform") // => ["translate"]
      */
    public getKeys(...args: NameType[]): string[] {
        const value = this.raw(...args);
        const keys = getType(value) === OBJECT ? getKeys(value) : [];

        sortOrders(keys, this.orderMap.get(args));
        return keys;
    }
    /**
      * get properties array
      * @param - property names
      * @example
      frame.gets("display") // => []
      frame.gets("transform") // => [{ key: "translate", value: "10px, 10px", children: [] }]
      */
    public gets(...args: NameType[]): KeyValueChildren[] {
        const values = this.get(...args);
        const keys = this.getKeys(...args);

        return keys.map(key => {
            const nextValue = values[key];
            return { key, value: nextValue, children: this.gets(...args, key) };
        });
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
        this.orderMap.remove(params);
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
        const firstParam = params[0];

        if (length === 1 && isFrame(value)) {
            self.merge(value);
        } else if (firstParam in ALIAS) {
            self._set(ALIAS[firstParam], value);
        } else if (length === 2 && isArray(firstParam)) {
            self._set(firstParam, value);
        } else if (isPropertyObject(value)) {
            if (isRole(params)) {
                self.set(...params, toObject(value));
            } else {
                self._set(params, value);
            }
        } else if (isArray(value)) {
            self._set(params, value);
        } else if (isObject(value)) {
            if (!self.has(...params) && isRole(params)) {
                self._set(params, {});
            }
            for (const name in value) {
                self.set(...params, name, value[name]);
            }
        } else if (isString(value)) {
            if (isRole(params, true)) {
                if (isFixed(params) || !isRole(params)) {
                    this._set(params, value);
                } else {
                    const obj = toPropertyObject(value);

                    if (isObject(obj)) {
                        self.set(...params, obj);
                    }
                }
                return this;
            } else {
                const { styles, length: stylesLength } = splitStyle(value);

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
      * Gets the names of properties.
      * @return the names of properties.
      * @example
  // one parameter
  frame.set({
      display: "none",
      transform: {
          translate: "10px, 10px",
          scale: "1",
      },
  });

  // [["display"], ["transform", "translate"], ["transform", "scale"]]
  console.log(frame.getNames());
    */
    public getNames(): string[][] {
        return getNames(this.properties, []);
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

        frame.setOrderObject(this.orderMap.orderMap);
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

        if (frameProperties) {
            merge(properties, frameProperties);
        }
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
            } else {
                cssObject[name] = value;
            }
        }
        const transform = toInnerProperties(properties[TRANSFORM_NAME], this.orderMap.get([TRANSFORM_NAME]));
        const filter = toInnerProperties(properties.filter, this.orderMap.get([FILTER]));

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
        const keys = getKeys(cssObject);

        sortOrders(keys, this.orderMap.get([]));
        keys.forEach(name => {
            cssArray.push(`${name}:${cssObject[name]};`);
        });
        return cssArray.join("");
    }
    /**
      * Remove All Properties
      * @return {Frame} An instance itself
      */
    public clear() {
        this.properties = {};
        this.orderMap.clear();
        return this;
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
        const lastParam = args[length - 1];

        this.orderMap.add(args);
        if (length === 1 && lastParam === TIMING_FUNCTION) {
            properties[lastParam] = getEasing(value);
        } else {
            properties[lastParam] = isString(value) && !isFixed(args)
                ? toPropertyObject(value, lastParam)
                : value;
        }
    }
}
export default Frame;
