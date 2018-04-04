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

export const hasClass = function(element, className) {
	if (element.classList) {
		return element.classList.contains(className);
	}
	return !!element.className.match(new RegExp(`(\\s|^)${className}(\\s|$)`));
};

export const addClass = function(element, className) {
	if (element.classList) {
		element.classList.add(className);
	} else {
		element.className += ` ${className}`;
	}
};

export const removeClass = function(element, className) {
	if (element.classList) {
		element.classList.remove(className);
	} else {
		const reg = new RegExp(`(\\s|^)${className}(\\s|$)`);

		element.className = element.className.replace(reg, " ");
	}
};

