import Animator from "./Animator";
import Frame from "./Frame";
import {camelize, isUndefined, isObject, defineGetter, defineSetter, defineGetterSetter, defineProperty} from "./Util";
import FrameTimeline from "./FrameTimeline";
import {dot} from "./Util/Dot";
// import EventTrigger from "./EventTrigger";
import TimingFunction from "./TimingFunction";
import {SCENE_ROLES} from "./Constant.js";

export default class SceneItem extends Animator {
    static addRole(role) {
        Frame.addRole(role);
        SceneItem.prototype[camelize("set " + role)] = function(time, properties, value) {
            this.set(time, role, properties, value);
            return this;
        };
        
        SceneItem.prototype[camelize("get " + role)] = function(time, property) {
            const frame = this.getFrame(time);
            if(!frame)
                return;
            
            return frame.get(role, property);
        };
    }
    constructor(object) {
        super();
        this.timeline = new FrameTimeline();
        
        this.load(object);
    }
    get duration() {
        return this.timeline.last;
    }
    set(time, role, properties, value) {
        let frame = this.getFrame(time);
        if(!frame)
            frame = this.newFrame(time);
        
        frame.set(role, properties, value);
        
        this.updateFrame(time, frame);  
        
        return this;
    }
    setIterationTime(time) {
        super.setIterationTime(time);
        this.trigger("animate", [time, this.getNowFrame(time), this.currentTime]);
        return this;
    }
    update() {
        this.timeline.update();
    }
    updateFrame(time, frame = this.getFrame(time)) {
        this.timeline.updateFrame(time, frame);
    }
    newFrame(time) {
        const timeline = this.timeline;
        if(timeline.has(time))
            return this.getFrame(time);

        this.setFrame(time, new Frame());
        return this.getFrame(time);
    }
    setFrame(time, frame) {
        this.timeline.add(time, frame);
        return this;
    }
    getFrame(time) {
        return this.timeline.get(time);
    }
    removeFrame(time) {
        const timeline = this.timeline;
        timeline.remove(time);
    	delete this.frames[time];
    	
    	return this;
    }
    copyFrame(fromTime, toTime) {
        if(isObject(fromTime)) {
            for(let time in fromTime) {
                this.copyFrame(time, fromTime[time]);
            }
            return this;
        }
    	var frame = this.getFrame(fromTime);
    	if(!frame)
    		return this;
    		
    	var copyFrame = frame.copy();
    	this.setFrame(toTime, copyFrame);	
    	return this;
    }

    getNowValue(role, property, time, left = 0, right = this.timeline.length) {
        const timeline = this.timeline, times = timeline.times, length = times.length;

        let prevFrame, nextFrame, i;
        let prevTime = times[left], nextTime = times[right];

        if(time < prevTime)
            return;

        for(i = left; i >= 0; --i) {
            prevTime = times[i];
            prevFrame = timeline.get(prevTime);
            if(prevFrame.has(role, property))
                break;
        }
        for(i = right; i < length; ++i) {
            nextTime = times[i];
            nextFrame = timeline.get(nextTime);
            if(nextFrame.has(role, property))
                break;
        }

        const prevValue = prevFrame.get(role, property);
        if(isUndefined(prevValue))
            return;

        if(!nextFrame)
            return prevValue;

        const nextValue = nextFrame.get(role, property);

        if(isUndefined(nextValue))
            return prevValue;


        if(prevTime < 0)
            prevTime = 0;

        // 전값과 나중값을 시간에 의해 내적을 한다.

        let value = dot(prevValue, nextValue, time - prevTime, nextTime - time);

        return value;
    }
    getLeftRightIndex(time) {
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
        return {left, right};
    }
    getNowFrame(time) {
        const indices = this.getLeftRightIndex(time);
        if(!indices)
            return;

        const {left, right} = indices;
        const frame = new Frame();

        const names = this.timeline.names;
        let role, propertyNames, nameLength, property, value;
        let i, j;

        for(let role in SCENE_ROLES) {
            propertyNames = names[role];
            for(property in propertyNames) {
                
                value = this.getNowValue(role, property, time, left, right);

                if(isUndefined(value))
                    continue;

                frame.set(role, property, value);
            }
        }
        return frame;
    }
    load(object) {
        if(!isObject(object))
            return this;
            
            
        let isOptions = false;
        for(let time in object) {
            if(time === "options") {
                isOptions = true;
                continue;
            }

            this.set(time, object[time]);
        }
        
        if(isOptions)
            this.setOptions(object.options);
             
        return this;
    }
}


SceneItem.addRole("property");