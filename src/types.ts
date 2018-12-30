/**
 * @typedef
 */
export type Role = true | RoleInterface;
/**
 * @typedef
 */
export interface RoleInterface {
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
