import { ReactReactiveAdapterResult, useReactive } from "@cfcs/react";
import { SceneOptions, SceneReactiveProps, SCENE_REACTIVE } from "scenejs";


/**
 * @typedef
 * @memberof ReactScene
 * @extends Reactive.AnimatorReactiveState
 */
export interface ReactSceneResult extends ReactReactiveAdapterResult<typeof SCENE_REACTIVE> { }


/**
 * @memberof ReactScene
 * @param {Reactive.SceneReactiveProps} - Items and properties that make up the scene
 * @param - Scene and Animator options
 * @return - You can use Scene methods and Animator State
 * @example
 * import { useScene, useNowFrame } from "react-scenejs";
 * 
 * const scene = useScene({ ... });
 * const frame = useNowFrame(scene.getItem("a1"));
 * 
 * frame.camelCasedCSSObject;
 */
export function useScene(props?: SceneReactiveProps, options?: Partial<SceneOptions>): ReactSceneResult {
    return useReactive({
        ...SCENE_REACTIVE,
        data() {
            return {
                props,
                options,
            };
        },
    });
}