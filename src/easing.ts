export interface EasingFunctionInterface extends Function {
	easingName?: string;
}

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
 * @namespace Scene.easing
 */
/**
* Cubic Bezier curve.
* @memberof Scene.easing
* @func Scene.easing.bezier
* @param {number} [x1] - point1's x
* @param {number} [y1] - point1's y
* @param {number} [x2] - point2's x
* @param {number} [y2] - point2's y
* @return {function} the curve function
* @example
Scene.easing.bezier(0, 0, 1, 1) // LINEAR
Scene.easing.bezier(0.25, 0.1, 0.25, 1) // EASE
*/
export function bezier(x1: number, y1: number, x2: number, y2: number) {
	/*
		x = f(t)
		calculate inverse function by x
		t = f-1(x)
	*/
	const func: EasingFunctionInterface = (x: number) => {
		const t = solveFromX(x1, x2, Math.max(Math.min(1, x), 0));

		return cubic(y1, y2, t);
	};

	func.easingName = `cubic-bezier(${x1}, ${y1}, ${x2}, ${y2})`;
	return func;
}
/**
* Linear Speed (0, 0, 1, 1)
* @name Scene.easing.LINEAR
* @memberof Scene.easing
* @static
* @type {function}
* @example
Scene.easing.LINEAR
*/
export const LINEAR = bezier(0, 0, 1, 1);
/**
* Ease Speed (0.25, 0.1, 0.25, 1)
* @name Scene.easing.EASE
* @memberof Scene.easing
* @static
* @type {function}
* @example
Scene.easing.EASE
*/
export const EASE = bezier(0.25, 0.1, 0.25, 1);
export const EASE_IN = bezier(0.42, 0, 1, 1);
export const EASE_OUT = bezier(0, 0, 0.58, 1);
export const EASE_IN_OUT = bezier(0.42, 0, 0.58, 1);
