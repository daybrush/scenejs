import Scene from "../Scene";
import SceneItem from "./SceneItem";
import Frame from "./Frame";
import {has} from "../utils";

class CSSScene extends Scene {
	newItem(name) {
		if (has(this.items, name)) {
			return this.items[name];
		}
		const item = new SceneItem();

		this.setItem(name, item);
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
}

export default CSSScene;
