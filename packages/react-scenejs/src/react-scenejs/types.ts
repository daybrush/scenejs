import { AnimatorOptions } from "scenejs";
import { IObject } from "@daybrush/utils";

type Callback = (...args: any[]) => any;

export interface EventTypes {
  onPlay?: Callback;
  onPaused?: Callback;
  onEnded?: Callback;
  onTimeUpdate?: Callback;
  onIteration?: Callback;
  onAnimate?: Callback;
}
export interface ScenePropTypes extends Partial<AnimatorOptions>, EventTypes {
  keyframes?: IObject<any>;
  from?: IObject<any>;
  to?: IObject<any>;
  css?: boolean;
  time?: string | number;
  autoplay?: boolean;
}
