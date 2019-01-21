/**
 * @typedef
 */
export type Role = true | IRole;

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
export interface IEventParamter {
  [name: string]: CallbackType | CallbackType[];
}
/**
 * @typedef
 */
export interface IRole {
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
