/*@import {isObject} from "./Util"*/

/*@export default*/ class EventTrigger {
	constructor() {
		this._events = {};
		
	}
	static on(name, callback) {
		const events = EventTrigger.defaultEvents;
		if(!events.hasOwnProperty(name))
		    events[name] = [];
		    
        const event = events[name];
				
		event.push(callback);
	}
	on(name, callback) {
		const events = this._events;
        if(isObject(name)) {
            for(let i in name) {
                this.on(i, name[i]);
            }
            return this;
        }
		if(!events.hasOwnProperty(name))
		    events[name] = [];
        
        if(isObject(callback)) {
            for(let j in callback) {
                this.on(name, callback[j]);
            }
            return this;
        }
        const event = events[name];
				
		event.push(callback);
		
		return this;
	}
	trigger(name, data) {
    	const events = this._events;
		if(!events.hasOwnProperty(name))
			return;
		
		const event = events[name];
		
		event.forEach(callback => {
			callback.apply(this, data);
		});
		return this;
	}
}
EventTrigger.defaultEvents = {};