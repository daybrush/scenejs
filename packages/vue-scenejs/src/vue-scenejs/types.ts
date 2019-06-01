import Scene, { SceneItem, EasingType, FillModeType, DirectionType, IterationCountType } from 'scenejs';
import { IObject } from '@daybrush/utils';

export interface SceneComponent {
    item: Scene | SceneItem;
    css: boolean;
    keyframes: IObject<any>;
}


export interface SceneProps {
    keyframes: IObject<any>;
    css: boolean;
    autoplay: boolean;
    time: number;
    easing: EasingType;
    fillMode: FillModeType;
    direction: DirectionType;
    iterationCount: IterationCountType;
    delay: number;
    duration: number;
    playSpeed: number;
}
