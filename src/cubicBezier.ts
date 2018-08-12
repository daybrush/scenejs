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
export default function(x1: number, y1: number, x2: number, y2: number) {
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
