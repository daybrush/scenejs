export const cubicBezier = function(curveArray) {
	const [x1, y1, x2, y2] = curveArray;

	function cubic(_x1, _x2, t) {
		const t2 = 1 - t;

		// Bezier Curve Formula
		return t * t * t + 3 * t * t * t2 * _x2 + 3 * t * t2 * t2 * _x1;
	}
	/*
		x = f(t)
		calculate inverse function by x
		t = f-1(x)
	*/
	function solveFromX(_x) {
		// x  0 ~ 1
		// t 0 ~ 1
		let t = _x;
		let x = _x;
		let dx = 1;

		while (Math.abs(dx) > 1 / 1000) {
			// 예상 t초에 의한 _x값
			x = cubic(x1, x2, t);
			dx = x - _x;
			// 차이가 미세하면 그 값을 t로 지정
			if (Math.abs(dx) < 1 / 1000) {
				return t;
			}
			t -= dx / 2;
		}
		return t;
	}
	return function(_x) {
		let x = _x;

		if (x >= 1) {
			x = 1;
		} else if (x <= 0) {
			x = 0;
		}
		x = solveFromX(x);
		return cubic(y1, y2, x);
	};
};

/**
* 8애니메이션이 해당 시간대에 어떤 TimingFunction을 사용할건지 지정한다.
*/
class TimingFunction {
	constructor(_curveArray) {
		this._curve = cubicBezier(_curveArray[0], _curveArray[1], _curveArray[2], _curveArray[3]);
	}
	curve(ratio) {
		return this._curve(ratio);
	}
}

export default TimingFunction;
