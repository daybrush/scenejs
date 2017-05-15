import SceneItem from "../SceneItem";
import {defineGetter, isObject, isUndefined} from "../Util";
import CSSFrame from "./CSSFrame";

function animateFunction(time, frame) {
	const element = this.element;

	if (!element) {
		return;
	}
	const cssText = frame.cssText;

	if (this.options.cssText === cssText) {
		return;
	}
	this.options.cssText = cssText;
	if (element instanceof NodeList) {
		const length = element.length;
		let i;

		for (i = 0; i < length; ++i) {
			element[i].style.cssText = cssText;
		}
		return;
	}
	element.style.cssText = cssText;
}

/**
* manage CSSFrame
* @extends SceneItem
*/
class CSSItem extends SceneItem {
	static addRole(role) {
		CSSFrame.addRole(role);
		this.addGetterSetter(role);
	}
	constructor(properties) {
		super(properties);

		this.on("animate", animateFunction);
	}
	newFrame(time) {
		const frame = new CSSFrame();

		if (!isUndefined(time)) {
			this.setFrame(time, frame);
		}
		return frame;
	}
	/**
	* In CSS, selectors are patterns used to select the element(s) you want to style.
	* @see {@link https://www.w3schools.com/cssref/css_selectors.asp|CSS Seelctor}
	* @example
item.selector = ".scene .item li:first-child";
const element = item.element;
const element2 = document.querySelectorAll(".scene .item li:first-child");
//element[0] and element2[0] are the same.
	*/
	get selector() {
		return this.options.selector;
	}
	set selector(value) {
		this.options.selector = value;
		this.element = document.querySelectorAll(value);
	}
	set id(_id) {
		const element = this.element;

		if (element instanceof NodeList) {
			const length = element.length;
			let i;

			for (i = 0; i < length; ++i) {
				element[i].setAttribute("data-scene-id", _id);
			}
		} else {
			element.setAttribute("data-scene-id", _id);
		}
		this.options.id = _id;
	}
	set element(_element) {
		this.setElement(_element);
	}
	setElement(_element) {
		let element = _element;

		if (element instanceof NodeList) {
			element = element[0];
		}
		if (!element) {
			return;
		}
		// element.dataset.sceneId
		const dataset = element.dataset;
		let id = (dataset && dataset.sceneId) || element.getAttribute("data-scene-id");
		let checkElement;

		this.options.element = _element;
		if (!id || id === "null") {
			for (;;) {
				id = parseInt(Math.random() * 10000, 10);
				checkElement = document.querySelector(`[data-scene-id="${id}"]`);
				if (!checkElement) {
					break;
				}
			}
			this.id = id;
		} else {
			this.options.id = id;
		}
	}
	/**
	* adds css style of items's element to the frame at that time.
	* @param {Number} time - frame's time
	* @example
// html
// <div id="item1" style="opacity:0.5;display:none;border-left:10px solid black;">
const item = new Scene.SceneItem();

item.selector = "#item1";
item.copyCSSStyle(0);

const frame = item.getFrame(0);
frame.getProperty("opacity"); // 0.5
frame.getProperty("display"); // "none"
frame.getProperty("border-left").toValue(); // "10px solid black"
	*/
	copyCSSStyle(time) {
		let element = this.element;

		if (element instanceof NodeList) {
			element = element[0];
		}
		if (!element) {
			return this;
		}
		const cssText = element.style.cssText;
		const cssArray = cssText.split(";");
		const length = cssArray.length;
		const cssObject = {};
		let i;
		let matches;

		for (i = 0; i < length; ++i) {
			matches = /([^:]*):([\S\s]*)/g.exec(cssArray[i]);
			if (matches.length < 3) {
				continue;
			}
			cssObject[matches[1]] = matches[2];
		}
		this.set(time, cssObject);
		return this;
	}
	/**
	* adds css property of items's element to the frame at that time.
	* @param {Number} time - frame's time
	* @param {String} property - the name of property or the names of properties to copy.
	* @example
// css
// #item1 {display: inline-block; width: 100px; height: 100px;}

// html
// <div id="item1" style="opacity:0.5;border-left:10px solid black;"></div>

const item = new Scene.SceneItem();

item.selector = "#item1";
item.copyCSSProperty(0, "display");
item.copyCSSProperty(0, ["width", "opacity"]);

const frame = item.getFrame(0);

frame.getProperty("width"); // 100px;
frame.getProperty("display"); // "inline-block"
frame.getProperty("opacity"); // 0.5

	*/
	copyCSSProperty(time, property) {
		let element = this.element;

		if (element instanceof NodeList) {
			element = element[0];
		}
		if (!element) {
			return this;
		}
		const style = element.style;
		const cssObject = {};

		if (isObject(property)) {
			let name;

			for (let i = 0, length = property.length; i < length; ++i) {
				name = property[i];
				cssObject[property] = (style && style[name]) || window.getComputedStyle(element)[name];
			}
		} else {
			cssObject[property] = (style && style[property]) || window.getComputedStyle(element)[property];
		}
		this.set(time, cssObject);

		return this;
	}
}


/**
* get transform'value in the sceneItem at that time
* @param {Number} time - time
* @param {String|Object} property - property's name
* @method CSSItem#getTransform
* @return {Object} property's value
* @example
item.getTransform(10, "scale");
*/
/**
* set transform to the sceneItem at that time
* @param {Number} time - time
* @param {String} [property] - property's name or properties
* @param {Object} [value] - property's value
* @method SceneItem#setTransform
* @return {SceneItem} An instance itself
* @example
item.setTransform(10, "scale", "1,1");
*/
CSSItem.addRole("transform");
/**
* get filter's value in the sceneItem at that time
* @param {Number} time - time
* @param {String|Object} property - property's name
* @method SceneItem#getFilter
* @return {Object} property's value
* @example
item.getFilter(10, "opacity");
*/
/**
* set filter to the sceneItem at that time
* @param {Number} time - time
* @param {String} [property] - property's name or properties
* @param {Object} [value] - property's value
* @method CSSItem#setFilter
* @return {SceneItem} An instance itself
* @example
item.setFilter(10, "opacity", "50%");
*/
CSSItem.addRole("filter");

/**
* Specifies an element to synchronize sceneItem's timeline.
* @memberof CSSItem
* @instance
* @name element
* @example
item.selector = ".scene .item li:first-child";

// same
item.element = document.querySelector(".scene .item li:first-child");
*/
defineGetter({target: CSSItem.prototype, name: "element", parent: "options"});
/**
* Specifies the item's id to synchronize the element.
* @memberof CSSItem
* @instance
* @name id
*/
defineGetter({target: CSSItem.prototype, name: "id", parent: "options"});
export default CSSItem;
