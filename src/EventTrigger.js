import {isObject, has} from "./utils";
/**
* attach and trigger event handlers.
*/
class EventTrigger {
	constructor() {
		this._events = {};
	}
	/**
	* Attach an event handler function for one or more events to target
	* @param {String} name - event's name
	* @param {Function} callback -  function to execute when the event is triggered.
	* @return {EventTrigger} An Instance itself.
	* @example
target.on("animate", function() {
	console.log("animate");
});

target.trigger("animate");

	*/
	on(name, callback) {
		const events = this._events;
		let i;
		let j;

		if (isObject(name)) {
			for (i in name) {
				this.on(i, name[i]);
			}
			return this;
		}
		if (!has(events, name)) {
			events[name] = [];
		}

		if (isObject(callback)) {
			for (j in callback) {
				this.on(name, callback[j]);
			}
			return this;
		}
		const event = events[name];

		event.push(callback);

		return this;
	}
	/**
	* execute event handler
	* @param {String} name - event's name
	* @param {Function} [data] - event handler's additional parameter
	* @return {EventTrigger} An Instance itself.
	* @example
target.on("animate", function(a1, a2) {
	console.log("animate", a1, a2);
});

target.trigger("animate", [1, 2]); // log => "animate", 1, 2

	*/
	trigger(name, ...data) {
		const events = this._events;

		if (!has(events, name)) {
			return this;
		}

		const event = events[name];

		event.forEach(callback => {
			callback.apply(this, data);
		});

		return this;
	}
}
EventTrigger.defaultEvents = {};
export default EventTrigger;
