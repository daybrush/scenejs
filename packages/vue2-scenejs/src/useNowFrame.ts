import { VueReactiveAdapterResult, useReactive } from "@cfcs/vue2";
import { SceneItem, NOW_FRAME_REACTIVE } from "scenejs";


/**
 * To access the state in Vue you need to add $ prefix.
 * @typedef
 * @memberof Vue2Scene
 * @extends Vue2Scene.ReactFrameResult
 */
export interface VueNowFrameResult extends VueReactiveAdapterResult<typeof NOW_FRAME_REACTIVE> { }

/**
 * @memberof Vue2Scene
 * @param  - item to get the current frame
 * @return - You can use Frame methods and cssText, cssObject, ...etc State
 * @example
 * import { useSceneItem, useNowFrame } from "vue2-scenejs";
 *
 * const sceneItem = useSceneItem(...);
 * const { cssText } = useNowFrame(sceneItem);
 *
 * console.log(cssText.value);
 */
export function useNowFrame(item: SceneItem): VueNowFrameResult {
    return useReactive({
        ...NOW_FRAME_REACTIVE,
        data: () => item,
    });
}
