import { ReactReactiveAdapterResult, useReactive } from "@cfcs/react";
import { FRAME_REACTIVE, FrameReactiveData } from "scenejs";


/**
 * You can use reactive state and frame methods.
 * @typedef
 * @memberof ReactScene
 * @see Frame
 * @extends Reactive.FrameReactiveState
 */
export interface ReactFrameResult extends ReactReactiveAdapterResult<typeof FRAME_REACTIVE> { }

/**
 * @memberof ReactScene
 * @param {Reactive.FrameReactiveData} - Can be used as frame, cssText, cssObject, etc.
 * @return - You can use Frame methods and cssText, cssObject, ...etc
 * @example
 * import { useFrame } from "react-scenejs";
 * 
 * const frame = useFrame("text-align: center; transform: translate(10px, 10px);");
 * 
 * frame.camelCasedCSSObject;
 */
export function useFrame(props: FrameReactiveData): ReactFrameResult {
    return useReactive({
        ...FRAME_REACTIVE,
        data: () => props,
    });
}
