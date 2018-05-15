import EventTrigger from "./EventTrigger";
import cubicBezier from "./cubicBezier";
import {defineGetter, defineGetterSetter} from "./utils";

let lastTime = 0;

const requestAnimFrame = (function() {
	return window.requestAnimationFrame ||
		window.webkitRequestAnimationFrame ||
		window.mozRequestAnimationFrame	||
		function(callback) {
			const currTime = Date.now();
			const timeToCall = Math.max(0, 16 - (currTime - lastTime));
			const id = window.setTimeout(() => {
				callback(currTime + timeToCall);
			}, 1000 / 60);

			lastTime = currTime + timeToCall;
			return id;
		};
})();

/**
* play video, animation, the others
* @extends EventTrigger
*/
class Animator extends EventTrigger {
	/**
	* Create an Animator.
	* <br/>see {@link https://www.w3schools.com/css/css3_animations.asp|CSS3 Animation}
	* @param {Object} [options] - animator's options
	* @param {Number} [options.delay] - specifies a delay for the start of an animation
	* @param {String} [options.direction] - Specifies whether an animation should play in reverse direction or alternate cycles
	* @param {Number} [options.duration] - Specifies how many seconds or milliseconds an animation takes to complete one cycle
	* @param {String} [options.fillMode] - Specifies a style for the element when the animation is not playing (when it is finished, or when it has a delay)
	* @param {Number|String} [options.iterationCount] - specifies the number of times an animation should be played
	* @param {Object} [options.easing] - Specifies the speed curve of the animation
	* @example
const animator = new Animator({
	delay: 2,
	diretion: "alternate",
	duration: 2,
	fillMode: "forwards",
	iterationCount: 3,
	easing: Scene.Animator.EASE,
});
	*/
	constructor(options) {
		super();
		this._timer = 0;
		this.options = {};
		this.state = {
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
			duration: 0,
		};
		this.setOptions(options);
	}
	setEasing(curveArray) {
		if (Array.isArray(curveArray)) {
			this.state.easingName = `cubic-bezier(${curveArray.join(",")})`;
			this.state.easing = cubicBezier(...curveArray);
		} else {
			this.state.easing = curveArray;
			this.state.easingName = curveArray.easingName || "linear";
		}
		return this;
	}
	/**
	* set animator's options.
	* <br/>see {@link https://www.w3schools.com/css/css3_animations.asp|CSS3 Animation}
	* @param {Object} [options] - animator's options
	* @param {Number} [options.delay] - specifies a delay for the start of an animation
	* @param {String} [options.direction] - Specifies whether an animation should play in reverse direction or alternate cycles
	* @param {Number} [options.duration] - Specifies how many seconds or milliseconds an animation takes to complete one cycle
	* @param {String} [options.fillMode] - Specifies a style for the element when the animation is not playing (when it is finished, or when it has a delay)
	* @param {Number|String} [options.iterationCount] - specifies the number of times an animation should be played
	* @param {Object} [options.easing] - Specifies the speed curve of the animation
	* @return {Animator} An instance itself.
	* @example
animator.({
	delay: 2,
	diretion: "alternate",
	duration: 2,
	fillMode: "forwards",
	iterationCount: 3,
	easing: Scene.Animator.EASE,
});
	*/
	setOptions(options) {
		if (!options) {
			return this;
		}
		for (const name in options) {
			if (name === "easing") {
				this.setEasing(options[name]);
				continue;
			} else if (name === "duration") {
				this.setDuration(options[name]);
				continue;
			}
			(name in this.state ? this.state : this.options)[name] = options[name];
		}

		return this;
	}
	setCurrentIterationCount(iterationCount) {
		const passIterationCount = parseInt(iterationCount, 10);

		if (this.state.currentIterationCount < passIterationCount) {
			/**
			* The event is fired when an iteration of an animation ends.
			* @event Animator#iteration
			* @param {Object} param The object of data to be sent to an event.
			* @param {Number} param.currentTime The total time that the animator is running.
			* @param {Number} param.iterationCount The iteration count that the animator is running.
			*/
			this.trigger("iteration", {
				currentTime: this.state.currentTime,
				iterationCount: passIterationCount,
			});
		}
		this.state.currentIterationCount = iterationCount;
	}
	getTotalDuration() {
		if (this.state.iterationCount === "infinite") {
			return Infinity;
		}
		return this.state.delay + this.getActiveDuration();
	}
	getActiveDuration() {
		if (this.state.iterationCount === "infinite") {
			return Infinity;
		}
		return this.getDuration() * this.state.iterationCount;
	}
	isEnded() {
		if (this.getTime() === 0 && this.state.playState === "paused") {
			return true;
		} else if (this.getTime() < this.getTotalDuration()) {
			return false;
		}
		return true;
	}
	isPaused() {
		return this.state.playState === "paused";
	}
	setNext(animator) {
		this.on("ended", () => {
			animator.play();
		});
		return this;
	}
	/**
	* play animator
	* @return {Animator} An instance itself.
	*/
	play() {
		if (this.isEnded()) {
			this.setTime(0);
		}
		this.state.playState = "running";
		requestAnimFrame(time => {
			this.state.prevTime = time;
			this.tick(time);
		});
		/**
		 * This event is fired when play animator.
		 * @event Animator#play
		 */
		this.trigger("play");

		return this;
	}
	/**
	* pause animator
	* @return {Animator} An instance itself.
	*/
	pause() {
		this.state.playState = "paused";
		/**
		 * This event is fired when animator is paused.
		 * @event Animator#paused
		 */
		this.trigger("paused");
		return this;
	}
	/**
	 * end animator
	 * @return {Animator} An instance itself.
	*/
	end() {
		this.pause();
		/**
		 * This event is fired when animator is ended.
		 * @event Animator#ended
		 */
		this.trigger("ended");
	}
	/**
	* reset animator
	* @return {Animator} An instance itself.
	*/
	reset() {
		this.setTime(0);
		this.pause();
		return this;
	}
	/**
	* set currentTime
	* @param {Number} time - currentTime
	* @return {Animator} An instance itself.
	* @example
animator.setTime(10);

animator.currentTime // 10
	*/
	setTime(time) {
		const totalDuration = this.getTotalDuration();
		let currentTime = time;

		if (currentTime < 0) {
			currentTime = 0;
		} else if (currentTime > totalDuration) {
			currentTime = totalDuration;
		}
		this.state.currentTime = currentTime;
		this.calculateIterationTime();

		/**
		 * This event is fired when the animator updates the time.
		 * @event Animator#timeupdate
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
	getTime() {
		return this.state.currentTime;
	}
	getActiveTime() {
		return parseInt(Math.max(this.state.currentTime - this.state.delay, 0) * 10000, 10) / 10000;
	}
	calculateIterationTime() {
		const {iterationCount, fillMode, direction} = this.state;
		const duration = this.getDuration();
		const activeTime = this.getActiveTime();
		const isDelay = this.state.currentTime - this.state.delay < 0;
		const currentIterationCount = duration === 0 ? 0 : activeTime / duration;
		const isOdd = currentIterationCount % 2 >= 1;
		let currentIterationTime = duration ? activeTime % duration : 0;
		let isAlternate = false;

		if (isDelay) {
			this.setIterationTime(0);
			return this;
		}
		this.setCurrentIterationCount(currentIterationCount);
		// direction : normal, reverse, alternate, alternate-reverse
		// fillMode : forwards, backwards, both, none
		switch (direction) {
			case "reverse":
				currentIterationTime = duration - currentIterationTime;
				break;
			case "alternate":
				if (isOdd) {
					currentIterationTime = duration - currentIterationTime;
				}
				isAlternate = true;
				break;
			case "alternate-reverse":
				if (!isOdd) {
					currentIterationTime = duration - currentIterationTime;
				}
				isAlternate = true;
				break;
			default:
		}

		switch (fillMode) {
			case "both":
			case "forwards":
				if (isAlternate || currentIterationCount !== iterationCount || iterationCount % 1 !== 0) {
					break;
				}
				currentIterationTime = duration - currentIterationTime;

				break;
			default:
				if (currentIterationCount !== iterationCount || iterationCount % 1 !== 0) {
					break;
				}
				currentIterationTime = 0;
		}
		this.setIterationTime(currentIterationTime);
		return this;
	}
	caculateEasing(time) {
		if (!this.state.easing) {
			return time;
		}
		const duration = this.getDuration();
		const easing = this.state.easing;
		const ratio = duration === 0 ? 0 : time / duration;
		const easingTime = easing(ratio) * time;

		return easingTime;
	}
	getIterationTime() {
		return this.state.currentIterationTime;
	}
	setIterationTime(time) {
		const iterationTime = time;

		this.state.currentIterationTime = iterationTime;

		return this;
	}
	tick(now) {
		const playSpeed = this.state.playSpeed;
		const prevTime = this.state.prevTime;
		const currentTime = this.getTime() + Math.min(1000, now * playSpeed - prevTime) / 1000;

		this.state.prevTime = now * playSpeed;
		this.setTime(currentTime);
		if (this.isEnded()) {
			this.end();
		}
		if (this.state.playState === "paused") {
			return;
		}

		requestAnimFrame(time => {
			this.tick(time);
		});
	}
}

const AnimatorPrototype = Animator.prototype;

defineGetterSetter(AnimatorPrototype, "delay", "state");
defineGetterSetter(AnimatorPrototype, "fillMode", "state");
defineGetterSetter(AnimatorPrototype, "iterationCount", "state");
defineGetterSetter(AnimatorPrototype, "direction", "state");
defineGetterSetter(AnimatorPrototype, "playState", "state");
defineGetterSetter(AnimatorPrototype, "playSpeed", "state");
defineGetterSetter(AnimatorPrototype, "duration", "state");
defineGetter(AnimatorPrototype, "easingName", "state");
defineGetter(AnimatorPrototype, "easing", "state");


export default Animator;