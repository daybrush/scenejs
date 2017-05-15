import SceneItem from "./SceneItem";
import Frame from "./Frame";
import {
	defineProperty,
	defineGetterSetter,
} from "./Util";



const GETTER = function(func) {
	return {
		get: func,
	};
};

const SceneItemPrototype = SceneItem.prototype;

defineGetterSetter({target: SceneItemPrototype, name: "element", parent: "options"});

defineProperty(SceneItemPrototype, "selector", GETTER(function(selector) {
	this.options.selector = selector;
	this.element = document.querySelectorAll(selector);
}));

defineGetterSetter({target: SceneItemPrototype, name: "element", parent: "options"});

const convertCrossBrowserCSSObject = function(cssObject, property) {
	const value = cssObject[property];

	cssObject[`-moz-${property}`] = value;
	cssObject[`-ms-${property}`] = value;
	cssObject[`-o-${property}`] = value;
	cssObject[`-webkit-${property}`] = value;
};

defineProperty(Frame.prototype, "cssText", GETTER(function() {
	const cssObject = {};
	const cssArray = [];
	let property;

	cssObject.transform = this.format("transform", "$1($2)", " ");
	cssObject.filter = this.format("filter", "$1($2)", " ");
	convertCrossBrowserCSSObject(cssObject, "transform");
	convertCrossBrowserCSSObject(cssObject, "filter");

	for (property in cssObject) {
		cssArray.push(`${property}:${cssObject[property]};`);
	}
	return cssArray.join("");
}));
