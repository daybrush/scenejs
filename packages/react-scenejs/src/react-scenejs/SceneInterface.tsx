import { Component } from 'react';
import Scene, {OPTIONS, EVENTS, SceneItem, AnimatorState} from 'scenejs';
import { IObject } from '@daybrush/utils';

type Callback = (...args: any[]) => any;

export interface EventTypes {
  onPlay?: Callback;
  onPaused?: Callback;
  onEnded?: Callback;
  onTimeUpdate?: Callback;
  onIteration?: Callback;
  onAnimate?: Callback;
}
export interface PropTypes extends Partial<AnimatorState>, EventTypes {
  keyframes?: IObject<any>;
  from?: IObject<any>;
  to?: IObject<any>;
  css?: boolean;
  time?: string | number;
  autoplay?: boolean;
}


export class SceneInterface<T extends Scene | SceneItem> extends Component<PropTypes, {}> {
  public static defaultProps: PropTypes = {
    duration: 0,
    fillMode: 'forwards',
    direction: 'normal',
    playSpeed: 1,
    iterationCount: 1,
    delay: 0,
    easing: 0,
    time: -1,
    css: false,
    autoplay: false,
    onPlay: () => undefined,
    onPaused: () => undefined,
    onEnded: () => undefined,
    onTimeUpdate: () => undefined,
    onIteration: () => undefined,
    onAnimate: () => undefined,
  };
  protected item: T;
  protected events: IObject<any> = {
    play: (e: any) => this.props.onPlay(e),
    paused: (e: any) => this.props.onPaused(e),
    ended: (e: any) => this.props.onEnded(e),
    timeupdate: (e: any) => this.props.onTimeUpdate(e),
    iteration: (e: any) => this.props.onIteration(e),
    animate: (e: any) => this.props.onAnimate(e),
  };
  public render() {
    return this.props.children;
  }
  public componentDidUpdate() {
    if (this.props.time !== -1 && (this.props.autoplay === false || this.item.getPlayState() === 'paused')) {
      this.item.setTime(this.props.time);
    }
  }
  public componentWillUnmount() {
    this.item.off();
  }
  public setTime(time: number | string) {
    this.item.setTime(time);
  }
  public getTime() {
    return this.item.getTime();
  }
  public play() {
    this.props.css !== false ? this.item.playCSS() : this.item.play();
  }
  public pause() {
    this.item.pause();
  }
  public getItem() {
    return this.item;
  }
  public getDuration() {
    return this.item.getDuration();
  }
  protected init() {
    const item = this.item;
    const events = this.events;
    const sceneOptions: Partial<AnimatorState> = {};

    OPTIONS.forEach((name) => {
      sceneOptions[name] = this.props[name];
    });
    (item as any).setOptions(sceneOptions);
    EVENTS.forEach((name) => {
      this.item.on(name, events[name]);
    });
    if (this.props.autoplay !== false) {
      this.play();
    } else if (this.props.time !== -1) {
      this.setTime(this.props.time);
    }
  }
}
