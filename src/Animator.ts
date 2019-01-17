import {
  THRESHOLD,
  ALTERNATE, ALTERNATE_REVERSE, REVERSE, INFINITE, NORMAL,
  ITERATION_COUNT, DELAY, FILL_MODE, DIRECTION, PLAY_SPEED,
  DURATION, EASING, ITERATION_TIME, EASING_NAME, PAUSED, RUNNING, PLAY, TIMEUPDATE, ENDED, PLAY_STATE } from "./consts";
import EventTrigger from "./EventTrigger";
import { bezier, IEasingFunction } from "./easing";
import { toFixed } from "./utils";
import { splitUnit, isString, camelize, requestAnimationFrame } from "@daybrush/utils";

function GetterSetter<T extends { new(...args: any[]): {} }>(
  getter: string[], setter: string[], parent: string) {
  return (constructor: T) => {
    const prototype = constructor.prototype;

    getter.forEach(name => {
      prototype[camelize(`get ${name}`)] = function() {
        return this[parent][name];
      };
    });
    setter.forEach(name => {
      prototype[camelize(`set ${name}`)] = function(value: any) {
        this[parent][name] = value;
        return this;
      };
    });
  };
}

/**
 * @typedef
 */
export type FillModeType = "forwards" | "backwards" | "both";
/**
 * @typedef
 */
export type IterationCountType = number | "infinite";
/**
 * @typedef
 */
export type EasingType = 0 | IEasingFunction;
/**
 * @typedef
 */
export type DirectionType = "normal" | "reverse" | "alternate" | "alternate-reverse";
/**
 * @typedef
 */
export type PlayStateType = "paused" | "running";

export interface IState {
  id?: number | string;
  easing?: EasingType;
  easingName?: string;
  iterationCount?: IterationCountType;
  delay?: number;
  fillMode?: FillModeType;
  direction?: DirectionType;
  playSpeed?: number;
  iterationTime?: number;
  currentTime?: number;
  tickTime?: number;
  currentIterationCount?: number;
  prevTime?: number;
  playState?: PlayStateType;
  duration?: number;
  [key: string]: any;
}
export function isDirectionReverse(currentIterationCount: number,
                                   iteraiontCount: IterationCountType, direction: DirectionType) {
  if (direction === REVERSE) {
    return true;
  } else if (iteraiontCount !== "infinite" && currentIterationCount === iteraiontCount && iteraiontCount % 1 === 0) {
    return  direction === (currentIterationCount % 2 >= 1 ? ALTERNATE_REVERSE : ALTERNATE);
  }
  return  direction === (currentIterationCount % 2 >= 1 ? ALTERNATE : ALTERNATE_REVERSE);
}
/**
* @typedef {Object} IState The Animator options. Properties used in css animation.
* @property {number} [duration] The duration property defines how long an animation should take to complete one cycle.
* @property {"none"|"forwards"|"backwards"|"both"} [fillMode] The fillMode property specifies a style for the element when the animation is not playing (before it starts, after it ends, or both).
* @property {"infinite"|number} [iterationCount] The iterationCount property specifies the number of times an animation should be played.
* @property {array|function} [easing] The easing(timing-function) specifies the speed curve of an animation.
* @property {number} [delay] The delay property specifies a delay for the start of an animation.
* @property {"normal"|"reverse"|"alternate"|"alternate-reverse"} [direction] The direction property defines whether an animation should be played forwards, backwards or in alternate cycles.
*/

const setters = [ITERATION_COUNT, DELAY, FILL_MODE,
  DIRECTION, PLAY_SPEED, DURATION, PLAY_SPEED, ITERATION_TIME, PLAY_STATE];
const getters = [...setters, EASING, EASING_NAME];

/**
* play video, animation, the others
* @extends EventTrigger
* @see {@link https://www.w3schools.com/css/css3_animations.asp|CSS3 Animation}
*/
@GetterSetter(getters, setters, "state")
class Animator extends EventTrigger {
  public state: IState;
  public options: Partial<IState>;

  /**
   * @param - animator's options
   * @example
const animator = new Animator({
	delay: 2,
	diretion: "alternate",
	duration: 2,
	fillMode: "forwards",
	iterationCount: 3,
	easing: Scene.easing.EASE,
});
   */
  constructor(options?: IState) {
    super();
    this.options = {};
    this.state = {
      id: "",
      easing: 0,
      easingName: "linear",
      iterationCount: 1,
      delay: 0,
      fillMode: "forwards",
      direction: NORMAL,
      playSpeed: 1,
      currentTime: 0,
      iterationTime: -1,
      currentIterationCount: 0,
      tickTime: 0,
      prevTime: 0,
      playState: PAUSED,
      duration: 0,
    };
    this.setOptions(options);
  }
  /**
	* set animator's easing.
	* @param curverArray - The speed curve of an animation.
	* @return {Animator} An instance itself.
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
  public setEasing(curveArray: [number, number, number, number] | IEasingFunction): this {
    const easing = Array.isArray(curveArray) ?
      bezier(curveArray[0], curveArray[1], curveArray[2], curveArray[3]) : curveArray;
    const easingName = easing[EASING_NAME] || "linear";

    this.setState({ easing, easingName });
    return this;
  }
  /**
	* set animator's options.
	* @see {@link https://www.w3schools.com/css/css3_animations.asp|CSS3 Animation}
	* @param - animator's options
	* @return {Animator} An instance itself.
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
  public setOptions(options: IState = {}): this {
    for (const name in options) {
      const value = options[name];

      if (name === EASING) {
        this.setEasing(value);
        continue;
      } else if (name === DURATION) {
        value && this.setDuration(value);
        continue;
      }
      ((name in this.state ? this.state : this.options) as IState)[name] = value;
    }

    return this;
  }
  /**
	* Get the animator's total duration including delay
	* @return {number} Total duration
	* @example
animator.getTotalDuration();
	*/
  public getTotalDuration(): number {
    if (this.state[ITERATION_COUNT] === INFINITE) {
      return Infinity;
    }
    return this.state[DELAY] + this.getActiveDuration();
  }
  /**
	* Get the animator's total duration excluding delay
	* @return {number} Total duration excluding delay
	* @example
animator.getTotalDuration();
	*/
  public getActiveDuration(): number {
    if (this.state[ITERATION_COUNT] === INFINITE) {
      return Infinity;
    }
    return this.getDuration() * (this.state[ITERATION_COUNT] as number);
  }
  /**
	* Check if the animator has reached the end.
	* @return {boolean} ended
	* @example
animator.isEnded(); // true or false
	*/
  public isEnded(): boolean {
    if (this.state.tickTime === 0 && this.state[PLAY_STATE] === PAUSED) {
      return true;
    } else if (this.getTime() < this.getActiveDuration()) {
      return false;
    }
    return true;
  }
  /**
	*Check if the animator is paused:
	* @return {boolean} paused
	* @example
animator.isPaused(); // true or false
	*/
  public isPaused(): boolean {
    return this.state[PLAY_STATE] === PAUSED;
  }
  public setNext(animator: Animator): this {
    this.on(ENDED, () => {
      animator.play();
    });
    return this;
  }
  /**
	* play animator
	* @return {Animator} An instance itself.
	*/
  public play() {
    this.state[PLAY_STATE] = RUNNING;
    if (this.isEnded()) {
      this.setTickTime(0);
    }
    this.state.tickTime = this.getTime();

    requestAnimationFrame((time: number) => {
      this.state.prevTime = time;
      this.tick(time);
    });
    /**
		 * This event is fired when play animator.
		 * @event Animator#play
		 */
    this.trigger(PLAY);

    return this;
  }
  /**
	* pause animator
	* @return {Animator} An instance itself.
	*/
  public pause(): this {
    this.state[PLAY_STATE] = PAUSED;
    /**
		 * This event is fired when animator is paused.
		 * @event Animator#paused
		 */
    this.trigger(PAUSED);
    return this;
  }
  /**
	 * end animator
	 * @return {Animator} An instance itself.
	*/
  public finish() {
    this.state.tickTime = 0;
    this.setTime(0);
    this.end();
    return this;
  }
  /**
	 * end animator
	 * @return {Animator} An instance itself.
	*/
  public end() {
    this.pause();
    /**
		 * This event is fired when animator is ended.
		 * @event Animator#ended
		 */
    this.trigger(ENDED);
    return this;
  }
  /**
	* set currentTime
	* @param {Number|String} time - currentTime
	* @return {Animator} An instance itself.
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
		 * @event Animator#timeupdate
		 * @param {Object} param The object of data to be sent to an event.
		 * @param {Number} param.currentTime The total time that the animator is running.
		 * @param {Number} param.time The iteration time during duration that the animator is running.
		 * @param {Number} param.iterationCount The iteration count that the animator is running.
		 */
    this.trigger(TIMEUPDATE, {
      currentTime,
      time: this.getIterationTime(),
      iterationCount: this.getIterationCount(),
    });

    return this;
  }
  public getState(name: string): any {
    return this.state[name];
  }
  public setState(object: IState) {
    for (const name in object) {
      this.state[name] = object[name];
    }
    return this;
  }
  /**
	* Get the animator's current time
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
	 * Check if the current state of animator is delayed.
	 * @return {boolean} check delay state
	 */
  public isDelay() {
    const { delay, tickTime } = this.state;

    return delay > 0 && (tickTime < delay);
  }
  public setCurrentIterationCount(iterationCount: number): this {
    const state = this.state;
    const passIterationCount = Math.floor(iterationCount);

    if (state.currentIterationCount < passIterationCount) {
      /**
			* The event is fired when an iteration of an animation ends.
			* @event Animator#iteration
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
    const isReverse = isDirectionReverse(currentIterationCount, iterationCount, direction);

    const isFiniteDuration = isFinite(duration);
    if (isFiniteDuration && isReverse) {
      currentIterationTime = duration - currentIterationTime;
    }
    if (isFiniteDuration && iterationCount !== INFINITE) {
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
    if (state[PLAY_STATE] === PAUSED) {
      return;
    }

    requestAnimationFrame((time: number) => {
      this.tick(time);
    });
  }
  private setTickTime(time: number) {
    this.setTime(time - this.state.delay, true);
  }
}

/**
 * Get a delay for the start of an animation.
 * @method Animator#getDelay
 * @return {number} delay
 */
/**
 * Set a delay for the start of an animation.
 * @method Animator#setDelay
 * @param {number} delay - delay
 * @return {Animator} An instance itself.
 */
/**
 * Get fill mode for the item when the animation is not playing (before it starts, after it ends, or both)
 * @method Animator#getFillMode
 * @return {FillModeType} fillMode
 */
/**
 * Set fill mode for the item when the animation is not playing (before it starts, after it ends, or both)
 * @method Animator#setFillMode
 * @param {FillModeType} fillMode - fillMode
 * @return {Animator} An instance itself.
 */
/**
 * Get the number of times an animation should be played.
 * @method Animator#getIterationCount
 * @return {IterationCountType} iterationCount
 */
/**
 * Set the number of times an animation should be played.
 * @method Animator#setIterationCount
 * @param {IterationCountType} iterationCount - iterationCount
 * @return {Animator} An instance itself.
 */
/**
 * Get whether an animation should be played forwards, backwards or in alternate cycles.
 * @method Animator#getDirection
 * @return {DirectionType} direction
 */
/**
 * Set whether an animation should be played forwards, backwards or in alternate cycles.
 * @method Animator#setDirection
 * @param {DirectionType} direction - direction
 * @return {Animator} An instance itself.
 */
/**
 * Get whether the animation is running or paused.
 * @method Animator#getPlayState
 * @return {PlayStateType} playState
 */
/**
 * Set whether the animation is running or paused.
 * @method Animator#setPlayState
 * @param {PlayStateType} playState - playState
 * @return {Animator} An instance itself.
 */
/**
 * Get the animator's play speed
 * @method Animator#getPlaySpeed
 * @return {number} playSpeed
 */
/**
 * Set the animator's play speed
 * @method Animator#setPlaySpeed
 * @param {number} playSpeed - playSpeed
 * @return {Animator} An instance itself.
 */
/**
 * Get how long an animation should take to complete one cycle.
 * @method Animator#getDuration
 * @return {number} duration
 */
/**
 * Set how long an animation should take to complete one cycle.
 * @method Animator#setDuration
 * @param {number} duration - duration
 * @return {Animator} An instance itself.
 */
/**
 * Get the speed curve of an animation.
 * @method Animator#getEasing
 * @return {EasingType} easing
 */
/**
 * Get the speed curve's name
 * @method Animator#getEasingName
 * @return {string} the curve's name.
 */
/**
	* Get the animator's current iteration time
	* @method Animator#getIterationTime
	* @return {number} current iteration time
	* @example
animator.getIterationTime();
	*/

// tslint:disable-next-line:interface-name
interface Animator {
  getIterationTime(): number;
  setIterationTime(time: number): this;
  setDelay(delay: number): this;
  getDelay(): number;
  setFillMode(fillMode: FillModeType): this;
  getFillMode(): FillModeType;
  setIterationCount(iterationCount: IterationCountType): this;
  getIterationCount(): IterationCountType;
  setDirection(direction: DirectionType): this;
  getDirection(): DirectionType;
  setPlayState(playState: PlayStateType): this;
  getPlayState(): PlayStateType;
  setPlaySpeed(playSpeed: number): this;
  getPlaySpeed(): number;
  setDuration(duration: number): this;
  getDuration(): number;
  getEasing(): EasingType;
  getEasingName(): string;
}
export default Animator;
