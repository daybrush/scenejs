import { SvelteReactiveAdapterResult, useReactive } from "@cfcs/svelte";
import { SCENE_ITEM_REACTIVE, SceneItemOptions, SceneItemReactiveProps } from "scenejs";

/**
 * To access the state in Svelte you need to add $ prefix.
 * @typedef
 * @memberof SvelteScene
 * @extends Reactive.AnimatorReactiveState
 */
export interface SvelteSceneItemResult extends SvelteReactiveAdapterResult<typeof SCENE_ITEM_REACTIVE> { }

/**
 * @memberof SvelteScene
 * @param {Reactive.SceneItemReactiveProps} - Items and properties that make up the scene item
 * @param - SceneItem and Animator options
 * @return - You can use SceneItem methods and Animator State.
 * @example
 * import { useSceneItem, useNowFrame } from "svelte-scenejs";
 *
 * const item = useSceneItem({ ... });
 * const { cssText } = useNowFrame(item);
 *
 * $cssText
 */
export function useSceneItem(props?: SceneItemReactiveProps, options?: Partial<SceneItemOptions>) {
    return useReactive({
        ...SCENE_ITEM_REACTIVE,
        data: () => ({
            props,
            options,
        }),
    });
}
