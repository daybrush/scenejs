import { ReactiveAdapter, ReactiveObject, getObservers, computed, reactive } from "@cfcs/core";
import Scene from "../Scene";
import SceneItem from "../SceneItem";
import { SceneItemEvents, AnimatorState, SceneItemOptions } from "../types";
import { isSceneItem } from "../utils";
import { ANIMATOR_METHODS, getMethodNames, AnimatorReactiveState, ReactiveMethods } from "./reactive";


export const SCENE_ITEM_METHODS = [
    ...ANIMATOR_METHODS,
    ...getMethodNames(Scene),
];

/**
 * @typedef
 * @memberof Reactive
 */
export interface SceneItemReactiveProps {
    options?: Partial<SceneItemOptions>;
    [key: string | number]: any;
}

/**
 * @typedef
 * @memberof Reactive
 */
export type SceneItemReactiveData = SceneItem | {
    props?: SceneItemReactiveProps;
    options?: Partial<SceneItemOptions>;
}

export type SceneItemReactiveMethods = ReactiveMethods<Scene>;
export type SceneItemReactiveInstance = ReactiveObject<SceneItemReactiveMethods & AnimatorReactiveState>;


export const SCENE_ITEM_REACTIVE: ReactiveAdapter<
    SceneItemReactiveInstance,
    SceneItemReactiveInstance,
    never,
    SceneItemReactiveData,
    SceneItemEvents
> = {
    created(data: SceneItemReactiveData) {
        const sceneItem = isSceneItem(data) ? data : new SceneItem(data?.props, data?.options);
        const obj = sceneItem.state as any as ReactiveObject<AnimatorState>;
        const observers = getObservers(obj);
        const totalDuration = computed(() => {
            return sceneItem.getTotalDuration();
        });
        const nextObj = {
            totalDuration,
            ...observers,
            ...SCENE_ITEM_METHODS.reduce((obj, cur) => {
                obj[cur] = (...args) => {
                    return sceneItem[cur].call(sceneItem, ...args);
                };
                return obj;
            }, {}),
        };

        const nextReactiveObject = reactive(nextObj) as SceneItemReactiveInstance;

        return nextReactiveObject;
    },
    on(inst, eventName, callback) {
        inst.on(eventName, callback);
    },
    off(inst, eventName, callback) {
        inst.off(eventName, callback);
    },
};
