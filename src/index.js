import Scene from "./css/Scene";
import SceneItem from "./css/SceneItem";
import Frame from "./css/Frame";
import {TRANSFORM, FILTER, ANIMATION, KEYFRAMES} from "./css/consts";
import {LINEAR, EASE, EASE_IN, EASE_OUT, EASE_IN_OUT} from "./consts";
import cubicBezier from "./cubicBezier";
import Animator from "./Animator";

Scene.LINEAR = LINEAR;
Scene.EASE = EASE;
Scene.EASE_IN = EASE_IN;
Scene.EASE_OUT = EASE_OUT;
Scene.EASE_IN_OUT = EASE_IN_OUT;
Scene.cubicBezier = cubicBezier;
Scene.SceneItem = SceneItem;
Scene.Frame = Frame;
Scene.Animator = Animator;
Scene.TRANSFORM = TRANSFORM;
Scene.FILTER = FILTER;
Scene.ANIMATION = ANIMATION;
Scene.KEYFRAMES = KEYFRAMES;

module.exports = Scene;
