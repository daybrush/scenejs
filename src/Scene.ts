import Animator from "./Animator";
import SceneItem from "./SceneItem";
import { DATA_SCENE_ID, SELECTOR, DURATION } from "./consts";
import { playCSS, exportCSS, getRealId, makeId, isPausedCSS, isEndedCSS, setPlayCSS } from "./utils";
import { isFunction, IS_WINDOW, IObject, $, IArrayFormat } from "@daybrush/utils";
import { AnimateElement, SceneState, SceneOptions, EasingType, AnimatorState, SceneItemOptions } from "./types";


/**
 * manage sceneItems and play Scene.
 * @sort 1
 */
class Scene extends Animator<SceneState> {
  /**
  * version info
  * @type {string}
  * @example
  * Scene.VERSION // #__VERSION__#
  */
  public static VERSION: string = "#__VERSION__#";
  public items: IObject<Scene | SceneItem>;
  /**
  * @param - properties
  * @param - options
  * @example
  const scene = new Scene({
    item1: {
      0: {
        display: "none",
      },
      1: {
        display: "block",
        opacity: 0,
      },
      2: {
        opacity: 1,
      },
    },
    item2: {
      2: {
        opacity: 1,
      },
    }
  });
    */
  constructor(properties?: IObject<any>, options?: Partial<SceneOptions>) {
    super();
    this.items = {};
    this.load(properties, options);
  }
  public getDuration() {
    const items = this.items;
    let time = 0;

    for (const id in items) {
      const item = items[id];

      time = Math.max(time, item.getTotalDuration() / item.getPlaySpeed());
    }
    return time;
  }
  public setDuration(duration: number) {
    const items = this.items;
    const sceneDuration = this.getDuration();

    if (duration === 0 || !isFinite(sceneDuration)) {
      return this;
    }
    if (sceneDuration === 0) {
      for (const id in items) {
        const item = items[id];

        item.setDuration(duration);
      }
    } else {
      const ratio = duration / sceneDuration;

      for (const id in items) {
        const item = items[id];

        item.setDelay(item.getDelay() * ratio);
        item.setDuration(item.getDuration() * ratio);
      }
    }
    return this;
  }
  public getItem<T extends (Scene | SceneItem) = Scene | SceneItem>(name: number | string): T;
  public getItem(name: number | string, index: number): SceneItem;
  /**
  * get item in scene by name
  * @param - The item's name
  * @param - If item is added as function, it can be imported via index.
  * @return {Scene | SceneItem} item
  * @example
  const item = scene.getItem("item1")
  */
  public getItem(name: number | string, index?: number) {
    if (index != null) {
      return (this.items[name] as Scene).getItem(index) as SceneItem;
    }
    return this.items[name];
  }
  /**
  * create item in scene
  * @param {} name - name of item to create
  * @param {} options - The option object of SceneItem
  * @return {} Newly created item
  * @example
  const item = scene.newItem("item1")
  */
  public newItem(name: number | string, options: Partial<SceneItemOptions> = {}): SceneItem {
    if (name in this.items) {
      return;
    }
    const item = new SceneItem();

    this.setItem(name, item);
    item.setOptions(options);

    return item;
  }
  /**
  * add a sceneItem to the scene
  * @param - name of item to create
  * @param - sceneItem
  * @example
  const item = scene.newItem("item1")
  */
  public setItem(name: number | string, item: Scene | SceneItem) {
    item.setId(name);
    this.items[name] = item;
    return this;
  }
  public setTime(time: number | string, isTick?: boolean, parentEasing?: EasingType) {
    super.setTime(time, isTick);

    const iterationTime = this.getIterationTime();
    const items = this.items;
    const easing = this.getEasing() || parentEasing;

    for (const id in items) {
      const item = items[id];

      item.setTime(iterationTime * item.getPlaySpeed() - item.getDelay(), isTick, easing);
    }
    return this;
  }
  /**
   * executes a provided function once for each scene item.
   * @param - Function to execute for each element, taking three arguments
   * @return {Scene} An instance itself
   */
  public forEach(func: (item: Scene | SceneItem, name: string, items: IObject<Scene | SceneItem>) => void) {
    const items = this.items;

    for (const name in items) {
      func(items[name], name, items);
    }
    return this;
  }
  public toCSS(duration: number = this.getDuration(), parentStates: AnimatorState[] = []) {
    const totalDuration = !duration || !isFinite(duration) ? 0 : duration;
    const styles: string[] = [];
    const state = this.state;

    state[DURATION] = this.getDuration();

    this.forEach(item => {
      styles.push(item.toCSS(totalDuration, parentStates.concat(state)));
    });
    return styles.join("");
  }
  /**
   * Export the CSS of the items to the style.
   * @return {Scene} An instance itself
   */
  public exportCSS(duration?: number, parentStates?: AnimatorState[]) {
    const css = this.toCSS(duration, parentStates);

    (!parentStates || !parentStates.length) && exportCSS(getRealId(this), css);
    return css;
  }
  public append(item: SceneItem | Scene) {
    item.setDelay(item.getDelay() + this.getDuration());
    this.setItem(getRealId(item), item);
  }
  public pauseCSS() {
    return this.forEach(item => {
      item.pauseCSS();
    });
  }
  public pause() {
    super.pause();

    isPausedCSS(this) && this.pauseCSS();
    this.forEach(item => {
      item.pause();
    });
    return this;
  }
  public endCSS() {
    const items = this.items;

    for (const id in items) {
      items[id].endCSS();
    }
    setPlayCSS(this, false);
  }
  public end() {
    isEndedCSS(this) && this.endCSS();
    super.end();
    return this;
  }
  public addPlayClass(isPaused: boolean, properties = {}) {
    const items = this.items;
    let animtionElement: AnimateElement;

    for (const id in items) {
      const el = items[id].addPlayClass(isPaused, properties);

      !animtionElement && (animtionElement = el);
    }
    return animtionElement;
  }
  /**
  * Play using the css animation and keyframes.
  * @param {boolean} [exportCSS=true] Check if you want to export css.
  * @param {Object} [properties={}] The shorthand properties for six of the animation properties.
  * @param {Object} [properties.duration] The duration property defines how long an animation should take to complete one cycle.
  * @param {Object} [properties.fillMode] The fillMode property specifies a style for the element when the animation is not playing (before it starts, after it ends, or both).
  * @param {Object} [properties.iterationCount] The iterationCount property specifies the number of times an animation should be played.
  * @param {String} [properties.easing] The easing(timing-function) specifies the speed curve of an animation.
  * @param {Object} [properties.delay] The delay property specifies a delay for the start of an animation.
  * @param {Object} [properties.direction] The direction property defines whether an animation should be played forwards, backwards or in alternate cycles.
  * @return {Scene} An instance itself
  * @see {@link https://www.w3schools.com/cssref/css3_pr_animation.asp}
  * @example
  scene.playCSS();
  scene.playCSS(false, {
  direction: "reverse",
  fillMode: "forwards",
  });
  */
  public playCSS(isExportCSS = true, properties = {}) {
    playCSS(this, isExportCSS, properties);
    return this;
  }
  public set(properties: any, ...args: any[]): this;
  public set(properties: any) {
    this.load(properties);
    return this;
  }
  public load(properties: any = {}, options = properties.options) {
    if (!properties) {
      return this;
    }
    const isSelector = options && options[SELECTOR] || this.state[SELECTOR];

    for (const name in properties) {
      if (name === "options") {
        continue;
      }
      const object = properties[name];
      let item;

      if (object instanceof Scene || object instanceof SceneItem) {
        this.setItem(name, object);
        item = object;
      } else if (isFunction(object) && isSelector) {
        const elements = IS_WINDOW ? $(name, true) as IArrayFormat<AnimateElement> : ([] as AnimateElement[]);
        const length = elements.length;
        const scene = new Scene();

        for (let i = 0; i < length; ++i) {
          const id = makeId();

          scene.newItem(`${i}`, {
            id,
            selector: `[${DATA_SCENE_ID}="${id}"]`,
            elements: elements[i],
          }).load(object(i));
        }
        this.setItem(name, scene);
        continue;
      } else {
        item = this.newItem(name);
        item.load(object);
      }
      isSelector && item.setSelector(name);
    }
    this.setOptions(options);
  }
  public setOptions(options: Partial<SceneState> = {}): this {
    super.setOptions(options);

    if (options.selector) {
      this.state[SELECTOR] = true;
    }
    return this;
  }
  public setSelector(target: string | boolean) {
    const state = this.state;
    const isSelector = target || state[SELECTOR];

    state[SELECTOR] = target;
    this.forEach((item, name) => {
      item.setSelector(isSelector ? name : false);
    });
  }
  public start(delay: number) {
    super.start(delay);
    this.forEach(item => {
      item.start(delay);
    });
  }
}

export default Scene;
