import { IArrayFormat } from "@daybrush/utils";

/**
 * @typedef
 */
export interface IEasingFunction extends Function {
    easingName?: string;
}

/**
 * @typedef
 */
export type FillModeType = "forwards" | "backwards" | "both";
/**
 * @typedef
 */
export type IterationCountType = number | "infinite";
/**
 * @typedef
 */
export type EasingType = 0 | IEasingFunction;
/**
 * @typedef
 */
export type DirectionType = "normal" | "reverse" | "alternate" | "alternate-reverse";
/**
 * @typedef
 */
export type PlayStateType = "paused" | "running";

/**
 * @typedef
 */
export interface AnimatorState {
    id: number | string;
    easing: EasingType;
    easingName: string;
    iterationCount: IterationCountType;
    delay: number;
    fillMode: FillModeType;
    direction: DirectionType;
    playSpeed: number;
    iterationTime: number;
    currentTime: number;
    tickTime: number;
    iteration: number;
    prevTime: number;
    playState: PlayStateType;
    duration: number;
}

/**
 * @typedef
 */
export interface SceneState extends AnimatorState {
    selector: string | boolean;
    playCSS: boolean;
    exportEvent?: boolean;
}

/**
 * @typedef
 */
export interface SceneOptions extends AnimatorState {
    selector: string | boolean;
}
/**
 * @typedef
 */
export interface SceneItemState extends AnimatorState {
    playCSS: boolean;
    cssText: string;
    selector: string;
    exportEvent?: boolean;
}
/**
 * @typedef
 */
export interface SceneItemOptions extends AnimatorState {
    selector: boolean | string;
    elements: IArrayFormat<AnimateElement> | AnimateElement;
    element: IArrayFormat<AnimateElement> | AnimateElement;
    target: any;
}

/**
 * @memberof presets
 * @typedef
 */
export interface PresetState extends AnimatorState {
    [key: string]: any;
}

/**
 * @typedef
 */
export interface PropertyObjectState {
    prefix: string;
    suffix: string;
    model: string;
    type: string;
    separator: string;
}

/**
 * @typedef
 */
export type Role = true | RoleObject;

/**
 * @typedef
 */
export type ElementsType = HTMLElement | HTMLElement[] | NodeListOf<HTMLElement>;
/**
 * @typedef
 */
export type CallbackType<T = any> = (...args: any[]) => T;

/**
 * @typedef
 */
export interface EventParameter {
    [name: string]: CallbackType | CallbackType[];
}
/**
 * @typedef
 */
export interface RoleObject {
    [role: string]: Role;
}
/**
 * @typedef
 */
export type NameType = string | number;
/**
 * @typedef
 */
export type OptionType = ["duration", "fillMode", "direction", "iterationCount", "delay", "easing", "playSpeed"];
/**
 * @typedef
 */
export type EventType = ["paused", "ended", "timeupdate", "animate", "play", "iteration"];

/**
 * @typedef
 */
export interface AnimateElement extends Element, ElementCSSInlineStyle {
}
