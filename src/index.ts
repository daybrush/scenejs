import Scene from "./Scene";
import SceneItem from "./SceneItem";
import Frame from "./Frame";
import Animator from "./Animator";

export { SceneItem, Frame, Animator };
export * from "./easing";
export * from "./presets";
export * from "./types";
export { OPTIONS, EVENTS, FIXED, ROLES, NAME_SEPARATOR } from "./consts";
export { setRole, setAlias, isRole } from "./utils";
export { Scene as default };
