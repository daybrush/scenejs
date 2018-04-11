import Animator from "./Animator";
import SceneItem from "./SceneItem";
import {has} from "./utils";

/**
* manage sceneItems and play Scene.
* @extends Animator
*/
class Scene extends Animator {
	/**
	* Create a Scene
	* @param {Object} [properties] - properties
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
	constructor(properties, options) {
		super();
		this.items = {};
		this.load(properties, options);
	}
	/**
	* Specifies how many seconds an items'animation takes to complete one cycle
	* Specifies timeline's lastTime
	*/
	getDuration() {
		const items = this.items;
		let time = 0;

		for (const id in items) {
			const item = items[id];

			time = Math.max(time, item.getTotalDuration() / item.getPlaySpeed());
		}
		return time;
	}
	setDuration(duration) {
		const items = this.items;
		const sceneDuration = this.getDuration();

		if (!isFinite(sceneDuration)) {
			return this;
		}
		const ratio = duration / sceneDuration;

		for (const id in items) {
			const item = items[id];

			item.setDelay(item.getDelay() * ratio);
			item.setDuration(item.getDuration() * ratio);
		}
		return this;
	}
	/**
	* get item in scene by name
	* @param {String} name - item's name
	* @example
const item = scene.getItem("item1")
	*/
	getItem(name) {
		return this.items[name];
	}
	/**
	* create item in scene
	* @param {String} name - name of item to create
	* @example
const item = scene.newItem("item1")
	*/
	newItem(name, options = {}) {
		if (has(this.items, name)) {
			return this.items[name];
		}
		const item = new SceneItem();

		this.setItem(name, item);
		item.setOptions(options);

		return item;
	}
	/**
	* add a sceneItem to the scene
	* @param {String} name - name of item to create
	* @param {SceneItem} item - sceneItem
	* @example
const item = scene.newItem("item1")
	*/
	setItem(name, item) {
		item.setId(name);
		this.items[name] = item;
		return this;
	}
	setIterationTime(_time) {
		super.setIterationTime(_time);
		const time = this.getIterationTime();
		const items = this.items;
		const easing = this.state.easing;

		for (const id in items) {
			const item = items[id];

			item.setTime(time * item.state.playSpeed, easing);
		}
		return this;
	}
	/**
	* load properties
	* @param {Object} properties - properties
	* @example
scene.load({
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
	load(properties = {}, options = properties.options) {
		for (const name in properties) {
			if (name === "options") {
				continue;
			}
			const object = properties[name];

			if (object instanceof SceneItem) {
				this.setItem(name, object);
				continue;
			}
			const item = this.newItem(name);

			item.load(object);
		}
		this.setOptions(options);
		return this;
	}
	forEach(func) {
		const items = this.items;

		for (const name in items) {
			func(items[name], name, items);
		}
	}
}

export default Scene;
