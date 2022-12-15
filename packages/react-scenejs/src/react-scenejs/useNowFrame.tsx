import { ReactReactiveAdapterResult, useReactive } from "@cfcs/react";
import { SceneItem, NOW_FRAME_REACTIVE } from "scenejs";


/**
 * @typedef
 * @memberof ReactScene
 * @extends ReactScene.ReactFrameResult
 */
export interface ReactNowFrameResult extends ReactReactiveAdapterResult<typeof NOW_FRAME_REACTIVE> { }

/**
 * @memberof ReactScene
 * @param  - item to get the current frame
 * @return - You can use Frame methods and cssText, cssObject, ...etc State
 * @example
 * import { useSceneItem, useNowFrame } from "react-scenejs";
 * 
 * const sceneItem = useSceneItem(...);
 * const frame = useNowFrame(sceneItem);
 * 
 * frame.camelCasedCSSObject;
 */
export function useNowFrame(item: SceneItem): ReactNowFrameResult {
    return useReactive({
        ...NOW_FRAME_REACTIVE,
        data: () => item,
    });
}