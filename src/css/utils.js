
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

