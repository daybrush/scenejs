import Frame from "../Frame";
import PropertyObject from "../PropertyObject";

const convertCrossBrowserCSSObject = function(cssObject, property, value) {
	cssObject[property] = value;
	cssObject[`-moz-${property}`] = value;
	cssObject[`-ms-${property}`] = value;
	cssObject[`-o-${property}`] = value;
	cssObject[`-webkit-${property}`] = value;
};

/**
* Animation's CSS Frame
* @extends Frame
*/
class CSSFrame extends Frame {
	/**
	* get the contents of a style declaration as a string.
	* @readonly
	*/
	get cssText() {
		const cssObject = {};
		const cssArray = [];
		const properties = this.properties.property;
		let property;
		let value;

		for (property in properties) {
			value = properties[property];
			if (value instanceof PropertyObject) {
				value = value.toValue();
			}
			cssObject[property] = value;
		}

		const transform = this.format("transform", "$1($2)", " ");
		const filter = this.format("filter", "$1($2)", " ");

		if (transform) {
			convertCrossBrowserCSSObject(cssObject, "transform", transform);
		}
		if (filter) {
			convertCrossBrowserCSSObject(cssObject, "filter", filter);
		}
		for (property in cssObject) {
			cssArray.push(`${property}:${cssObject[property]};`);
		}
		return cssArray.join("");
	}
}

/**
* set transform to the frame.
* @param {String|Object} [properties] - property's name or properties
* @param {Object} [value] - property's value
* @method Frame#setTransform
* @return {SceneItem} An instance itself
* @example
item.setTransform(10, "scale", "1,1");
// same
const frame = item.getFrame(10);
frame.setTransform("scale", "1,1");
*/
/**
* get transform's value in the frame
* @param {String} property - property's name
* @method Frame#getTransform
* @return {Object} property's value
* @example
item.getTransform(10, "scale");
// same
const frame = item.getFrame(10);
frame.getTransform("scale");
*/
/**
* set filter to the frame.
* @param {String|Object} [properties] - property's name or properties
* @param {Object} [value] - property's value
* @method CSSFrame#setFilter
* @return {SceneItem} An instance itself
* @example
item.setFilter(10, "opacity", "50%");
// same
const frame = item.getFrame(10);
frame.setFilter("opacity", "50%");
*/
/**
* get filter's value in the frame
* @param {String} property - property's name
* @method CSSFrame#getFilter
* @return {Object} property's value
* @example
item.getFilter(10, "scale");
// same
const frame = item.getFrame(10);
frame.getFilter("opacity");
*/

export default CSSFrame;
