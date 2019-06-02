import { IArrayFormat } from "@daybrush/utils";
import { SceneItem } from ".";

/**
 * @typedef
 */
export interface EasingFunction extends Function {
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
export type EasingType = 0 | EasingFunction;
/**
 * @typedef
 */
export type DirectionType = "normal" | "reverse" | "alternate" | "alternate-reverse";

/**
 * @typedef
 */
export type PlayStateType = "paused" | "running";

/**
* @typedef - The Animator options. Properties used in css animation.
* @property - The id represents the unique key of the animator.
* @property - The easing(timing-function) specifies the speed curve of an animation.
* @property - The iterationCount property specifies the number of times an animation should be played.
* @property - The delay property specifies a delay for the start of an animation.
* @property - The fillMode property specifies a style for the element when the animation is not playing (before it starts, after it ends, or both).
* @property - The direction property defines whether an animation should be played forwards, backwards or in alternate cycles.
* @property - The playspeed define the speed at which the play is performed.
* @property - The duration property defines how long an animation should take to complete one cycle.

*/
export interface AnimatorOptions {
    id: number | string;
    easing: string | EasingType;
    iterationCount: IterationCountType;
    delay: number;
    fillMode: FillModeType;
    direction: DirectionType;
    playSpeed: number;
    duration: number;
}
/**
 * @typedef
 * @extends AnimatorOptions
 * @see AnimatorOptions
 */
export interface AnimatorState extends AnimatorOptions {
    easingName: string;
    iterationTime: number;
    currentTime: number;
    tickTime: number;
    iteration: number;
    prevTime: number;
    playState: PlayStateType;
}

/**
 * @typedef
 * @extends AnimatorState
 * @see AnimatorState
 */
export interface SceneState extends AnimatorState {
    selector: string | boolean | ((id: number | string) => string);
    playCSS: boolean;
    exportEvent?: boolean;
}

/**
 * @typedef
 * @extends AnimatorOptions
 * @see AnimatorOptions
 */
export interface SceneOptions extends AnimatorOptions {
    selector: string | boolean | ((id: number | string) => string);
}
/**
 * @typedef
 * @extends AnimatorState
 * @see AnimatorState
 */
export interface SceneItemState extends AnimatorState {
    playCSS: boolean;
    cssText: string;
    selector: string;
    exportEvent?: boolean;
}
/**
 * @typedef
 * @extends AnimatorOptions
 * @see AnimatorOptions
 */
export interface SceneItemOptions extends AnimatorOptions {
    selector: string | boolean | ((id: number | string) => string);
    elements: IArrayFormat<AnimateElement> | AnimateElement;
    element: IArrayFormat<AnimateElement> | AnimateElement;
    target: any;
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
export type AnimateElement = HTMLElement | SVGElement;

/**
 * @typedef
 */
export interface PlayCondition {
    className?: string;
    selector?: string | ((item: SceneItem, selector: string) => string);
}
