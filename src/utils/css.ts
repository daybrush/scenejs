import { ObjectInterface } from "../consts";

export function hasClass(element: HTMLElement, className: string) {
  if (element.classList) {
    return element.classList.contains(className);
  }
  return !!element.className.match(new RegExp(`(\\s|^)${className}(\\s|$)`));
}

export function addClass(element: HTMLElement, className: string) {
  if (element.classList) {
    element.classList.add(className);
  } else {
    element.className += ` ${className}`;
  }
}

export function removeClass(element: HTMLElement, className: string) {
  if (element.classList) {
    element.classList.remove(className);
  } else {
    const reg = new RegExp(`(\\s|^)${className}(\\s|$)`);

    element.className = element.className.replace(reg, " ");
  }
}

export function fromCSS(elements: HTMLElement | HTMLElement[] | NodeListOf<HTMLElement>, properties: string[]) {
  if (!elements || !properties || !properties.length) {
    return {};
  }
  let element;

  if (elements instanceof Element) {
    element = elements;
  } else if (elements.length) {
    element = elements[0];
  } else {
    return {};
  }
  const cssObject: ObjectInterface<any> = {};
  const styles = window.getComputedStyle(element) as any;
  const length = properties.length;

  for (let i = 0; i < length; ++i) {
    cssObject[properties[i]] = styles[properties[i]];
  }
  return cssObject;
}
