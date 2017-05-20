import Animator from "./Animator";
import {isObject, has} from "./Util";

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
		this.scenes = {};
		this.addScene(scenes);
	}
	get duration() {
		const scenes = this.scenes;
		let _scenes;
		let scene;
		let time = 0;
		let id;
		let i;
		let length;

		for (id in scenes) {
			_scenes = scenes[id];
			id = parseFloat(id);
			for (length = _scenes.length, i = length - 1; i >= 0; --i) {
				scene = _scenes[i];
				time = Math.max(time, id + scene.totalDuration / scene.playSpeed);
			}
		}
		return time;
	}
	setIterationTime(_time) {
		super.setIterationTime(_time);
		const time = this.currentIterationTime;
		const scenes = this.scenes;
		let scene;
		let id;
		let _scenes;
		let i;
		let length;

		for (id in scenes) {
			if (id > time) {
				continue;
			}
			_scenes = scenes[id];
			id = parseFloat(id);
			for (length = _scenes.length, i = length - 1; i >= 0; --i) {
				scene = _scenes[i];
				scene.currentTime = time * scene.playSpeed - id;
			}
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
		const scenes = this.scenes;

		if (isObject(_time)) {
			for (const time in _time) {
				this.addScene(time, _time[time]);
			}
			return this;
		}
		if (!has(scenes, _time)) {
			scenes[_time] = [];
		}
		scenes[_time].push(scene);
		return this;
	}
}

export default Scenario;
