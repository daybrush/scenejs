import { observe, ReactiveAdapter } from "@cfcs/core";
import { isFunction } from "@daybrush/utils";
import Frame from "../Frame";
import SceneItem from "../SceneItem";
import { FrameReactiveInstance, FrameReactiveMethods, FrameReactiveState, FRAME_REACTIVE } from "./Frame";

export type NowFrameData = SceneItem | (() => SceneItem);
export const NOW_FRAME_REACTIVE = {
    ...FRAME_REACTIVE,
    created(data: NowFrameData) {
        const nextObject = isFunction(data) ? data() : data;
        const frame = observe(new Frame());

        nextObject.on("animate", e => {
            frame.current = e.frame;
        });

        return FRAME_REACTIVE.created(frame);
    },
} as ReactiveAdapter<
    FrameReactiveInstance,
    FrameReactiveState,
    keyof FrameReactiveMethods,
    SceneItem,
    {}
>;
