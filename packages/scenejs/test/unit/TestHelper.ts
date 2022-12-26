import { Animator, AnimatorEvents } from "../../src";

export function orderByASC(arr: any[]) {
    return arr.map(v => parseFloat(v)).sort((a, b) => a - b);
}
export function group(arr: any[]) {
    const result: any[] = [];

    arr.forEach(value => {
        (result.indexOf(value) === -1) && result.push(value);
    });
    return result;
}

export function waitFor(time: number) {
    return new Promise<void>(resolve => {
        setTimeout(() => {
            resolve();
        }, time);
    });
}
export function waitEvent<T extends Animator>(et: T, name: keyof AnimatorEvents | (T extends Animator<any, any, infer Events> ? keyof Events : never)) {
    return new Promise(resolve => {
        et.once(name, e => {
            resolve(e);
        });
    });
}
