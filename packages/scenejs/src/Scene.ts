import Animator from "./Animator";
import SceneItem from "./SceneItem";
import { SELECTOR, DURATION, DELAY, RUNNING, NAME_SEPARATOR } from "./consts";
import {
    playCSS, getRealId, isPausedCSS,
    isEndedCSS, setPlayCSS, isScene, flatSceneObject,
    isSceneItem,
} from "./utils";
import { isFunction, IS_WINDOW, IObject, $, IArrayFormat } from "@daybrush/utils";
import {
    AnimateElement, SceneState, SceneOptions, EasingType,
    AnimatorState, SceneItemOptions, PlayCondition,
    NameType, SceneEvents, SelectorAllType
} from "./types";
import Frame from "./Frame";
import OrderMap from "order-map";
import styled, { InjectResult, StyledInjector } from "css-styled";
/**
 * manage sceneItems and play Scene.
 * @extends Animator
 * @sort 1
 */
class Scene extends Animator<SceneOptions, SceneState, SceneEvents> {
    /**
    * version info
    * @type {string}
    * @example
    * Scene.VERSION // #__VERSION__#
    */
    public static VERSION: string = "#__VERSION__#";
    public items: IObject<Scene | SceneItem> = {};
    public orderMap = new OrderMap(NAME_SEPARATOR);
    public styled: StyledInjector;
    public styledInjector: InjectResult;
    public temp: IObject<Frame>;
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
    constructor(properties?: { options?: Partial<SceneOptions> } & IObject<any>, options?: Partial<SceneOptions>) {
        super();
        this.load(properties, options);
    }
    public getDuration() {
        let time = 0;

        this.forEach(item => {
            time = Math.max(time, item.getTotalDuration() / item.getPlaySpeed());
        });
        return time || this.state[DURATION];
    }
    public setDuration(duration: number) {
        const items = this.items;
        const sceneDuration = this.getDuration();

        if (duration === 0 || !isFinite(sceneDuration)) {
            return this;
        }
        if (sceneDuration === 0) {
            this.forEach(item => {
                item.setDuration(duration);
            });
        } else {
            const ratio = duration / sceneDuration;

            this.forEach(item => {
                item.setDelay(item.getDelay() * ratio);
                item.setDuration(item.getDuration() * ratio);
            });
        }
        super.setDuration(duration);
        return this;
    }
    public getItem<T extends (Scene | SceneItem) = Scene | SceneItem>(name: number | string): T;
    /**
    * get item in scene by name
    * @param - The item's name
    * @return {Scene | SceneItem} item
    * @example
    const item = scene.getItem("item1")
    */
    public getItem(name: number | string) {
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
    public newItem(name: number | string, options: Partial<SceneItemOptions> = {}): Scene | SceneItem {
        if (this.items[name]) {
            return this.items[name];
        }
        const item = new SceneItem();

        this.setItem(name, item);
        item.setOptions(options);

        return item;
    }
    /**
    * remove item in scene
    * @param - name of item to remove
    * @return  An instance itself
    * @example
    const item = scene.newItem("item1")

    scene.removeItem("item1");
    */
    public removeItem(name: number | string): this {
        delete this.items[name];

        this.orderMap.remove([name]);
        return this;
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

        this.orderMap.add([name]);
        return this;
    }
    /**
    * Get the current computed frames.
    * (If needUpdate is true, get a new computed frames, not the temp that has already been saved.)
    */
    public getCurrentFrames(needUpdate?: boolean, parentEasing?: EasingType) {
        const easing = this.getEasing() || parentEasing;
        const frames: IObject<any> = {};

        this.forEach(item => {
            const id = item.getId();

            if (isScene(item)) {
                frames[id] = item.getCurrentFrames(needUpdate, easing);
            } else {
                frames[id] = item.getCurrentFrame(needUpdate, easing);
            }
        });
        this.temp = frames;

        return frames;
    }
    /**
   * Get the current flatted computed frames.
   * (If needUpdate is true, get a new computed frames, not the temp that has already been saved.)
   * If there is a scene in the scene, you can get a flatted frame map.
   * @example
   * import Scene, { NAME_SEPARATOR } from "scenejs";
   *
   * {
   *   "a": Frame,
   *   "b": {
   *     "b1": Frame,
   *     "b2": Frame,
   *   },
   * }
   * const frames = scene.getCurrentFrames();
   * {
   *   "a": Frame,
   *   "b_///_b1": Frame,
   *   "b_///_b2": Frame,
   * }
   * const frames = scene.getCurrentFlattedFrames();
   *
   */
    public getCurrentFlattedFrames(needUpdate?: boolean, parentEasing?: EasingType): Record<string, Frame> {
        const frames = this.getCurrentFrames(needUpdate, parentEasing);

        return flatSceneObject(frames, NAME_SEPARATOR);
    }
    public setTime(time: number | string, isTick?: boolean, isParent?: boolean, parentEasing?: EasingType) {
        super.setTime(time, isTick, isParent);

        const iterationTime = this.getIterationTime();
        const easing = this.getEasing() || parentEasing;

        this.forEach(item => {
            item.setTime(iterationTime * item.getPlaySpeed() - item.getDelay(), isTick, true, easing);
        });

        const frames = this.getCurrentFrames(false, parentEasing);

        /**
         * This event is fired when timeupdate and animate.
         * @event Scene#animate
         * @param {object} param The object of data to be sent to an event.
         * @param {number} param.currentTime The total time that the animator is running.
         * @param {number} param.time The iteration time during duration that the animator is running.
         * @param {object} param.frames frames of that time.
         * @example
const scene = new Scene({
    a: {
        0: {
            opacity: 0,
        },
        1: {
            opacity: 1,
        }
    },
    b: {
        0: {
            opacity: 0,
        },
        1: {
            opacity: 1,
        }
    }
}).on("animate", e => {
    console.log(e.frames);
    // {a: Frame, b: Frame}
    console.log(e.frames.a.get("opacity"));
});
             */
        this.trigger("animate", {
            frames,
            currentTime: this.getTime(),
            time: iterationTime,
        });

        return this;
    }
    /**
     * executes a provided function once for each scene item.
     * @param - Function to execute for each element, taking three arguments
     * @return {Scene} An instance itself
     */
    public forEach(
        func: (
            item: Scene | SceneItem,
            id: string | number,
            index: number,
            items: IObject<Scene | SceneItem>,
        ) => void,
    ) {
        const items = this.items;
        this.getOrders().forEach((id, index) => {
            func(items[id], id, index, items);
        });
        return this;
    }
    public toCSS(
        playCondition?: PlayCondition,
        duration: number = this.getDuration(), parentStates: AnimatorState[] = []) {
        const totalDuration = !duration || !isFinite(duration) ? 0 : duration;
        const styles: string[] = [];
        const state = this.state;

        state[DURATION] = this.getDuration();

        this.forEach(item => {
            styles.push(item.toCSS(playCondition, totalDuration, parentStates.concat(state)));
        });
        return styles.join("");
    }
    /**
     * Export the CSS of the items to the style.
     * @param - Add a selector or className to play.
     * @return {Scene} An instance itself
     */
    public exportCSS(
        playCondition?: PlayCondition, duration?: number, parentStates?: AnimatorState[]) {
        const css = this.toCSS(playCondition, duration, parentStates);

        if (!parentStates || !parentStates.length) {
            if (this.styledInjector) {
                this.styledInjector.destroy();
                this.styledInjector = null;
            }
            this.styled = styled(css);
            this.styledInjector = this.styled.inject(this.getAnimationElement(), { original: true });
            // && exportCSS(getRealId(this), css);
        }
        return this;
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
        this.forEach(item => {
            item.endCSS();
        });
        setPlayCSS(this, false);
    }
    public end() {
        isEndedCSS(this) && this.endCSS();
        super.end();
        return this;
    }
    /**
  * get item orders
  * @example
  scene.getOrders() // => ["item1", "item2"]
  */
    public getOrders(): NameType[] {
        return this.orderMap.get([]) || [];
    }
    /**
      * set item orders
      * @param - orders
      * @example
      frame.setOrders(["item2", "item1"]) // => ["item2", "item1"]
      */
    public setOrders(orders: NameType[]): NameType[] {
        return this.orderMap.set([], orders);
    }
    public getAnimationElement() {
        let animtionElement: AnimateElement;

        this.forEach(item => {
            const el = item.getAnimationElement();

            !animtionElement && (animtionElement = el);
        });
        return animtionElement;
    }
    public addPlayClass(isPaused: boolean, playClassName?: string, properties: object = {}) {
        let animtionElement: AnimateElement;

        this.forEach(item => {
            const el = item.addPlayClass(isPaused, playClassName, properties);

            !animtionElement && (animtionElement = el);
        });
        return animtionElement;
    }
    /**
    * Play using the css animation and keyframes.
    * @param - Check if you want to export css.
    * @param [playClassName="startAnimation"] - Add a class name to play.
    * @param - The shorthand properties for six of the animation properties.
    * @return {Scene} An instance itself
    * @see {@link https://www.w3schools.com/cssref/css3_pr_animation.asp}
    * @example
    scene.playCSS();
    scene.playCSS(false, {
    direction: "reverse",
    fillMode: "forwards",
    });
    */
    public playCSS(isExportCSS = true, playClassName?: string, properties: Partial<AnimatorState> = {}) {
        playCSS(this, isExportCSS, playClassName, properties);
        return this;
    }
    public set(properties: any, ...args: any[]): this;
    /**
      * Set properties to the Scene.
      * @param - properties
      * @return An instance itself
      * @example
scene.set({
    ".a": {
        0: {
            opacity: 0,
        },
        1: {
            opacity: 1,
        },
    },
});
// 0
console.log(scene.getItem(".a").get(0, "opacity"));
// 1
console.log(scene.getItem(".a").get(1, "opacity"));
      */
    public set(properties: any) {
        this.load(properties);
        return this;
    }
    /**
      * Clear All Items
      * @return {Scene} An instance itself
      */
    public clear() {
        this.finish();
        this.items = {};
        this.orderMap = new OrderMap(NAME_SEPARATOR);

        if (this.styledInjector) {
            this.styledInjector.destroy();
        }
        this.styled = null;
        this.styledInjector = null;
    }
    public load(properties: any = {}, options = properties.options) {
        if (!properties) {
            return this;
        }
        const selector = options && options[SELECTOR] || this.state[SELECTOR];
        for (const name in properties) {
            if (name === "options") {
                continue;
            }
            const object = properties[name];
            let item;

            if (isScene(object) || isSceneItem(object)) {
                this.setItem(name, object);
                item = object;
            } else if (isFunction(object)) {
                let elements: IArrayFormat<AnimateElement> = [];

                if (selector && IS_WINDOW) {
                    elements = $(`${isFunction(selector) ? selector(name) : name}`, true) as IArrayFormat<AnimateElement>;
                }
                const elementsLength = elements.length;
                const length = elementsLength || (object as SelectorAllType).defaultCount || 0;
                const scene = new Scene();

                for (let i = 0; i < length; ++i) {
                    const element = elements[i];
                    const item = scene.newItem(i) as SceneItem;

                    item.setId().load(object(i, elements[i]));

                    if (element) {
                        item.setElement(element)
                    }
                }
                if (!elementsLength) {
                    let elements: IArrayFormat<AnimateElement> = [];

                    scene.state[SELECTOR] = (id: number) => {
                        elements = elements || $(`${isFunction(selector) ? selector(name) : name}`, true);

                        return elements[id];
                    };
                }
                this.setItem(name, scene);
                continue;
            } else {
                item = this.newItem(name);
                item.load(object);
            }
            selector && item.setSelector(selector);
        }
        this.setOptions(options);
    }
    public setOptions(options: Partial<SceneState> = {}): this {
        super.setOptions(options);

        const selector = options.selector;

        if (selector) {
            this.state[SELECTOR] = selector;
        }
        return this;
    }
    public setSelector(target?: string | boolean | ((id: number | string) => string | AnimateElement)) {
        const state = this.state;
        const selector = target === true ? state[SELECTOR] || true : target;

        state[SELECTOR] = selector;
        const isItFunction = isFunction(target);
        if (selector) {
            this.forEach((item, name) => {
                item.setSelector(isItFunction ? (target as (id: number | string) => string)(name) : selector);
            });
        }
        return this;
    }
    public start(delay: number = this.state[DELAY]): boolean {
        const result = super.start(delay);

        if (result) {
            this.forEach(item => {
                item.start(0);
            });
        } else {
            this.forEach(item => {
                item.setPlayState(RUNNING);
            });
        }
        return result;
    }
}

export default Scene;
