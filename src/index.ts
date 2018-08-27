import Scene from "./Scene";
import SceneItem from "./SceneItem";
import Frame from "./Frame";
import Keyframes from "./Keyframes";
import PropertyObject from "./PropertyObject";
import * as easing from "./easing";
import Animator from "./Animator";
import * as presets from "./presets/index";

export {SceneItem, Frame, Animator, Keyframes, PropertyObject, easing, presets};
export {setRole, setAlias} from "./utils";
export default Scene;
