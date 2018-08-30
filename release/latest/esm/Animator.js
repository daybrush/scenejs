function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

import EventTrigger from "./EventTrigger";
import { bezier } from "./easing";
import { toFixed } from "./utils";
var lastTime = 0;

var requestAnimFrame = function () {
  return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || function (callback) {
    var currTime = Date.now();
    var timeToCall = Math.max(0, 16 - (currTime - lastTime));
    var id = window.setTimeout(function () {
      callback(currTime + timeToCall);
    }, 1000 / 60);
    lastTime = currTime + timeToCall;
    return id;
  };
}();

export function isDirectionReverse(iterationCount, direction) {
  return direction === "reverse" || direction === (iterationCount % 2 >= 1 ? "alternate" : "alternate-reverse");
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

var Animator =
/*#__PURE__*/
function (_EventTrigger) {
  _inheritsLoose(Animator, _EventTrigger);

  function Animator(options) {
    var _this;

    _this = _EventTrigger.call(this) || this;
    _this.options = {};
    _this.state = {
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
      prevTime: 0,
      playState: "paused",
      duration: 0
    };

    _this.setOptions(options);

    return _this;
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


  var _proto = Animator.prototype;

  _proto.setEasing = function setEasing(curveArray) {
    this.setState(Array.isArray(curveArray) ? {
      easingName: "cubic-bezier(" + curveArray.join(",") + ")",
      easing: bezier(curveArray[0], curveArray[1], curveArray[2], curveArray[3])
    } : {
      easing: curveArray,
      easingName: curveArray.easingName || "linear"
    });
    return this;
  };
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


  _proto.setOptions = function setOptions(options) {
    if (!options) {
      return this;
    }

    for (var name in options) {
      var value = options[name];

      if (name === "easing") {
        this.setEasing(value);
        continue;
      } else if (name === "duration") {
        value && this.setDuration(value);
        continue;
      }

      (name in this.state ? this.state : this.options)[name] = value;
    }

    return this;
  };
  /**
  * Get the animator's total duration including delay
  * @method Scene.Animator#getTotalDuration
  * @return {number} Total duration
  * @example
  animator.getTotalDuration();
  */


  _proto.getTotalDuration = function getTotalDuration() {
    if (this.state.iterationCount === "infinite") {
      return Infinity;
    }

    return this.state.delay + this.getActiveDuration();
  };
  /**
  * Get the animator's total duration excluding delay
  * @method Scene.Animator#getActiveDuration
  * @return {number} Total duration excluding delay
  * @example
  animator.getTotalDuration();
  */


  _proto.getActiveDuration = function getActiveDuration() {
    if (this.state.iterationCount === "infinite") {
      return Infinity;
    }

    return this.getDuration() * this.state.iterationCount;
  };
  /**
  * Check if the animator has reached the end.
  * @method Scene.Animator#isEnded
  * @return {boolean} ended
  * @example
  animator.isEnded(); // true or false
  */


  _proto.isEnded = function isEnded() {
    if (this.getTime() === 0 && this.state.playState === "paused") {
      return true;
    } else if (this.getTime() < this.getTotalDuration()) {
      return false;
    }

    return true;
  };
  /**
  *Check if the animator is paused:
  * @method Scene.Animator#isPaused
  * @return {boolean} paused
  * @example
  animator.isPaused(); // true or false
  */


  _proto.isPaused = function isPaused() {
    return this.state.playState === "paused";
  };

  _proto.setNext = function setNext(animator) {
    this.on("ended", function () {
      animator.play();
    });
    return this;
  };
  /**
  * play animator
  * @method Scene.Animator#play
  * @return {Scene.Animator} An instance itself.
  */


  _proto.play = function play() {
    var _this2 = this;

    if (this.isEnded()) {
      this.setTime(0);
    }

    this.state.playState = "running";
    requestAnimFrame(function (time) {
      _this2.state.prevTime = time;

      _this2.tick(time);
    });
    /**
     * This event is fired when play animator.
     * @event Scene.Animator#play
     */

    this.trigger("play");
    return this;
  };
  /**
  * pause animator
  * @method Scene.Animator#pause
  * @return {Scene.Animator} An instance itself.
  */


  _proto.pause = function pause() {
    this.state.playState = "paused";
    /**
     * This event is fired when animator is paused.
     * @event Scene.Animator#paused
     */

    this.trigger("paused");
    return this;
  };
  /**
   * end animator
   * @method Scene.Animator#end
   * @return {Scene.Animator} An instance itself.
  */


  _proto.end = function end() {
    this.pause();
    /**
     * This event is fired when animator is ended.
     * @event Scene.Animator#ended
     */

    this.trigger("ended");
    return this;
  };
  /**
  * reset animator
  * @method Scene.Animator#reset
  * @return {Scene.Animator} An instance itself.
  */


  _proto.reset = function reset() {
    this.setTime(0);
    this.pause();
    return this;
  };
  /**
  * set currentTime
  * @method Scene.Animator#setTime
  * @param {Number} time - currentTime
  * @return {Scene.Animator} An instance itself.
  * @example
  animator.setTime(10);
  animator.getTime() // 10
  */


  _proto.setTime = function setTime(time) {
    var totalDuration = this.getTotalDuration();
    var currentTime = time;

    if (currentTime < 0) {
      currentTime = 0;
    } else if (currentTime > totalDuration) {
      currentTime = totalDuration;
    }

    this.state.currentTime = currentTime;
    this.calculateIterationTime();
    /**
     * This event is fired when the animator updates the time.
     * @event Scene.Animator#timeupdate
     * @param {Object} param The object of data to be sent to an event.
     * @param {Number} param.currentTime The total time that the animator is running.
     * @param {Number} param.time The iteration time during duration that the animator is running.
     * @param {Number} param.iterationCount The iteration count that the animator is running.
     */

    this.trigger("timeupdate", {
      currentTime: currentTime,
      time: this.getIterationTime(),
      iterationCount: this.getIterationCount()
    });
    return this;
  };

  _proto.getState = function getState(name) {
    return this.state[name];
  };

  _proto.setState = function setState(object) {
    for (var name in object) {
      this.state[name] = object[name];
    }

    return this;
  };
  /**
  * Get the animator's current time
  * @method Scene.Animator#getTime
  * @return {number} current time
  * @example
  animator.getTime();
  */


  _proto.getTime = function getTime() {
    return this.state.currentTime;
  };
  /**
  * Get the animator's current time excluding delay
  * @method Scene.Animator#getActiveTime
  * @return {number} current time excluding delay
  * @example
  animator.getActiveTime();
  */


  _proto.getActiveTime = function getActiveTime() {
    return toFixed(Math.max(this.state.currentTime - this.state.delay, 0));
  };
  /**
  * Get the animator's current iteration time
  * @method Scene.Animator#getIterationTime
  * @return {number} current iteration time
  * @example
  animator.getIterationTime();
  */


  _proto.getIterationTime = function getIterationTime() {
    return this.state.currentIterationTime;
  };
  /**
   * Get a delay for the start of an animation.
   * @method Scene.Animator#getDelay
   * @return {number} delay
   */


  _proto.getDelay = function getDelay() {
    return this.state.delay;
  };
  /**
   * Set a delay for the start of an animation.
   * @method Scene.Animator#setDelay
   * @param {number} delay - delay
   * @return {Scene.Animator} An instance itself.
   */


  _proto.setDelay = function setDelay(delay) {
    this.state.delay = delay;
    return this;
  };
  /**
   * Get fill mode for the item when the animation is not playing (before it starts, after it ends, or both)
   * @method Scene.Animator#getFillMode
   * @return {"none"|"forwards"|"backwards"|"both"} fillMode
   */


  _proto.getFillMode = function getFillMode() {
    return this.state.fillMode;
  };
  /**
   * Set fill mode for the item when the animation is not playing (before it starts, after it ends, or both)
   * @method Scene.Animator#setFillMode
   * @param {"none"|"forwards"|"backwards"|"both"} fillMode - fillMode
   * @return {Scene.Animator} An instance itself.
   */


  _proto.setFillMode = function setFillMode(fillMode) {
    this.state.fillMode = fillMode;
    return this;
  };
  /**
   * Get the number of times an animation should be played.
   * @method Scene.Animator#getIterationCount
   * @return {"inifnite"|number} iterationCount
   */


  _proto.getIterationCount = function getIterationCount() {
    return this.state.iterationCount;
  };
  /**
   * Set the number of times an animation should be played.
   * @method Scene.Animator#setIterationCount
   * @param {"inifnite"|number} iterationCount - iterationCount
   * @return {Scene.Animator} An instance itself.
   */


  _proto.setIterationCount = function setIterationCount(iterationCount) {
    this.state.iterationCount = iterationCount;
    return this;
  };
  /**
   * Get whether an animation should be played forwards, backwards or in alternate cycles.
   * @method Scene.Animator#getDirection
   * @return {"normal"|"reverse"|"alternate"|"alternate-reverse"} direction
   */


  _proto.getDirection = function getDirection() {
    return this.state.direction;
  };
  /**
   * Set whether an animation should be played forwards, backwards or in alternate cycles.
   * @method Scene.Animator#setDirection
   * @param {"normal"|"reverse"|"alternate"|"alternate-reverse"} direction - direction
   * @return {Scene.Animator} An instance itself.
   */


  _proto.setDirection = function setDirection(direction) {
    this.state.direction = direction;
    return this;
  };
  /**
   * Get whether the animation is running or paused.
   * @method Scene.Animator#getPlayState
   * @return {"paused"|"running"} playState
   */


  _proto.getPlayState = function getPlayState() {
    return this.state.playState;
  };
  /**
   * Set whether the animation is running or paused.
   * @method Scene.Animator#setPlayState
   * @param {"paused"|"running"} playState - playState
   * @return {Scene.Animator} An instance itself.
   */


  _proto.setPlayState = function setPlayState(playState) {
    this.state.playState = playState;
    return this;
  };
  /**
   * Get the animator's play speed
   * @method Scene.Animator#getPlaySpeed
   * @return {number} playSpeed
   */


  _proto.getPlaySpeed = function getPlaySpeed() {
    return this.state.playSpeed;
  };
  /**
   * Set the animator's play speed
   * @method Scene.Animator#setPlaySpeed
   * @param {number} playSpeed - playSpeed
   * @return {Scene.Animator} An instance itself.
   */


  _proto.setPlaySpeed = function setPlaySpeed(playSpeed) {
    this.state.playSpeed = playSpeed;
    return this;
  };
  /**
   * Get how long an animation should take to complete one cycle.
   * @method Scene.Animator#getDuration
   * @return {number} duration
   */


  _proto.getDuration = function getDuration() {
    return this.state.duration;
  };
  /**
   * Set how long an animation should take to complete one cycle.
   * @method Scene.Animator#setDuration
   * @param {number} duration - duration
   * @return {Scene.Animator} An instance itself.
   */


  _proto.setDuration = function setDuration(duration) {
    this.state.duration = duration;
    return this;
  };
  /**
   * Get the speed curve of an animation.
   * @method Scene.Animator#getEasing
   * @return {0|function} easing
   */


  _proto.getEasing = function getEasing() {
    return this.state.easing;
  };
  /**
   * Get the speed curve's name
   * @method Scene.Animator#getEasingName
   * @return {string} the curve's name.
   */


  _proto.getEasingName = function getEasingName() {
    return this.state.easingName;
  };

  _proto.setCurrentIterationCount = function setCurrentIterationCount(iterationCount) {
    var state = this.state;
    var passIterationCount = Math.floor(iterationCount);

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
        iterationCount: passIterationCount
      });
    }

    state.currentIterationCount = iterationCount;
    return this;
  };

  _proto.setIterationTime = function setIterationTime(time) {
    this.state.currentIterationTime = time;
    return this;
  };

  _proto.calculateIterationTime = function calculateIterationTime() {
    var _this$state = this.state,
        iterationCount = _this$state.iterationCount,
        fillMode = _this$state.fillMode,
        direction = _this$state.direction,
        currentTime = _this$state.currentTime,
        delay = _this$state.delay;
    var duration = this.getDuration();
    var activeTime = this.getActiveTime();
    var isDelay = currentTime - delay < 0;
    var currentIterationCount = duration === 0 ? 0 : activeTime / duration;
    var currentIterationTime = duration ? activeTime % duration : 0;

    if (isDelay || !currentIterationCount) {
      this.setIterationTime(0);
      return this;
    }

    this.setCurrentIterationCount(currentIterationCount); // direction : normal, reverse, alternate, alternate-reverse
    // fillMode : forwards, backwards, both, none

    var isReverse = isDirectionReverse(currentIterationCount, direction);

    if (isReverse) {
      currentIterationTime = duration - currentIterationTime;
    }

    if (iterationCount !== "infinite") {
      var isForwards = fillMode === "both" || fillMode === "forwards"; // fill forwards

      if (currentIterationCount >= iterationCount) {
        currentIterationTime = duration * (isForwards ? iterationCount % 1 || 1 : 0);
        isReverse && (currentIterationTime = duration - currentIterationTime);
      }
    }

    this.setIterationTime(currentIterationTime);
    return this;
  };

  _proto.caculateEasing = function caculateEasing(time) {
    if (!this.state.easing) {
      return time;
    }

    var duration = this.getDuration();
    var easing = this.state.easing;
    var ratio = duration === 0 ? 0 : time / duration;
    var easingTime = easing(ratio) * time;
    return easingTime;
  };

  _proto.tick = function tick(now) {
    var _this3 = this;

    var state = this.state;
    var playSpeed = state.playSpeed,
        prevTime = state.prevTime;
    var currentTime = this.getTime() + Math.min(1000, now * playSpeed - prevTime) / 1000;
    state.prevTime = now * playSpeed;
    this.setTime(currentTime);

    if (this.isEnded()) {
      this.end();
    }

    if (state.playState === "paused") {
      return;
    }

    requestAnimFrame(function (time) {
      _this3.tick(time);
    });
  };

  return Animator;
}(EventTrigger);

export { Animator as default };