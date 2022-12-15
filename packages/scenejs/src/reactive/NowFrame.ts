import { observe, ReactiveAdapter } from "@cfcs/core";
import Frame from "../Frame";
import SceneItem from "../SceneItem";
import { FrameReactiveInstance, FrameReactiveState, FRAME_REACTIVE } from "./Frame";


export const NOW_FRAME_REACTIVE = {
    ...FRAME_REACTIVE,
    created(data: SceneItem) {
        const frame = observe(new Frame());
        data.on("animate", e => {
            frame.current = e.frame;
        });

        return FRAME_REACTIVE.created(frame);
    },
} as ReactiveAdapter<
    FrameReactiveInstance,
    FrameReactiveState,
    never,
    SceneItem,
    {}
>
