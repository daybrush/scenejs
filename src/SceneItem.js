class SceneItem {
    constructor() {
        this.options = {};
        this._playState = "paused";//paused|running|initial|inherit
        this.timeline = new Timeline();
        this.names = {};
    }

    get timingFunction() {
    }
    set timgingFunction(value) {
    }
    get duration() {
    }
    get playState() {
    }
    newFrame(time) {

    }
    setFrame(time, frame) {
        this.timeline.set(time, frame);
    }
    getFrame(time) {
        return this.timeline.get(time);
    }
    getNowValue(time, role, property, left, right) {
        const timeline = this.timeline, times = timeline.times, length = times.length;

        let prevFrame, nextFrame, i;
        let prevTime = times[left], nextTime = times[right];

        if(time < prevTime)
            return;

        for(i = left; i >= 0; --i) {
            prevFrame = this.frames[times[i]];
            prevTime = times[i];
            if(prevFrame[role].has(property))
                break;
        }
        for(i = right; i < length; ++i) {
            nextFrame = this.frames[times[i]];
            nextTime = times[i];
            if(nextFrame[role].has(property))
                break;
        }

        const prevValue = prevFrame[name].get(property);
        if(typeof prevValue === "undefined")
            return;

        if(!nextFrame)
            return prevValue;

        const nextValue = nextFrame[name].get(property);

        if(typeof nextValue === "undefined")
            return prevValue;

        var value;


        if(prevTime < 0)
            prevTime = 0;

        // 전값과 나중값을 시간에 의해 내적을 한다.

        value = _u.dot(prevValue, nextValue, time - prevTime, nextFrame.time - time);

        return value;
    }
    getNowFrame(time) {
        const timeline = this.timeline, {times, last, length} = timeline;

        if(length === 0)
            return;

        // index : length = time : last
        let index = parseInt(last > 0 ? time * length / last : 0) , right = length - 1, left = 0;

        if(index < 0)
            index = 0;
        else if(index > right)
            index = right;

        if(time < times[right]) {
            //Binary Search
            while (left < right) {
                if( (left === index  || right === index ) && (left +1 === right)) {
                    break;
                } else if (times[index] > time) {
                    right = index;
                } else if (times[index] < time) {
                    left = index;
                } else {
                    left = right = index;
                    break;
                }
                index = parseInt((left + right) / 2);
            }
        } else {
            left = index = right;
        }


	const frame = new Frame();

	const names = this.names,length = names.length;
    let role, propertyNames, nameLength, property, value;
    let i,j;
	for(i = 0; i < length; ++i) {
        role = _roles[i];

		propertyNames = names[roleName];
		nameLength = propertyNames.length;
		for(j = 0; j < nameLength; ++j) {
			property = propertyNames[j];
			value = this.getNowValue(time, roleName, property, left, right);

            if(typeof value === "undfined")
                continue;

			frame.set(roleName, property, value);
		}
	}

	return frame;
    }
}



//timingFunciton
//duration
//playState  paused|running|initial|inherit

//iterationCount //infinite | number
Util.defineGetterSetter(SceneItem.prototype, "inifiniteCount", "options");
//none|forwards|backwards|both|initial
Util.defineGetterSetter(SceneItem.prototype, "fillMode", "options");
//normal|reverse|alternate|alternate-reverse|initial
Util.defineGetterSetter(SceneItem.prototype, "direction", "options");
//time
Util.defineGetterSetter(SceneItem.prototype, "delay", "options");
