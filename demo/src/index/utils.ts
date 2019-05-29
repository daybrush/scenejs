import NativeScene, {animateItem, EasingFunction} from "../../../src";

declare var Scene: typeof NativeScene & {
    animateItem: typeof animateItem,
    EASE: EasingFunction,
};

export function scroll(to: number) {
  return Scene.animateItem({
    scrollTop: [document.documentElement.scrollTop || document.body.scrollTop, to],
  }, {
    duration: 1,
    easing: Scene.EASE,
  }).on("animate", ({frame}) => {
    window.scrollTo(0, frame.get("scrollTop"));
  });
}
