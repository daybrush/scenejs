function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

import Animator from "./Animator";
import SceneItem from "./SceneItem";
import { ANIMATION } from "./consts";
import { has } from "./utils";

/**
* manage sceneItems and play Scene.
* @class Scene
* @extends Scene.Animator
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
var Scene =
/*#__PURE__*/
function (_Animator) {
  _inheritsLoose(Scene, _Animator);

  function Scene(properties, options) {
    var _this;

    _this = _Animator.call(this) || this;
    _this.items = {};

    _this.load(properties, options);

    return _this;
  }

  var _proto = Scene.prototype;

  _proto.setId = function setId(id) {
    if (id === void 0) {
      id = "scene" + Math.floor(Math.random() * 100000);
    }

    this.state.id = id;
    return this;
  };

  _proto.getId = function getId() {
    return this.state.id;
  };

  _proto.getDuration = function getDuration() {
    var items = this.items;
    var time = 0;

    for (var id in items) {
      var item = items[id];
      time = Math.max(time, item.getTotalDuration() / item.getPlaySpeed());
    }

    return time;
  };

  _proto.setDuration = function setDuration(duration) {
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
    } else {
      var ratio = duration / sceneDuration;

      for (var _id in items) {
        var _item = items[_id];

        _item.setDelay(_item.getDelay() * ratio);

        _item.setDuration(_item.getDuration() * ratio);
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


  _proto.getItem = function getItem(name) {
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


  _proto.newItem = function newItem(name, options) {
    if (options === void 0) {
      options = {};
    }

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


  _proto.setItem = function setItem(name, item) {
    if (item instanceof Animator) {
      item.setId(name);
    }

    this.items[name] = item;
    return this;
  };

  _proto.animate = function animate(time, parentEasing) {
    _Animator.prototype.setTime.call(this, time);

    return this._animate(parentEasing);
  };

  _proto.setTime = function setTime(time, parentEasing) {
    _Animator.prototype.setTime.call(this, time);

    this._animate(parentEasing);

    return this;
  };
  /**
   * executes a provided function once for each scene item.
   * @method Scene#forEach
   * @param {Function} func Function to execute for each element, taking three arguments
   * @param {Scene | Scene.SceneItem} [func.item] The value of the item being processed in the scene.
   * @param {string} [func.name] The name of the item being processed in the scene.
   * @param {object} [func.items] The object that forEach() is being applied to.
   * @return {Scene} An instance itself
   */


  _proto.forEach = function forEach(func) {
    var items = this.items;

    for (var name in items) {
      func(items[name], name, items);
    }

    return this;
  };
  /**
   * Export the CSS of the items to the style.
   * @method Scene#exportCSS
   * @return {Scene} An instance itself
   */


  _proto.exportCSS = function exportCSS(duration, state) {
    if (duration === void 0) {
      duration = this.getDuration();
    }

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

  _proto.append = function append(item) {
    item.setDelay(item.getDelay() + this.getDuration());
    this.setItem(item.getId() || item.setId().getId(), item);
  };
  /**
  * Play using the css animation and keyframes.
  * @method Scene#playCSS
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


  _proto.playCSS = function playCSS(exportCSS, properties) {
    var _this2 = this;

    if (exportCSS === void 0) {
      exportCSS = true;
    }

    if (properties === void 0) {
      properties = {};
    }

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

    var animationiteration = function animationiteration(_ref) {
      var currentTime = _ref.currentTime,
          iterationCount = _ref.iterationCount;
      _this2.state.currentTime = currentTime;

      _this2.setCurrentIterationCount(iterationCount);
    };

    var animationend = function animationend() {
      _this2.end();

      _this2.setState({
        playCSS: false
      });

      animationItem.off("ended", animationend);
      animationItem.off("iteration", animationiteration);
    };

    animationItem.on("ended", animationend);
    animationItem.on("iteration", animationiteration);
    this.setState({
      playCSS: true
    });
    this.setPlayState("running");
    this.trigger("play");
    return this;
  };

  _proto.load = function load(properties, options) {
    if (properties === void 0) {
      properties = {};
    }

    if (options === void 0) {
      options = properties.options;
    }

    var isSelector = options && options.selector;

    for (var name in properties) {
      if (name === "options") {
        continue;
      }

      var object = properties[name];
      var item = void 0;

      if (object instanceof Scene || object instanceof SceneItem) {
        this.setItem(name, object);
        item = object;
      } else {
        item = this.newItem(name);
        item.load(object);
      }

      isSelector && item.setSelector(name);
    }

    this.setOptions(options);
  };

  _proto.setSelector = function setSelector(_) {
    var isSelector = this.options.selector;
    this.forEach(function (item, name) {
      item.setSelector(isSelector ? name : false);
    });
  };

  _proto._animate = function _animate(parentEasing) {
    var iterationTime = this.getIterationTime();
    var items = this.items;
    var easing = this.getEasing() || parentEasing;
    var frames = {};

    for (var id in items) {
      var item = items[id];
      frames[id] = item.animate(iterationTime * item.getPlaySpeed(), easing);
    }
    /**
     * This event is fired when timeupdate and animate.
     * @event Scene#animate
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
}(Animator);

export { Scene as default };