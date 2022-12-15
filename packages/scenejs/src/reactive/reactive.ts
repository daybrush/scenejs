
import { ExtractNever } from "@cfcs/core";
import { getKeys, isFunction } from "@daybrush/utils";
import EventEmitter from "@scena/event-emitter";
import Animator from "../Animator";
import { AnimatorState } from "../types";

export function getMethodNames(classConstructor: new (...args: any[]) => any) {
    const prototype = classConstructor.prototype;

    return getKeys(prototype).filter(name => {
        const descriptor = Object.getOwnPropertyDescriptor(prototype, name);

        return !descriptor.get && !descriptor.set && isFunction(descriptor.value || prototype[name]);
    });
}

const EMITTER_METHODS = getMethodNames(EventEmitter);

export const ANIMATOR_METHODS = [
    ...EMITTER_METHODS,
    ...getMethodNames(Animator),
];

export type ReactiveMethods<Instance> = ExtractNever<{
    [key in (keyof Instance) & string]: Instance[key] extends (...args: any) => any ? Instance[key] : never;
}>;

/**
 * @typedef
 * @memberof Reactive
 */
export interface AnimatorReactiveState extends AnimatorState {
    /**
     * Total time the animation played
     */
    totalDuration: number;
}
