import Scene from "../Scene";
import SceneItem from "./SceneItem";
import {has} from "../utils";
import {SCENE_ROLES} from "../consts";

class CSSScene extends Scene {
	newItem(name, options) {
		if (has(this.items, name)) {
			return this.items[name];
		}
		const item = new SceneItem();

		this.setItem(name, item);
		item.setOptions(options);
		return item;
	}
	setSelector(selectors, _itemName) {
		let item;
		let selector;
		let itemName = _itemName;

		if (typeof selectors === "string") {
			item = this.getItem(itemName);
			if (!item) {
				return this;
			}
			item.setSelector(selectors);
			return this;
		}
		for (selector in selectors) {
			itemName = selectors[selector];
			item = this.getItem(itemName);
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
		const {easing, easingName, iterationCount} = this.state;

		for (const id in items) {
			const item = items[id];

			item.exportCSS(duration || item.getDuration(), {
				easing,
				easingName,
				iterationCount,
			});
		}
		return this;
	}
	playCSS() {
		this.exportCSS();
		const items = this.items;

		for (const id in items) {
			const item = items[id];
			const element = item.options.element;

			if (!element) {
				continue;
			}
			const length = element.length;

			for (let i = 0; i < length; ++i) {
				element[i].className += " startAnimation";
			}
		}
		return this;
	}
}

SCENE_ROLES.transform = true;
SCENE_ROLES.filter = true;

export default CSSScene;
