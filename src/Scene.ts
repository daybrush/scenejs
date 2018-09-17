import Animator, { StateInterface, EasingType } from "./Animator";
import SceneItem from "./SceneItem";
import {ANIMATION, ObjectInterface} from "./consts";
import {has} from "./utils";
import Frame from "./Frame";

/**
* manage sceneItems and play Scene.
* @extends Scene.Animator
*/
class Scene extends Animator {

	public items: ObjectInterface<Scene | SceneItem>;
/**
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
	constructor(properties?: ObjectInterface<any>, options?: ObjectInterface<any>) {
		super();
		this.items = {};
		this.load(properties, options);
	}
	public setId(id: string = `scene${Math.floor(Math.random() * 100000)}`) {
		this.state.id = id;
		return this;
	}
	public getId() {
		return this.state.id;
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

		if (duration === 0 || !isFinite(sceneDuration)) {
			return this;
		}
		if (sceneDuration === 0) {
			for (const id in items) {
				const item = items[id];

				item.setDuration(duration);
			}
		} else {
			const ratio = duration / sceneDuration;

			for (const id in items) {
				const item = items[id];

				item.setDelay(item.getDelay() * ratio);
				item.setDuration(item.getDuration() * ratio);
			}
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
	public setItem(name: string, item?: Scene | SceneItem) {
		if (item instanceof Animator) {
			item.setId(name);
		}
		this.items[name] = item;
		return this;
	}
	public animate(time: number, parentEasing?: EasingType) {
		super.setTime(time, true);
		return this._animate(parentEasing);
	}
	public setTime(time: number | string, isNumber?: boolean, parentEasing?: EasingType) {
		super.setTime(time, isNumber);
		this._animate(parentEasing);
		return this;
	}
	/**
	 * executes a provided function once for each scene item.
	 * @param {Function} func Function to execute for each element, taking three arguments
	 * @param {Scene | Scene.SceneItem} [func.item] The value of the item being processed in the scene.
	 * @param {string} [func.name] The name of the item being processed in the scene.
	 * @param {object} [func.items] The object that forEach() is being applied to.
	 * @return {Scene} An instance itself
	 */
	public forEach(func: (item?: Scene | SceneItem, name?: string, items?: ObjectInterface<Scene | SceneItem>) => void) {
		const items = this.items;

		for (const name in items) {
			func(items[name], name, items);
		}
		return this;
	}
	/**
	 * Export the CSS of the items to the style.
	 * @return {Scene} An instance itself
	 */
	public exportCSS(duration: number = this.getDuration(), state?: StateInterface) {
		const items = this.items;
		let totalDuration = duration;

		if (!totalDuration || !isFinite(totalDuration)) {
			totalDuration = 0;
		}
		for (const id in items) {
			const item = items[id];

			item.exportCSS(totalDuration, this.state);
		}
		return this;
	}
	public append(item: SceneItem | Scene) {
		item.setDelay(item.getDelay() + this.getDuration());
		this.setItem(item.getId() || item.setId().getId(), item);
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
		let animationItem: Scene | SceneItem;

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
	public load(properties: any = {}, options = properties.options) {
		if (!properties) {
			return this;
		}
		const isSelector = options && options.selector;

		for (const name in properties) {
			if (name === "options") {
				continue;
			}
			const object = properties[name];
			let item;

			if (object instanceof Scene || object instanceof SceneItem) {
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
	public setSelector(_: string | boolean) {
		const isSelector = this.options.selector;

		this.forEach((item, name) => {
			item.setSelector(isSelector ? name : false);
		});
	}
	private _animate(parentEasing?: EasingType) {
		const iterationTime = this.getIterationTime();
		const items = this.items;
		const easing = this.getEasing() || parentEasing;
		const frames: ObjectInterface<ObjectInterface<any> | Frame> = {};

		for (const id in items) {
			const item = items[id];

			frames[id] = item.animate(Math.max(iterationTime * item.getPlaySpeed() - item.getDelay(), 0), easing);
		}
		/**
		 * This event is fired when timeupdate and animate.
		 * @param {Number} param.currentTime The total time that the animator is running.
		 * @param {Number} param.time The iteration time during duration that the animator is running.
		 * @param {Frame} param.frames frame of that time.
		 */
		this.trigger("animate", {
			currentTime: this.getTime(),
			time: iterationTime,
			frames,
		});
		return frames;
	}
}

export default Scene;
