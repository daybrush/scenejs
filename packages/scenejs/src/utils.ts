import {
    ROLES, MAXIMUM, FIXED, ALIAS,
    RUNNING, PLAY, ENDED, PLAY_CSS, CURRENT_TIME, START_ANIMATION, EASINGS, NAME_SEPARATOR
} from "./consts";
import PropertyObject from "./PropertyObject";
import Scene from "./Scene";
import SceneItem from "./SceneItem";
import {
    isArray, ANIMATION, ARRAY, OBJECT,
    PROPERTY, STRING, NUMBER, IS_WINDOW, IObject, $, isObject, addEvent, removeEvent, isString,
} from "@daybrush/utils";
import { EasingType, EasingFunction, NameType } from "./types";
import { toPropertyObject } from "./utils/property";
import { bezier, steps } from "./easing";
import Animator from "./Animator";
import Frame from "./Frame";

export function setAlias(name: string, alias: string[]) {
    ALIAS[name] = alias;
}
export function setRole(names: string[], isProperty?: boolean, isFixedProperty?: boolean) {
    const length = names.length;
    let roles: any = ROLES;
    let fixed: any = FIXED;

    for (let i = 0; i < length - 1; ++i) {
        !roles[names[i]] && (roles[names[i]] = {});
        roles = roles[names[i]];
        if (isFixedProperty) {
            !fixed[names[i]] && (fixed[names[i]] = {});
            fixed = fixed[names[i]];
        }
    }
    isFixedProperty && (fixed[names[length - 1]] = true);
    roles[names[length - 1]] = isProperty ? true : {};
}
export function getType(value: any) {
    const type = typeof value;

    if (type === OBJECT) {
        if (isArray(value)) {
            return ARRAY;
        } else if (isPropertyObject(value)) {
            return PROPERTY;
        }
    } else if (type === STRING || type === NUMBER) {
        return "value";
    }
    return type;
}
export function isPureObject(obj: any): obj is object {
    return isObject(obj) && obj.constructor === Object;
}
export function getNames(names: IObject<any>, stack: string[]) {
    let arr: string[][] = [];

    if (isPureObject(names)) {
        for (const name in names) {
            stack.push(name);
            arr = arr.concat(getNames(names[name], stack));
            stack.pop();
        }
    } else {
        arr.push(stack.slice());
    }
    return arr;
}
export function updateFrame(names: IObject<any>, properties: IObject<any>) {
    for (const name in properties) {
        const value = properties[name];

        if (!isPureObject(value)) {
            names[name] = true;
            continue;
        }
        if (!isObject(names[name])) {
            names[name] = {};
        }
        updateFrame(names[name], properties[name]);
    }
    return names;
}
export function toFixed(num: number) {
    return Math.round(num * MAXIMUM) / MAXIMUM;
}
export function getValueByNames(
    names: Array<string | number>,
    properties: IObject<any>, length: number = names.length) {
    let value = properties;

    for (let i = 0; i < length; ++i) {
        if (!isObject(value) || value == null) {
            return undefined;
        }
        value = value[names[i]];
    }
    return value;
}
export function isInProperties(roles: IObject<any>, args: NameType[], isLast?: boolean) {
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
        if (!role || (!isLast && role === true)) {
            return false;
        }
    }
    return true;
}
/**
 * @memberof Scene
 * @param - Property names
 * @param - Whether the property is the last property that cannot be an object (non-partitionable)
 */
export function isRole(args: NameType[], isLast?: boolean): boolean {
    return isInProperties(ROLES, args, isLast);
}
export function isFixed(args: NameType[]) {
    return isInProperties(FIXED, args, true);
}

export interface IterationInterface {
    currentTime: number;
    iterationCount: number;
    elapsedTime: number;
}
export function setPlayCSS(item: Animator, isActivate: boolean) {
    item.state[PLAY_CSS] = isActivate;
}
export function isPausedCSS(item: Scene | SceneItem) {
    return item.state[PLAY_CSS] && item.isPaused();
}
export function isEndedCSS(item: Scene | SceneItem) {
    return !item.isEnded() && item.state[PLAY_CSS];
}

export function makeId(selector?: boolean) {
    for (; ;) {
        const id = `${Math.floor(Math.random() * 10000000)}`;

        if (!IS_WINDOW || !selector) {
            return id;
        }
        const checkElement = $(`[data-scene-id="${id}"]`);

        if (!checkElement) {
            return id;
        }
    }
}
export function getRealId(item: Scene | SceneItem) {
    return item.getId() || item.setId(makeId(false)).getId();
}
export function toId(text: number | string) {
    return `${text}`.match(/[0-9a-zA-Z]+/g).join("");
}
export function playCSS(
    item: Scene | SceneItem, isExportCSS?: boolean,
    playClassName?: string, properties: object = {}) {
    if (!ANIMATION || item.getPlayState() === RUNNING) {
        return;
    }
    const className = playClassName || START_ANIMATION;

    if (isPausedCSS(item)) {
        item.addPlayClass(true, className, properties);
    } else {
        if (item.isEnded()) {
            item.setTime(0);
        }
        isExportCSS && item.exportCSS({ className });
        const el = item.addPlayClass(false, className, properties);

        if (!el) {
            return;
        }
        addAnimationEvent(item, el);
        setPlayCSS(item, true);
    }
    item.setPlayState(RUNNING);
}

export function addAnimationEvent(item: Animator, el: Element) {
    const state = item.state;
    const duration = item.getDuration();
    const isZeroDuration = !duration || !isFinite(duration);
    const animationend = () => {
        setPlayCSS(item, false);
        item.finish();
    };
    const animationstart = () => {
        item.trigger(PLAY);

        addEvent(el, "animationcancel", animationend);
        addEvent(el, "animationend", animationend);
        addEvent(el, "animationiteration", animationiteration);
    };
    item.once(ENDED, () => {
        removeEvent(el, "animationcancel", animationend);
        removeEvent(el, "animationend", animationend);
        removeEvent(el, "animationiteration", animationiteration);
        removeEvent(el, "animationstart", animationstart);
    });
    const animationiteration = ({ elapsedTime }: any) => {
        const currentTime = elapsedTime;
        const iterationCount = isZeroDuration ? 0 : (currentTime / duration);

        state[CURRENT_TIME] = currentTime;
        item.setIteration(iterationCount);
    };
    addEvent(el, "animationstart", animationstart);
}

export function getEasing(curveArray: string | number[] | EasingFunction): EasingType {
    let easing: EasingType;

    if (isString(curveArray)) {
        if (curveArray in EASINGS) {
            easing = EASINGS[curveArray];
        } else {
            const obj = toPropertyObject(curveArray);

            if (isString(obj)) {
                return 0;
            } else {
                if (obj.model === "cubic-bezier") {
                    curveArray = obj.value.map(v => parseFloat(v));
                    easing = bezier(curveArray[0], curveArray[1], curveArray[2], curveArray[3]);
                } else if (obj.model === "steps") {
                    easing = steps(parseFloat(obj.value[0]), obj.value[1]);
                } else {
                    return 0;
                }
            }
        }
    } else if (isArray(curveArray)) {
        easing = bezier(curveArray[0], curveArray[1], curveArray[2], curveArray[3]);
    } else {
        easing = curveArray;
    }

    return easing;
}

export function isPropertyObject(value: any): value is PropertyObject {
    if (!value) {
        return false;
    }
    const prototype = (value.constructor as typeof PropertyObject).prototype;

    return !!(prototype.clone && prototype.get && prototype.setOptions);
}

export function isScene(value: any): value is Scene {
    return value && !!(value.constructor as typeof Scene).prototype.getItem;
}
export function isSceneItem(value: any): value is SceneItem {
    return (
        value && !!(value.constructor as typeof SceneItem).prototype.getFrame
    );
}
export function isFrame(value: any): value is Frame {
    return value && !!(value.constructor as typeof Frame).prototype.toCSS;
}
export function flatSceneObject(obj: IObject<any>, seperator: string): Record<string, Frame> {
    const newObj = {};

    for (const name in obj) {
        const value = obj[name];

        if (isFrame(value)) {
            newObj[name] = value;
        } else if (isObject(value)) {
            const nextObj = flatSceneObject(value, seperator);

            for (const nextName in nextObj) {
                newObj[`${name}${seperator}${nextName}`] = nextObj[nextName];
            }
        }
    }
    return newObj;
}
