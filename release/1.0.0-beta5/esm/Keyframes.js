import { isObject, isArray, isInProperties, toFixed } from "./utils";
import PropertyObject from "./PropertyObject";
function getNames(names, stack) {
    var arr = [];
    for (var name_1 in names) {
        stack.push(name_1);
        if (isObject(names[name_1])) {
            arr = arr.concat(getNames(names[name_1], stack));
        }
        else {
            arr.push(stack.slice());
        }
        stack.pop();
    }
    return arr;
}
function updateFrame(names, properties) {
    for (var name_2 in properties) {
        var value = properties[name_2];
        if (!isObject(value) || isArray(value) || value instanceof PropertyObject) {
            names[name_2] = true;
            continue;
        }
        if (!isObject(names[name_2])) {
            names[name_2] = {};
        }
        updateFrame(names[name_2], properties[name_2]);
    }
}
/**
* a list of objects in chronological order.
* @memberof Scene
*/
var Keyframes = /*#__PURE__*/ (function () {
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
    Keyframes.prototype.getNames = function () {
        var names = this.names;
        return getNames(names, []);
    };
    /**
    * Check if keyframes has propery's name
    * @param {...string[]} name - property's time
    * @return {Boolean} true: if has property, false: not
    * @example
keyframes.hasName("transform", "translate"); // true or not
    */
    Keyframes.prototype.hasName = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return isInProperties(this.names, args, true);
    };
    /**
     * update property names used in frames.
     * @return {Scene.Keyframes} An instance itself
     */
    Keyframes.prototype.update = function () {
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
    Keyframes.prototype.forEach = function (callback) {
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
    Keyframes.prototype.updateFrame = function (frame) {
        if (!frame) {
            return this;
        }
        var properties = frame.properties;
        var names = this.names;
        updateFrame(names, properties);
        return this;
    };
    /**
     * Get how long an animation should take to complete one cycle.
     * @return {number} duration
     */
    Keyframes.prototype.getDuration = function () {
        var times = this.times;
        return times.length === 0 ? 0 : times[times.length - 1];
    };
    /**
     * Set how long an animation should take to complete one cycle.
     * @param {number} duration - duration
     * @return {Scene.Keyframes} An instance itself.
     */
    Keyframes.prototype.setDuration = function (duration, originalDuration) {
        if (originalDuration === void 0) { originalDuration = this.getDuration(); }
        var ratio = duration / originalDuration;
        var _a = this, times = _a.times, items = _a.items;
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
    Keyframes.prototype.unshift = function (time) {
        var _a = this, times = _a.times, items = _a.items;
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
    Keyframes.prototype.size = function () {
        return this.times.length;
    };
    /**
    * add object in list
    * @param {Number} time - frame's time
    * @param {Object} object - target
    * @return {Scene.Keyframes} An instance itself
    */
    Keyframes.prototype.add = function (time, object) {
        this.items[time] = object;
        this.addTime(time);
        return this;
    };
    /**
    * Check if keyframes has object at that time.
    * @param {Number} time - object's time
    * @return {Boolean} true: if has time, false: not
    */
    Keyframes.prototype.has = function (time) {
        return time in this.items;
    };
    /**
    * get object at that time.
    * @param {Number} time - object's time
    * @return {Object} object at that time
    */
    Keyframes.prototype.get = function (time) {
        return this.items[time];
    };
    /**
    * remove object at that time.
    * @param {Number} time - object's time
    * @return {Keyframes} An instance itself
    */
    Keyframes.prototype.remove = function (time) {
        var items = this.items;
        delete items[time];
        this.removeTime(time);
        return this;
    };
    Keyframes.prototype.addTime = function (time) {
        var times = this.times;
        var length = times.length;
        var pushIndex = length;
        for (var i = 0; i < length; ++i) {
            // if time is smaller than times[i], add time to index
            if (time === times[i]) {
                return this;
            }
            else if (time < times[i]) {
                pushIndex = i;
                break;
            }
        }
        this.times.splice(pushIndex, 0, time);
        return this;
    };
    Keyframes.prototype.removeTime = function (time) {
        var index = this.times.indexOf(time);
        if (index > -1) {
            this.times.splice(index, 1);
        }
        return this;
    };
    return Keyframes;
}());
export default Keyframes;
//# sourceMappingURL=Keyframes.js.map