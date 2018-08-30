/**
* attach and trigger event handlers.
* @memberof Scene
*/
var EventTrigger =
/*#__PURE__*/
function () {
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
  function EventTrigger() {
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


  var _proto = EventTrigger.prototype;

  _proto.on = function on(name, callback) {
    var _this = this;

    var events = this.events;

    if (typeof name === "object") {
      for (var i in name) {
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

    if (typeof callback === "object") {
      callback.forEach(function (func) {
        return _this.on(name, func);
      });
      return this;
    }

    var event = events[name];
    event.push(callback);
    return this;
  };
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


  _proto.off = function off(name, callback) {
    if (!name) {
      this.events = {};
    } else if (!callback) {
      this.events[name] = [];
    } else {
      var callbacks = this.events[name];

      if (!callbacks) {
        return this;
      }

      var index = callbacks.indexOf(callback);

      if (index !== -1) {
        callbacks.splice(index, 1);
      }
    }

    return this;
  };
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


  _proto.trigger = function trigger(name) {
    var _this2 = this;

    for (var _len = arguments.length, data = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      data[_key - 1] = arguments[_key];
    }

    var events = this.events;

    if (!(name in events)) {
      return this;
    }

    var event = events[name];

    if (data.length) {
      var target = data[0];
      target.type = name;
      target.currentTarget = this;
      !target.target && (target.target = this);
    }

    event.forEach(function (callback) {
      callback.apply(_this2, data);
    });
    return this;
  };

  return EventTrigger;
}();

export default EventTrigger;