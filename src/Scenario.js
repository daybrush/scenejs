import Animator from "./Animator";
import {isObject} from "./Util";

class Scenario extends Animator {
	/**
     * create a Scenario
     * @class
     * @param {Object} [scenes=false] scenes.
     * @example
var scenario = new Scenario({
	0 : scene1,
	0.4 : scene2,
	0.7 : scene3
});
     */
	constructor(scenes = {}) {
		super();
		this.scenes = scenes;
	}
	get duration() {
		const scenes = this.scenes;
		let scene;
		let time = 0;
		let id;

		for (id in scenes) {
			scene = scenes[id];
			time = Math.max(time, scene.totalDuration * scene.playSpeed);
		}
		return time;
	}
	setIterationTime(_time) {
		super.setIterationTime(_time);
		const time = this.currentIterationTime;
		const scenes = this.scenes;
		let scene;
		let id;

		for (id in scenes) {
			scene = scenes[id];
			scene.currentTime = time * scene.playSpeed;
		}
		return this;
	}
	/**
     * Add Scene in time
     * @param {number} time - Play Time.
     * @param {Scene} Scene - Scene.
     * @return {Scenario} An instance.
     * @example
var scenario = new Scenario();
scenario.addScene(0, scene1);
scenario.addScene(0.5, scene2);
scenario.addScene(1, scene3);
scenario.addScene({
	2: scene4,
	3: scene5
});
     */
	addScene(_time, scene) {
		if (isObject(_time)) {
			for (const time in _time) {
				this.scenes[time] = _time[time];
			}
			return this;
		}
		this.scenes[_time] = scene;
		return this;
	}
}

export default Scenario;
