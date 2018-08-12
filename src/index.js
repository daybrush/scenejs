import Scene from "./Scene";
import SceneItem from "./SceneItem";
import Frame from "./Frame";
import {LINEAR, EASE, EASE_IN, EASE_OUT, EASE_IN_OUT, TRANSFORM, FILTER, ANIMATION, KEYFRAMES} from "./consts";
import cubicBezier from "./cubicBezier";
import Animator from "./Animator";

Scene.cubicBezier = cubicBezier;
Scene.SceneItem = SceneItem;
Scene.Frame = Frame;
Scene.Animator = Animator;

Scene.TRANSFORM = TRANSFORM;
Scene.FILTER = FILTER;
Scene.ANIMATION = ANIMATION;
Scene.KEYFRAMES = KEYFRAMES;

Scene.LINEAR = LINEAR;
Scene.EASE = EASE;
Scene.EASE_IN = EASE_IN;
Scene.EASE_OUT = EASE_OUT;
Scene.EASE_IN_OUT = EASE_IN_OUT;

export default Scene;
