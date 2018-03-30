import SceneWrapper from "../Scene";
import SceneItem from "./SceneItem";
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
	* @example
scene.playCSS();
	*/
	playCSS() {
		this.exportCSS();
		const items = this.items;

		for (const id in items) {
			items[id].playCSS(false);
		}
		return this;
	}
}

SCENE_ROLES.transform = true;
SCENE_ROLES.filter = true;

export default Scene;
