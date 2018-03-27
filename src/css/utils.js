export const convertCrossBrowserCSSObject = function(cssObject, property, value) {
	if (!value) {
		return cssObject;
	}
	cssObject[property] = value;
	cssObject[`-moz-${property}`] = value;
	cssObject[`-ms-${property}`] = value;
	cssObject[`-o-${property}`] = value;
	cssObject[`-webkit-${property}`] = value;
	return cssObject;
};

export const convertCrossBrowserCSSArray = function(cssArray, property, value) {
	if (!value) {
		return cssArray;
	}
	cssArray.push(
		`${property}: ${value};`,
		`-moz-${property}: ${value};`,
		`-ms-${property}: ${value};`,
		`-o-${property}: ${value};`,
		`-webkit-${property}: ${value};`,
	);
	return cssArray;
};

export const toId = function toId(text) {
	return text.match(/[0-9a-zA-Z]+/g).join("");
};
