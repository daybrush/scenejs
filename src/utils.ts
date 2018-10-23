import { ROLES, ObjectInterface, MAXIMUM, FIXED, ALIAS, PAUSED, RUNNING, PLAY, ENDED } from "./consts";
import PropertyObject from "./PropertyObject";
import Scene from "./Scene";
import SceneItem from "./SceneItem";
import { isArray, ANIMATION } from "@daybrush/utils";

export function setAlias(name: string, alias: string[]) {
  ALIAS[name] = alias;
}
export function setRole(names: string[], isProperty?: boolean, isFixedProperty?: boolean) {
  const length = names.length;
  let roles: any = ROLES;
  let fixed: any = FIXED;

  for (let i = 0; i < length - 1; ++i) {
    !roles[names[i]] && (roles[names[i]] = {});
    roles = roles[names[i]];
    if (isFixedProperty) {
      !fixed[names[i]] && (fixed[names[i]] = {});
      fixed = fixed[names[i]];
    }
  }
  isFixedProperty && (fixed[names[length - 1]] = true);
  roles[names[length - 1]] = isProperty ? true : {};
}
export function getType(value: any) {
  const type = typeof value;

  if (type === "object") {
    if (isArray(value)) {
      return "array";
    } else if (value instanceof PropertyObject) {
      return "property";
    }
  } else if (type === "string" || type === "number") {
    return "value";
  }
  return type;
}
export function toFixed(num: number) {
  return Math.round(num * MAXIMUM) / MAXIMUM;
}
export function isInProperties(roles: ObjectInterface<any>, args: any[], isCheckTrue?: boolean) {
  const length = args.length;
  let role: any = roles;

  if (length === 0) {
    return false;
  }
  for (let i = 0; i < length; ++i) {
    if (role === true) {
      return false;
    }
    role = role[args[i]];
    if (!role || (!isCheckTrue && role === true)) {
      return false;
    }
  }
  return true;
}
export function isRole(args: any[], isCheckTrue?: boolean) {
  return isInProperties(ROLES, args, isCheckTrue);
}
export function isFixed(args: any[]) {
  return isInProperties(FIXED, args, true);
}

export interface IterationInterface {
  currentTime: number;
  iterationCount: number;
  elapsedTime: number;
}
export function isPausedCSS(item: Scene | SceneItem) {
  return item.state.playCSS && item.getPlayState() === PAUSED;
}
export function playCSS(item: Scene | SceneItem, exportCSS: boolean, properties = {}) {
  if (!ANIMATION || item.getPlayState() === RUNNING) {
    return;
  }
  if (isPausedCSS(item)) {
    item.addPlayClass(true, properties);
  } else {
    if (item.isEnded()) {
      item.setTime(0);
    }
    exportCSS && item.exportCSS();
    const el = item.addPlayClass(false, properties);

    if (!el) {
      return;
    }
    addAnimationEvent(item, el);
    item.setState({ playCSS: true });
  }
  item.setPlayState(RUNNING);
  item.trigger(PLAY);
}

export function addAnimationEvent(item: Scene | SceneItem, el: HTMLElement) {
  const duration = item.getDuration();
  const isZeroDuration = !duration || !isFinite(duration);

  const animationend = () => {
    if (!isZeroDuration) {
      item.setState({ playCSS: false });
      item.finish();
    }
  };
  item.on(ENDED, () => {
    el.removeEventListener("animationend", animationend);
    el.removeEventListener("animationiteration", animationiteration);
  });
  const animationiteration = ({elapsedTime}: any) => {
    const currentTime = elapsedTime;
    const iterationCount = isZeroDuration ? 0 : (currentTime / duration);

    item.state.currentTime = currentTime;
    item.setCurrentIterationCount(iterationCount);
  };
  el.addEventListener("animationend", animationend);
  el.addEventListener("animationiteration", animationiteration);
}
