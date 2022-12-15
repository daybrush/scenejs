import { ReactiveAdapter, ReactiveObject, computed, reactive, observe, Observer, isObserver } from "@cfcs/core";
import Frame from "../Frame";
import { isFrame } from "../utils";
import { ANIMATOR_METHODS, getMethodNames, ReactiveMethods } from "./reactive";

export const FRAME_METHODS = [
    ...ANIMATOR_METHODS,
    ...getMethodNames(Frame),
];

/**
 * @typedef
 * @memberof Reactive
 */
export type FrameReactiveData = Observer<Frame> | Frame | string | Record<string, any>;

export type FrameReactiveMethods = ReactiveMethods<Frame>;

/**
 * @typedef
 * @memberof Reactive
 */
export interface FrameReactiveState {
    /**
     * Returns the frame's cssText.
     */
    cssText: string;
    /**
     * Returns the frame's css object (kebab-case).
     */
    cssObject: Record<string, any>;
    /**
     * Returns an object in camel case type of frame. It can be used in React.
     */
    camelCasedCSSObject: Record<string, any>;
}

export type FrameReactiveInstance = ReactiveObject<FrameReactiveState> & FrameReactiveMethods & {
    getFrameObserver(): Observer<Frame>;
    onUpdate(): void;
};

export const FRAME_REACTIVE: ReactiveAdapter<
    FrameReactiveInstance,
    FrameReactiveState,
    keyof FrameReactiveMethods,
    FrameReactiveData,
    {}
> = {
    methods: FRAME_METHODS as Array<keyof FrameReactiveMethods>,
    created(data: FrameReactiveData) {
        const updateCount = observe(0);
        let frame: Observer<Frame>;

        if (isObserver(data)) {
            frame = data;
        } else {
            frame = observe(isFrame(data) ? data : new Frame(data));
        }

        const cssText = computed(() => {
            frame.current;
            updateCount.current;

            return frame.current.toCSSText();
        });
        const cssObject = computed(() => {
            frame.current;
            cssText.current;

            return frame.current.toCSSObject();
        });
        const camelCasedCSSObject = computed(() => {
            frame.current;
            cssText.current;

            return frame.current.toCSSObject(true);
        });

        const onUpdate = () => {
            ++updateCount.current;
        };

        frame.subscribe((currentFrame, prevFrame) => {
            prevFrame.off("update", onUpdate);
            currentFrame.on("update", onUpdate);
        });
        const nextReactiveObject = reactive({
            cssText,
            cssObject,
            camelCasedCSSObject,
            onUpdate,
            ...FRAME_METHODS.reduce((obj, cur) => {
                obj[cur] = (...args) => {
                    const currentFrame = frame.current;

                    return currentFrame?.[cur].call(currentFrame, ...args);
                };
                return obj;
            }, {}),
        }) as FrameReactiveInstance;

        return nextReactiveObject;
    },
    destroy(inst) {
        inst.off("update", inst.onUpdate);
    },
};
