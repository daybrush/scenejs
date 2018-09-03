import * as React from "react";

export type Easing = (time?: number) => number | number[];
export type Callback = (e?: object) => void;

interface SceneItemProps {
	duration?: number,
	fillMode?: string,
	direction?: string,
	iterationCount?: string | number,
	delay?: number,
	easing?: any[] | Easing,
	playSpeed?: number,
	timeline?: any[] | object,
	from?: object | string,
	to?: object | string,
	play?: boolean,
	onPlay?: Callback,
	onPaused?: Callback,
	onEnded?: Callback,
	onTimeUpdate?: Callback,
	onIteration?: Callback,
	onAnimate?: Callback,
}

declare class SceneItem extends React.Component<SceneItemProps> {
	play(): void;
	pause(): void;
}

export default SceneItem;
