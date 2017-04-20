import Animator from "./Animator";
import FrameTimeline from "./FrameTimeline";
import SceneItem from "./SceneItem";
import Frame from "./Frame";
import Timeline from "./Timeline";
import * as Util from "./Util";
import * as Dot from "./Util/Dot";
import PropertyObject from "./PropertyObject";
import CSSRole from "./CSSRole";



export default class Scene extends Animator {
    constructor(object) {
        super();
        this.items = {};
        
        this.load(object);
    }
    get duration() {
    	const items = this.items;
    	let item, time = 0;
    	for(let id in items) {
    		item = items[id];
    		time = Math.max(time, item.totalDuration);
    	}
    	return time;
    }
    getItem(name) {
        return this.items[name];
    }
    newItem(name) {
        if(this.items.hasOwnProperty(name))
            return this.items[name];
        const item = this.items[name] = new SceneItem();
        return item;
    }
    setItem(name, item) {
        this.items[name] = item;
        return this;
    }
    setIterationTime(time) {
        super.setIterationTime(time);
    	const items = this.items;
    	let item;
    	for(let id in items) {
        	item = items[id];
        	item.currentTime = time;
        }        
        return this;
    }
    load(object) {
        if(!Util.isObject(object))   
            return this;
        
        let item, isOptions;
        for(let name in object) {
            if(name === "options") {
                isOptions = true;
                continue;
            }
                
            item = this.newItem(name);
            item.load(object[name]);
        }
        if(isOptions)
            this.setOptions(object.options);
             
        return this;
    }
    static addRole(role) {
        SceneItem.addRole(role);
    }
}

export {Util, Frame, SceneItem, Dot, PropertyObject, Timeline, Animator};

