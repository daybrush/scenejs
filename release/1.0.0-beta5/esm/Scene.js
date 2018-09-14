var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
import Animator from "./Animator";
import SceneItem from "./SceneItem";
import { ANIMATION } from "./consts";
import { has } from "./utils";
/**
* manage sceneItems and play Scene.
* @extends Scene.Animator
*/
var Scene = /*#__PURE__*/ (function (_super) {
    __extends(Scene, _super);
    /**
    * @param {Object} [properties] - properties
    * @param {AnimatorOptions} [options] - options
    * @example
    const scene = new Scene({
        item1: {
            0: {
                display: "none",
            },
            1: {
                display: "block",
                opacity: 0,
            },
            2: {
                opacity: 1,
            },
        },
        item2: {
            2: {
                opacity: 1,
            },
        }
    });
     */
    function Scene(properties, options) {
        var _this = _super.call(this) || this;
        _this.items = {};
        _this.load(properties, options);
        return _this;
    }
    Scene.prototype.setId = function (id) {
        if (id === void 0) { id = "scene" + Math.floor(Math.random() * 100000); }
        this.state.id = id;
        return this;
    };
    Scene.prototype.getId = function () {
        return this.state.id;
    };
    Scene.prototype.getDuration = function () {
        var items = this.items;
        var time = 0;
        for (var id in items) {
            var item = items[id];
            time = Math.max(time, item.getTotalDuration() / item.getPlaySpeed());
        }
        return time;
    };
    Scene.prototype.setDuration = function (duration) {
        var items = this.items;
        var sceneDuration = this.getDuration();
        if (duration === 0 || !isFinite(sceneDuration)) {
            return this;
        }
        if (sceneDuration === 0) {
            for (var id in items) {
                var item = items[id];
                item.setDuration(duration);
            }
        }
        else {
            var ratio = duration / sceneDuration;
            for (var id in items) {
                var item = items[id];
                item.setDelay(item.getDelay() * ratio);
                item.setDuration(item.getDuration() * ratio);
            }
        }
        return this;
    };
    /**
    * get item in scene by name
    * @method Scene#getItem
    * @param {string} name - item's name
    * @return {Scene.SceneItem} item
    * @example
const item = scene.getItem("item1")
    */
    Scene.prototype.getItem = function (name) {
        return this.items[name];
    };
    /**
    * create item in scene
    * @method Scene#newItem
    * @param {String} name - name of item to create
    * @param {StateOptions} options - The option object of SceneItem
    * @return {Sceme.SceneItem} Newly created item
    * @example
const item = scene.newItem("item1")
    */
    Scene.prototype.newItem = function (name, options) {
        if (options === void 0) { options = {}; }
        if (has(this.items, name)) {
            return this.items[name];
        }
        var item = new SceneItem();
        this.setItem(name, item);
        item.setOptions(options);
        return item;
    };
    /**
    * add a sceneItem to the scene
    * @param {String} name - name of item to create
    * @param {Scene.SceneItem} item - sceneItem
    * @example
const item = scene.newItem("item1")
    */
    Scene.prototype.setItem = function (name, item) {
        if (item instanceof Animator) {
            item.setId(name);
        }
        this.items[name] = item;
        return this;
    };
    Scene.prototype.animate = function (time, parentEasing) {
        _super.prototype.setTime.call(this, time, true);
        return this._animate(parentEasing);
    };
    Scene.prototype.setTime = function (time, isNumber, parentEasing) {
        _super.prototype.setTime.call(this, time, isNumber);
        this._animate(parentEasing);
        return this;
    };
    /**
     * executes a provided function once for each scene item.
     * @param {Function} func Function to execute for each element, taking three arguments
     * @param {Scene | Scene.SceneItem} [func.item] The value of the item being processed in the scene.
     * @param {string} [func.name] The name of the item being processed in the scene.
     * @param {object} [func.items] The object that forEach() is being applied to.
     * @return {Scene} An instance itself
     */
    Scene.prototype.forEach = function (func) {
        var items = this.items;
        for (var name_1 in items) {
            func(items[name_1], name_1, items);
        }
        return this;
    };
    /**
     * Export the CSS of the items to the style.
     * @return {Scene} An instance itself
     */
    Scene.prototype.exportCSS = function (duration, state) {
        if (duration === void 0) { duration = this.getDuration(); }
        var items = this.items;
        var totalDuration = duration;
        if (!totalDuration || !isFinite(totalDuration)) {
            totalDuration = 0;
        }
        for (var id in items) {
            var item = items[id];
            item.exportCSS(totalDuration, this.state);
        }
        return this;
    };
    Scene.prototype.append = function (item) {
        item.setDelay(item.getDelay() + this.getDuration());
        this.setItem(item.getId() || item.setId().getId(), item);
    };
    /**
    * Play using the css animation and keyframes.
    * @param {boolean} [exportCSS=true] Check if you want to export css.
    * @param {Object} [properties={}] The shorthand properties for six of the animation properties.
    * @param {Object} [properties.duration] The duration property defines how long an animation should take to complete one cycle.
    * @param {Object} [properties.fillMode] The fillMode property specifies a style for the element when the animation is not playing (before it starts, after it ends, or both).
    * @param {Object} [properties.iterationCount] The iterationCount property specifies the number of times an animation should be played.
    * @param {String} [properties.easing] The easing(timing-function) specifies the speed curve of an animation.
    * @param {Object} [properties.delay] The delay property specifies a delay for the start of an animation.
    * @param {Object} [properties.direction] The direction property defines whether an animation should be played forwards, backwards or in alternate cycles.
    * @return {Scene} An instance itself
    * @see {@link https://www.w3schools.com/cssref/css3_pr_animation.asp}
    * @example
scene.playCSS();
scene.playCSS(false, {
    direction: "reverse",
    fillMode: "forwards",
});
    */
    Scene.prototype.playCSS = function (exportCSS, properties) {
        var _this = this;
        if (exportCSS === void 0) { exportCSS = true; }
        if (properties === void 0) { properties = {}; }
        if (!ANIMATION || this.getPlayState() === "running") {
            return this;
        }
        exportCSS && this.exportCSS();
        var items = this.items;
        var animationItem;
        for (var id in items) {
            var item = items[id];
            item.playCSS(false, properties);
            if (item.getState("playCSS")) {
                animationItem = item;
            }
        }
        if (!animationItem) {
            return this;
        }
        var animationiteration = function (_a) {
            var currentTime = _a.currentTime, iterationCount = _a.iterationCount;
            _this.state.currentTime = currentTime;
            _this.setCurrentIterationCount(iterationCount);
        };
        var animationend = function () {
            _this.end();
            _this.setState({ playCSS: false });
            animationItem.off("ended", animationend);
            animationItem.off("iteration", animationiteration);
        };
        animationItem.on("ended", animationend);
        animationItem.on("iteration", animationiteration);
        this.setState({ playCSS: true });
        this.setPlayState("running");
        this.trigger("play");
        return this;
    };
    Scene.prototype.load = function (properties, options) {
        if (properties === void 0) { properties = {}; }
        if (options === void 0) { options = properties.options; }
        var isSelector = options && options.selector;
        for (var name_2 in properties) {
            if (name_2 === "options") {
                continue;
            }
            var object = properties[name_2];
            var item = void 0;
            if (object instanceof Scene || object instanceof SceneItem) {
                this.setItem(name_2, object);
                item = object;
            }
            else {
                item = this.newItem(name_2);
                item.load(object);
            }
            isSelector && item.setSelector(name_2);
        }
        this.setOptions(options);
    };
    Scene.prototype.setSelector = function (_) {
        var isSelector = this.options.selector;
        this.forEach(function (item, name) {
            item.setSelector(isSelector ? name : false);
        });
    };
    Scene.prototype._animate = function (parentEasing) {
        var iterationTime = this.getIterationTime();
        var items = this.items;
        var easing = this.getEasing() || parentEasing;
        var frames = {};
        for (var id in items) {
            var item = items[id];
            frames[id] = item.animate(Math.max(iterationTime * item.getPlaySpeed() - item.getDelay(), 0), easing);
        }
        /**
         * This event is fired when timeupdate and animate.
         * @param {Number} param.currentTime The total time that the animator is running.
         * @param {Number} param.time The iteration time during duration that the animator is running.
         * @param {Frame} param.frames frame of that time.
         */
        this.trigger("animate", {
            currentTime: this.getTime(),
            time: iterationTime,
            frames: frames
        });
        return frames;
    };
    return Scene;
}(Animator));
export default Scene;
//# sourceMappingURL=Scene.js.map