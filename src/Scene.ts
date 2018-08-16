import Animator from "./Animator";
import SceneItem from "./SceneItem";
import {ANIMATION, ObjectInterface} from "./consts";
import {has} from "./utils";

/**
* manage sceneItems and play Scene.
* @class Scene
* @extends Scene.Animator
* @param {Object} [properties] - properties
* @param {AnimatorOptions} [options] - options
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
class Scene extends Animator {
	/**
	* version info
	* @name Scene.VERSION
	* @memberof Scene
	* @static
	* @type {string}
	* @example
	* Scene.VERSION // #__VERSION__#
	*/
	public static VERSION = "#__VERSION__#";
	public items: ObjectInterface<SceneItem>;

	constructor(properties: object, options: object) {
		super();
		this.items = {};
		this.load(properties, options);
	}
	public getDuration() {
		const items = this.items;
		let time = 0;

		for (const id in items) {
			const item = items[id];

			time = Math.max(time, item.getTotalDuration() / item.getPlaySpeed());
		}
		return time;
	}
	public setDuration(duration: number) {
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
	* @method Scene#getItem
	* @param {string} name - item's name
	* @return {Scene.SceneItem} item
	* @example
const item = scene.getItem("item1")
	*/
	public getItem(name: string) {
		return this.items[name];
	}
	/**
	* create item in scene
	* @method Scene#newItem
	* @param {String} name - name of item to create
	* @param {StateOptions} options - The option object of SceneItem
	* @return {Sceme.SceneItem} Newly created item
	* @example
const item = scene.newItem("item1")
	*/
	public newItem(name: string, options = {}) {
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
	* @param {Scene.SceneItem} item - sceneItem
	* @example
const item = scene.newItem("item1")
	*/
	public setItem(name: string | SceneItem, item?: SceneItem) {
		if (name instanceof SceneItem) {
			const id = !name.getId() || name.setId().getId();

			this.items[id] = name;
			return this;
		}
		item.setId(name);
		this.items[name] = item;
		return this;
	}
	public setIterationTime(time: number) {
		super.setIterationTime(time);
		const iterationTime = this.getIterationTime();
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
			 * @param {Scene.SceneItem} param.target The scene item that timeupdate and animate.
			 */
			item.setTime(iterationTime * item.state.playSpeed, easing, this);
		}
		return this;
	}
	/**
	 * executes a provided function once for each scene item.
	 * @method Scene#forEach
	 * @param {Function} func Function to execute for each element, taking three arguments
	 * @param {Scene.SceneItem} [func.item] The value of the item being processed in the scene.
	 * @param {string} [func.name] The name of the item being processed in the scene.
	 * @param {object} [func.items] The object that forEach() is being applied to.
	 * @return {Scene} An instance itself
	 */
	public forEach(func: (item?: SceneItem, name?: string, items?: ObjectInterface<SceneItem>) => void) {
		const items = this.items;

		for (const name in items) {
			func(items[name], name, items);
		}
		return this;
	}
	/**
	 * Export the CSS of the items to the style.
	 * @method Scene#exportCSS
	 * @return {Scene} An instance itself
	 */
	public exportCSS() {
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
	public append(item: SceneItem) {
		item.setDelay(item.getDelay() + this.getDuration());
		this.setItem(item);
	}
	/**
	* Play using the css animation and keyframes.
	* @method Scene#playCSS
	* @param {boolean} [exportCSS=true] Check if you want to export css.
	* @param {Object} [properties={}] The shorthand properties for six of the animation properties.
	* @param {Object} [properties.duration] The duration property defines how long an animation should take to complete one cycle.
	* @param {Object} [properties.fillMode] The fillMode property specifies a style for the element when the animation is not playing (before it starts, after it ends, or both).
	* @param {Object} [properties.iterationCount] The iterationCount property specifies the number of times an animation should be played.
	* @param {String} [properties.easing] The easing(timing-function) specifies the speed curve of an animation.
	* @param {Object} [properties.delay] The delay property specifies a delay for the start of an animation.
	* @param {Object} [properties.direction] The direction property defines whether an animation should be played forwards, backwards or in alternate cycles.
	* @return {Scene} An instance itself
	* @see {@link https://www.w3schools.com/cssref/css3_pr_animation.asp}
	* @example
scene.playCSS();
scene.playCSS(false, {
	direction: "reverse",
	fillMode: "forwards",
});
	*/
	public playCSS(exportCSS = true, properties = {}) {
		if (!ANIMATION || this.getPlayState() === "running") {
			return this;
		}
		exportCSS && this.exportCSS();

		const items = this.items;
		let animationItem: SceneItem;

		for (const id in items) {
			const item = items[id];

			item.playCSS(false, properties);
			if (item.getState("playCSS")) {
				animationItem = item;
			}
		}
		if (!animationItem) {
			return this;
		}
		const animationiteration = ({currentTime, iterationCount}: {currentTime: number, iterationCount: number}) => {
			this.state.currentTime = currentTime;
			this.setCurrentIterationCount(iterationCount);
		};
		const animationend = () => {
			this.end();
			this.setState({playCSS: false});
			animationItem.off("ended", animationend);
			animationItem.off("iteration", animationiteration);
		};
		animationItem.on("ended", animationend);
		animationItem.on("iteration", animationiteration);
		this.setState({playCSS: true});
		this.setPlayState("running");
		this.trigger("play");
		return this;
	}
	private load(properties: any = {}, options = properties.options) {
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
}
export default Scene;
