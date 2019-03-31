import {SceneItem, EASE} from "../../src";

export function scroll(to: number) {
  return new SceneItem({
    scrollTop: to,
  }, {
    target: document.documentElement,
    duration: 1,
    easing: EASE,
  }).play();
}
