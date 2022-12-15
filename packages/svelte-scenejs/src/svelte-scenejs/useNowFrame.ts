import { SvelteReactiveAdapterResult, useReactive } from "@cfcs/svelte";
import { SceneItem, NOW_FRAME_REACTIVE } from "scenejs";


/**
 * To access the state in Svelte you need to add $ prefix.
 * @typedef
 * @memberof SvelteScene
 * @extends SvelteScene.ReactFrameResult
 */
export interface SvelteNowFrameResult extends SvelteReactiveAdapterResult<typeof NOW_FRAME_REACTIVE> { }

/**
 * @memberof SvelteScene
 * @param  - item to get the current frame
 * @return - You can use Frame methods and cssText, cssObject, ...etc State
 * @example
 * import { useSceneItem, useNowFrame } from "svelte-scenejs";
 *
 * const sceneItem = useSceneItem(...);
 * const { cssText } = useNowFrame(sceneItem);
 *
 * $cssText;
 */
export function useNowFrame(item: SceneItem): SvelteNowFrameResult {
    return useReactive({
        ...NOW_FRAME_REACTIVE,
        data: () => item,
    });
}
