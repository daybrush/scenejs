import { SvelteReactiveAdapterResult, useReactive } from "@cfcs/svelte";
import { FRAME_REACTIVE, FrameReactiveData } from "scenejs";


/**
 * You can use reactive state and frame methods.
 * To access the state in Svelte you need to add $ prefix.
 * @typedef
 * @memberof SvelteScene
 * @see Frame
 * @extends Reactive.FrameReactiveState
 */
export interface SvelteFrameResult extends SvelteReactiveAdapterResult<typeof FRAME_REACTIVE> { }

/**
 * @memberof SvelteScene
 * @param {Reactive.FrameReactiveData} - Can be used as frame, cssText, cssObject, etc.
 * @return - You can use Frame methods and cssText, cssObject, ...etc
 * @example
 * import { useFrame } from "svelte-scenejs";
 *
 * const { cssText } = useFrame("text-align: center; transform: translate(10px, 10px);");
 *
 * $cssText;
 */
export function useFrame(props: FrameReactiveData): SvelteFrameResult {
    return useReactive({
        ...FRAME_REACTIVE,
        data: () => props,
    });
}
