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
