import EventTrigger from "./EventTrigger";
import {camelize, isUndefined, defineSetter, defineGetter, defineGetterSetter, defineProperty} from "./Util";


const BRWOSER_START_TIME = Date.now();
window.requestAnimFrame = (function(){
  return  window.requestAnimationFrame       ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame    ||
        function(callback) {
            var currTime = Date.now();
            var timeToCall = Math.max(0, 16 - (currTime - lastTime));
            var id = window.setTimeout(function() { callback(currTime + timeToCall); },
              1000 / 60);
            lastTime = currTime + timeToCall;
            return id;
        };
})();

export default class Animator extends EventTrigger{
    constructor(options) {
        super();
        this._currentTime = 0;
        this._timer = 0;
        

        
        this.options = {};
        this.timingFunctions = [];
        this.iterationCount = 1;
        this.delay = 0;
        this.fillMode = "normal";
        this.direction = "none";
        this.playState = "paused";
        this.playSpeed = 1;
                
        this._currentTime = 0;
        this._currentIterationTime = -1;
        this._prevTime = 0;
        this.setOptions(options);
    }
    setOptions(options) {
        if(!options)
            return this;
            
        for(let option in options) {
            this.options[option] = options[option];
        }
        
        return this;
    }
    set currentTime(value) {
        this.setTime(value);
    }
    set currentIterationTime(value) {
        this.setIterationTime(value);
    }
    get totalDuration() {
        if(this.iteraionCount === "infinite")
            return Infinity;
            
        return this.delay + this.duration * this.iterationCount;
    }
    get activeDuration() {
        return this.duration * this.iterationCount;        
    }
    get ended() {
        if(this.currentTime === 0 && this.playState === "paused")
            return true;
             
        if(this.currentTime < this.totalDuration)
            return false;
        
        return true;
    }
    get paused() {
        return this.playState === "paused";
    }
    play() {
        this.playState = "running";
        requestAnimFrame((time) => {
            this._prevTime = time;
            this.tick(time);
        });
        this.trigger("play");
    }
    pause() {
        this.playState = "paused";
        this.trigger("paused");
    }
    stop() {
        this.playState = "paused";
        this.currentTime = 0;
        this.trigger("ended");
    }
    setTime(time) {
        const {totalDuration, duration} = this;
        
        if(time < 0)
            time = 0;
        else if(time > totalDuration)
            time = totalDuration;
        this._currentTime = time;
        
         
        this.calculateIterationTime();

        this.trigger("timeupdate", [time]);
    }
    calculateIterationTime() {
        const currentTime = this._currentTime;
        const {duration, iterationCount, fillMode, direction} = this;
        const activeTime = Math.max(currentTime - this.delay, 0);
        const currentIterationCount = duration === 0 ? 0 : activeTime / duration;
        const isOdd = currentIterationCount % 2 >= 1;
        
        let currentIterationTime = activeTime % duration;
        let isAlternate = false;
        //direction : forwards, backwards, both, none
        //fillMode : normal, reverse, alternate, alternate-reverse
        
        switch(fillMode) {
            case "reverse":
                currentIterationTime = duration - currentIterationTime;
                break;
            case "alternate":
                if(isOdd)
                    currentIterationTime = duration - currentIterationTime;
                    
                isAlternate = true;
                break;
            case "alternate-reverse":
                if(!isOdd)
                    currentIterationTime = duration - currentIterationTime;
                    
                isAlternate = true;
                break;
            default:
        }
        
        switch(direction) {
            case "both":
            case "forwards":
                if(isAlternate || currentIterationCount !== iterationCount || iterationCount % 1 !== 0)
                    break;


                currentIterationTime = duration - currentIterationTime;
                break;
            default:
                if(currentIterationCount !== iterationCount || iterationCount % 1 !== 0)
                    break;
                    
                currentIterationTime = 0;
                break;            
        }
        
        
        this.currentIterationTime = currentIterationTime;
    }
    setIterationTime(time) {            
        this._currentIterationTime = time;
        this.trigger("iterationtimeupdate", [time]);
        
        return this;
    }
    tick(now) {
        let prevTime = this._prevTime;
        this._prevTime = now;
        
        let currentTime = this.currentTime + Math.min(1000, now - prevTime) / 1000 * this.playSpeed;
        
        this.setTime(currentTime);
        
        if(this.ended)
            this.stop();

        if(this.playState === "paused")
            return;
            
        requestAnimFrame((time) => {
            this.tick(time);
        });
    }
}

defineGetter({target:Animator.prototype, name:"currentIterationTime",  prefix:"_"});
defineGetter({target:Animator.prototype, name:"currentTime",  prefix:"_"});
defineGetterSetter({target:Animator.prototype, name:"playSpeed", parent:"options"});
defineGetterSetter({target:Animator.prototype, name:"playState", parent:"options"});
defineGetterSetter({target:Animator.prototype, name:"iterationCount", parent:"options"});
defineGetterSetter({target:Animator.prototype, name:"duration", parent:"options"});
defineGetterSetter({target:Animator.prototype, name:"fillMode", parent:"options"});
defineGetterSetter({target:Animator.prototype, name:"direction", parent:"options"});
defineGetterSetter({target:Animator.prototype, name:"delay", parent:"options"});