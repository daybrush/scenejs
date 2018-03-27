import EventTrigger from "./EventTrigger";
import cubicBezier from "./cubicBezier";

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
			direction: "none",
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
			this.state.easingName = `cubic-bezier(${curveArray.join(" ,")})`;
			this.state.easing = cubicBezier(...curveArray);
		} else {
			this.state.easing = curveArray;
			this.state.easingName = curveArray.easingName || "linear";
		}
	}
	getEasing() {
		return this.state.easing;
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
	setFillMode(fillMode) {
		this.state.fillMode = fillMode;
	}
	setDirection(direction) {
		this.state.direction = direction;
	}
	setDelay(delay) {
		this.state.delay = delay;
	}
	setIterationCount(iterationCount) {
		this.state.iterationCount = iterationCount;
	}
	setPlaySpeed(playSpeed) {
		this.state.playSpeed = playSpeed;
	}
	setDuration(duration) {
		this.state.duration = duration;
	}
	getDuration() {
		return this.state.duration;
	}
	getDelay(delay) {
		return this.state.delay;
	}
	getIterationCount() {
		return this.state.iterationCount;
	}
	getFillMode() {
		return this.state.fillMode;
	}
	getDirection() {
		return this.state.direction;
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
		this.trigger("play");

		return this;
	}
	/**
	* pause animator
	* @return {Animator} An instance itself.
	*/
	pause() {
		this.state.playState = "paused";
		this.trigger("paused");
		return this;
	}
	/**
	* stop animator
	* @return {Animator} An instance itself.
	*/
	stop() {
		this.state.playState = "paused";
		this.trigger("paused");
		this.trigger("ended");
		return this;
	}
	/**
	* reset animator
	* @return {Animator} An instance itself.
	*/
	reset() {
		this.setTime(0);
		this.stop();
		return this;
	}
	/**
	* set currentTime
	* @param {Number} time - currentTime
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

		this.trigger("timeupdate", {
			currentTime,
			iterationTime: this.state.currentIterationTime,
			iterationCount: this.state.currentIterationCount,
		});
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
		const currentIterationCount = duration === 0 ? 0 : activeTime / duration;
		const isOdd = currentIterationCount % 2 >= 1;
		let currentIterationTime = activeTime % duration;
		let isAlternate = false;

		this.state.currentIterationCount = currentIterationCount;
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
			this.stop();
		}
		if (this.state.playState === "paused") {
			return;
		}

		requestAnimFrame(time => {
			this.tick(time);
		});
	}
}
/**
* iterationTime
* @memberof Animator
* @instance
* @name currentIterationTime
* @readonly
* @example
animator.currentIterationTime // ....
*/
/**
* playSpeed
* @memberof Animator
* @instance
* @name playSpeed
* @example
animator.playSpeed = 1;// default speed
animator.playSpeed = 2;// speed 2x
*/
/**
* playState
* @memberof Animator
* @instance
* @name playState
* @example
animator.play();
animator.playState // => running

animator.pause();
animator.playState // => paused

animator.stop();
animator.playState // => paused
*/
/**
* specifies the number of times an animation should be played
* @memberof Animator
* @instance
* @name iterationCount
* @example
const animator = new Scene.Animator({
	delay: 2,
	diretion: "forwards",
	duration: 2,
	fillMode: "alternate",
	iterationCount: 3,
	easing: Scene.Animator.EASE,
});
animator.totalDuration; // delay + duration * iterationCount =  2 + 2 * 3 = 8
animator.iterationCount = 2;
animator.totalDuration; // delay + duration * iterationCount =  2 + 2 * 2 = 6
*/
/**
* Specifies how many seconds or milliseconds an animation takes to complete one cycle
* @memberof Animator
* @instance
* @name duration
*/
/**
* Specifies a style for the element when the animation is not playing (when it is finished, or when it has a delay)(none, forwards, backwards)
* @memberof Animator
* @instance
* @name fillMode
*/
/**
* Specifies whether an animation should play in reverse direction or alternate cycles(normal, reverse, alternate, alternate-reverse)
* @memberof Animator
* @instance
* @name direction
*/
/**
* specifies a delay for the start of an animation
* @memberof Animator
* @instance
* @name delay
*/

export default Animator;
