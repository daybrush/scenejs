import { isObject, isArray } from "@daybrush/utils";
import { CallbackType, EventParamterInterface } from "./types";

/**
* attach and trigger event handlers.
*/
class EventTrigger {
  public events: { [name: string]: CallbackType[] };
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
  public _on(name: string | EventParamterInterface, callback?: CallbackType | CallbackType[], once?: boolean) {
    const events = this.events;

    if (isObject(name)) {
      for (const n in name) {
        this._on(n, name[n], once);
      }
      return;
    }
    if (!(name in events)) {
      events[name] = [];
    }
    if (!callback) {
      return;
    }
    if (isArray(callback)) {
      callback.forEach(func => this._on(name, func, once));
      return;
    }
    const event = events[name];
    event.push(once ? function callback2(...args) {
      callback(...args);
      this.off(name, callback2);
    } : callback);
  }
  /**
	* Attach an event handler function for one or more events to target
	* @param - event's name
	* @param - function to execute when the event is triggered.
	* @return {EventTrigger} An Instance itself.
	* @example
target.on("animate", function() {
	console.log("animate");
});

target.trigger("animate");

  */
  public on(name: string | EventParamterInterface, callback?: CallbackType | CallbackType[]) {
    this._on(name, callback);
    return this;
  }
  /**
	* Dettach an event handler function for one or more events to target
	* @param - event's name
	* @param -  function to execute when the event is triggered.
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
	* @param - event's name
	* @param - event handler's additional parameter
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
  public once(name: string | EventParamterInterface, callback?: CallbackType | CallbackType[]) {
    this._on(name, callback, true);
    return this;
  }
}
export default EventTrigger;
