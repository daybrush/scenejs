import { isObject, isArray, isInProperties, toFixed } from "./utils";
import PropertyObject from "./PropertyObject";

function _getNames(names, stack) {
  var arr = [];

  for (var name in names) {
    stack.push(name);

    if (isObject(names[name])) {
      arr = arr.concat(_getNames(names[name], stack));
    } else {
      arr.push(stack.slice());
    }

    stack.pop();
  }

  return arr;
}

function _updateFrame(names, properties) {
  for (var name in properties) {
    var value = properties[name];

    if (!isObject(value) || isArray(value) || value instanceof PropertyObject) {
      names[name] = true;
      continue;
    }

    if (!isObject(names[name])) {
      names[name] = {};
    }

    _updateFrame(names[name], properties[name]);
  }
}
/**
* a list of objects in chronological order.
* @memberof Scene
*/


var Keyframes =
/*#__PURE__*/
function () {
  /**
   */
  function Keyframes() {
    this.times = [];
    this.items = {};
    this.names = {};
  }
  /**
  * A list of names
  * @return {string[][]} names
  * @example
  keyframes.getNames(); // [["a"], ["transform", "translate"], ["transform", "scale"]]
  */


  var _proto = Keyframes.prototype;

  _proto.getNames = function getNames() {
    var names = this.names;
    return _getNames(names, []);
  };
  /**
  * Check if keyframes has propery's name
  * @param {...string[]} name - property's time
  * @return {Boolean} true: if has property, false: not
  * @example
  keyframes.hasName("transform", "translate"); // true or not
  */


  _proto.hasName = function hasName() {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return isInProperties(this.names, args, true);
  };
  /**
   * update property names used in frames.
   * @return {Scene.Keyframes} An instance itself
   */


  _proto.update = function update() {
    var items = this.items;

    for (var time in items) {
      this.updateFrame(items[time]);
    }

    return this;
  };
  /**
   * executes a provided function once for each scene item.
   * @param {Function} callback Function to execute for each element, taking three arguments
   * @param {Scene.Frame} [callback.item] The value of the item being processed in the keyframes.
   * @param {string} [callback.time] The time of the item being processed in the keyframes.
   * @param {object} [callback.items] The object that forEach() is being applied to.
   * @return {Scene.Keyframes} An instance itself
   */


  _proto.forEach = function forEach(callback) {
    var times = this.times;
    var items = this.items;
    times.forEach(function (time) {
      callback(items[time], time, items);
    });
  };
  /**
  * update property names used in frame.
  * @param {Scene.Frame} [frame] - frame of that time.
  * @return {Scene.Keyframes} An instance itself
  * @example
  keyframes.updateFrame(frame);
  */


  _proto.updateFrame = function updateFrame(frame) {
    if (!frame) {
      return this;
    }

    var properties = frame.properties;
    var names = this.names;

    _updateFrame(names, properties);

    return this;
  };
  /**
   * Get how long an animation should take to complete one cycle.
   * @return {number} duration
   */


  _proto.getDuration = function getDuration() {
    var times = this.times;
    return times.length === 0 ? 0 : times[times.length - 1];
  };
  /**
   * Set how long an animation should take to complete one cycle.
   * @param {number} duration - duration
   * @return {Scene.Keyframes} An instance itself.
   */


  _proto.setDuration = function setDuration(duration, originalDuration) {
    if (originalDuration === void 0) {
      originalDuration = this.getDuration();
    }

    var ratio = duration / originalDuration;
    var times = this.times,
        items = this.items;
    var obj = {};
    this.times = times.map(function (time) {
      var time2 = time * ratio;
      obj[time2] = items[time];
      return time2;
    });
    this.items = obj;
  };
  /**
   * Set how much time you want to push ahead.
   * @param {number} time - time
   * @return {Scene.Keyframes} An instance itself.
   */


  _proto.unshift = function unshift(time) {
    var times = this.times,
        items = this.items;
    var obj = {};
    this.times = times.map(function (t) {
      var time2 = toFixed(time + t);
      obj[time2] = items[t];
      return time2;
    });
    this.items = obj;
    return this;
  };
  /**
  * get size of list
  * @return {Number} length of list
  */


  _proto.size = function size() {
    return this.times.length;
  };
  /**
  * add object in list
  * @param {Number} time - frame's time
  * @param {Object} object - target
  * @return {Scene.Keyframes} An instance itself
  */


  _proto.add = function add(time, object) {
    this.items[time] = object;
    this.addTime(time);
    return this;
  };
  /**
  * Check if keyframes has object at that time.
  * @param {Number} time - object's time
  * @return {Boolean} true: if has time, false: not
  */


  _proto.has = function has(time) {
    return time in this.items;
  };
  /**
  * get object at that time.
  * @param {Number} time - object's time
  * @return {Object} object at that time
  */


  _proto.get = function get(time) {
    return this.items[time];
  };
  /**
  * remove object at that time.
  * @param {Number} time - object's time
  * @return {Keyframes} An instance itself
  */


  _proto.remove = function remove(time) {
    var items = this.items;
    delete items[time];
    this.removeTime(time);
    return this;
  };

  _proto.addTime = function addTime(time) {
    var times = this.times;
    var length = times.length;
    var pushIndex = length;

    for (var i = 0; i < length; ++i) {
      // if time is smaller than times[i], add time to index
      if (time === times[i]) {
        return this;
      } else if (time < times[i]) {
        pushIndex = i;
        break;
      }
    }

    this.times.splice(pushIndex, 0, time);
    return this;
  };

  _proto.removeTime = function removeTime(time) {
    var index = this.times.indexOf(time);

    if (index > -1) {
      this.times.splice(index, 1);
    }

    return this;
  };

  return Keyframes;
}();

export default Keyframes;