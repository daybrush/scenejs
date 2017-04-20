const cubicBezier = function(x1, y1, x2, y2) {
	function cubic(_x1, _x2, t) {
		var t2 = 1-t;
		/*
			Bezier Curve Formula
		*/
		return t* t* t + 3 * t * t * t2 * _x2 + 3 * t * t2 * t2 * _x1;
	}
	/*
		x = f(t)
        calculate inverse function by x
        t = f-1(x)
	*/
	function solveFromX(x) {
		// x  0 ~ 1
		// t 0 ~ 1
		var t = x, _x= x, dx = 1;
		while(Math.abs(dx) > 1 / 1000) {
			 /*예상 t초에 의한 _x값*/
			_x = cubic(x1, x2, t);
			dx = _x - x;
			// 차이가 미세하면 그 값을 t로 지정
			if(Math.abs(dx) < 1 / 1000)
				return t;
				
			t -= dx / 2; 
		}
		return t;
	}
	return function(x) {
		if(x >= 1)
			x = 1;
		else if(x <= 0)
			x = 0;
		var _x = solveFromX(x);
		return cubic(y1, y2, _x);
	}
};

/*
	애니메이션이 해당 시간대에 어떤 TimingFunction을 사용할건지 지정한다.
*/
/*@export default */class TimingFunction {
    constructor() {
 	this.startTime = _startTime;
	this.endTime = _endTime;
	this._curve = cubicBezier(_curveArray[0],_curveArray[1],_curveArray[2],_curveArray[3]);       
    }
    curve(time) {
    	var startTime = this.startTime, endTime = this.endTime;
    	var dist = endTime - startTime;
    	/*
    		해당 시간대가 아닌 경우 time을 반환
    	*/
    	if(dist <= 0 || time < startTime || time > endTime)
    		return time;
    	
    	var duration = time - startTime;
    	
    	var _time = duration / dist;
    	return startTime + dist * this._curve(_time);
    }
}