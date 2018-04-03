import SceneWrapper from "../Scene";
import SceneItem from "./SceneItem";
import {ANIMATION} from "./consts";
import {SCENE_ROLES} from "../consts";

/**
* manage sceneItems and play Scene.
* @extends Animator
*/
class Scene extends SceneWrapper {
	newItem(name, options) {
		if (this.items[name]) {
			return this.items[name];
		}
		const item = new SceneItem();

		this.setItem(name, item);
		item.setOptions(options);
		return item;
	}
	/**
	* Specifies an element to synchronize items' timeline.
	* @param {Object} selectors - Selectors to find elements in items.
	* @example
item.setSelector("#id.class");
	*/
	setSelector(selectors) {
		for (const selector in selectors) {
			const itemName = selectors[selector];
			const item = this.getItem(itemName);

			if (!item) {
				continue;
			}
			item.setSelector(selector);
		}
		return this;
	}
	load(properties, options) {
		super.load(properties, options);
		const isSelector = this.options.selector;

		if (!isSelector) {
			return this;
		}
		let name;
		let item;

		for (name in properties) {
			if (name === "options") {
				continue;
			}
			item = this.getItem(name);
			if (!item) {
				continue;
			}
			item.setSelector(name);
		}
		return this;
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
	* play using the css animation and keyframes.
	* @param {boolean} [exportCSS=true] Check if you want to export css.
	* @example
scene.playCSS();
	*/
	playCSS(exportCSS = true) {
		if (!ANIMATION || this.getPlayState() === "running") {
			return this;
		}
		exportCSS && this.exportCSS();

		const items = this.items;
		let animationItem;

		for (const id in items) {
			const item = items[id];

			item.playCSS(false);
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
		animationItem.on("iterated", this._animationiteration);
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
		animationItem.off("iterated", this._animationiteration);

		this._animationItem = null;
		this._animationend = null;
		this._animationiteration = null;
		return this;
	}
}

SCENE_ROLES.transform = true;
SCENE_ROLES.filter = true;

export default Scene;
