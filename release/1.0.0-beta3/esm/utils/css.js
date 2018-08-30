export function hasClass(element, className) {
  if (element.classList) {
    return element.classList.contains(className);
  }

  return !!element.className.match(new RegExp("(\\s|^)" + className + "(\\s|$)"));
}
export function addClass(element, className) {
  if (element.classList) {
    element.classList.add(className);
  } else {
    element.className += " " + className;
  }
}
export function removeClass(element, className) {
  if (element.classList) {
    element.classList.remove(className);
  } else {
    var reg = new RegExp("(\\s|^)" + className + "(\\s|$)");
    element.className = element.className.replace(reg, " ");
  }
}
export function fromCSS(elements, properties) {
  if (!elements || !properties || !properties.length) {
    return {};
  }

  var element;

  if (elements instanceof Element) {
    element = elements;
  } else if (elements.length) {
    element = elements[0];
  } else {
    return {};
  }

  var cssObject = {};
  var styles = window.getComputedStyle(element);
  var length = properties.length;

  for (var i = 0; i < length; ++i) {
    cssObject[properties[i]] = styles[properties[i]];
  }

  return cssObject;
}