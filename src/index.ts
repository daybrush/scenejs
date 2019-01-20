import Scene from "./Scene";
import SceneItem from "./SceneItem";
import Frame from "./Frame";
import PropertyObject from "./PropertyObject";
import Animator from "./Animator";
import * as _presets from "./presets";

export { SceneItem, Frame, Animator, PropertyObject };
export { bezier, EASE_IN_OUT, EASE_IN, EASE_OUT, EASE, LINEAR, steps, STEP_START, STEP_END } from "./easing";
export { set, transition, wipeIn, wipeOut, fadeIn, fadeOut, blink, zoomIn, zoomOut} from "./presets";
export { OPTIONS, EVENTS } from "./consts";
export { setRole, setAlias } from "./utils";
export { Scene as default };
