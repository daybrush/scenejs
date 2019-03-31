import {
    ROLES, MAXIMUM, FIXED, ALIAS,
    PAUSED, RUNNING, PLAY, ENDED, PREFIX, PLAY_CSS, CURRENT_TIME, START_ANIMATION
} from "./consts";
import PropertyObject from "./PropertyObject";
import Scene from "./Scene";
import SceneItem from "./SceneItem";
import {
    isArray, ANIMATION, ARRAY, OBJECT,
    PROPERTY, STRING, NUMBER, IS_WINDOW, IObject, $, document, isObject, addEvent, removeEvent,
} from "@daybrush/utils";

export function isPropertyObject(value: any): value is PropertyObject {
    return value instanceof PropertyObject;
}
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
export function toFixed(num: number) {
    return Math.round(num * MAXIMUM) / MAXIMUM;
}
export function getValueByNames(
    names: Array<string | number>,
    properties: IObject<any>, length: number = names.length) {
    let value = properties;

    for (let i = 0; i < length; ++i) {
        if (!isObject(value)) {
            return undefined;
        }
        value = value[names[i]];
    }
    return value;
}
export function isInProperties(roles: IObject<any>, args: string[], isCheckTrue?: boolean) {
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
        if (!role || (!isCheckTrue && role === true)) {
            return false;
        }
    }
    return true;
}
export function isRole(args: string[], isCheckTrue?: boolean) {
    return isInProperties(ROLES, args, isCheckTrue);
}
export function isFixed(args: string[]) {
    return isInProperties(FIXED, args, true);
}

export interface IterationInterface {
    currentTime: number;
    iterationCount: number;
    elapsedTime: number;
}
export function setPlayCSS(item: Scene | SceneItem, isActivate: boolean) {
    item.state[PLAY_CSS] = isActivate;
}
export function isPausedCSS(item: Scene | SceneItem) {
    return item.state[PLAY_CSS] && item.isPaused();
}
export function isEndedCSS(item: Scene | SceneItem) {
    return !item.isEnded() && item.state[PLAY_CSS];
}

export function exportCSS(id: number | string, css: string) {
    const styleId = `${PREFIX}STYLE_${toId(id)}`;
    const styleElement: HTMLElement = $(`#${styleId}`);

    if (styleElement) {
        styleElement.innerText = css;
    } else {
        document.body.insertAdjacentHTML("beforeend",
            `<style id="${styleId}">${css}</style>`);
    }
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
export function findIndex<T>(arr: T[], callback: (element: T) => any, defaultIndex: number = -1): number {
    const length = arr.length;

    for (let i = 0; i < length; ++i) {
        if (callback(arr[i])) {
            return i;
        }
    }
    return defaultIndex;
}
export function find<T>(arr: T[], callback: (element: T) => any, defalutValue?: T): T | undefined {
    const index = findIndex(arr, callback);

    return index > - 1 ? arr[index] : defalutValue;
}
export function addAnimationEvent(item: Scene | SceneItem, el: Element) {
    const state = item.state;
    const duration = item.getDuration();
    const isZeroDuration = !duration || !isFinite(duration);
    const animationend = () => {
        setPlayCSS(item, false);
        item.finish();
    };
    const animationstart = () => {
        item.trigger(PLAY);
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
    addEvent(el, "animationcancel", animationend);
    addEvent(el, "animationend", animationend);
    addEvent(el, "animationiteration", animationiteration);
    addEvent(el, "animationstart", animationstart);
}
