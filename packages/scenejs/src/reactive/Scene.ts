import {
    ReactiveObject, ReactiveAdapter,
    getObservers, computed,
    partialReactive,
} from "@cfcs/core";
import { isFunction } from "@daybrush/utils";
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
export interface SceneReactiveOptions {
    options?: Partial<SceneOptions>;
    [key: string | number]: any;
}

/**
 * @typedef
 * @memberof Reactive
 */
export type SceneReactiveProps = SceneReactiveOptions | Scene | (() => SceneReactiveOptions | Scene);

/**
 * @typedef
 * @memberof Reactive
 */
export interface SceneReactiveData {
    props: SceneReactiveProps;
    options?: Partial<SceneOptions>;
}

export type SceneReactiveMethods = ReactiveMethods<Scene>;
export type SceneReactiveInstance = ReactiveObject<AnimatorReactiveState> & SceneReactiveMethods & {
    getInstance(): Scene;
};

export const SCENE_REACTIVE: ReactiveAdapter<
    SceneReactiveInstance,
    AnimatorReactiveState,
    keyof SceneReactiveMethods,
    SceneReactiveData,
    SceneEvents
> = {
    methods: SCENE_METHODS as Array<keyof SceneReactiveMethods>,
    created(data: SceneReactiveData) {
        const dataProps = data.props;
        const dataObject = isFunction(dataProps) ? dataProps() : dataProps;
        const scene = isScene(dataObject)
            ? dataObject
            : new Scene(dataObject, {
                noRegisterElement: false,
                ...data.options,
            });
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
            getInstance() {
                return scene;
            },
        };

        const nextReactiveObject = partialReactive(nextObj) as SceneReactiveInstance;

        return nextReactiveObject;
    },
    mounted(data, inst) {
        const scene = inst.getInstance();
        const state = scene.state;
        const selector = state.selector;

        if (selector && !(state as any).__REACTIVE_MOUNTED__) {
            inst.setSelector(selector);
            (state as any).__REACTIVE_MOUNTED__ = true;
            inst.forEach(function mountFlag(child: Scene | SceneItem) {
                const childState = child.state;

                if (childState.selector) {
                    (childState as any).__REACTIVE_MOUNTED__ = true;
                }
                if (isScene(child)) {
                    child.forEach(mountFlag);
                }
            });
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

        inst.forEach(function unmountFlag(child: Scene | SceneItem) {
            (child.state as any).__REACTIVE_MOUNTED__ = false;

            if (isScene(child)) {
                child.forEach(unmountFlag);
            }
        });
    },
};
