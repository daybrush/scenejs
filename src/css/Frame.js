import FrameWrapper from "../Frame";
import {TRANSFORM, FILTER} from "./consts";

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
* @extends Animator
*/
class Frame extends FrameWrapper {
	toCSSObject() {
		const frameObject = this.toObject();
		const cssObject = {};

		const properties = frameObject.property;

		for (const name in properties) {
			cssObject[name] = properties[name];
		}
		const transform = toInnerProperties(frameObject.transform);
		const filter = toInnerProperties(frameObject.filter);

		TRANSFORM && (cssObject[TRANSFORM] = transform);
		FILTER && (cssObject[FILTER] = filter);

		return cssObject;
	}
	toCSS() {
		const cssObject = this.toCSSObject();
		const cssArray = [];

		for (const name in cssObject) {
			cssArray.push(`${name}:${cssObject[name]};`);
		}
		return cssArray.join("");
	}
}

export default Frame;
