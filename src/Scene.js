import Animator from "./Animator";
import SceneItem from "./SceneItem";
import {has} from "./utils";

/**
* manage sceneItems and play Scene.
* @extends Animator
*/
class Scene extends Animator {
	/**
	* add Role to Scene.
	* @static
	* @param {String} role - property role(property, transform, filter)
	* @example
Scene.addRole("property");
Scene.addRole("transform");
Scene.addRole("filter");
	*/
	static addRole(role) {
		SceneItem.addRole(role);
	}
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
	* @override
	* @example
item.duration; // = item.timeline.last
	*/
	get duration() {
		const items = this.items;
		let time = 0;

		for (const id in items) {
			const item = items[id];

			time = Math.max(time, item.totalDuration / item.playSpeed);
		}
		return time;
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
	newItem(name) {
		if (has(this.items, name)) {
			return this.items[name];
		}
		const item = new SceneItem();

		this.setItem(name, item);
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
		const time = this.currentIterationTime;
		const items = this.items;
		let item;
		let id;

		for (id in items) {
			item = items[id];
			item.currentTime = time * item.playSpeed;
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
		let item;
		let name;

		for (name in properties) {
			if (name === "options") {
				continue;
			}
			item = this.newItem(name);
			item.load(properties[name]);
			if (options) {
				item.setOptions(options);
			}
		}
		return this;
	}
}

export default Scene;
