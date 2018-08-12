import Animator from "./Animator";
import SceneItem from "./SceneItem";
import {ANIMATION} from "./consts";
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


			/**
			 * This event is fired when timeupdate and animate.
			 * @event Scene#animate
			 * @param {Number} param.currentTime The total time that the animator is running.
			 * @param {Number} param.time The iteration time during duration that the animator is running.
			 * @param {Frame} param.frame frame of that time.
			 * @param {SceneItem} param.target The scene item that timeupdate and animate.
			 */
			item.setTime(time * item.state.playSpeed, easing, this);
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
		const isSelector = options && options.selector;

		for (const name in properties) {
			if (name === "options") {
				continue;
			}
			const object = properties[name];
			let item;

			if (object instanceof SceneItem) {
				this.setItem(name, object);
				item = object;
			} else {
				item = this.newItem(name);
				item.load(object);
			}
			isSelector && item.setSelector(name);
		}
		this.setOptions(options);
	}
	forEach(func) {
		const items = this.items;

		for (const name in items) {
			func(items[name], name, items);
		}
	}
	exportCSS() {
		const items = this.items;
		let duration = this.getDuration();

		if (!duration || !isFinite(duration)) {
			duration = 0;
		}
		for (const id in items) {
			const item = items[id];

			item.exportCSS(duration, this.state);
		}
		return this;
	}
	/**
	* Play using the css animation and keyframes.
	* @param {boolean} [exportCSS=true] Check if you want to export css.
	* @param {Object} [properties={}] The shorthand properties for six of the animation properties.
	* @param {Object} [properties.duration] The duration property defines how long an animation should take to complete one cycle.
	* @param {Object} [properties.fillMode] The fillMode property specifies a style for the element when the animation is not playing (before it starts, after it ends, or both).
	* @param {Object} [properties.iterationCount] The iterationCount property specifies the number of times an animation should be played.
	* @param {String} [properties.easing] The easing(timing-function) specifies the speed curve of an animation.
	* @param {Object} [properties.delay] The delay property specifies a delay for the start of an animation.
	* @param {Object} [properties.direction] The direction property defines whether an animation should be played forwards, backwards or in alternate cycles.
	* @see {@link https://www.w3schools.com/cssref/css3_pr_animation.asp}
	* @example
scene.playCSS();
scene.playCSS(false, {
	direction: "reverse",
	fillMode: "forwards",
});
	*/
	playCSS(exportCSS = true, properties = {}) {
		if (!ANIMATION || this.getPlayState() === "running") {
			return this;
		}
		exportCSS && this.exportCSS();

		const items = this.items;
		let animationItem;

		for (const id in items) {
			const item = items[id];

			item.playCSS(false, properties);
			if (item._animationend) {
				animationItem = item;
			}
		}
		if (!animationItem) {
			return this;
		}
		this._animationend = e => {
			this.end();
		};
		this._animationiteration = ({currentTime, iterationCount}) => {
			this.state.currentTime = currentTime;
			this.setCurrentIterationCount(iterationCount);
		};
		this._animationItem = animationItem;
		animationItem.on("ended", this._animationend);
		animationItem.on("iteration", this._animationiteration);
		this.setPlayState("running");
		return this;
	}
	end() {
		super.end();

		const animationItem = this._animationItem;

		if (!animationItem) {
			return this;
		}
		animationItem.off("ended", this._animationend);
		animationItem.off("iteration", this._animationiteration);

		this._animationItem = null;
		this._animationend = null;
		this._animationiteration = null;
		return this;
	}
}

Scene.VERSION = "#__VERSION__#";

export default Scene;
