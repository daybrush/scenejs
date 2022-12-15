import { ReactReactiveAdapterResult, useReactive } from "@cfcs/react";
import { SCENE_ITEM_REACTIVE, SceneItemOptions, SceneItemReactiveProps } from "scenejs";

/**
 * @typedef
 * @memberof ReactScene
 * @extends Reactive.AnimatorReactiveState
 */
export interface ReactSceneItemResult extends ReactReactiveAdapterResult<typeof SCENE_ITEM_REACTIVE> { }

/**
 * @memberof ReactScene
 * @param {Reactive.SceneItemReactiveProps} - Items and properties that make up the scene item
 * @param - SceneItem and Animator options
 * @return - You can use SceneItem methods and Animator State.
 * @example
 * import { useSceneItem, useNowFrame } from "react-scenejs";
 * 
 * const item = useSceneItem({ ... });
 * const frame = useNowFrame(item);
 * 
 * frame.camelCasedCSSObject;
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