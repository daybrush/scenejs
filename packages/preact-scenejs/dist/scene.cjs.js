/*
Copyright (c) 2016 Daybrush
name: preact-scenejs
license: MIT
author: Daybrush
repository: https://github.com/daybrush/scenejs/tree/master/packages/preact-scenejs
version: 1.0.0
*/
'use strict';

var NativeScene = require('scenejs');
var preact = require('preact');

/*! *****************************************************************************
Copyright (c) Microsoft Corporation. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */
/* global Reflect, Promise */

var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return extendStatics(d, b);
};

function __extends(d, b) {
    extendStatics(d, b);
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}

var SceneInterface =
/*#__PURE__*/
function (_super) {
  __extends(SceneInterface, _super);

  function SceneInterface() {
    var _this = _super !== null && _super.apply(this, arguments) || this;

    _this.events = {
      play: function (e) {
        return _this.props.onPlay(e);
      },
      paused: function (e) {
        return _this.props.onPaused(e);
      },
      ended: function (e) {
        return _this.props.onEnded(e);
      },
      timeupdate: function (e) {
        return _this.props.onTimeUpdate(e);
      },
      iteration: function (e) {
        return _this.props.onIteration(e);
      },
      animate: function (e) {
        return _this.props.onAnimate(e);
      }
    };
    return _this;
  }

  var __proto = SceneInterface.prototype;

  __proto.render = function () {
    return [].concat(this.props.children)[0];
  };

  __proto.componentDidUpdate = function () {
    if (this.props.time !== -1 && (this.props.autoplay === false || this.item.getPlayState() === "paused")) {
      this.item.setTime(this.props.time);
    }
  };

  __proto.componentWillUnmount = function () {
    this.item.off();
  };

  __proto.setTime = function (time) {
    this.item.setTime(time);
  };

  __proto.getTime = function () {
    return this.item.getTime();
  };

  __proto.play = function () {
    this.props.css !== false ? this.item.playCSS() : this.item.play();
  };

  __proto.pause = function () {
    this.item.pause();
  };

  __proto.isPaused = function () {
    return this.item.isPaused();
  };

  __proto.getItem = function () {
    return this.item;
  };

  __proto.getDuration = function () {
    return this.item.getDuration();
  };

  __proto.init = function () {
    var _this = this;

    var item = this.item;
    var events = this.events;
    var sceneOptions = {};

    if (this.props.keyframes) {
      this.item.load(this.props.keyframes);
    }

    NativeScene.OPTIONS.forEach(function (name) {
      sceneOptions[name] = _this.props[name];
    });
    item.setOptions(sceneOptions);
    NativeScene.EVENTS.forEach(function (name) {
      _this.item.on(name, events[name]);
    });

    if (this.props.autoplay !== false) {
      this.play();
    } else if (this.props.time !== -1) {
      this.setTime(this.props.time);
    } else {
      this.setTime(0);
    }
  };

  SceneInterface.defaultProps = {
    duration: 0,
    fillMode: "forwards",
    direction: "normal",
    playSpeed: 1,
    iterationCount: 1,
    delay: 0,
    easing: 0,
    time: -1,
    css: false,
    autoplay: false,
    onPlay: function () {
      return undefined;
    },
    onPaused: function () {
      return undefined;
    },
    onEnded: function () {
      return undefined;
    },
    onTimeUpdate: function () {
      return undefined;
    },
    onIteration: function () {
      return undefined;
    },
    onAnimate: function () {
      return undefined;
    }
  };
  return SceneInterface;
}(preact.Component);

var SceneItem =
/*#__PURE__*/
function (_super) {
  __extends(SceneItem, _super);

  function SceneItem() {
    var _this = _super !== null && _super.apply(this, arguments) || this;

    _this.item = new NativeScene.SceneItem();
    return _this;
  }

  var __proto = SceneItem.prototype;

  __proto.componentDidMount = function () {
    this.item.setElement(this.base);
    this.init();
  };

  return SceneItem;
}(SceneInterface);

var Scene =
/*#__PURE__*/
function (_super) {
  __extends(Scene, _super);

  function Scene() {
    var _this = _super !== null && _super.apply(this, arguments) || this;

    _this.item = new NativeScene({}, {
      selector: true
    });
    return _this;
  }

  var __proto = Scene.prototype;

  __proto.componentDidMount = function () {
    this.init();
  };

  return Scene;
}(SceneInterface);

exports.Scene = Scene;
exports.SceneItem = SceneItem;
//# sourceMappingURL=scene.cjs.js.map
