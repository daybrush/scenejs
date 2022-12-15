import { ReactiveObject, ReactiveAdapter, getObservers, computed, reactive } from "@cfcs/core";
import Scene from "../Scene";
import SceneItem from "../SceneItem";
import { SceneOptions, SceneEvents, AnimatorState } from "../types";
import { isScene } from "../utils";
import { ANIMATOR_METHODS, getMethodNames, AnimatorReactiveState, ReactiveMethods } from "./reactive";

export const SCENE_METHODS = [
    ...ANIMATOR_METHODS,
    ...getMethodNames(Scene),
];

/**
 * @typedef
 * @memberof Reactive
 */
export interface SceneReactiveProps {
    options?: Partial<SceneOptions>;
    [key: string | number]: any;
}

/**
 * @typedef
 * @memberof Reactive
 */
export declare type SceneReactiveData = Scene | SceneReactiveProps;

export type SceneReactiveMethods = ReactiveMethods<Scene>;
export type SceneReactiveInstance = ReactiveObject<AnimatorReactiveState> & SceneReactiveMethods;

export const SCENE_REACTIVE: ReactiveAdapter<
    SceneReactiveInstance,
    AnimatorReactiveState,
    keyof SceneReactiveMethods,
    SceneReactiveData,
    SceneEvents
> = {
    methods: SCENE_METHODS as Array<keyof SceneReactiveMethods>,
    created(data: SceneReactiveData) {
        const scene = isScene(data) ? data : new Scene(data?.props, data?.options);
        const obj = scene.state as any as ReactiveObject<AnimatorState>;
        const observers = getObservers(obj);

        const totalDuration = computed(() => {
            return scene.getTotalDuration();
        });
        const nextObj = {
            totalDuration,
            ...observers,
            ...SCENE_METHODS.reduce((methodObject, cur) => {
                methodObject[cur] = (...args) => {
                    return scene[cur].call(scene, ...args);
                };
                return methodObject;
            }, {}),
        };

        const nextReactiveObject = reactive(nextObj) as SceneReactiveInstance;

        return nextReactiveObject;
    },
    on(inst, eventName, callback) {
        inst.on(eventName, callback);
    },
    off(inst, eventName, callback) {
        inst.off(eventName, callback);
    },
};
