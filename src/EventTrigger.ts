import { isObject } from "./utils";

type CallbackType = (...args: any[]) => any;
interface EventParamterType {
  [name: string]: CallbackType | CallbackType[];
}
/**
* attach and trigger event handlers.
* @memberof Scene
*/
class EventTrigger {
  private events: { [name: string]: CallbackType[] };
  /**
	* @example
const et = new Scene.EventTrigger();
const scene = new Scene();

scene.on("call", e => {
	console.log(e.param);
});
et.on("call", e => {
	console.log(e.param);
});
scene.trigger("call", {param: 1});
et.trigger("call", {param: 1});
	 */
  constructor() {
    this.events = {};
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
  public on(name: string | EventParamterType, callback?: CallbackType | CallbackType[]) {
    const events = this.events;

    if (isObject(name)) {
      for (const i in name) {
        this.on(i, name[i]);
      }
      return this;
    }
    if (!(name in events)) {
      events[name] = [];
    }
    if (!callback) {
      return this;
    }
    if (isObject(callback)) {
      (callback as CallbackType[]).forEach(func => this.on(name, func));
      return this;
    }
    const event = events[name];

    event.push(callback);
    return this;
  }
  /**
	* Dettach an event handler function for one or more events to target
	* @param {String} name - event's name
	* @param {Function} callback -  function to execute when the event is triggered.
	* @return {EventTrigger} An Instance itself.
	* @example
const callback = function() {
	console.log("animate");
};
target.on("animate", callback);

target.off("animate", callback);
target.off("animate");

	*/
  public off(name?: string, callback?: CallbackType) {
    if (!name) {
      this.events = {};
    } else if (!callback) {
      this.events[name] = [];
    } else {
      const callbacks = this.events[name];

      if (!callbacks) {
        return this;
      }
      const index = callbacks.indexOf(callback);

      if (index !== -1) {
        callbacks.splice(index, 1);
      }
    }
    return this;
  }
  /**
	* execute event handler
	* @param {String} name - event's name
	* @param {Function} [...data] - event handler's additional parameter
	* @return {EventTrigger} An Instance itself.
	* @example
target.on("animate", function(a1, a2) {
	console.log("animate", a1, a2);
});

target.trigger("animate", [1, 2]); // log => "animate", 1, 2

	*/
  public trigger(name: string, ...data: any[]) {
    const events = this.events;

    if (!(name in events)) {
      return this;
    }

    const event = events[name];

    if (data.length) {
      const target = data[0];

      target.type = name;
      target.currentTarget = this;
      !target.target && (target.target = this);
    }
    event.forEach(callback => {
      callback.apply(this, data);
    });

    return this;
  }
}
export default EventTrigger;
