import EventTrigger from "./EventTrigger";
import {cubicBezier} from "./TimingFunction";
import {defineGetter, defineGetterSetter, isObject} from "./Util";

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
	* @param {Object} [options.timingFunction] - Specifies the speed curve of the animation
	* @example
const animator = new Scene.Animator({
	delay: 2,
	diretion: "alternate",
	duration: 2,
	fillMode: "forwards",
	iterationCount: 3,
	timingFuncition: Scene.Animator.EASE,
});
	*/
	constructor(options) {
		super();
		this._currentTime = 0;
		this._timer = 0;

		this.options = {};
		this.iterationCount = 1;
		this.delay = 0;
		this.fillMode = "forwards";
		this.direction = "none";
		this.playState = "paused";
		this.playSpeed = 1;

		this._currentTime = 0;
		this._currentIterationTime = -1;
		this._prevTime = 0;
		this.setOptions(options);
	}
	set timingFunction(curveArray) {
		this.options.timingFunction = (typeof curveArray === "function") ? curveArray : cubicBezier(curveArray);
	}
	set timingFunctions(curveArrays) {
		const length = curveArrays.length;
		const curves = [];
		let start;
		let end;
		let curve;

		for (let i = 0; i < length / 3; ++i) {
			start = curveArrays[3 * i + 0];
			end = curveArrays[3 * i + 1];
			curve = curveArrays[3 * i + 2];
			if (typeof curve !== "function") {
				curve = cubicBezier(curve);
			}
			curves.push({start, end, curve});
		}
		this.options.timingFunction = curves;
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
	* @param {Object} [options.timingFunction] - Specifies the speed curve of the animation
	* @example
animator.({
	delay: 2,
	diretion: "alternate",
	duration: 2,
	fillMode: "forwards",
	iterationCount: 3,
	timingFuncition: Scene.Animator.EASE,
});
	*/
	setOptions(options) {
		if (!options) {
			return this;
		}

		let option;

		for (option in options) {
			if (option === "timingFunction" || option === "timingFunctions") {
				this[option] = options[option];
				continue;
			}
			this.options[option] = options[option];
		}

		return this;
	}
	/**
	* currentTime
	* @example
animator.currentTime = 10;

animator.currentTime // 10
	*/
	set currentTime(value) {
		this.setTime(value);
	}
	/**
	* total duration including all iteration.
	* @readonly
	* @example
const animator = new Scene.Animator({
	delay: 2,
	diretion: "alternate",
	duration: 2,
	fillMode: "forwards",
	iterationCount: 3,
	timingFuncition: Scene.Animator.EASE,
});
animator.totalDuration; // delay + duration * iterationCount =  2 + 2 * 3 = 8
	*/
	get totalDuration() {
		if (this.iterationCount === "infinite") {
			return Infinity;
		}
		return this.delay + this.activeDuration;
	}
	/**
	* total duration excluding delay.
	* @readonly
	* @example
const animator = new Scene.Animator({
	delay: 2,
	diretion: "alternate",
	duration: 2,
	fillMode: "forwards",
	iterationCount: 3,
	timingFuncition: Scene.Animator.EASE,
});
animator.activeDuration; // duration * iterationCount =  2 * 3 = 6
	*/
	get activeDuration() {
		return this.duration * this.iterationCount;
	}
	/**
	* check if animator is ended.
	* @readonly
	* @return {Boolean} true: animattor is ended, false : not ended.
	* @example
// true: animator is ended, false : not ended.
if (animator.ended) {
	// is ended...
} else {
	// not ended...
}
	*/
	get ended() {
		if (this.currentTime === 0 && this.playState === "paused") {
			return true;
		} else if (this.currentTime < this.totalDuration) {
			return false;
		}

		return true;
	}
	/**
	* check if animator is paused.
	* @readonly
	* @return {Boolean} true: animattor is paused, false : not paused.
	* @example
// true: animator is paused(not playing), false : not paused.
if (animator.paused) {
	// is paused...
} else {
	// not paused...
}
	*/
	get paused() {
		return this.playState === "paused";
	}
	set next(animator) {
		this.on("ended", () => {
			animator.play();
		});
	}
	/**
	* play animator
	* @return {Animator} An instance itself.
	*/
	play() {
		if (this.ended) {
			this.currentTime = 0;
		}
		this.playState = "running";
		requestAnimFrame(time => {
			this._prevTime = time;
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
		this.playState = "paused";
		this.trigger("paused");
		return this;
	}
	/**
	* stop animator
	* @return {Animator} An instance itself.
	*/
	stop() {
		this.playState = "paused";
		this.trigger("ended");
		return this;
	}
	/**
	* reset animator
	* @return {Animator} An instance itself.
	*/
	reset() {
		this.currentTime = 0;
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
		const {totalDuration} = this;
		let _time = time;

		if (_time < 0) {
			_time = 0;
		} else if (_time > totalDuration) {
			_time = totalDuration;
		}
		this._currentTime = _time;
		this.calculateIterationTime();
		this.trigger("timeupdate", [_time]);
	}
	calculateIterationTime() {
		const currentTime = this._currentTime;
		const {duration, iterationCount, fillMode, direction} = this;
		const activeTime = parseInt(Math.max(currentTime - this.delay, 0) * 10000, 10) / 10000;
		const currentIterationCount = duration === 0 ? 0 : activeTime / duration;
		const isOdd = currentIterationCount % 2 >= 1;

		let currentIterationTime = activeTime % duration;
		let isAlternate = false;

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
	caculateTimingFunction(_time) {
		let duration = this.duration;
		const timingFunction = this.timingFunction;
		let time = _time;
		let ratio;

		if (isObject(timingFunction)) {
			const length = timingFunction.length;
			let nowTimingFunction = this.options.nowTimingFunction;

			// 시간이 벗어나거나 TimingFunction이 미지정일시 해당 시간에 만족하는 TimingFunction을 찾는다.
			if ((nowTimingFunction && (nowTimingFunction.end < time || time < nowTimingFunction.start)) ||
				(length > 0 && !nowTimingFunction)) {
				nowTimingFunction = 0;
				this.options.nowTimingFunction = 0;
				for (let i = 0; i < length; ++i) {
					if (timingFunction[i].start <= time && time <= timingFunction[i].end) {
						nowTimingFunction = timingFunction[i];
						this.options.nowTimingFunction = nowTimingFunction;
						break;
					}
				}
			}
			if (nowTimingFunction) {
				const start = nowTimingFunction.start;

				if (duration < nowTimingFunction.end) {
					nowTimingFunction.end = duration;
				}
				duration = nowTimingFunction.end - start;
				ratio = duration === 0 ? 0 : (time - start) / duration;
				time = start + nowTimingFunction.curve(ratio) * duration;
			}
		} else {
			ratio = duration === 0 ? 0 : time / duration;
			time = this.timingFunction(ratio) * duration;
		}
		return time;
	}
	setIterationTime(_time) {
		let time = _time;

		if (this.timingFunction) {
			time = this.caculateTimingFunction(time);
		}
		this._currentIterationTime = time;
		this.trigger("iterationtimeupdate", [time]);

		return this;
	}
	tick(now) {
		const prevTime = this._prevTime;
		const currentTime = this.currentTime + Math.min(1000, now - prevTime) / 1000 * this.playSpeed;

		this._prevTime = now;
		this.setTime(currentTime);
		if (this.ended) {
			this.stop();
		}
		if (this.playState === "paused") {
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
defineGetter({target: Animator.prototype, name: "currentIterationTime", prefix: "_"});
defineGetter({target: Animator.prototype, name: "currentTime", prefix: "_"});
defineGetter({target: Animator.prototype, name: "timingFunction", parent: "options"});
/**
* playSpeed
* @memberof Animator
* @instance
* @name playSpeed
* @example
animator.playSpeed = 1;// default speed
animator.playSpeed = 2;// speed 2x
*/
defineGetterSetter({target: Animator.prototype, name: "playSpeed", parent: "options"});
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
defineGetterSetter({target: Animator.prototype, name: "playState", parent: "options"});
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
	timingFuncition: Scene.Animator.EASE,
});
animator.totalDuration; // delay + duration * iterationCount =  2 + 2 * 3 = 8
animator.iterationCount = 2;
animator.totalDuration; // delay + duration * iterationCount =  2 + 2 * 2 = 6
*/
defineGetterSetter({target: Animator.prototype, name: "iterationCount", parent: "options"});
/**
* Specifies how many seconds or milliseconds an animation takes to complete one cycle
* @memberof Animator
* @instance
* @name duration
*/
defineGetterSetter({target: Animator.prototype, name: "duration", parent: "options"});
/**
* Specifies a style for the element when the animation is not playing (when it is finished, or when it has a delay)(none, forwards, backwards)
* @memberof Animator
* @instance
* @name fillMode
*/
defineGetterSetter({target: Animator.prototype, name: "fillMode", parent: "options"});
/**
* Specifies whether an animation should play in reverse direction or alternate cycles(normal, reverse, alternate, alternate-reverse)
* @memberof Animator
* @instance
* @name direction
*/
defineGetterSetter({target: Animator.prototype, name: "direction", parent: "options"});
/**
* specifies a delay for the start of an animation
* @memberof Animator
* @instance
* @name delay
*/
defineGetterSetter({target: Animator.prototype, name: "delay", parent: "options"});

export default Animator;
