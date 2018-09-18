import { ObjectInterface, THRESHOLD } from "./consts";
import EventTrigger from "./EventTrigger";
import { bezier, EasingFunctionInterface } from "./easing";
import { toFixed, isString, splitUnit } from "./utils";

let lastTime = 0;

const requestAnimFrame = (() => {
  return (window as any).requestAnimationFrame ||
    (window as any).webkitRequestAnimationFrame ||
    (window as any).mozRequestAnimationFrame ||
    ((callback: (time: number) => void) => {
      const currTime = Date.now();
      const timeToCall = Math.max(0, 16 - (currTime - lastTime));
      const id = window.setTimeout(() => {
        callback(currTime + timeToCall);
      }, 1000 / 60);
      lastTime = currTime + timeToCall;
      return id;
    });
})();

export type FillModeType = "forwards" | "backwards" | "both";
export type IterationCountType = number | "infinite";
export type EasingType = 0 | EasingFunctionInterface;
export type DirectionType = "normal" | "reverse" | "alternate" | "alternate-reverse";
export type PlayStateType = "paused" | "running";

export interface StateInterface {
  id?: string;
  easing?: EasingType;
  easingName?: string;
  iterationCount?: IterationCountType;
  delay?: number;
  fillMode?: FillModeType;
  direction?: DirectionType;
  playSpeed?: number;
  currentTime?: number;
  currentIterationTime?: number;
  currentIterationCount?: number;
  prevTime?: number;
  playState?: PlayStateType;
  duration?: number;
  [key: string]: any;
}
export function isDirectionReverse(iterationCount: number, direction: DirectionType) {
  return direction === "reverse" ||
    direction === (iterationCount % 2 >= 1 ? "alternate" : "alternate-reverse");
}
/**
* @typedef {Object} AnimatorOptions The Animator options. Properties used in css animation.
* @property {number} [duration] The duration property defines how long an animation should take to complete one cycle.
* @property {"none"|"forwards"|"backwards"|"both"} [fillMode] The fillMode property specifies a style for the element when the animation is not playing (before it starts, after it ends, or both).
* @property {"infinite"|number} [iterationCount] The iterationCount property specifies the number of times an animation should be played.
* @property {array|function} [easing] The easing(timing-function) specifies the speed curve of an animation.
* @property {number} [delay] The delay property specifies a delay for the start of an animation.
* @property {"normal"|"reverse"|"alternate"|"alternate-reverse"} [direction] The direction property defines whether an animation should be played forwards, backwards or in alternate cycles.
*/
/**
* play video, animation, the others
* @memberof Scene
* @class Animator
* @extends Scene.EventTrigger
* @see {@link https://www.w3schools.com/css/css3_animations.asp|CSS3 Animation}
* @param {AnimatorOptions} [options] - animator's options
* @example
const animator = new Animator({
	delay: 2,
	diretion: "alternate",
	duration: 2,
	fillMode: "forwards",
	iterationCount: 3,
	easing: Scene.eaasing.EASE,
});
*/
export default class Animator extends EventTrigger {
  public state: StateInterface;
  public options: ObjectInterface<any>;

  constructor(options?: StateInterface) {
    super();
    this.options = {};
    this.state = {
      id: "",
      easing: 0,
      easingName: "linear",
      iterationCount: 1,
      delay: 0,
      fillMode: "forwards",
      direction: "normal",
      playSpeed: 1,
      currentTime: 0,
      currentIterationTime: -1,
      currentIterationCount: 0,
      tickTime: 0,
      prevTime: 0,
      playState: "paused",
      duration: 0,
    };
    this.setOptions(options);
  }
  /**
	* set animator's easing.
	* @method Scene.Animator#setEasing
	* @param {array| function} curverArray - The speed curve of an animation.
	* @return {Scene.Animator} An instance itself.
	* @example
animator.({
	delay: 2,
	diretion: "alternate",
	duration: 2,
	fillMode: "forwards",
	iterationCount: 3,
	easing: Scene.easing.EASE,
});
	*/
  public setEasing(curveArray: [number, number, number, number] | EasingFunctionInterface): this {
    this.setState(Array.isArray(curveArray) ? {
      easingName: `cubic-bezier(${curveArray.join(",")})`,
      easing: bezier(curveArray[0], curveArray[1], curveArray[2], curveArray[3]),
    } : {
        easing: curveArray,
        easingName: curveArray.easingName || "linear",
      });
    return this;
  }
  /**
	* set animator's options.
	* @method Scene.Animator#setOptions
	* @see {@link https://www.w3schools.com/css/css3_animations.asp|CSS3 Animation}
	* @param {Object} [AnimatorOptions] - animator's options
	* @return {Scene.Animator} An instance itself.
	* @example
animator.({
	delay: 2,
	diretion: "alternate",
	duration: 2,
	fillMode: "forwards",
	iterationCount: 3,
	easing: Scene.eaasing.EASE,
});
	*/
  public setOptions(options: StateInterface): this {
    if (!options) {
      return this;
    }
    for (const name in options) {
      const value = options[name];

      if (name === "easing") {
        this.setEasing(value);
        continue;
      } else if (name === "duration") {
        value && this.setDuration(value);
        continue;
      }
      ((name in this.state ? this.state : this.options) as StateInterface)[name] = value;
    }

    return this;
  }
  /**
	* Get the animator's total duration including delay
	* @method Scene.Animator#getTotalDuration
	* @return {number} Total duration
	* @example
animator.getTotalDuration();
	*/
  public getTotalDuration(): number {
    if (this.state.iterationCount === "infinite") {
      return Infinity;
    }
    return this.state.delay + this.getActiveDuration();
  }
  /**
	* Get the animator's total duration excluding delay
	* @method Scene.Animator#getActiveDuration
	* @return {number} Total duration excluding delay
	* @example
animator.getTotalDuration();
	*/
  public getActiveDuration(): number {
    if (this.state.iterationCount === "infinite") {
      return Infinity;
    }
    return this.getDuration() * this.state.iterationCount;
  }
  /**
	* Check if the animator has reached the end.
	* @method Scene.Animator#isEnded
	* @return {boolean} ended
	* @example
animator.isEnded(); // true or false
	*/
  public isEnded(): boolean {
    if (this.state.tickTime === 0 && this.state.playState === "paused") {
      return true;
    } else if (this.getTime() < this.getActiveDuration()) {
      return false;
    }
    return true;
  }
  /**
	*Check if the animator is paused:
	* @method Scene.Animator#isPaused
	* @return {boolean} paused
	* @example
animator.isPaused(); // true or false
	*/
  public isPaused(): boolean {
    return this.state.playState === "paused";
  }
  public setNext(animator: Animator): this {
    this.on("ended", () => {
      animator.play();
    });
    return this;
  }
  /**
	* play animator
	* @method Scene.Animator#play
	* @return {Scene.Animator} An instance itself.
	*/
  public play() {
    this.state.playState = "running";
    if (this.isEnded()) {
      this.setTickTime(0);
    }
    this.state.tickTime = this.getTime();

    requestAnimFrame((time: number) => {
      this.state.prevTime = time;
      this.tick(time);
    });
    /**
		 * This event is fired when play animator.
		 * @event Scene.Animator#play
		 */
    this.trigger("play");

    return this;
  }
  /**
	* pause animator
	* @method Scene.Animator#pause
	* @return {Scene.Animator} An instance itself.
	*/
  public pause(): this {
    this.state.playState = "paused";
    /**
		 * This event is fired when animator is paused.
		 * @event Scene.Animator#paused
		 */
    this.trigger("paused");
    return this;
  }
  /**
	 * end animator
	 * @method Scene.Animator#end
	 * @return {Scene.Animator} An instance itself.
	*/
  public end(): this {
    this.pause();
    /**
		 * This event is fired when animator is ended.
		 * @event Scene.Animator#ended
		 */
    this.trigger("ended");
    return this;
  }
  /**
	* reset animator
	* @method Scene.Animator#reset
	* @return {Scene.Animator} An instance itself.
	*/
  public reset() {
    this.state.tickTime = 0;
    this.setTime(0);
    this.pause();
    return this;
  }
  /**
	* set currentTime
	* @method Scene.Animator#setTime
	* @param {Number|String} time - currentTime
	* @return {Scene.Animator} An instance itself.
	* @example

animator.setTime("from"); // 0
animator.setTime("to"); // 100%
animator.setTime("50%");
animator.setTime(10);
animator.getTime() // 10
	*/
  public setTime(time: number | string, isTick?: boolean) {
    const activeDuration = this.getActiveDuration();
    let currentTime = isTick ? (time as number) : this.getUnitTime(time);

    this.state.tickTime = this.state.delay + currentTime;
    if (currentTime < 0) {
      currentTime = 0;
    } else if (currentTime > activeDuration) {
      currentTime = activeDuration;
    }
    this.state.currentTime = currentTime;
    this.calculateIterationTime();

    if (this.isDelay()) {
      return this;
    }
    /**
		 * This event is fired when the animator updates the time.
		 * @event Scene.Animator#timeupdate
		 * @param {Object} param The object of data to be sent to an event.
		 * @param {Number} param.currentTime The total time that the animator is running.
		 * @param {Number} param.time The iteration time during duration that the animator is running.
		 * @param {Number} param.iterationCount The iteration count that the animator is running.
		 */
    this.trigger("timeupdate", {
      currentTime,
      time: this.getIterationTime(),
      iterationCount: this.getIterationCount(),
    });

    return this;
  }
  public getState(name: string): any {
    return this.state[name];
  }
  public setState(object: StateInterface) {
    for (const name in object) {
      this.state[name] = object[name];
    }
    return this;
  }
  /**
	* Get the animator's current time
	* @method Scene.Animator#getTime
	* @return {number} current time
	* @example
animator.getTime();
	*/
  public getTime(): number {
    return this.state.currentTime;
  }
  public getUnitTime(time: string | number) {
    if (isString(time)) {
      const duration = this.getDuration() || 100;

      if (time === "from") {
        return 0;
      } else if (time === "to") {
        return duration;
      }
      const { unit, value } = splitUnit(time);

      if (unit === "%") {
        !this.getDuration() && (this.state.duration = duration);
        return parseFloat(time) / 100 * duration;
      } else if (unit === ">") {
        return value + THRESHOLD;
      } else {
        return value;
      }
    } else {
      return toFixed(time);
    }
  }
  /**
	* Get the animator's current iteration time
	* @method Scene.Animator#getIterationTime
	* @return {number} current iteration time
	* @example
animator.getIterationTime();
	*/
  public getIterationTime() {
    return this.state.currentIterationTime;
  }
  /**
	 * Get a delay for the start of an animation.
	 * @method Scene.Animator#getDelay
	 * @return {number} delay
	 */
  public getDelay() {
    return this.state.delay;
  }
  /**
	 * Set a delay for the start of an animation.
	 * @method Scene.Animator#setDelay
	 * @param {number} delay - delay
	 * @return {Scene.Animator} An instance itself.
	 */
  public setDelay(delay: number) {
    this.state.delay = delay;
    return this;
  }
  /**
	 * Check if the current state of animator is delayed.
	 * @method Scene.Animator#isDelay
	 * @return {boolean} check delay state
	 */
  public isDelay() {
    const { delay, tickTime } = this.state;

    return delay > 0 && (tickTime < delay);
  }
  /**
	 * Get fill mode for the item when the animation is not playing (before it starts, after it ends, or both)
	 * @method Scene.Animator#getFillMode
	 * @return {"none"|"forwards"|"backwards"|"both"} fillMode
	 */
  public getFillMode() {
    return this.state.fillMode;
  }
  /**
	 * Set fill mode for the item when the animation is not playing (before it starts, after it ends, or both)
	 * @method Scene.Animator#setFillMode
	 * @param {"none"|"forwards"|"backwards"|"both"} fillMode - fillMode
	 * @return {Scene.Animator} An instance itself.
	 */
  public setFillMode(fillMode: FillModeType) {
    this.state.fillMode = fillMode;
    return this;
  }
  /**
	 * Get the number of times an animation should be played.
	 * @method Scene.Animator#getIterationCount
	 * @return {"inifnite"|number} iterationCount
	 */
  public getIterationCount() {
    return this.state.iterationCount;
  }
  /**
	 * Set the number of times an animation should be played.
	 * @method Scene.Animator#setIterationCount
	 * @param {"inifnite"|number} iterationCount - iterationCount
	 * @return {Scene.Animator} An instance itself.
	 */
  public setIterationCount(iterationCount: IterationCountType) {
    this.state.iterationCount = iterationCount;
    return this;
  }
  /**
	 * Get whether an animation should be played forwards, backwards or in alternate cycles.
	 * @method Scene.Animator#getDirection
	 * @return {"normal"|"reverse"|"alternate"|"alternate-reverse"} direction
	 */
  public getDirection() {
    return this.state.direction;
  }
  /**
	 * Set whether an animation should be played forwards, backwards or in alternate cycles.
	 * @method Scene.Animator#setDirection
	 * @param {"normal"|"reverse"|"alternate"|"alternate-reverse"} direction - direction
	 * @return {Scene.Animator} An instance itself.
	 */
  public setDirection(direction: DirectionType) {
    this.state.direction = direction;
    return this;
  }
  /**
	 * Get whether the animation is running or paused.
	 * @method Scene.Animator#getPlayState
	 * @return {"paused"|"running"} playState
	 */
  public getPlayState() {
    return this.state.playState;
  }
  /**
	 * Set whether the animation is running or paused.
	 * @method Scene.Animator#setPlayState
	 * @param {"paused"|"running"} playState - playState
	 * @return {Scene.Animator} An instance itself.
	 */
  public setPlayState(playState: PlayStateType) {
    this.state.playState = playState;
    return this;
  }
  /**
	 * Get the animator's play speed
	 * @method Scene.Animator#getPlaySpeed
	 * @return {number} playSpeed
	 */
  public getPlaySpeed() {
    return this.state.playSpeed;
  }
  /**
	 * Set the animator's play speed
	 * @method Scene.Animator#setPlaySpeed
	 * @param {number} playSpeed - playSpeed
	 * @return {Scene.Animator} An instance itself.
	 */
  public setPlaySpeed(playSpeed: number) {
    this.state.playSpeed = playSpeed;
    return this;
  }
  /**
	 * Get how long an animation should take to complete one cycle.
	 * @method Scene.Animator#getDuration
	 * @return {number} duration
	 */
  public getDuration() {
    return this.state.duration;
  }
  /**
	 * Set how long an animation should take to complete one cycle.
	 * @method Scene.Animator#setDuration
	 * @param {number} duration - duration
	 * @return {Scene.Animator} An instance itself.
	 */
  public setDuration(duration: number) {
    this.state.duration = duration;
    return this;
  }
  /**
	 * Get the speed curve of an animation.
	 * @method Scene.Animator#getEasing
	 * @return {0|function} easing
	 */
  public getEasing() {
    return this.state.easing;
  }
  /**
	 * Get the speed curve's name
	 * @method Scene.Animator#getEasingName
	 * @return {string} the curve's name.
	 */
  public getEasingName() {
    return this.state.easingName;
  }
  protected setCurrentIterationCount(iterationCount: number): this {
    const state = this.state;
    const passIterationCount = Math.floor(iterationCount);

    if (state.currentIterationCount < passIterationCount) {
      /**
			* The event is fired when an iteration of an animation ends.
			* @event Scene.Animator#iteration
			* @param {Object} param The object of data to be sent to an event.
			* @param {Number} param.currentTime The total time that the animator is running.
			* @param {Number} param.iterationCount The iteration count that the animator is running.
			*/
      this.trigger("iteration", {
        currentTime: state.currentTime,
        iterationCount: passIterationCount,
      });
    }
    state.currentIterationCount = iterationCount;
    return this;
  }
  protected setIterationTime(time: number) {
    this.state.currentIterationTime = time;

    return this;
  }
  protected calculateIterationTime() {
    const { iterationCount, fillMode, direction } = this.state;
    const duration = this.getDuration();
    const time = this.getTime();
    const currentIterationCount = duration === 0 ? 0 : time / duration;
    let currentIterationTime = duration ? time % duration : 0;

    if (!duration) {
      this.setIterationTime(0);
      return this;
    }
    this.setCurrentIterationCount(currentIterationCount);

    // direction : normal, reverse, alternate, alternate-reverse
    // fillMode : forwards, backwards, both, none
    const isReverse = isDirectionReverse(currentIterationCount, direction);

    if (isReverse) {
      currentIterationTime = duration - currentIterationTime;
    }
    if (iterationCount !== "infinite") {
      const isForwards = fillMode === "both" || fillMode === "forwards";

      // fill forwards
      if (currentIterationCount >= iterationCount) {
        currentIterationTime = duration * (isForwards ? (iterationCount % 1) || 1 : 0);
        isReverse && (currentIterationTime = duration - currentIterationTime);
      }
    }
    this.setIterationTime(currentIterationTime);
    return this;
  }
  protected caculateEasing(time: number) {
    if (!this.state.easing) {
      return time;
    }
    const duration = this.getDuration();
    const easing = this.state.easing;
    const ratio = duration === 0 ? 0 : time / duration;
    const easingTime = easing(ratio) * time;

    return easingTime;
  }
  protected tick(now: number) {
    const state = this.state;
    const { playSpeed, prevTime } = state;
    const currentTime = this.state.tickTime + Math.min(1000, now - prevTime) / 1000 * playSpeed;

    state.prevTime = now;
    this.setTickTime(currentTime);
    if (this.isEnded()) {
      this.end();
      return;
    }
    if (state.playState === "paused") {
      return;
    }

    requestAnimFrame((time: number) => {
      this.tick(time);
    });
  }
  private setTickTime(time: number) {
    this.setTime(time - this.state.delay, true);
  }
}
