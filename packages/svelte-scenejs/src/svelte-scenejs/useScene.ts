import { SvelteReactiveAdapterResult, useReactive } from "@cfcs/svelte";
import { SceneOptions, SceneReactiveData, SCENE_REACTIVE } from "scenejs";


/**
 * To access the state in Svelte you need to add $ prefix.
 * @typedef
 * @memberof SvelteScene
 * @extends Reactive.AnimatorReactiveState
 */
export interface SvelteSceneResult extends SvelteReactiveAdapterResult<typeof SCENE_REACTIVE> { }


/**
 * @memberof SvelteScene
 * @param {Reactive.SceneReactiveData} - Items and properties that make up the scene
 * @param - Scene and Animator options
 * @return - You can use Scene methods and Animator State
 * @example
 * import { useScene, useNowFrame } from "svelte-scenejs";
 *
 * const scene = useScene({ ... });
 * const { cssText } = useNowFrame(scene.getItem("a1"));
 *
 * $cssText
 */
export function useScene(props?: SceneReactiveData, options?: Partial<SceneOptions>): SvelteSceneResult {
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
