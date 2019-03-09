import Scene from "./Scene";
import SceneItem from "./SceneItem";
import Frame from "./Frame";
import Animator from "./Animator";

export { SceneItem, Frame, Animator };
export { bezier, EASE_IN_OUT, EASE_IN, EASE_OUT, EASE, LINEAR, steps, STEP_START, STEP_END } from "./easing";
export { transition, wipeIn, wipeOut, fadeIn, fadeOut, blink, zoomIn, zoomOut, animate} from "./presets";
export { OPTIONS, EVENTS } from "./consts";
export { setRole, setAlias } from "./utils";
export { Scene as default };
