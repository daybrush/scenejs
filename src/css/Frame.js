import Frame from "../Frame";
import {convertCrossBrowserCSSObject} from "./utils";

function toInnerProperties(obj) {
	if (!obj) {
		return "";
	}
	const arrObj = [];

	for (const name in obj) {
		arrObj.push(`${name}(${obj[name]})`);
	}
	return arrObj.join(" ");
}

/**
* Animation's CSS Frame
* @extends Frame
*/
class CSSFrame extends Frame {
	toCSS() {
		const frameObject = this.toObject();
		const cssObject = {};

		const properties = frameObject.property;

		for (const name in properties) {
			cssObject[name] = properties[name];
		}
		const transform = toInnerProperties(frameObject.transform);
		const filter = toInnerProperties(frameObject.filter);

		transform && convertCrossBrowserCSSObject(cssObject, "transform", transform);
		filter && convertCrossBrowserCSSObject(cssObject, "filter", filter);

		const cssArray = [];

		for (const name in cssObject) {
			cssArray.push(`${name}:${cssObject[name]};`);
		}
		return cssArray.join("");
	}
}

export default CSSFrame;
