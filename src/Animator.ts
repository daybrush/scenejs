import {
  THRESHOLD,
  ALTERNATE, ALTERNATE_REVERSE, REVERSE, INFINITE, NORMAL,
  ITERATION_COUNT, DELAY, FILL_MODE, DIRECTION, PLAY_SPEED,
  DURATION, EASING, ITERATION_TIME, EASING_NAME, PAUSED,
  RUNNING, PLAY, TIMEUPDATE, ENDED, PLAY_STATE, PREV_TIME, TICK_TIME, CURRENT_TIME
} from "./consts";
import EventTrigger from "./EventTrigger";
import { bezier, IEasingFunction } from "./easing";
import { toFixed, makeId } from "./utils";
import { splitUnit, isString, camelize, requestAnimationFrame, isArray } from "@daybrush/utils";

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
function tick(animator: Animator, now: number) {
  const state = animator.state;
  const playSpeed = state[PLAY_SPEED];
  const prevTime = state[PREV_TIME];
  const delay = state[DELAY];
  const tickTime = state[TICK_TIME];
  const currentTime = tickTime + Math.min(1000, now - prevTime) / 1000 * playSpeed;

  state[PREV_TIME] = now;
  animator.setTime(currentTime - delay, true);
  if (animator.isEnded()) {
    animator.end();
    return;
  }
  if (state[PLAY_STATE] === PAUSED) {
    return;
  }

  requestAnimationFrame((time: number) => {
    tick(animator, time);
  });
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
  iteration?: number;
  prevTime?: number;
  playState?: PlayStateType;
  duration?: number;
  [key: string]: any;
}
export function isDirectionReverse(iteration: number,
                                   iteraiontCount: IterationCountType, direction: DirectionType) {
  if (direction === REVERSE) {
    return true;
  } else if (iteraiontCount !== INFINITE && iteration === iteraiontCount && iteraiontCount % 1 === 0) {
    return  direction === (iteration % 2 >= 1 ? ALTERNATE_REVERSE : ALTERNATE);
  }
  return  direction === (iteration % 2 >= 1 ? ALTERNATE : ALTERNATE_REVERSE);
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
      iteration: 0,
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
    const easing = isArray(curveArray) ?
      bezier(curveArray[0], curveArray[1], curveArray[2], curveArray[3]) : curveArray;
    const easingName = easing[EASING_NAME] || "linear";

    this.setState({ easing, easingName });
    return this;
  }
  /**
  * Specifies the unique indicator of the animator
  * @param - String or number of id to be set in the animator
	* @return {Animator} An instance itself.
	*/
  public setId(id: number | string = makeId(false)) {
    this.state.id = id;
    return this;
  }
  /**
	* Specifies the unique indicator of the animator
	* @return {String} the indicator of the item.
	*/
  public getId() {
    return this.state.id;
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
    return this.getActiveDuration(true);
  }
  /**
	* Get the animator's total duration excluding delay
	* @return {number} Total duration excluding delay
	* @example
animator.getActiveDuration();
	*/
  public getActiveDuration(delay?: boolean): number {
    const state = this.state;
    const count = state[ITERATION_COUNT];
    if (count === INFINITE) {
      return Infinity;
    }
    return (delay ? state[DELAY] : 0) + this.getDuration() * count;
  }
  /**
	* Check if the animator has reached the end.
	* @return {boolean} ended
	* @example
animator.isEnded(); // true or false
	*/
  public isEnded(): boolean {
    if (this.state[TICK_TIME] === 0 && this.state[PLAY_STATE] === PAUSED) {
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
  /**
	* play animator
	* @return {Animator} An instance itself.
	*/
  public play() {
    const state = this.state;

    state[PLAY_STATE] = RUNNING;
    if (this.isEnded()) {
      this.setTime(-state[DELAY], true);
    }
    state[TICK_TIME] = this.getTime();

    requestAnimationFrame((time: number) => {
      state[PREV_TIME] = time;
      tick(this, time);
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
    this.setTime(0);
    this.state[TICK_TIME] = 0;
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
    const state = this.state;
    let currentTime = isTick ? (time as number) : this.getUnitTime(time);

    state[TICK_TIME] = state[DELAY] + currentTime;
    if (currentTime < 0) {
      currentTime = 0;
    } else if (currentTime > activeDuration) {
      currentTime = activeDuration;
    }
    state[CURRENT_TIME] = currentTime;
    this.calculate();

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
      iterationCount: state.iteration,
    });

    return this;
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
    return this.state[CURRENT_TIME];
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
    const state = this.state;
    const delay = state[DELAY];
    const tickTime = state[TICK_TIME];

    return delay > 0 && (tickTime < delay);
  }
  public setIteration(iterationCount: number): this {
    const state = this.state;
    const passIterationCount = Math.floor(iterationCount);

    if (state.iteration < passIterationCount) {
      /**
			* The event is fired when an iteration of an animation ends.
			* @event Animator#iteration
			* @param {Object} param The object of data to be sent to an event.
			* @param {Number} param.currentTime The total time that the animator is running.
			* @param {Number} param.iterationCount The iteration count that the animator is running.
			*/
      this.trigger("iteration", {
        currentTime: state[CURRENT_TIME],
        iterationCount: passIterationCount,
      });
    }
    state.iteration = iterationCount;
    return this;
  }
  protected calculate() {
    const state = this.state;
    const iterationCount = state[ITERATION_COUNT];
    const fillMode = state[FILL_MODE];
    const direction = state[DIRECTION];
    const duration = this.getDuration();
    const time = this.getTime();
    const iteration = duration === 0 ? 0 : time / duration;
    let currentIterationTime = duration ? time % duration : 0;

    if (!duration) {
      this.setIterationTime(0);
      return this;
    }
    this.setIteration(iteration);

    // direction : normal, reverse, alternate, alternate-reverse
    // fillMode : forwards, backwards, both, none
    const isReverse = isDirectionReverse(iteration, iterationCount, direction);

    const isFiniteDuration = isFinite(duration);
    if (isFiniteDuration && isReverse) {
      currentIterationTime = duration - currentIterationTime;
    }
    if (isFiniteDuration && iterationCount !== INFINITE) {
      const isForwards = fillMode === "both" || fillMode === "forwards";

      // fill forwards
      if (iteration >= iterationCount) {
        currentIterationTime = duration * (isForwards ? (iterationCount % 1) || 1 : 0);
        isReverse && (currentIterationTime = duration - currentIterationTime);
      }
    }
    this.setIterationTime(currentIterationTime);
    return this;
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
