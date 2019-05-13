import { IObject } from "@daybrush/utils";
import Scene from "./Scene";
import SceneItem from "./SceneItem";
import { SceneOptions, SceneItemOptions } from "./types";

export function animate(properties?: IObject<any>, options?: Partial<SceneOptions>) {
    return new Scene(properties, options).play();
}
export function animateItem(properties?: IObject<any>, options?: Partial<SceneItemOptions>) {
    return new SceneItem(properties, options).play();
}
