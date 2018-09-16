/// <reference types="react" />
import { SceneItem as NativeSceneItem } from 'scenejs';
import { SceneInterface } from './SceneInterface';
export declare class SceneItem extends SceneInterface {
    protected item: NativeSceneItem;
    constructor(props: any);
    render(): import("react").ReactNode;
    componentDidMount(): void;
}
