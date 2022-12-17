import { VueReactiveAdapterResult, useReactive } from "@cfcs/vue3";
import { FRAME_REACTIVE, FrameReactiveData } from "scenejs";


/**
 * You can use reactive state and frame methods.
 * To access the state in Vue you need to add $ prefix.
 * @typedef
 * @memberof Vue3Scene
 * @see Frame
 * @extends Reactive.FrameReactiveState
 */
export interface VueFrameResult extends VueReactiveAdapterResult<typeof FRAME_REACTIVE> { }

/**
 * @memberof Vue3Scene
 * @param {Reactive.FrameReactiveData} - Can be used as frame, cssText, cssObject, etc.
 * @return - You can use Frame methods and cssText, cssObject, ...etc
 * @example
 * import { useFrame } from "vue-scenejs";
 *
 * const { cssText } = useFrame("text-align: center; transform: translate(10px, 10px);");
 *
 * console.log(cssText.value);
 */
export function useFrame(props: FrameReactiveData): VueFrameResult {
    return useReactive({
        ...FRAME_REACTIVE,
        data: () => props,
    });
}
