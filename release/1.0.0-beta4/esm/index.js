import Scene from "./Scene";
import SceneItem from "./SceneItem";
import Frame from "./Frame";
import Keyframes from "./Keyframes";
import PropertyObject from "./PropertyObject";
import * as easing from "./easing";
import Animator from "./Animator";
import * as presets from "./presets/index";
/**
* version info
* @name Scene.VERSION
* @memberof Scene
* @static
* @type {string}
* @example
* Scene.VERSION // 1.0.0-beta4
*/
export var VERSION = "#__VERSION__#";
export { SceneItem, Frame, Animator, Keyframes, PropertyObject, easing, presets };
export { setRole, setAlias } from "./utils";
export { Scene as default };
//# sourceMappingURL=index.js.map