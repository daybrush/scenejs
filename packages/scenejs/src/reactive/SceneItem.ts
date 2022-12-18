import { ReactiveAdapter, ReactiveObject, getObservers, computed, reactive } from "@cfcs/core";
import { isFunction } from "@daybrush/utils";
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
} | (() => SceneItem | {
    props?: SceneItemReactiveProps;
    options?: Partial<SceneItemOptions>;
});

export type SceneItemReactiveMethods = ReactiveMethods<Scene>;
export type SceneItemReactiveInstance = ReactiveObject<AnimatorReactiveState> & SceneItemReactiveMethods & {
    getInstance(): SceneItem;
};

export const SCENE_ITEM_REACTIVE: ReactiveAdapter<
    SceneItemReactiveInstance,
    AnimatorReactiveState,
    keyof SceneItemReactiveMethods,
    SceneItemReactiveData,
    SceneItemEvents
> = {
    methods: SCENE_ITEM_METHODS as Array<keyof SceneItemReactiveMethods>,
    created(data: SceneItemReactiveData) {
        const dataObject = isFunction(data) ? data() : data;
        const sceneItem = isSceneItem(dataObject)
            ? dataObject
            : new SceneItem(dataObject?.props, dataObject?.options);
        const obj = sceneItem.state as any as ReactiveObject<AnimatorState>;
        const observers = getObservers(obj);
        const totalDuration = computed(() => {
            return sceneItem.getTotalDuration();
        });
        const nextObj = {
            totalDuration,
            ...observers,
            ...SCENE_ITEM_METHODS.reduce((methodObject, cur) => {
                methodObject[cur] = (...args) => {
                    return sceneItem[cur].call(sceneItem, ...args);
                };
                return methodObject;
            }, {}),
            getInstance() {
                return sceneItem;
            },
        };

        const nextReactiveObject = reactive(nextObj) as SceneItemReactiveInstance;

        return nextReactiveObject;
    },
    mounted(data, inst)  {
        const item = inst.getInstance();
        const state = item.state;
        const selector = state.selector;

        if (selector && !(state as any).__REACTIVE_MOUNTED__) {
            inst.setSelector(selector);
            (state as any).__REACTIVE_MOUNTED__ = true;
        }
    },
    on(inst, eventName, callback) {
        inst.on(eventName, callback);
    },
    off(inst, eventName, callback) {
        inst.off(eventName, callback);
    },
    destroy(inst) {
        const scene = inst.getInstance();
        const state = scene.state;

        (state as any).__REACTIVE_MOUNTED__ = false;
        inst.finish();
    },
};
