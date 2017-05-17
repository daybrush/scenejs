import Scene from "../Scene";
import SceneItem from "./CSSItem";
import Frame from "./CSSFrame";
import {has} from "../Util";

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
			item.selector = selector;
		}
		return this;
	}
}
CSSScene.SceneItem = SceneItem;
CSSScene.Frame = Frame;

export default CSSScene;
