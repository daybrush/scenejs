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
* Scene.VERSION // #__VERSION__#
*/
export const VERSION = "#__VERSION__#";
export {SceneItem, Frame, Animator, Keyframes, PropertyObject, easing, presets};
export {OPTIONS, EVENTS} from "./consts";
export {setRole, setAlias} from "./utils";
export {Scene as default};
