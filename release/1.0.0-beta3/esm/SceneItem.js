function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

import Animator, { isDirectionReverse } from "./Animator";
import Frame from "./Frame";
import { isUndefined, isObject, isString, isArray, decamelize, splitUnit, toFixed, isFixed } from "./utils";
import Keyframes from "./Keyframes";
import { dotValue } from "./utils/dot";
import { KEYFRAMES, ANIMATION, START_ANIMATION, PREFIX, THRESHOLD, timingFunction } from "./consts";
import { addClass, removeClass, hasClass, fromCSS } from "./utils/css";

function toId(text) {
  return text.match(/[0-9a-zA-Z]+/g).join("");
}

function makeId(selector) {
  for (;;) {
    var id = "" + Math.floor(Math.random() * 100000);

    if (!selector) {
      return id;
    }

    var checkElement = document.querySelector("[data-scene-id=\"" + id + "\"]");

    if (!checkElement) {
      return id;
    }
  }
}

function makeAnimationProperties(properties) {
  var cssArray = [];

  for (var name in properties) {
    cssArray.push(ANIMATION + "-" + decamelize(name) + " : " + properties[name] + ";");
  }

  return cssArray.join("");
}

/**
* manage Frame Keyframes and play keyframes.
* @memberof Scene
* @extends Scene.Animator
* @example
const item = new Scene.SceneItem({
	0: {
		display: "none",
	},
	1: {
		display: "block",
		opacity: 0,
	},
	2: {
		opacity: 1,
	}
});
*/
var SceneItem =
/*#__PURE__*/
function (_Animator) {
  _inheritsLoose(SceneItem, _Animator);

  /**
  * @param {Object} [properties] - properties
  * @param {AnimatorOptions} [options] - options
  * @example
  const item = new Scene.SceneItem({
  	0: {
  		display: "none",
  	},
  	1: {
  		display: "block",
  		opacity: 0,
  	},
  	2: {
  		opacity: 1,
  	}
  });
   */
  function SceneItem(properties, options) {
    var _this;

    _this = _Animator.call(this) || this;
    _this.keyframes = new Keyframes();
    _this.elements = [];

    _this.load(properties, options);

    return _this;
  }

  var _proto = SceneItem.prototype;

  _proto.getDuration = function getDuration() {
    return Math.max(this.state.duration, this.keyframes.getDuration());
  };

  _proto.setDuration = function setDuration(duration) {
    if (duration === 0) {
      return this;
    }

    var originalDuration = this.getDuration();

    if (originalDuration > 0) {
      this.keyframes.setDuration(duration, originalDuration);
    }

    _Animator.prototype.setDuration.call(this, toFixed(duration));

    return this;
  };
  /**
  * set the unique indicator of the item.
  * @method Scene.SceneItem#setId
  * @param {String} [id] - the indicator of the item.
  * @return {Scene.SceneItem} An instance itself
  * @example
  const item = new SceneItem();
  item.setId("item");
  console.log(item.getId()); // item
  */


  _proto.setId = function setId(id) {
    var elements = this.elements;
    var length = elements.length;
    this.setState({
      id: id || makeId(!!length)
    });
    var sceneId = toId(this.getId());
    this.options.selector || (this.options.selector = "[data-scene-id=\"" + sceneId + "\"]");

    if (!length) {
      return this;
    }

    for (var i = 0; i < length; ++i) {
      elements[i].setAttribute("data-scene-id", sceneId);
    }

    return this;
  };
  /**
  * Specifies the unique indicator of the item.
  * @method Scene.SceneItem#getId
  * @return {String} the indicator of the item.
  * @example
  const item = scene.newItem("item");
  console.log(item.getId()); // item
  */


  _proto.getId = function getId() {
    return this.state.id;
  };
  /**
  * Set properties to the sceneItem at that time
  * @method Scene.SceneItem#set
  * @param {Number} time - time
  * @param {...String|Object} [properties] - property names or values
  * @return {Scene.SceneItem} An instance itself
  * @example
  item.set(0, "a", "b") // item.getFrame(0).set("a", "b")
  console.log(item.get(0, "a")); // "b"
  */


  _proto.set = function set(time) {
    var _this2 = this;

    for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }

    if (isObject(time)) {
      this.load(time);
      return this;
    } else if (args[0]) {
      if (args[0] instanceof SceneItem) {
        var item = args[0];
        var delay = item.getDelay();
        var realTime = this._getTime(time) + delay;

        var _item$getAllTimes = item.getAllTimes(!!delay || !this.hasFrame(time)),
            keys = _item$getAllTimes.keys,
            values = _item$getAllTimes.values,
            frames = _item$getAllTimes.frames;

        var easing = this.getEasingName() !== item.getEasingName() ? item.getEasing() : 0;
        keys.forEach(function (t) {
          _this2.set(realTime + t, frames[values[t]]);
        });

        if (easing) {
          this.set(realTime + keys[0], "easing", easing);
          this.set(realTime + keys[keys.length - 1], "easing", "initial");
        }

        return this;
      } else if (args.length === 1 && isArray(args[0])) {
        args[0].forEach(function (item) {
          _this2.set(time, item);
        });
        return this;
      }
    }

    var frame = this.newFrame(time);
    frame.set.apply(frame, args);
    this.updateFrame(frame);
    return this;
  };
  /**
  * Get properties of the sceneItem at that time
  * @param {Number} time - time
  * @param {...String|Object} args property's name or properties
  * @return {Number|String|Scene.PropertyObejct} property value
  * @example
  item.get(0, "a"); // item.getFrame(0).get("a");
  item.get(0, "transform", "translate"); // item.getFrame(0).get("transform", "translate");
  */


  _proto.get = function get(time) {
    var frame = this.getFrame(time);

    for (var _len2 = arguments.length, args = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
      args[_key2 - 1] = arguments[_key2];
    }

    return frame && frame.get.apply(frame, args);
  };
  /**
  * remove properties to the sceneItem at that time
  * @param {Number} time - time
  * @param {...String|Object} [properties] - property names or values
  * @return {Scene.SceneItem} An instance itself
  * @example
  item.remove(0, "a");
  */


  _proto.remove = function remove(time) {
    var frame = this.getFrame(time);

    for (var _len3 = arguments.length, args = new Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
      args[_key3 - 1] = arguments[_key3];
    }

    frame && frame.remove.apply(frame, args);
    this.update();
    return this;
  };
  /**
  * Append the item or object at the last time.
  * @param {SceneItem | object} item - the scene item or item object
  * @return {Scene.SceneItem} An instance itself
  * @example
  item.append(new SceneItem({
  0: {
  	opacity: 0,
  },
  1: {
  	opacity: 1,
  }
  }));
  item.append({
  0: {
  	opacity: 0,
  },
  1: {
  	opacity: 1,
  }
  });
  item.set(item.getDuration(), {
  0: {
  	opacity: 0,
  },
  1: {
  	opacity: 1,
  }
  });
  */


  _proto.append = function append(item) {
    this.set(this.getDuration(), item);
    return this;
  };
  /**
  * Push the front frames for the time and prepend the scene item or item object.
  * @param {SceneItem | object} item - the scene item or item object
  * @return {Scene.SceneItem} An instance itself
  */


  _proto.prepend = function prepend(item) {
    if (item instanceof SceneItem) {
      var delay = item.getDelay();
      var duration = item.getIterationCount() === "infinite" ? item.getDuration() : item.getActiveDuration();
      var unshiftTime = duration + delay;
      var firstFrame = this.keyframes.get(0);

      if (firstFrame) {
        this.keyframes.remove(0);
      }

      this.keyframes.unshift(unshiftTime);
      this.set(0, item);
      this.set(unshiftTime + THRESHOLD, firstFrame);
    } else {
      this.prepend(new SceneItem(item));
    }

    return this;
  };
  /**
  * Specifies an element to synchronize items' keyframes.
  * @method Scene.SceneItem#setSelector
  * @param {string} selectors - Selectors to find elements in items.
  * @return {Scene.SceneItem} An instance itself
  * @example
  item.setSelector("#id.class");
  */


  _proto.setSelector = function setSelector(selector) {
    this.options.selector = selector === true ? this.state.id : selector || "[data-scene-id=\"" + this.state.id + "\"]";
    this.setElement(document.querySelectorAll(this.options.selector));
    return this;
  };
  /**
  * Specifies an element to synchronize item's keyframes.
  * @method Scene.SceneItem#setElement
  * @param {Element|Array|string} elements - elements to synchronize item's keyframes.
  * @return {Scene.SceneItem} An instance itself
  * @example
  item.setElement(document.querySelector("#id.class"));
  item.setElement(document.querySelectorAll(".class"));
  */


  _proto.setElement = function setElement(elements) {
    if (!elements) {
      return this;
    }

    this.elements = elements instanceof Element ? [elements] : elements;
    this.setId();
    return this;
  };
  /**
  * add css styles of items's element to the frame at that time.
  * @method Scene.SceneItem#setCSS
  * @param {Array} properties - elements to synchronize item's keyframes.
  * @return {Scene.SceneItem} An instance itself
  * @example
  item.setElement(document.querySelector("#id.class"));
  item.setCSS(0, ["opacity"]);
  item.setCSS(0, ["opacity", "width", "height"]);
  */


  _proto.setCSS = function setCSS(time, properties) {
    this.set(time, fromCSS(this.elements, properties));
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
  * update property names used in frames.
  * @method Scene.SceneItem#update
  * @return {Scene.SceneItem} An instance itself
  * @example
  item.update();
  */


  _proto.update = function update() {
    this.keyframes.update();
    return this;
  };
  /**
  * update property names used in frame.
  * @method Scene.SceneItem#updateFrame
  * @param {Scene.Frame} [frame] - frame of that time.
  * @return {Scene.SceneItem} An instance itself
  * @example
  item.updateFrame(time, this.get(time));
  */


  _proto.updateFrame = function updateFrame(frame) {
    this.keyframes.updateFrame(frame);
    return this;
  };
  /**
  * Create and add a frame to the sceneItem at that time
  * @method Scene.SceneItem#newFrame
  * @param {Number} time - frame's time
  * @return {Scene.Frame} Created frame.
  * @example
  item.newFrame(time);
  */


  _proto.newFrame = function newFrame(time) {
    var frame = this.getFrame(time);

    if (frame) {
      return frame;
    }

    frame = new Frame();
    this.setFrame(time, frame);
    return frame;
  };
  /**
  * Add a frame to the sceneItem at that time
  * @method Scene.SceneItem#setFrame
  * @param {Number} time - frame's time
  * @return {Scene.SceneItem} An instance itself
  * @example
  item.setFrame(time, frame);
  */


  _proto.setFrame = function setFrame(time, frame) {
    this.keyframes.add(this._getTime(time), frame);
    this.keyframes.update();
    return this;
  };
  /**
  * get sceneItem's frame at that time
  * @method Scene.SceneItem#getFrame
  * @param {Number} time - frame's time
  * @return {Scene.Frame} sceneItem's frame at that time
  * @example
  const frame = item.getFrame(time);
  */


  _proto.getFrame = function getFrame(time) {
    return this.keyframes.get(this._getTime(time));
  };
  /**
  * check if the item has a frame at that time
  * @method Scene.SceneItem#hasFrame
  * @param {Number} time - frame's time
  * @return {Boolean} true: the item has a frame // false: not
  * @example
  if (item.hasFrame(10)) {
  // has
  } else {
  // not
  }
  */


  _proto.hasFrame = function hasFrame(time) {
    return this.keyframes.has(this._getTime(time));
  };
  /**
  * remove sceneItem's frame at that time
  * @method Scene.SceneItem#removeFrame
  * @param {Number} time - frame's time
  * @return {Scene.SceneItem} An instance itself
  * @example
  item.removeFrame(time);
  */


  _proto.removeFrame = function removeFrame(time) {
    var keyframes = this.keyframes;
    keyframes.remove(time);
    keyframes.update();
    return this;
  };
  /**
  * Copy frame of the previous time at the next time.
  * @method Scene.SceneItem#copyFrame
  * @param {number|string|object} fromTime - the previous time
  * @param {number} toTime - the next time
  * @return {Scene.SceneItem} An instance itself
  * @example
  // getFrame(0) equal getFrame(1)
  item.copyFrame(0, 1);
  */


  _proto.copyFrame = function copyFrame(fromTime, toTime) {
    if (isObject(fromTime)) {
      for (var time in fromTime) {
        this.copyFrame(time, fromTime[time]);
      }

      return this;
    }

    var frame = this.getFrame(fromTime);

    if (!frame) {
      return this;
    }

    var copyFrame = frame.clone();
    this.setFrame(toTime, copyFrame);
    return this;
  };
  /**
  * merge frame of the previous time at the next time.
  * @method Scene.SceneItem#mergeFrame
  * @param {number|string|object} fromTime - the previous time
  * @param {number|string} toTime - the next time
  * @return {Scene.SceneItem} An instance itself
  * @example
  // getFrame(1) contains getFrame(0)
  item.merge(0, 1);
  */


  _proto.mergeFrame = function mergeFrame(fromTime, toTime) {
    if (isObject(fromTime)) {
      for (var time in fromTime) {
        this.mergeFrame(time, fromTime[time]);
      }

      return this;
    }

    var frame = this.getFrame(fromTime);

    if (!frame) {
      return this;
    }

    var toFrame = this.newFrame(toTime);
    toFrame.merge(frame);
    return this;
  };
  /**
  * Get frame of the current time
  * @method Scene.SceneItem#getNowFrame
  * @param {Number} time - the current time
  * @param {function} easing - the speed curve of an animation
  * @return {Scene.Frame} frame of the current time
  * @example
  let item = new Scene.SceneItem({
  0: {
  	display: "none",
  },
  1: {
  	display: "block",
  	opacity: 0,
  },
  2: {
  	opacity: 1,
  }
  });
  // opacity: 0.7; display:"block";
  const frame = item.getNowFrame(1.7);
  */


  _proto.getNowFrame = function getNowFrame(time, easing) {
    var _this3 = this;

    var frame = new Frame();
    var names = this.keyframes.getNames();

    var _this$_getNearTimeInd = this._getNearTimeIndex(time),
        left = _this$_getNearTimeInd.left,
        right = _this$_getNearTimeInd.right;

    var realEasing = this._getEasing(time, left, right, this.state.easing || easing);

    names.forEach(function (properties) {
      var value = _this3._getNowValue(time, left, right, properties, realEasing);

      if (isUndefined(value)) {
        return;
      }

      frame.set(properties, value);
    });
    return frame;
  };

  _proto.load = function load(properties, options) {
    if (properties === void 0) {
      properties = {};
    }

    if (options === void 0) {
      options = properties.options;
    }

    if (isArray(properties)) {
      var length = properties.length;

      for (var i = 0; i < length; ++i) {
        var time = length === 1 ? 0 : this._getTime(i / (length - 1) * 100 + "%");
        this.set(time, properties[i]);
      }
    } else if (properties.keyframes) {
      this.set(properties.keyframes);
    } else {
      for (var _time in properties) {
        if (_time === "options" || _time === "keyframes") {
          continue;
        }

        var value = properties[_time];

        var realTime = this._getTime(_time);

        if (typeof value === "number") {
          this.mergeFrame(value, realTime);
          continue;
        }

        this.set(realTime, value);
      }
    }

    options && this.setOptions(options);
    return this;
  };
  /**
   * clone SceneItem.
   * @method Scene.SceneItem#clone
   * @param {AnimatorOptions} [options] animator options
   * @return {Scene.SceneItem} An instance of clone
   * @example
   * item.clone();
   */


  _proto.clone = function clone(options) {
    if (options === void 0) {
      options = {};
    }

    var item = new SceneItem();
    item.setOptions(this.state);
    item.setOptions(options);
    this.keyframes.forEach(function (frame, time) {
      return item.setFrame(time, frame.clone());
    });
    return item;
  };

  _proto.setOptions = function setOptions(options) {
    if (options === void 0) {
      options = {};
    }

    _Animator.prototype.setOptions.call(this, options);

    var _options = options,
        id = _options.id,
        selector = _options.selector,
        duration = _options.duration,
        elements = _options.elements;
    duration && this.setDuration(duration);
    id && this.setId(id);

    if (elements) {
      this.setElement(elements);
    } else if (selector) {
      this.setSelector(selector === true ? this.state.id : selector);
    }

    return this;
  };

  _proto.getAllTimes = function getAllTimes(isStartZero, options) {
    if (isStartZero === void 0) {
      isStartZero = true;
    }

    if (options === void 0) {
      options = {};
    }

    var times = this.keyframes.times.slice();
    var length = times.length;
    var keys = [];
    var values = {};

    if (!length) {
      return {
        keys: [],
        values: {},
        frames: {}
      };
    }

    var frames = {};
    var duration = this.getDuration();
    var direction = options.direction || this.state.direction;
    var isShuffle = direction === "alternate" || direction === "alternate-reverse";
    !this.getFrame(0) && times.unshift(0);
    !this.getFrame(duration) && times.push(duration);
    length = times.length;
    var iterationCount = options.iterationCount || this.state.iterationCount;
    iterationCount = iterationCount !== "infinite" ? iterationCount : 1;
    var totalDuration = iterationCount * duration;

    for (var i = 0; i < iterationCount; ++i) {
      var isReverse = isDirectionReverse(i, direction);
      var start = i * duration;

      for (var j = 0; j < length; ++j) {
        if (isShuffle && i !== 0 && j === 0) {
          // pass duplicate
          continue;
        } // isStartZero is keytimes[0] is 0 (i === 0 & j === 0)


        var threshold = j === 0 && (i === 0 ? !isStartZero : !isShuffle) ? THRESHOLD : 0;
        var keyvalue = isReverse ? times[length - 1 - j] : times[j];
        var time = toFixed(isReverse ? duration - keyvalue : keyvalue);
        var keytime = toFixed(start + time + threshold);

        if (totalDuration < keytime) {
          break;
        }

        keys.push(keytime);
        values[keytime] = keyvalue;

        if (!frames[keyvalue]) {
          var frame = this.getFrame(keyvalue);

          if (j === 0 || j === length - 1 || frame.has("transform") || frame.has("filter")) {
            frames[keyvalue] = this.getNowFrame(keyvalue);
          } else {
            frames[keyvalue] = frame;
          }
        }
      }
    }

    if (keys[keys.length - 1] < totalDuration) {
      // last time === totalDuration
      var _isReverse = isDirectionReverse(iterationCount, direction);

      var _keyvalue = toFixed(duration * (_isReverse ? 1 - iterationCount % 1 : iterationCount % 1));

      keys.push(totalDuration);
      values[totalDuration] = _keyvalue;
      !frames[_keyvalue] && (frames[_keyvalue] = this.getNowFrame(_keyvalue));
    }

    return {
      keys: keys,
      values: values,
      frames: frames
    };
  };
  /**
  * Specifies an css text that coverted the keyframes of the item.
  * @param {Array} [duration=this.getDuration()] - elements to synchronize item's keyframes.
  * @param {Array} [options={}] - parent options to unify options of items.
  * @example
  item.setCSS(0, ["opacity"]);
  item.setCSS(0, ["opacity", "width", "height"]);
  */


  _proto.toCSS = function toCSS(duration, options) {
    if (duration === void 0) {
      duration = this.getDuration();
    }

    if (options === void 0) {
      options = {};
    }

    var state = this.state;
    var selector = state.selector || this.options.selector;

    if (!selector) {
      return "";
    }

    var id = this._getId();

    var isZeroDuration = duration === 0;
    var playSpeed = options.playSpeed || 1;
    var delay = ((typeof options.delay === "undefined" ? state.delay : options.delay) || 0) / playSpeed;
    var easingName = !isZeroDuration && options.easing && options.easingName || state.easingName;
    var count = !isZeroDuration && options.iterationCount || state.iterationCount;
    var fillMode = options.fillMode !== "forwards" && options.fillMode || state.fillMode;
    var direction = options.direction !== "normal" && options.direction || state.direction;
    var cssText = makeAnimationProperties({
      fillMode: fillMode,
      direction: direction,
      delay: delay + "s",
      name: PREFIX + "KEYFRAMES_" + toId(id),
      duration: duration / playSpeed + "s",
      timingFunction: easingName,
      iterationCount: count
    });

    var css = selector + "." + START_ANIMATION + " {\n\t\t\t" + cssText + "\n\t\t}\n\t\t" + this._toKeyframes(duration, options);

    return css;
  };

  _proto.exportCSS = function exportCSS(duration, options) {
    if (duration === void 0) {
      duration = this.getDuration();
    }

    if (options === void 0) {
      options = {};
    }

    if (!this.elements.length) {
      return;
    }

    var id = this._getId();

    var styleElement = document.querySelector("#" + PREFIX + id);
    var css = this.toCSS(duration, options);

    if (styleElement) {
      styleElement.innerText = css;
    } else {
      document.body.insertAdjacentHTML("beforeend", "<style id=\"" + PREFIX + "STYLE_" + id + "\">" + css + "</style>");
    }
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
  * @see {@link https://www.w3schools.com/cssref/css3_pr_animation.asp}
  * @example
  item.playCSS();
  item.playCSS(false, {
  direction: "reverse",
  fillMode: "forwards",
  });
  */


  _proto.playCSS = function playCSS(exportCSS, properties) {
    var _this4 = this;

    if (exportCSS === void 0) {
      exportCSS = true;
    }

    if (properties === void 0) {
      properties = {};
    }

    if (!ANIMATION || this.getPlayState() === "running") {
      return this;
    }

    var elements = this.elements;
    var length = elements.length;

    if (!length) {
      return this;
    }

    if (this.isEnded()) {
      this.setTime(0);
    }

    exportCSS && this.exportCSS();
    var cssText = makeAnimationProperties(properties);

    for (var i = 0; i < length; ++i) {
      var element = elements[i];
      element.style.cssText += cssText;

      if (hasClass(element, START_ANIMATION)) {
        removeClass(element, START_ANIMATION);

        (function (el) {
          requestAnimationFrame(function () {
            requestAnimationFrame(function () {
              addClass(el, START_ANIMATION);
            });
          });
        })(element);
      } else {
        addClass(element, START_ANIMATION);
      }
    }

    this.setState({
      playCSS: true
    });
    this.setPlayState("running");
    this.trigger("play");
    var duration = this.getDuration();
    var animatedElement = elements[0];

    var animationend = function animationend() {
      _this4.end();

      if (!animatedElement) {
        return;
      }

      animatedElement.removeEventListener("animationend", animationend);
      animatedElement.removeEventListener("animationiteration", animationiteration);
    };

    var animationiteration = function animationiteration(_ref) {
      var elapsedTime = _ref.elapsedTime;
      var currentTime = elapsedTime;
      var iterationCount = currentTime / duration;
      _this4.state.currentTime = currentTime;

      _this4.setCurrentIterationCount(iterationCount);
    };

    animatedElement.addEventListener("animationend", animationend);
    animatedElement.addEventListener("animationiteration", animationiteration);
    return this;
  };

  _proto._getId = function _getId() {
    return this.state.id || this.setId().getId();
  };

  _proto._getEasing = function _getEasing(time, left, right, easing) {
    if (this.keyframes.hasName(timingFunction)) {
      var nowEasing = this._getNowValue(time, left, right, [timingFunction], 0, true);

      return typeof nowEasing === "function" ? nowEasing : easing;
    }

    return easing;
  };

  _proto._getTime = function _getTime(time) {
    var duration = this.getDuration() || 100;

    if (isString(time)) {
      if (time === "from") {
        return 0;
      } else if (time === "to") {
        return duration;
      }

      var _splitUnit = splitUnit(time),
          unit = _splitUnit.unit,
          value = _splitUnit.value;

      if (unit === "%") {
        !this.getDuration() && (this.state.duration = duration);
        return parseFloat(time) / 100 * duration;
      } else if (unit === ">") {
        return value + THRESHOLD;
      } else {
        return value;
      }
    } else {
      return toFixed(time);
    }
  };

  _proto._toKeyframes = function _toKeyframes(duration, options) {
    if (duration === void 0) {
      duration = this.getDuration();
    }

    if (options === void 0) {
      options = {};
    }

    var id = this._getId();

    var state = this.state;
    var playSpeed = state.playSpeed;
    var isParent = typeof options.iterationCount !== "undefined";
    var iterationCount = state.iterationCount;
    var delay = isParent ? state.delay : 0;
    var direction = isParent ? state.direction : "normal";

    var _this$getAllTimes = this.getAllTimes(true, {
      duration: duration,
      delay: delay,
      direction: direction,
      iterationCount: isParent && iterationCount !== "infinite" ? iterationCount : 1,
      isCSS: true
    }),
        keys = _this$getAllTimes.keys,
        values = _this$getAllTimes.values,
        frames = _this$getAllTimes.frames;

    var length = keys.length;
    var css = {};
    var keyframes = [];

    for (var time in frames) {
      css[time] = frames[time].toCSS();
    }

    if (!keys.length) {
      return "";
    }

    if (delay) {
      keyframes.push("0%{" + frames[0] + "}");

      if (direction === "reverse" || direction === "alternate-reverse") {
        keyframes.push(delay / playSpeed / duration * 100 - 0.00001 + "%{" + css[0] + "}");
      }
    }

    keys.forEach(function (time) {
      keyframes.push((delay + time) / playSpeed / duration * 100 + "%{" + css[values[time]] + "}");
    });
    var lastTime = keys[length - 1];

    if ((delay + lastTime) / playSpeed < duration) {
      // not 100%
      keyframes.push("100%{" + css[values[lastTime]]);
    }

    return "@" + KEYFRAMES + " " + PREFIX + "KEYFRAMES_" + toId(id) + "{\n\t\t\t" + keyframes.join("\n") + "\n\t\t}";
  };

  _proto._getNowValue = function _getNowValue(time, left, right, properties, easing, usePrevValue) {
    var _prevFrame, _nextFrame;

    if (easing === void 0) {
      easing = this.state.easing;
    }

    if (usePrevValue === void 0) {
      usePrevValue = isFixed(properties);
    }

    var keyframes = this.keyframes;
    var times = keyframes.times;
    var length = times.length;
    var prevTime;
    var nextTime;
    var prevFrame;
    var nextFrame;

    for (var i = left; i >= 0; --i) {
      var frame = keyframes.get(times[i]);

      if (frame.has.apply(frame, properties)) {
        prevTime = times[i];
        prevFrame = frame;
        break;
      }
    }

    var prevValue = prevFrame && (_prevFrame = prevFrame).raw.apply(_prevFrame, properties);

    if (usePrevValue) {
      return prevValue;
    }

    for (var _i = right; _i < length; ++_i) {
      var _frame = keyframes.get(times[_i]);

      if (_frame.has.apply(_frame, properties)) {
        nextTime = times[_i];
        nextFrame = _frame;
        break;
      }
    }

    var nextValue = nextFrame && (_nextFrame = nextFrame).raw.apply(_nextFrame, properties);

    if (!prevFrame || isUndefined(prevValue)) {
      return nextValue;
    }

    if (!nextFrame || isUndefined(nextValue) || prevValue === nextValue) {
      return prevValue;
    }

    if (prevTime < 0) {
      prevTime = 0;
    }

    return dotValue(time, prevTime, nextTime, prevValue, nextValue, easing);
  };

  _proto._getNearTimeIndex = function _getNearTimeIndex(time) {
    var keyframes = this.keyframes;
    var times = keyframes.times;
    var length = times.length;

    for (var i = 0; i < length; ++i) {
      if (times[i] === time) {
        return {
          left: i,
          right: i
        };
      } else if (times[i] > time) {
        return {
          left: i === 0 ? 0 : i - 1,
          right: i
        };
      }
    }

    return {
      left: length - 1,
      right: length - 1
    };
  };

  _proto._animate = function _animate(parentEasing) {
    var iterationTime = this.getIterationTime();
    var easing = this.getEasing() || parentEasing;
    var frame = this.getNowFrame(iterationTime, easing);
    var currentTime = this.getTime();
    /**
     * This event is fired when timeupdate and animate.
     * @event Scene.SceneItem#animate
     * @param {Number} param.currentTime The total time that the animator is running.
     * @param {Number} param.time The iteration time during duration that the animator is running.
     * @param {Scene.Frame} param.frame frame of that time.
     */

    this.trigger("animate", {
      frame: frame,
      currentTime: currentTime,
      time: iterationTime
    });
    var elements = this.elements;
    var length = elements.length;

    if (!length) {
      return frame;
    }

    var attributes = frame.get("attribute");

    if (attributes) {
      for (var name in attributes) {
        for (var i = 0; i < length; ++i) {
          elements[i].setAttribute(name, attributes[name]);
        }
      }
    }

    var cssText = frame.toCSS();

    if (this.state.cssText !== cssText) {
      this.state.cssText = cssText;

      for (var _i2 = 0; _i2 < length; ++_i2) {
        elements[_i2].style.cssText += cssText;
      }

      return frame;
    }
  };

  return SceneItem;
}(Animator);

export default SceneItem;