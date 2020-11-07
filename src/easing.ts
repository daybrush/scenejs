import { between } from "@daybrush/utils";
import { EasingFunction } from "./types";

function cubic(y1: number, y2: number, t: number) {
  const t2 = 1 - t;

  // Bezier Curve Formula
  return t * t * t + 3 * t * t * t2 * y2 + 3 * t * t2 * t2 * y1;
}
function solveFromX(x1: number, x2: number, x: number) {
  // x  0 ~ 1
  // t 0 ~ 1
  let t = x;
  let solveX = x;
  let dx = 1;

  while (Math.abs(dx) > 1 / 1000) {
    // 예상 t초에 의한 _x값
    solveX = cubic(x1, x2, t);
    dx = solveX - x;
    // 차이가 미세하면 그 값을 t로 지정
    if (Math.abs(dx) < 1 / 1000) {
      return t;
    }
    t -= dx / 2;
  }
  return t;
}
/**
 * @namespace easing
 */
/**
* Cubic Bezier curve.
* @memberof easing
* @func bezier
* @param {number} [x1] - point1's x
* @param {number} [y1] - point1's y
* @param {number} [x2] - point2's x
* @param {number} [y2] - point2's y
* @return {function} the curve function
* @example
import {bezier} from "scenejs";
Scene.bezier(0, 0, 1, 1) // LINEAR
Scene.bezier(0.25, 0.1, 0.25, 1) // EASE
*/
export function bezier(x1: number, y1: number, x2: number, y2: number) {
  /*
		x = f(t)
		calculate inverse function by x
		t = f-1(x)
	*/
  const func: EasingFunction = (x: number) => {
    const t = solveFromX(x1, x2, between(x, 0, 1));

    return cubic(y1, y2, t);
  };

  func.easingName = `cubic-bezier(${x1},${y1},${x2},${y2})`;
  return func;
}
/**
* Specifies a stepping function
* @see {@link https://www.w3schools.com/cssref/css3_pr_animation-timing-function.asp|CSS3 Timing Function}
* @memberof easing
* @func steps
* @param {number} count - point1's x
* @param {"start" | "end"} postion - point1's y
* @return {function} the curve function
* @example
import {steps} from "scenejs";
Scene.steps(1, "start") // Scene.STEP_START
Scene.steps(1, "end") // Scene.STEP_END
*/
export function steps(count: number, position: "start" | "end") {
  const func: EasingFunction = (time: number) => {
    const level = 1 / count;

    if (time >= 1) {
      return 1;
    }
    return (position === "start" ? level : 0) + Math.floor(time / level) * level;
  };

  func.easingName = `steps(${count}, ${position})`;

  return func;
}

/**
* Equivalent to steps(1, start)
* @memberof easing
* @name STEP_START
* @static
* @type {function}
* @example
import {STEP_START} from "scenejs";
Scene.STEP_START // steps(1, start)
*/
export const STEP_START = /*#__PURE__#*/steps(1, "start");
/**
* Equivalent to steps(1, end)
* @memberof easing
* @name STEP_END
* @static
* @type {function}
* @example
import {STEP_END} from "scenejs";
Scene.STEP_END // steps(1, end)
*/
export const STEP_END = /*#__PURE__#*/steps(1, "end");
/**
* Linear Speed (0, 0, 1, 1)
* @memberof easing
* @name LINEAR
* @static
* @type {function}
* @example
import {LINEAR} from "scenejs";
Scene.LINEAR
*/
export const LINEAR = /*#__PURE__#*/bezier(0, 0, 1, 1);
/**
* Ease Speed (0.25, 0.1, 0.25, 1)
* @memberof easing
* @name EASE
* @static
* @type {function}
* @example
import {EASE} from "scenejs";
Scene.EASE
*/
export const EASE = /*#__PURE__#*/bezier(0.25, 0.1, 0.25, 1);
/**
* Ease In Speed (0.42, 0, 1, 1)
* @memberof easing
* @name EASE_IN
* @static
* @type {function}
* @example
import {EASE_IN} from "scenejs";
Scene.EASE_IN
*/
export const EASE_IN = /*#__PURE__#*/bezier(0.42, 0, 1, 1);
/**
* Ease Out Speed (0, 0, 0.58, 1)
* @memberof easing
* @name EASE_OUT
* @static
* @type {function}
* @example
import {EASE_OUT} from "scenejs";
Scene.EASE_OUT
*/
export const EASE_OUT = /*#__PURE__#*/bezier(0, 0, 0.58, 1);
/**
* Ease In Out Speed (0.42, 0, 0.58, 1)
* @memberof easing
* @name EASE_IN_OUT
* @static
* @type {function}
* @example
import {EASE_IN_OUT} from "scenejs";
Scene.EASE_IN_OUT
*/
export const EASE_IN_OUT = /*#__PURE__#*/bezier(0.42, 0, 0.58, 1);
