import { Component } from 'react';
import { SceneItem as NativeSceneItem, Frame } from 'scenejs';
import { ObjectInterface } from 'scenejs/declaration/consts';
import { StateInterface } from 'scenejs/declaration/Animator';


type Callback = (...args: any[]) => any;

export interface EventTypes {
  onPlay: Callback;
  onPaused: Callback;
  onEnded: Callback;
  onTimeUpdate: Callback;
  onIteration: Callback;
  onAnimate: Callback;
}
export interface PropTypes extends StateInterface, EventTypes {
  keyframes?: ObjectInterface<any>;
  from?: ObjectInterface<any>;
  to?: ObjectInterface<any>;
  css?: boolean;
  autoplay?: boolean;
}
export default class SceneItem extends Component<PropTypes, {}> {
  public static defaultProps: PropTypes = {
    duration: 0,
    fillMode: 'forwards',
    direction: 'normal',
    playSpeed: 1,
    iterationCount: 1,
    delay: 0,
    easing: 0,
    css: false,
    autoplay: false,
    onPlay: () => undefined,
    onPaused: () => undefined,
    onEnded: () => undefined,
    onTimeUpdate: () => undefined,
    onIteration: () => undefined,
    onAnimate: () => undefined,
  };
  protected item: NativeSceneItem;
  protected events: ObjectInterface<any> = {
    play: (e: any) => this.props.onPlay(e),
    paused: (e: any) => this.props.onPaused(e),
    ended: (e: any) => this.props.onEnded(e),
    timeupdate: (e: any) => this.props.onTimeUpdate(e),
    iteration: (e: any) => this.props.onIteration(e),
    animate: (e: any) => this.props.onAnimate(e),
  };
  constructor(props: any) {
    super(props);

    this.state = {
      frame: new Frame(),
      styles: {},
      currentTime: 0,
      time: 0,
    };
    this.item = new NativeSceneItem();
    const events = this.events;

    for (const name in events) {
      this.item.on(name, events[name]);
    }
    this.item.on('animate', ({ currentTime, time, frame }) => {
      this.setState({
        time,
        currentTime,
        frame,
        styles: frame.toCSSObject(),
      });
    });
    if (this.props.keyframes) {
      this.item.set(this.props.keyframes);
    } else {
      this.item.set('0%', this.props.from);
      this.item.set('100%', this.props.to);
    }
    const itemOptions = {};
    const options = SceneItem.options;

    for (const name in options) {
      itemOptions[name] = this.props[name];
    }
    this.item.setOptions(itemOptions);
  }
  render() {
    const state = this.state;
    const children = this.props.children;

    return Array.isArray(children) ?
      children.map(component => (typeof component === 'function' ? component(state) : component)) :
      children(state);
  }
  componentDidMount() {
    if (this.props.play === true) {
      this.play();
    }
  }
  componentDidUpdate(prevProps) {
    if (prevProps.play !== this.props.play) {
      if (this.props.play) {
        this.play();
      } else {
        this.pause();
      }
    }
  }
  play() {
    this.item.play();
  }
  pause() {
    this.item.pause();
  }
}
