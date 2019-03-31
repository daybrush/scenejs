/*
Copyright (c) 2017 Daybrush
name: scenejs
license: MIT
author: Daybrush
repository: https://github.com/daybrush/scenejs.git
version: 1.0.0-rc5
*/
(function () {
    'use strict';

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
    var extendStatics = function (d, b) {
      extendStatics = Object.setPrototypeOf || {
        __proto__: []
      } instanceof Array && function (d, b) {
        d.__proto__ = b;
      } || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
      };

      return extendStatics(d, b);
    };

    function __extends(d, b) {
      extendStatics(d, b);

      function __() {
        this.constructor = d;
      }

      d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    }
    var __assign = function () {
      __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
          s = arguments[i];

          for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }

        return t;
      };

      return __assign.apply(this, arguments);
    };
    function __decorate(decorators, target, key, desc) {
      var c = arguments.length,
          r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
          d;
      if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    }

    /*
    Copyright (c) 2018 Daybrush
    @name: @daybrush/utils
    license: MIT
    author: Daybrush
    repository: https://github.com/daybrush/utils
    @version 0.5.2
    */
    /**
    * get string "undefined"
    * @memberof Consts
    * @example
    import {UNDEFINED} from "@daybrush/utils";

    console.log(UNDEFINED); // "undefined"
    */

    var UNDEFINED = "undefined";
    /**
    * Check whether the environment is window or node.js.
    * @memberof Consts
    * @example
    import {IS_WINDOW} from "@daybrush/utils";

    console.log(IS_WINDOW); // false in node.js
    console.log(IS_WINDOW); // true in browser
    */

    var IS_WINDOW = typeof window !== UNDEFINED;
    /**
    * Check whether the environment is window or node.js.
    * @memberof Consts
    * @name document
    * @example
    import {IS_WINDOW} from "@daybrush/utils";

    console.log(IS_WINDOW); // false in node.js
    console.log(IS_WINDOW); // true in browser
    */

    var doc = typeof document !== UNDEFINED && document;
    var prefixes = ["webkit", "ms", "moz", "o"];
    /**
     * @namespace CrossBrowser
     */

    /**
    * Get a CSS property with a vendor prefix that supports cross browser.
    * @function
    * @param {string} property - A CSS property
    * @return {string} CSS property with cross-browser vendor prefix
    * @memberof CrossBrowser
    * @example
    import {getCrossBrowserProperty} from "@daybrush/utils";

    console.log(getCrossBrowserProperty("transform")); // "transform", "-ms-transform", "-webkit-transform"
    console.log(getCrossBrowserProperty("filter")); // "filter", "-webkit-filter"
    */

    var getCrossBrowserProperty =
    /*#__PURE__*/
    function (property) {
      if (!doc) {
        return "";
      }

      var styles = (doc.body || doc.documentElement).style;
      var length = prefixes.length;

      if (typeof styles[property] !== UNDEFINED) {
        return property;
      }

      for (var i = 0; i < length; ++i) {
        var name = "-" + prefixes[i] + "-" + property;

        if (typeof styles[name] !== UNDEFINED) {
          return name;
        }
      }

      return "";
    };
    /**
    * get string "transfrom" with the vendor prefix.
    * @memberof CrossBrowser
    * @example
    import {TRANSFORM} from "@daybrush/utils";

    console.log(TRANSFORM); // "transform", "-ms-transform", "-webkit-transform"
    */


    var TRANSFORM =
    /*#__PURE__*/
    getCrossBrowserProperty("transform");
    /**
    * get string "filter" with the vendor prefix.
    * @memberof CrossBrowser
    * @example
    import {FILTER} from "@daybrush/utils";

    console.log(FILTER); // "filter", "-ms-filter", "-webkit-filter"
    */

    var FILTER =
    /*#__PURE__*/
    getCrossBrowserProperty("filter");
    /**
    * get string "animation" with the vendor prefix.
    * @memberof CrossBrowser
    * @example
    import {ANIMATION} from "@daybrush/utils";

    console.log(ANIMATION); // "animation", "-ms-animation", "-webkit-animation"
    */

    var ANIMATION =
    /*#__PURE__*/
    getCrossBrowserProperty("animation");
    /**
    * get string "keyframes" with the vendor prefix.
    * @memberof CrossBrowser
    * @example
    import {KEYFRAMES} from "@daybrush/utils";

    console.log(KEYFRAMES); // "keyframes", "-ms-keyframes", "-webkit-keyframes"
    */

    var KEYFRAMES =
    /*#__PURE__*/
    ANIMATION.replace("animation", "keyframes");
    /**
    * divide text by number and unit.
    * @memberof Utils
    * @param {string} text - text to divide
    * @return {} divided texts
    * @example
    import {splitUnit} from "@daybrush/utils";

    console.log(splitUnit("10px"));
    // {prefix: "", value: 10, unit: "px"}
    console.log(splitUnit("-10px"));
    // {prefix: "", value: -10, unit: "px"}
    console.log(splitUnit("a10%"));
    // {prefix: "a", value: 10, unit: "%"}
    */


    function splitUnit(text) {
      var matches = /^([^\d|e|\-|\+]*)((?:\d|\.|-|e-|e\+)+)(\S*)$/g.exec(text);

      if (!matches) {
        return {
          prefix: "",
          unit: "",
          value: NaN
        };
      }

      var prefix = matches[1];
      var value = matches[2];
      var unit = matches[3];
      return {
        prefix: prefix,
        unit: unit,
        value: parseFloat(value)
      };
    }
    /**
    * Date.now() method
    * @memberof CrossBrowser
    * @return {number} milliseconds
    * @example
    import {now} from "@daybrush/utils";

    console.log(now()); // 12121324241(milliseconds)
    */


    function now() {
      return Date.now ? Date.now() : new Date().getTime();
    }
    /**
    * window.requestAnimationFrame() method with cross browser.
    * @function
    * @memberof CrossBrowser
    * @param {FrameRequestCallback} callback - The function to call when it's time to update your animation for the next repaint.
    * @return {number} id
    * @example
    import {requestAnimationFrame} from "@daybrush/utils";

    requestAnimationFrame((timestamp) => {
      console.log(timestamp);
    });
    */


    var requestAnimationFrame =
    /*#__PURE__*/
    function () {
      var firstTime = now();
      var raf = IS_WINDOW && (window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame);
      return raf ? raf.bind(window) : function (callback) {
        var currTime = now();
        var id = window.setTimeout(function () {
          callback(currTime - firstTime);
        }, 1000 / 60);
        return id;
      };
    }();
    /**
    * Checks if the specified class value exists in the element's class attribute.
    * @memberof DOM
    * @param element - target
    * @param className - the class name to search
    * @return {boolean} return false if the class is not found.
    * @example
    import {hasClass} from "@daybrush/utils";

    console.log(hasClass(element, "start")); // true or false
    */


    function hasClass(element, className) {
      if (element.classList) {
        return element.classList.contains(className);
      }

      return !!element.className.match(new RegExp("(\\s|^)" + className + "(\\s|$)"));
    }
    /**
    * Add the specified class value. If these classe already exist in the element's class attribute they are ignored.
    * @memberof DOM
    * @param element - target
    * @param className - the class name to add
    * @example
    import {addClass} from "@daybrush/utils";

    addClass(element, "start");
    */


    function addClass(element, className) {
      if (element.classList) {
        element.classList.add(className);
      } else {
        element.className += " " + className;
      }
    }

    /*
    Copyright (c) 2018 Daybrush
    name: shape-svg
    license: MIT
    author: Daybrush
    repository: https://github.com/daybrush/shape-svg
    @version 0.3.1
    */
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

    var __assign$1 = function () {
      __assign$1 = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
          s = arguments[i];

          for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }

        return t;
      };

      return __assign$1.apply(this, arguments);
    };

    function __rest$1(s, e) {
      var t = {};

      for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];

      if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) if (e.indexOf(p[i]) < 0) t[p[i]] = s[p[i]];
      return t;
    }

    var CLASS_NAME = "__shape-svg";

    function makeDOM(tag) {
      return document.createElementNS("http://www.w3.org/2000/svg", tag);
    }

    function makeSVGDOM() {
      var el = makeDOM("svg");
      addClass(el, CLASS_NAME);
      return el;
    }

    function setAttributes(element, attributes) {
      for (var name in attributes) {
        element.setAttribute(name, attributes[name]);
      }
    }

    function setStyles(element, styles) {
      var cssText = [];

      for (var name in styles) {
        cssText.push(name + ":" + styles[name] + ";");
      }

      element.style.cssText += cssText.join("");
    }

    function getAbsoluteValue(value, pos, size) {
      var info = splitUnit(value);

      if (info.unit === "%") {
        return pos + size * info.value / 100 + "px";
      } else if (info.unit === "px") {
        return pos + info.value + "px";
      } else {
        return "calc(" + pos + "px + " + value + ")";
      }
    }

    function setOrigin(container, _a) {
      var width = _a.width,
          height = _a.height,
          left = _a.left,
          top = _a.top,
          origin = _a.origin;

      if (!origin) {
        return;
      }

      var _b = ("" + origin).split(" "),
          ox = _b[0],
          _c = _b[1],
          oy = _c === void 0 ? ox : _c;

      ox = getAbsoluteValue(ox, left, width);
      oy = getAbsoluteValue(oy, top, height);
      container.style.transformOrigin = ox + " " + oy;
    }

    function setViewBox(container, _a) {
      var width = _a.width,
          height = _a.height,
          left = _a.left,
          right = _a.right,
          bottom = _a.bottom,
          top = _a.top,
          strokeWidth = _a.strokeWidth,
          className = _a.className;

      if (container && hasClass(container, CLASS_NAME)) {
        className && className.split(" ").forEach(function (name) {
          addClass(container, name);
        });

        var _b = (container.getAttribute("viewBox") || "").split(" ").map(function (pos) {
          return parseFloat(pos || "0");
        }),
            _c = _b[2],
            boxWidth = _c === void 0 ? 0 : _c,
            _d = _b[3],
            boxHeight = _d === void 0 ? 0 : _d;

        container.setAttribute("viewBox", "0 0 " + ( // tslint:disable-next-line:max-line-length
        Math.max(left + width + right + strokeWidth, boxWidth) + " " + Math.max(top + height + bottom + strokeWidth, boxHeight)));
      }
    }

    function getRect(_a) {
      var _b = _a.left,
          left = _b === void 0 ? 0 : _b,
          _c = _a.top,
          top = _c === void 0 ? 0 : _c,
          _d = _a.side,
          side = _d === void 0 ? 3 : _d,
          _e = _a.rotate,
          rotate = _e === void 0 ? 0 : _e,
          _f = _a.innerRadius,
          innerRadius = _f === void 0 ? 100 : _f,
          _g = _a.height,
          height = _g === void 0 ? 0 : _g,
          _h = _a.split,
          split = _h === void 0 ? 1 : _h,
          _j = _a.width,
          width = _j === void 0 ? height ? 0 : 100 : _j,
          _k = _a.strokeLinejoin,
          strokeLinejoin = _k === void 0 ? "round" : _k,
          _l = _a.strokeWidth,
          strokeWidth = _l === void 0 ? 0 : _l;
      var xPoints = [];
      var yPoints = [];
      var sideCos = Math.cos(Math.PI / side);
      var startRad = Math.PI / 180 * rotate + Math.PI * ((side % 2 ? 0 : 1 / side) - 1 / 2);

      for (var i = 0; i < side; ++i) {
        var rad = Math.PI * (1 / side * 2 * i) + startRad;
        var cos = Math.cos(rad);
        var sin = Math.sin(rad);
        xPoints.push(cos);
        yPoints.push(sin);

        if (innerRadius !== 100) {
          if (sideCos <= innerRadius / 100) {
            continue;
          } else {
            xPoints.push(innerRadius / 100 * Math.cos(rad + Math.PI / side));
            yPoints.push(innerRadius / 100 * Math.sin(rad + Math.PI / side));
          }
        }
      }

      var minX = Math.min.apply(Math, xPoints);
      var minY = Math.min.apply(Math, yPoints);
      var maxX = Math.max.apply(Math, xPoints);
      var maxY = Math.max.apply(Math, yPoints);
      var isWidth = !!width;
      var scale = isWidth ? width / (maxX - minX) : height / (maxY - minY);
      var isOuter = strokeLinejoin === "miter" || strokeLinejoin === "arcs" || strokeLinejoin === "miter-clip";
      var sideSin = Math.sin(Math.PI / side);
      var innerCos = Math.min(sideCos, innerRadius / 100);
      var innerScale = scale * innerCos;
      var diagonal = strokeWidth / 2 / (sideCos === innerCos ? 1 : Math.sin(Math.atan(sideSin / (sideCos - innerCos))));
      var outerScale = isOuter ? (innerScale + diagonal) / innerScale : 1;
      var pos = isOuter ? 0 : strokeWidth / 2;
      xPoints = xPoints.map(function (xp) {
        return (xp - minX * outerScale) * scale + pos;
      });
      yPoints = yPoints.map(function (yp) {
        return (yp - minY * outerScale) * scale + pos;
      });
      var pathWidth = (maxX - minX) * outerScale * scale + pos * 2;
      var pathHeight = (maxY - minY) * outerScale * scale + pos * 2;
      var length = xPoints.length;
      var points = [];
      points.push([left + xPoints[0], top + yPoints[0]]);

      for (var i = 1; i <= length; ++i) {
        var x1 = xPoints[i - 1];
        var y1 = yPoints[i - 1];
        var x2 = xPoints[i === length ? 0 : i];
        var y2 = yPoints[i === length ? 0 : i];

        for (var j = 1; j <= split; ++j) {
          var x = (x1 * (split - j) + x2 * j) / split;
          var y = (y1 * (split - j) + y2 * j) / split;
          points.push([left + x, top + y]);
        }
      }

      return {
        points: points,
        width: pathWidth,
        height: pathHeight
      };
    }

    function getPath(points) {
      return points.map(function (point, i) {
        return (i === 0 ? "M" : "L") + " " + point.join(" ");
      }).join(" ") + " Z";
    }

    function be(path, _a, container) {
      var _b = _a.left,
          left = _b === void 0 ? 0 : _b,
          _c = _a.top,
          top = _c === void 0 ? 0 : _c,
          _d = _a.right,
          right = _d === void 0 ? 0 : _d,
          _e = _a.bottom,
          bottom = _e === void 0 ? 0 : _e,
          side = _a.side,
          split = _a.split,
          rotate = _a.rotate,
          innerRadius = _a.innerRadius,
          height = _a.height,
          width = _a.width,
          _f = _a.fill,
          fill = _f === void 0 ? "transparent" : _f,
          _g = _a.strokeLinejoin,
          strokeLinejoin = _g === void 0 ? "round" : _g,
          _h = _a.strokeWidth,
          strokeWidth = _h === void 0 ? 0 : _h,
          _j = _a.css,
          css = _j === void 0 ? false : _j,
          className = _a.className,
          attributes = __rest$1(_a, ["left", "top", "right", "bottom", "side", "split", "rotate", "innerRadius", "height", "width", "fill", "strokeLinejoin", "strokeWidth", "css", "className"]);

      var _k = getRect({
        left: left,
        top: top,
        split: split,
        side: side,
        rotate: rotate,
        width: width,
        height: height,
        innerRadius: innerRadius,
        strokeLinejoin: strokeLinejoin,
        strokeWidth: strokeWidth
      }),
          points = _k.points,
          pathWidth = _k.width,
          pathHeight = _k.height;

      setViewBox(container, {
        left: left,
        top: top,
        bottom: bottom,
        right: right,
        className: className,
        strokeWidth: 0,
        width: pathWidth,
        height: pathHeight
      });
      var d = getPath(points);
      css ? setStyles(path, {
        d: "path('" + d + "')"
      }) : setAttributes(path, {
        d: d
      });
      setAttributes(path, __assign$1({
        fill: fill,
        "stroke-linejoin": strokeLinejoin,
        "stroke-width": "" + strokeWidth
      }, attributes));
    }

    function poly(options, container) {
      if (container === void 0) {
        container = makeSVGDOM();
      }

      var path = makeDOM("path");
      be(path, options, container);
      container.appendChild(path);
      return container;
    }

    function oval(_a, container) {
      if (container === void 0) {
        container = makeSVGDOM();
      }

      var _b = _a.left,
          left = _b === void 0 ? 0 : _b,
          _c = _a.top,
          top = _c === void 0 ? 0 : _c,
          _d = _a.right,
          right = _d === void 0 ? 0 : _d,
          _e = _a.bottom,
          bottom = _e === void 0 ? 0 : _e,
          _f = _a.fill,
          fill = _f === void 0 ? "transparent" : _f,
          _g = _a.strokeLinejoin,
          strokeLinejoin = _g === void 0 ? "round" : _g,
          _h = _a.strokeWidth,
          strokeWidth = _h === void 0 ? 0 : _h,
          className = _a.className,
          _j = _a.r,
          r = _j === void 0 ? 0 : _j,
          _k = _a.rx,
          rx = _k === void 0 ? r : _k,
          _l = _a.ry,
          ry = _l === void 0 ? r : _l,
          _m = _a.width,
          width = _m === void 0 ? rx * 2 : _m,
          _o = _a.height,
          height = _o === void 0 ? ry * 2 : _o,
          origin = _a.origin,
          attributes = __rest$1(_a, ["left", "top", "right", "bottom", "fill", "strokeLinejoin", "strokeWidth", "className", "r", "rx", "ry", "width", "height", "origin"]);

      var ellipse = makeDOM("ellipse");
      var halfStroke = strokeWidth / 2;
      setViewBox(container, {
        strokeWidth: strokeWidth,
        left: left,
        top: top,
        bottom: bottom,
        right: right,
        className: className,
        width: width,
        height: height
      });
      setOrigin(ellipse, {
        left: left + halfStroke,
        top: top + halfStroke,
        width: width,
        height: height,
        origin: origin
      });
      setAttributes(ellipse, __assign$1({
        fill: fill,
        "cx": left + halfStroke + width / 2,
        "cy": top + halfStroke + height / 2,
        "rx": width / 2 - halfStroke,
        "ry": height / 2 - halfStroke,
        "stroke-linejoin": strokeLinejoin,
        "stroke-width": "" + strokeWidth
      }, attributes));
      container.appendChild(ellipse);
      return container;
    }

    /*
    Copyright (c) 2017 NAVER Corp.
    @egjs/component project is licensed under the MIT license

    @egjs/component JavaScript library
    https://naver.github.io/egjs-component

    @version 2.1.2
    */

    /**
     * Copyright (c) 2015 NAVER Corp.
     * egjs projects are licensed under the MIT license
     */
    function isUndefined$1(value) {
      return typeof value === "undefined";
    }
    /**
     * A class used to manage events in a component
     * @ko 컴포넌트의 이벤트을 관리할 수 있게 하는 클래스
     * @alias eg.Component
     */


    var Component =
    /*#__PURE__*/
    function () {
      var Component =
      /*#__PURE__*/
      function () {
        /**
        * Version info string
        * @ko 버전정보 문자열
        * @name VERSION
        * @static
        * @type {String}
        * @example
        * eg.Component.VERSION;  // ex) 2.0.0
        * @memberof eg.Component
        */

        /**
         * @support {"ie": "7+", "ch" : "latest", "ff" : "latest",  "sf" : "latest", "edge" : "latest", "ios" : "7+", "an" : "2.1+ (except 3.x)"}
         */
        function Component() {
          this._eventHandler = {};
          this.options = {};
        }
        /**
         * Triggers a custom event.
         * @ko 커스텀 이벤트를 발생시킨다
         * @param {String} eventName The name of the custom event to be triggered <ko>발생할 커스텀 이벤트의 이름</ko>
         * @param {Object} customEvent Event data to be sent when triggering a custom event <ko>커스텀 이벤트가 발생할 때 전달할 데이터</ko>
         * @return {Boolean} Indicates whether the event has occurred. If the stop() method is called by a custom event handler, it will return false and prevent the event from occurring. <a href="https://github.com/naver/egjs-component/wiki/How-to-make-Component-event-design%3F">Ref</a> <ko>이벤트 발생 여부. 커스텀 이벤트 핸들러에서 stop() 메서드를 호출하면 'false'를 반환하고 이벤트 발생을 중단한다. <a href="https://github.com/naver/egjs-component/wiki/How-to-make-Component-event-design%3F">참고</a></ko>
         * @example
        class Some extends eg.Component {
         some(){
         	if(this.trigger("beforeHi")){ // When event call to stop return false.
        	this.trigger("hi");// fire hi event.
         	}
         }
        }
        const some = new Some();
        some.on("beforeHi", (e) => {
        if(condition){
        	e.stop(); // When event call to stop, `hi` event not call.
        }
        });
        some.on("hi", (e) => {
        // `currentTarget` is component instance.
        console.log(some === e.currentTarget); // true
        });
        // If you want to more know event design. You can see article.
        // https://github.com/naver/egjs-component/wiki/How-to-make-Component-event-design%3F
         */


        var _proto = Component.prototype;

        _proto.trigger = function trigger(eventName, customEvent) {
          if (customEvent === void 0) {
            customEvent = {};
          }

          var handlerList = this._eventHandler[eventName] || [];
          var hasHandlerList = handlerList.length > 0;

          if (!hasHandlerList) {
            return true;
          } // If detach method call in handler in first time then handler list calls.


          handlerList = handlerList.concat();
          customEvent.eventType = eventName;
          var isCanceled = false;
          var arg = [customEvent];
          var i = 0;

          customEvent.stop = function () {
            isCanceled = true;
          };

          customEvent.currentTarget = this;

          for (var _len = arguments.length, restParam = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
            restParam[_key - 2] = arguments[_key];
          }

          if (restParam.length >= 1) {
            arg = arg.concat(restParam);
          }

          for (i = 0; handlerList[i]; i++) {
            handlerList[i].apply(this, arg);
          }

          return !isCanceled;
        };
        /**
         * Executed event just one time.
         * @ko 이벤트가 한번만 실행된다.
         * @param {eventName} eventName The name of the event to be attached <ko>등록할 이벤트의 이름</ko>
         * @param {Function} handlerToAttach The handler function of the event to be attached <ko>등록할 이벤트의 핸들러 함수</ko>
         * @return {eg.Component} An instance of a component itself<ko>컴포넌트 자신의 인스턴스</ko>
         * @example
        class Some extends eg.Component {
         hi() {
           alert("hi");
         }
         thing() {
           this.once("hi", this.hi);
         }
        }
        var some = new Some();
        some.thing();
        some.trigger("hi");
        // fire alert("hi");
        some.trigger("hi");
        // Nothing happens
         */


        _proto.once = function once(eventName, handlerToAttach) {
          if (typeof eventName === "object" && isUndefined$1(handlerToAttach)) {
            var eventHash = eventName;
            var i;

            for (i in eventHash) {
              this.once(i, eventHash[i]);
            }

            return this;
          } else if (typeof eventName === "string" && typeof handlerToAttach === "function") {
            var self = this;
            this.on(eventName, function listener() {
              for (var _len2 = arguments.length, arg = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
                arg[_key2] = arguments[_key2];
              }

              handlerToAttach.apply(self, arg);
              self.off(eventName, listener);
            });
          }

          return this;
        };
        /**
         * Checks whether an event has been attached to a component.
         * @ko 컴포넌트에 이벤트가 등록됐는지 확인한다.
         * @param {String} eventName The name of the event to be attached <ko>등록 여부를 확인할 이벤트의 이름</ko>
         * @return {Boolean} Indicates whether the event is attached. <ko>이벤트 등록 여부</ko>
         * @example
        class Some extends eg.Component {
         some() {
           this.hasOn("hi");// check hi event.
         }
        }
         */


        _proto.hasOn = function hasOn(eventName) {
          return !!this._eventHandler[eventName];
        };
        /**
         * Attaches an event to a component.
         * @ko 컴포넌트에 이벤트를 등록한다.
         * @param {eventName} eventName The name of the event to be attached <ko>등록할 이벤트의 이름</ko>
         * @param {Function} handlerToAttach The handler function of the event to be attached <ko>등록할 이벤트의 핸들러 함수</ko>
         * @return {eg.Component} An instance of a component itself<ko>컴포넌트 자신의 인스턴스</ko>
         * @example
        class Some extends eg.Component {
         hi() {
           console.log("hi");
         }
         some() {
           this.on("hi",this.hi); //attach event
         }
        }
        */


        _proto.on = function on(eventName, handlerToAttach) {
          if (typeof eventName === "object" && isUndefined$1(handlerToAttach)) {
            var eventHash = eventName;
            var name;

            for (name in eventHash) {
              this.on(name, eventHash[name]);
            }

            return this;
          } else if (typeof eventName === "string" && typeof handlerToAttach === "function") {
            var handlerList = this._eventHandler[eventName];

            if (isUndefined$1(handlerList)) {
              this._eventHandler[eventName] = [];
              handlerList = this._eventHandler[eventName];
            }

            handlerList.push(handlerToAttach);
          }

          return this;
        };
        /**
         * Detaches an event from the component.
         * @ko 컴포넌트에 등록된 이벤트를 해제한다
         * @param {eventName} eventName The name of the event to be detached <ko>해제할 이벤트의 이름</ko>
         * @param {Function} handlerToDetach The handler function of the event to be detached <ko>해제할 이벤트의 핸들러 함수</ko>
         * @return {eg.Component} An instance of a component itself <ko>컴포넌트 자신의 인스턴스</ko>
         * @example
        class Some extends eg.Component {
         hi() {
           console.log("hi");
         }
         some() {
           this.off("hi",this.hi); //detach event
         }
        }
         */


        _proto.off = function off(eventName, handlerToDetach) {
          // All event detach.
          if (isUndefined$1(eventName)) {
            this._eventHandler = {};
            return this;
          } // All handler of specific event detach.


          if (isUndefined$1(handlerToDetach)) {
            if (typeof eventName === "string") {
              this._eventHandler[eventName] = undefined;
              return this;
            } else {
              var eventHash = eventName;
              var name;

              for (name in eventHash) {
                this.off(name, eventHash[name]);
              }

              return this;
            }
          } // The handler of specific event detach.


          var handlerList = this._eventHandler[eventName];

          if (handlerList) {
            var k;
            var handlerFunction;

            for (k = 0; (handlerFunction = handlerList[k]) !== undefined; k++) {
              if (handlerFunction === handlerToDetach) {
                handlerList = handlerList.splice(k, 1);
                break;
              }
            }
          }

          return this;
        };

        return Component;
      }();

      Component.VERSION = "2.1.2";
      return Component;
    }();

    /*
    Copyright (c) 2018 Daybrush
    @name: @daybrush/utils
    license: MIT
    author: Daybrush
    repository: https://github.com/daybrush/utils
    @version 0.5.2
    */
    /**
    * get string "object"
    * @memberof Consts
    * @example
    import {OBJECT} from "@daybrush/utils";

    console.log(OBJECT); // "object"
    */

    var OBJECT$1 = "object";
    /**
    * get string "undefined"
    * @memberof Consts
    * @example
    import {UNDEFINED} from "@daybrush/utils";

    console.log(UNDEFINED); // "undefined"
    */

    var UNDEFINED$1 = "undefined";
    /**
    * Check whether the environment is window or node.js.
    * @memberof Consts
    * @example
    import {IS_WINDOW} from "@daybrush/utils";

    console.log(IS_WINDOW); // false in node.js
    console.log(IS_WINDOW); // true in browser
    */

    var IS_WINDOW$1 = typeof window !== UNDEFINED$1;
    /**
    * Check whether the environment is window or node.js.
    * @memberof Consts
    * @name document
    * @example
    import {IS_WINDOW} from "@daybrush/utils";

    console.log(IS_WINDOW); // false in node.js
    console.log(IS_WINDOW); // true in browser
    */

    var doc$1 = typeof document !== UNDEFINED$1 && document;
    var prefixes$1 = ["webkit", "ms", "moz", "o"];
    /**
     * @namespace CrossBrowser
     */

    /**
    * Get a CSS property with a vendor prefix that supports cross browser.
    * @function
    * @param {string} property - A CSS property
    * @return {string} CSS property with cross-browser vendor prefix
    * @memberof CrossBrowser
    * @example
    import {getCrossBrowserProperty} from "@daybrush/utils";

    console.log(getCrossBrowserProperty("transform")); // "transform", "-ms-transform", "-webkit-transform"
    console.log(getCrossBrowserProperty("filter")); // "filter", "-webkit-filter"
    */

    var getCrossBrowserProperty$1 =
    /*#__PURE__*/
    function (property) {
      if (!doc$1) {
        return "";
      }

      var styles = (doc$1.body || doc$1.documentElement).style;
      var length = prefixes$1.length;

      if (typeof styles[property] !== UNDEFINED$1) {
        return property;
      }

      for (var i = 0; i < length; ++i) {
        var name = "-" + prefixes$1[i] + "-" + property;

        if (typeof styles[name] !== UNDEFINED$1) {
          return name;
        }
      }

      return "";
    };
    /**
    * get string "transfrom" with the vendor prefix.
    * @memberof CrossBrowser
    * @example
    import {TRANSFORM} from "@daybrush/utils";

    console.log(TRANSFORM); // "transform", "-ms-transform", "-webkit-transform"
    */


    var TRANSFORM$1 =
    /*#__PURE__*/
    getCrossBrowserProperty$1("transform");
    /**
    * get string "filter" with the vendor prefix.
    * @memberof CrossBrowser
    * @example
    import {FILTER} from "@daybrush/utils";

    console.log(FILTER); // "filter", "-ms-filter", "-webkit-filter"
    */

    var FILTER$1 =
    /*#__PURE__*/
    getCrossBrowserProperty$1("filter");
    /**
    * get string "animation" with the vendor prefix.
    * @memberof CrossBrowser
    * @example
    import {ANIMATION} from "@daybrush/utils";

    console.log(ANIMATION); // "animation", "-ms-animation", "-webkit-animation"
    */

    var ANIMATION$1 =
    /*#__PURE__*/
    getCrossBrowserProperty$1("animation");
    /**
    * get string "keyframes" with the vendor prefix.
    * @memberof CrossBrowser
    * @example
    import {KEYFRAMES} from "@daybrush/utils";

    console.log(KEYFRAMES); // "keyframes", "-ms-keyframes", "-webkit-keyframes"
    */

    var KEYFRAMES$1 =
    /*#__PURE__*/
    ANIMATION$1.replace("animation", "keyframes");
    /**
    * Check the type that the value is object.
    * @memberof Utils
    * @param {string} value - Value to check the type
    * @return {} true if the type is correct, false otherwise
    * @example
    import {isObject} from "@daybrush/utils";

    console.log(isObject({})); // true
    console.log(isObject(undefined)); // false
    console.log(isObject("")); // false
    console.log(isObject(null)); // false
    */


    function isObject$1(value) {
      return value && typeof value === OBJECT$1;
    }
    /**
    * Check the type that the value is isArray.
    * @memberof Utils
    * @param {string} value - Value to check the type
    * @return {} true if the type is correct, false otherwise
    * @example
    import {isArray} from "@daybrush/utils";

    console.log(isArray([])); // true
    console.log(isArray({})); // false
    console.log(isArray(undefined)); // false
    console.log(isArray(null)); // false
    */


    function isArray$1(value) {
      return Array.isArray(value);
    }
    /**
    * divide text by space.
    * @memberof Utils
    * @param {string} text - text to divide
    * @return {Array} divided texts
    * @example
    import {spliceSpace} from "@daybrush/utils";

    console.log(splitSpace("a b c d e f g"));
    // ["a", "b", "c", "d", "e", "f", "g"]
    console.log(splitSpace("'a,b' c 'd,e' f g"));
    // ["'a,b'", "c", "'d,e'", "f", "g"]
    */


    function splitSpace$1(text) {
      // divide comma(,)
      var matches = text.match(/("[^"]*")|('[^']*')|([^\s()]*(?:\((?:[^()]*|\([^()]*\))*\))[^\s()]*)|\S+/g);
      return matches || [];
    }
    /**
    * divide text by bracket "(", ")".
    * @memberof Utils
    * @param {string} text - text to divide
    * @return {object} divided texts
    * @example
    import {splitBracket} from "@daybrush/utils";

    console.log(splitBracket("a(1, 2)"));
    // {prefix: "a", value: "1, 2", suffix: ""}
    console.log(splitBracket("a(1, 2)b"));
    // {prefix: "a", value: "1, 2", suffix: "b"}
    */


    function splitBracket$1(text) {
      var matches = /([^(]*)\(([\s\S]*)\)([\s\S]*)/g.exec(text);

      if (!matches || matches.length < 4) {
        return {};
      } else {
        return {
          prefix: matches[1],
          value: matches[2],
          suffix: matches[3]
        };
      }
    }
    /**
    * divide text by number and unit.
    * @memberof Utils
    * @param {string} text - text to divide
    * @return {} divided texts
    * @example
    import {splitUnit} from "@daybrush/utils";

    console.log(splitUnit("10px"));
    // {prefix: "", value: 10, unit: "px"}
    console.log(splitUnit("-10px"));
    // {prefix: "", value: -10, unit: "px"}
    console.log(splitUnit("a10%"));
    // {prefix: "a", value: 10, unit: "%"}
    */


    function splitUnit$1(text) {
      var matches = /^([^\d|e|\-|\+]*)((?:\d|\.|-|e-|e\+)+)(\S*)$/g.exec(text);

      if (!matches) {
        return {
          prefix: "",
          unit: "",
          value: NaN
        };
      }

      var prefix = matches[1];
      var value = matches[2];
      var unit = matches[3];
      return {
        prefix: prefix,
        unit: unit,
        value: parseFloat(value)
      };
    }
    /**
    * Date.now() method
    * @memberof CrossBrowser
    * @return {number} milliseconds
    * @example
    import {now} from "@daybrush/utils";

    console.log(now()); // 12121324241(milliseconds)
    */


    function now$1() {
      return Date.now ? Date.now() : new Date().getTime();
    }
    /**
    * window.requestAnimationFrame() method with cross browser.
    * @function
    * @memberof CrossBrowser
    * @param {FrameRequestCallback} callback - The function to call when it's time to update your animation for the next repaint.
    * @return {number} id
    * @example
    import {requestAnimationFrame} from "@daybrush/utils";

    requestAnimationFrame((timestamp) => {
      console.log(timestamp);
    });
    */


    var requestAnimationFrame$1 =
    /*#__PURE__*/
    function () {
      var firstTime = now$1();
      var raf = IS_WINDOW$1 && (window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame);
      return raf ? raf.bind(window) : function (callback) {
        var currTime = now$1();
        var id = window.setTimeout(function () {
          callback(currTime - firstTime);
        }, 1000 / 60);
        return id;
      };
    }();
    /**
     * Returns all element descendants of node that
     * match selectors.
     */

    /**
     * Checks if the specified class value exists in the element's class attribute.
     * @memberof DOM
     * @param - A DOMString containing one or more selectors to match
     * @param - If multi is true, a DOMString containing one or more selectors to match against.
     * @example
    import {$} from "@daybrush/utils";

    console.log($("div")); // div element
    console.log($("div", true)); // [div, div] elements
    */


    function $$1(selectors, multi) {
      return multi ? doc$1.querySelectorAll(selectors) : doc$1.querySelector(selectors);
    }

    /*
    Copyright (c) 2018 Daybrush
    name: @daybrush/page
    license: MIT
    author: Daybrush
    repository: https://github.com/daybrush/page.git
    version: 0.2.0
    */
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

    var extendStatics$1 = function (d, b) {
      extendStatics$1 = Object.setPrototypeOf || {
        __proto__: []
      } instanceof Array && function (d, b) {
        d.__proto__ = b;
      } || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
      };

      return extendStatics$1(d, b);
    };

    function __extends$1(d, b) {
      extendStatics$1(d, b);

      function __() {
        this.constructor = d;
      }

      d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    }

    var width = 0;
    var height = 0;

    function resize() {
      width = window.innerWidth;
      height = window.innerHeight;
    }

    window.addEventListener("resize", resize);
    resize();
    var WindowSize = {
      get width() {
        return width;
      },

      get height() {
        return height;
      }

    };
    /**
     * You can check the page in and out of the screen.
     * @extends eg.Component
     * @sort 1
     * @example
    const page = new Page(".page1", {
      range: ["0%", "100%"],
      margin: [0, 0],
      // Registers events automatically.
      events: ["resize", "scroll"]
    });
     */

    var Page =
    /*#__PURE__*/
    function (_super) {
      __extends$1(Page, _super);
      /**
       */


      function Page(el, options) {
        if (options === void 0) {
          options = {};
        }

        var _this = _super.call(this) || this;

        _this.ranges = {};
        _this._range = [0, "100%"];
        _this.horizontal = false;
        _this.margin = [0, 0];
        _this.pages = [];
        _this.state = {
          enter: false,
          firstEnter: false,
          firstExit: false
        };
        /**
         * @method
         */

        _this.scroll = function () {
          _this.triggerEvent("scroll");

          _this.onCheck();
        };
        /**
         * @method
         */


        _this.resize = function () {
          _this.triggerEvent("resize");

          _this.onCheck();
        };

        _this.el = el ? isObject$1(el) ? el : $$1(el) : null;

        if ("range" in options) {
          var range = options.range;
          var rangeArr = isArray$1(range) ? range : [range, range];
          _this._range = rangeArr;
        }

        if ("margin" in options) {
          var margin = options.margin;

          if (isArray$1(margin)) {
            _this.margin = margin;
          } else {
            _this.margin = [margin, margin];
          }
        }

        if ("events" in options) {
          options.events.forEach(function (name) {
            if (name === "resize") {
              window.addEventListener("resize", _this.resize);
            } else if (name === "scroll") {
              window.addEventListener("scroll", _this.scroll);
            } else {
              _this.el && _this.el.addEventListener(name, _this.scroll);
            }
          });
        }

        if ("horizontal" in options) {
          _this.horizontal = options.horizontal;
        }

        return _this;
      }
      /**
       */


      var __proto = Page.prototype;

      __proto.add = function (page) {
        this.pages.push(page);
        return this;
      };
      /**
       */


      __proto.range = function (range, horizontal) {
        if (range === void 0) {
          range = [0, "100%"];
        }

        var rangeArr = isArray$1(range) ? range : [range, range];
        var id = "[" + rangeArr.join(",") + "]";

        if (this.ranges[id]) {
          return this.ranges[id];
        }

        var page = new Page(this.el, {
          range: rangeArr,
          horizontal: horizontal
        });
        this.ranges[id] = page;
        this.add(page);
        return page;
      };

      __proto.triggerEvent = function (name) {
        this.trigger(name, {
          target: this.el
        });
      };

      __proto.onEnter = function (rect) {
        var _this = this;

        var state = this.state;

        if (!state.enter) {
          state.enter = true;

          if (!state.firstEnter) {
            state.firstEnter = true;
            /**
             * An event that occurs when you first enter a page.
             * @param {Page.EventParameter} event - Event object
             * @event Page#firstEnter
             */

            this.triggerEvent("firstEnter");
          }
          /**
           * An event that occurs when you enter a page.
           * @param {Page.EventParameter} event - Event object
           * @event Page#enter
           */


          this.triggerEvent("enter");
        }

        this.pages.forEach(function (page) {
          page.onCheck(page.el === _this.el ? rect : undefined);
        });
      };

      __proto.onExit = function () {
        var state = this.state;

        if (state.enter) {
          state.enter = false;

          if (!state.firstExit) {
            state.firstExit = true;
            /**
             * An event that occurs when you first exit a page.
             * @param {Page.EventParameter} event - Event object
             * @event Page#firstExit
             */

            this.triggerEvent("firstExit");
          }
          /**
           * An event that occurs when you exit a page.
           * @param {Page.EventParameter} event - Event object
           * @event Page#exit
           */


          this.triggerEvent("exit");
        }

        this.pages.forEach(function (page) {
          page.onExit();
        });
      };

      __proto.calcSize = function (size, rect) {
        if (typeof size === "number") {
          return size;
        }

        var sizeInfos = splitSpace$1(size);

        if (!sizeInfos) {
          return 0;
        }

        var length = sizeInfos.length;
        var stack = [];
        var sign = 1;

        for (var i = 0; i < length; ++i) {
          var v = sizeInfos[i];

          if (v === "+") {
            sign = 1;
          } else if (v === "-") {
            sign = -1;
          } else if (v === "*") {
            stack.push((stack.pop() || 0) * this._calcSize(sizeInfos[i + 1], rect));
            ++i;
          } else if (v === "/") {
            stack.push((stack.pop() || 0) / this._calcSize(sizeInfos[i + 1], rect));
            ++i;
          } else {
            stack.push(sign * this._calcSize(v, rect));
            sign = 1;
          }
        }

        return stack.reduce(function (prev, cur) {
          return prev + cur;
        }, 0);
      };
      /**
       */


      __proto.getRect = function (isAbsolute) {
        var rect = this.el ? this.el.getBoundingClientRect() : undefined;

        if (!rect) {
          return;
        }

        var width$$1 = rect.width;
        var height$$1 = rect.height;
        var left = rect.left + (isAbsolute ? document.body.scrollLeft || document.documentElement.scrollLeft : 0);
        var top = rect.top + (isAbsolute ? document.body.scrollTop || document.documentElement.scrollTop : 0);
        return {
          top: top,
          left: left,
          width: width$$1,
          height: height$$1
        };
      };

      __proto.onCheck = function (rect) {
        if (rect === void 0) {
          rect = this.getRect();
        }

        if (rect) {
          var horizontal = this.horizontal;
          var pos = rect[horizontal ? "left" : "top"];
          var containerSize = WindowSize[horizontal ? "width" : "height"];
          var rangeStart = this.calcSize(this._range[0], rect);
          var rangeEnd = this.calcSize(this._range[1], rect);
          var marginStart = this.calcSize(this.margin[0], rect);
          var marginEnd = this.calcSize(this.margin[1], rect);

          if (pos + rangeEnd + marginEnd <= 0 || pos + rangeStart - marginStart >= containerSize) {
            this.onExit();
          } else {
            this.onEnter(rect);
          }
        } else {
          this.pages.forEach(function (page) {
            page.onCheck();
          });
        }
      };

      __proto._calcSize = function (size, rect) {
        if (!size) {
          return 0;
        }

        if (typeof size === "number") {
          return size;
        }

        var horizontal = this.horizontal;
        var sizeName = horizontal ? "width" : "height";

        if (size === "window") {
          return WindowSize[sizeName];
        }

        if (size.indexOf("(") > -1) {
          return this.calcSize(splitBracket$1(size).value, rect);
        }

        var info = splitUnit$1(size);

        if (info.unit === "%") {
          return rect[sizeName] * info.value / 100;
        } else {
          return info.value;
        }
      };

      return Page;
    }(Component);
    /**
     * @sort 2
     * @example
    import Page from "@daybrush/page";

    const pages = new Page.s({
      events: ["scroll", "resize"];
    });

    pages.add(new Page(".page1"));

    pages.scroll();
     */


    var Pages =
    /*#__PURE__*/
    function (_super) {
      __extends$1(Pages, _super);
      /**
       */


      function Pages(options) {
        if (options === void 0) {
          options = {};
        }

        return _super.call(this, undefined, options) || this;
      }

      return Pages;
    }(Page);

    Page.s = Pages;

    var manager = new Page.s({
      events: ["resize", "scroll"]
    });
    var pages = [];
    function add(page) {
      pages.push(page);
      manager.add(page);
    }
    function scroll() {
      manager.scroll();
    }

    /*
    Copyright (c) 2018 Daybrush
    @name: @daybrush/utils
    license: MIT
    author: Daybrush
    repository: https://github.com/daybrush/utils
    @version 0.7.0-rc
    */

    /**
    * @namespace
    * @name Consts
    */

    /**
    * get string "rgb"
    * @memberof Color
    * @example
    import {RGB} from "@daybrush/utils";

    console.log(RGB); // "rgb"
    */
    var RGB$2 = "rgb";
    /**
    * get string "rgba"
    * @memberof Color
    * @example
    import {RGBA} from "@daybrush/utils";

    console.log(RGBA); // "rgba"
    */

    var RGBA$2 = "rgba";
    /**
    * get string "hsl"
    * @memberof Color
    * @example
    import {HSL} from "@daybrush/utils";

    console.log(HSL); // "hsl"
    */

    var HSL$2 = "hsl";
    /**
    * get string "hsla"
    * @memberof Color
    * @example
    import {HSLA} from "@daybrush/utils";

    console.log(HSLA); // "hsla"
    */

    var HSLA$2 = "hsla";
    /**
    * gets an array of color models.
    * @memberof Color
    * @example
    import {COLOR_MODELS} from "@daybrush/utils";

    console.log(COLOR_MODELS); // ["rgb", "rgba", "hsl", "hsla"];
    */

    var COLOR_MODELS$2 = [RGB$2, RGBA$2, HSL$2, HSLA$2];
    /**
    * get string "function"
    * @memberof Consts
    * @example
    import {FUNCTION} from "@daybrush/utils";

    console.log(FUNCTION); // "function"
    */

    var FUNCTION$2 = "function";
    /**
    * get string "property"
    * @memberof Consts
    * @example
    import {PROPERTY} from "@daybrush/utils";

    console.log(PROPERTY); // "property"
    */

    var PROPERTY$2 = "property";
    /**
    * get string "array"
    * @memberof Consts
    * @example
    import {ARRAY} from "@daybrush/utils";

    console.log(ARRAY); // "array"
    */

    var ARRAY$2 = "array";
    /**
    * get string "object"
    * @memberof Consts
    * @example
    import {OBJECT} from "@daybrush/utils";

    console.log(OBJECT); // "object"
    */

    var OBJECT$2 = "object";
    /**
    * get string "string"
    * @memberof Consts
    * @example
    import {STRING} from "@daybrush/utils";

    console.log(STRING); // "string"
    */

    var STRING$2 = "string";
    /**
    * get string "number"
    * @memberof Consts
    * @example
    import {NUMBER} from "@daybrush/utils";

    console.log(NUMBER); // "number"
    */

    var NUMBER$2 = "number";
    /**
    * get string "undefined"
    * @memberof Consts
    * @example
    import {UNDEFINED} from "@daybrush/utils";

    console.log(UNDEFINED); // "undefined"
    */

    var UNDEFINED$2 = "undefined";
    /**
    * Check whether the environment is window or node.js.
    * @memberof Consts
    * @example
    import {IS_WINDOW} from "@daybrush/utils";

    console.log(IS_WINDOW); // false in node.js
    console.log(IS_WINDOW); // true in browser
    */

    var IS_WINDOW$2 = typeof window !== UNDEFINED$2;
    /**
    * Check whether the environment is window or node.js.
    * @memberof Consts
    * @name document
    * @example
    import {IS_WINDOW} from "@daybrush/utils";

    console.log(IS_WINDOW); // false in node.js
    console.log(IS_WINDOW); // true in browser
    */

    var doc$2 = typeof document !== UNDEFINED$2 && document;
    var prefixes$2 = ["webkit", "ms", "moz", "o"];
    /**
     * @namespace CrossBrowser
     */

    /**
    * Get a CSS property with a vendor prefix that supports cross browser.
    * @function
    * @param {string} property - A CSS property
    * @return {string} CSS property with cross-browser vendor prefix
    * @memberof CrossBrowser
    * @example
    import {getCrossBrowserProperty} from "@daybrush/utils";

    console.log(getCrossBrowserProperty("transform")); // "transform", "-ms-transform", "-webkit-transform"
    console.log(getCrossBrowserProperty("filter")); // "filter", "-webkit-filter"
    */

    var getCrossBrowserProperty$2 =
    /*#__PURE__*/
    function (property) {
      if (!doc$2) {
        return "";
      }

      var styles = (doc$2.body || doc$2.documentElement).style;
      var length = prefixes$2.length;

      if (typeof styles[property] !== UNDEFINED$2) {
        return property;
      }

      for (var i = 0; i < length; ++i) {
        var name = "-" + prefixes$2[i] + "-" + property;

        if (typeof styles[name] !== UNDEFINED$2) {
          return name;
        }
      }

      return "";
    };
    /**
    * get string "transfrom" with the vendor prefix.
    * @memberof CrossBrowser
    * @example
    import {TRANSFORM} from "@daybrush/utils";

    console.log(TRANSFORM); // "transform", "-ms-transform", "-webkit-transform"
    */


    var TRANSFORM$2 =
    /*#__PURE__*/
    getCrossBrowserProperty$2("transform");
    /**
    * get string "filter" with the vendor prefix.
    * @memberof CrossBrowser
    * @example
    import {FILTER} from "@daybrush/utils";

    console.log(FILTER); // "filter", "-ms-filter", "-webkit-filter"
    */

    var FILTER$2 =
    /*#__PURE__*/
    getCrossBrowserProperty$2("filter");
    /**
    * get string "animation" with the vendor prefix.
    * @memberof CrossBrowser
    * @example
    import {ANIMATION} from "@daybrush/utils";

    console.log(ANIMATION); // "animation", "-ms-animation", "-webkit-animation"
    */

    var ANIMATION$2 =
    /*#__PURE__*/
    getCrossBrowserProperty$2("animation");
    /**
    * get string "keyframes" with the vendor prefix.
    * @memberof CrossBrowser
    * @example
    import {KEYFRAMES} from "@daybrush/utils";

    console.log(KEYFRAMES); // "keyframes", "-ms-keyframes", "-webkit-keyframes"
    */

    var KEYFRAMES$2 =
    /*#__PURE__*/
    ANIMATION$2.replace("animation", "keyframes");
    /**
    * @namespace
    * @name Utils
    */

    /**
    * Check the type that the value is undefined.
    * @memberof Utils
    * @param {string} value - Value to check the type
    * @return {boolean} true if the type is correct, false otherwise
    * @example
    import {isUndefined} from "@daybrush/utils";

    console.log(isUndefined(undefined)); // true
    console.log(isUndefined("")); // false
    console.log(isUndefined(1)); // false
    console.log(isUndefined(null)); // false
    */

    function isUndefined$3(value) {
      return typeof value === UNDEFINED$2;
    }
    /**
    * Check the type that the value is object.
    * @memberof Utils
    * @param {string} value - Value to check the type
    * @return {} true if the type is correct, false otherwise
    * @example
    import {isObject} from "@daybrush/utils";

    console.log(isObject({})); // true
    console.log(isObject(undefined)); // false
    console.log(isObject("")); // false
    console.log(isObject(null)); // false
    */


    function isObject$2(value) {
      return value && typeof value === OBJECT$2;
    }
    /**
    * Check the type that the value is isArray.
    * @memberof Utils
    * @param {string} value - Value to check the type
    * @return {} true if the type is correct, false otherwise
    * @example
    import {isArray} from "@daybrush/utils";

    console.log(isArray([])); // true
    console.log(isArray({})); // false
    console.log(isArray(undefined)); // false
    console.log(isArray(null)); // false
    */


    function isArray$2(value) {
      return Array.isArray(value);
    }
    /**
    * Check the type that the value is string.
    * @memberof Utils
    * @param {string} value - Value to check the type
    * @return {} true if the type is correct, false otherwise
    * @example
    import {isString} from "@daybrush/utils";

    console.log(isString("1234")); // true
    console.log(isString(undefined)); // false
    console.log(isString(1)); // false
    console.log(isString(null)); // false
    */


    function isString$2(value) {
      return typeof value === STRING$2;
    }
    /**
    * Check the type that the value is function.
    * @memberof Utils
    * @param {string} value - Value to check the type
    * @return {} true if the type is correct, false otherwise
    * @example
    import {isFunction} from "@daybrush/utils";

    console.log(isFunction(function a() {})); // true
    console.log(isFunction(() => {})); // true
    console.log(isFunction("1234")); // false
    console.log(isFunction(1)); // false
    console.log(isFunction(null)); // false
    */


    function isFunction$2(value) {
      return typeof value === FUNCTION$2;
    }
    /**
    * divide text by space.
    * @memberof Utils
    * @param {string} text - text to divide
    * @return {Array} divided texts
    * @example
    import {spliceSpace} from "@daybrush/utils";

    console.log(splitSpace("a b c d e f g"));
    // ["a", "b", "c", "d", "e", "f", "g"]
    console.log(splitSpace("'a,b' c 'd,e' f g"));
    // ["'a,b'", "c", "'d,e'", "f", "g"]
    */


    function splitSpace$2(text) {
      // divide comma(,)
      var matches = text.match(/("[^"]*")|('[^']*')|([^\s()]*(?:\((?:[^()]*|\([^()]*\))*\))[^\s()]*)|\S+/g);
      return matches || [];
    }
    /**
    * divide text by comma.
    * @memberof Utils
    * @param {string} text - text to divide
    * @return {Array} divided texts
    * @example
    import {splitComma} from "@daybrush/utils";

    console.log(splitComma("a,b,c,d,e,f,g"));
    // ["a", "b", "c", "d", "e", "f", "g"]
    console.log(splitComma("'a,b',c,'d,e',f,g"));
    // ["'a,b'", "c", "'d,e'", "f", "g"]
    */


    function splitComma$2(text) {
      // divide comma(,)
      // "[^"]*"|'[^']*'
      var matches = text.match(/("[^"]*"|'[^']*'|[^,\s()]*\((?:[^()]*|\([^()]*\))*\)[^,\s()]*|[^,])+/g);
      return matches ? matches.map(function (str) {
        return str.trim();
      }) : [];
    }
    /**
    * divide text by bracket "(", ")".
    * @memberof Utils
    * @param {string} text - text to divide
    * @return {object} divided texts
    * @example
    import {splitBracket} from "@daybrush/utils";

    console.log(splitBracket("a(1, 2)"));
    // {prefix: "a", value: "1, 2", suffix: ""}
    console.log(splitBracket("a(1, 2)b"));
    // {prefix: "a", value: "1, 2", suffix: "b"}
    */


    function splitBracket$2(text) {
      var matches = /([^(]*)\(([\s\S]*)\)([\s\S]*)/g.exec(text);

      if (!matches || matches.length < 4) {
        return {};
      } else {
        return {
          prefix: matches[1],
          value: matches[2],
          suffix: matches[3]
        };
      }
    }
    /**
    * divide text by number and unit.
    * @memberof Utils
    * @param {string} text - text to divide
    * @return {} divided texts
    * @example
    import {splitUnit} from "@daybrush/utils";

    console.log(splitUnit("10px"));
    // {prefix: "", value: 10, unit: "px"}
    console.log(splitUnit("-10px"));
    // {prefix: "", value: -10, unit: "px"}
    console.log(splitUnit("a10%"));
    // {prefix: "a", value: 10, unit: "%"}
    */


    function splitUnit$2(text) {
      var matches = /^([^\d|e|\-|\+]*)((?:\d|\.|-|e-|e\+)+)(\S*)$/g.exec(text);

      if (!matches) {
        return {
          prefix: "",
          unit: "",
          value: NaN
        };
      }

      var prefix = matches[1];
      var value = matches[2];
      var unit = matches[3];
      return {
        prefix: prefix,
        unit: unit,
        value: parseFloat(value)
      };
    }
    /**
    * transform strings to camel-case
    * @memberof Utils
    * @param {String} text - string
    * @return {String} camel-case string
    * @example
    import {camelize} from "@daybrush/utils";

    console.log(camelize("transform-origin")); // transformOrigin
    console.log(camelize("abcd_efg")); // abcdEfg
    console.log(camelize("abcd efg")); // abcdEfg
    */


    function camelize$2(str) {
      return str.replace(/[\s-_]([a-z])/g, function (all, letter) {
        return letter.toUpperCase();
      });
    }
    /**
    * transform a camelized string into a lowercased string.
    * @memberof Utils
    * @param {string} text - a camel-cased string
    * @param {string} [separator="-"] - a separator
    * @return {string}  a lowercased string
    * @example
    import {decamelize} from "@daybrush/utils";

    console.log(decamelize("transformOrigin")); // transform-origin
    console.log(decamelize("abcdEfg", "_")); // abcd_efg
    */


    function decamelize$2(str, separator) {
      if (separator === void 0) {
        separator = "-";
      }

      return str.replace(/([a-z])([A-Z])/g, function (all, letter, letter2) {
        return "" + letter + separator + letter2.toLowerCase();
      });
    }
    /**
    * transforms something in an array into an array.
    * @memberof Utils
    * @param - Array form
    * @return an array
    * @example
    import {toArray} from "@daybrush/utils";

    const arr1 = toArray(document.querySelectorAll(".a")); // Element[]
    const arr2 = toArray(document.querySelectorAll<HTMLElement>(".a")); // HTMLElement[]
    */


    function toArray(value) {
      return [].slice.call(value);
    }
    /**
    * Date.now() method
    * @memberof CrossBrowser
    * @return {number} milliseconds
    * @example
    import {now} from "@daybrush/utils";

    console.log(now()); // 12121324241(milliseconds)
    */


    function now$2() {
      return Date.now ? Date.now() : new Date().getTime();
    }
    /**
    * window.requestAnimationFrame() method with cross browser.
    * @function
    * @memberof CrossBrowser
    * @param {FrameRequestCallback} callback - The function to call when it's time to update your animation for the next repaint.
    * @return {number} id
    * @example
    import {requestAnimationFrame} from "@daybrush/utils";

    requestAnimationFrame((timestamp) => {
      console.log(timestamp);
    });
    */


    var requestAnimationFrame$2 =
    /*#__PURE__*/
    function () {
      var firstTime = now$2();
      var raf = IS_WINDOW$2 && (window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame);
      return raf ? raf.bind(window) : function (callback) {
        var currTime = now$2();
        var id = window.setTimeout(function () {
          callback(currTime - firstTime);
        }, 1000 / 60);
        return id;
      };
    }();
    /**
    * @namespace
    * @name Color
    */

    /**
    * Remove the # from the hex color.
    * @memberof Color
    * @param {} hex - hex color
    * @return {} hex color
    * @example
    import {cutHex} from "@daybrush/utils";

    console.log(cutHex("#000000")) // "000000"
    */


    function cutHex$2(hex) {
      return hex.replace("#", "");
    }
    /**
    * convert hex color to rgb color.
    * @memberof Color
    * @param {} hex - hex color
    * @return {} rgb color
    * @example
    import {hexToRGBA} from "@daybrush/utils";

    console.log(hexToRGBA("#00000005"));
    // [0, 0, 0, 1]
    console.log(hexToRGBA("#201045"));
    // [32, 16, 69, 1]
    */


    function hexToRGBA$2(hex) {
      var h = cutHex$2(hex);
      var r = parseInt(h.substring(0, 2), 16);
      var g = parseInt(h.substring(2, 4), 16);
      var b = parseInt(h.substring(4, 6), 16);
      var a = parseInt(h.substring(6, 8), 16) / 255;

      if (isNaN(a)) {
        a = 1;
      }

      return [r, g, b, a];
    }
    /**
    * convert 3(or 4)-digit hex color to 6(or 8)-digit hex color.
    * @memberof Color
    * @param {} hex - 3(or 4)-digit hex color
    * @return {} 6(or 8)-digit hex color
    * @example
    import {toFullHex} from "@daybrush/utils";

    console.log(toFullHex("#123")); // "#112233"
    console.log(toFullHex("#123a")); // "#112233aa"
    */


    function toFullHex$2(h) {
      var r = h.charAt(1);
      var g = h.charAt(2);
      var b = h.charAt(3);
      var a = h.charAt(4);
      var arr = ["#", r, r, g, g, b, b, a, a];
      return arr.join("");
    }
    /**
    * convert hsl color to rgba color.
    * @memberof Color
    * @param {} hsl - hsl color(hue: 0 ~ 360, saturation: 0 ~ 1, lightness: 0 ~ 1, alpha: 0 ~ 1)
    * @return {} rgba color
    * @example
    import {hslToRGBA} from "@daybrush/utils";

    console.log(hslToRGBA([150, 0.5, 0.4]));
    // [51, 153, 102, 1]
    */


    function hslToRGBA$2(hsl) {
      var h = hsl[0];
      var s = hsl[1];
      var l = hsl[2];

      if (h < 0) {
        h += Math.floor((Math.abs(h) + 360) / 360) * 360;
      }

      h %= 360;
      var c = (1 - Math.abs(2 * l - 1)) * s;
      var x = c * (1 - Math.abs(h / 60 % 2 - 1));
      var m = l - c / 2;
      var rgb;

      if (h < 60) {
        rgb = [c, x, 0];
      } else if (h < 120) {
        rgb = [x, c, 0];
      } else if (h < 180) {
        rgb = [0, c, x];
      } else if (h < 240) {
        rgb = [0, x, c];
      } else if (h < 300) {
        rgb = [x, 0, c];
      } else if (h < 360) {
        rgb = [c, 0, x];
      }

      var result = [Math.round((rgb[0] + m) * 255), Math.round((rgb[1] + m) * 255), Math.round((rgb[2] + m) * 255), hsl.length > 3 ? hsl[3] : 1];
      return result;
    }
    /**
    * convert string to rgba color.
    * @memberof Color
    * @param {} - 3-hex(#000), 4-hex(#0000) 6-hex(#000000), 8-hex(#00000000) or RGB(A), or HSL(A)
    * @return {} rgba color
    * @example
    import {stringToRGBA} from "@daybrush/utils";

    console.log(stringToRGBA("#000000")); // [0, 0, 0, 1]
    console.log(stringToRGBA("rgb(100, 100, 100)")); // [100, 100, 100, 1]
    console.log(stringToRGBA("hsl(150, 0.5, 0.4)")); // [51, 153, 102, 1]
    */


    function stringToRGBA$2(color) {
      if (color.charAt(0) === "#") {
        if (color.length === 4 || color.length === 5) {
          return hexToRGBA$2(toFullHex$2(color));
        } else {
          return hexToRGBA$2(color);
        }
      } else if (color.indexOf("(") !== -1) {
        // in bracket.
        var _a = splitBracket$2(color),
            prefix = _a.prefix,
            value = _a.value;

        if (!prefix || !value) {
          return;
        }

        var arr = splitComma$2(value);
        var colorArr = [];
        var length = arr.length;

        switch (prefix) {
          case RGB$2:
          case RGBA$2:
            for (var i = 0; i < length; ++i) {
              colorArr[i] = parseFloat(arr[i]);
            }

            return colorArr;

          case HSL$2:
          case HSLA$2:
            for (var i = 0; i < length; ++i) {
              if (arr[i].indexOf("%") !== -1) {
                colorArr[i] = parseFloat(arr[i]) / 100;
              } else {
                colorArr[i] = parseFloat(arr[i]);
              }
            } // hsl, hsla to rgba


            return hslToRGBA$2(colorArr);
        }
      }

      return;
    }
    /**
     * Returns all element descendants of node that
     * match selectors.
     */

    /**
     * Checks if the specified class value exists in the element's class attribute.
     * @memberof DOM
     * @param - A DOMString containing one or more selectors to match
     * @param - If multi is true, a DOMString containing one or more selectors to match against.
     * @example
    import {$} from "@daybrush/utils";

    console.log($("div")); // div element
    console.log($("div", true)); // [div, div] elements
    */


    function $$2(selectors, multi) {
      return multi ? doc$2.querySelectorAll(selectors) : doc$2.querySelector(selectors);
    }
    /**
    * Checks if the specified class value exists in the element's class attribute.
    * @memberof DOM
    * @param element - target
    * @param className - the class name to search
    * @return {boolean} return false if the class is not found.
    * @example
    import {hasClass} from "@daybrush/utils";

    console.log(hasClass(element, "start")); // true or false
    */


    function hasClass$2(element, className) {
      if (element.classList) {
        return element.classList.contains(className);
      }

      return !!element.className.match(new RegExp("(\\s|^)" + className + "(\\s|$)"));
    }
    /**
    * Add the specified class value. If these classe already exist in the element's class attribute they are ignored.
    * @memberof DOM
    * @param element - target
    * @param className - the class name to add
    * @example
    import {addClass} from "@daybrush/utils";

    addClass(element, "start");
    */


    function addClass$2(element, className) {
      if (element.classList) {
        element.classList.add(className);
      } else {
        element.className += " " + className;
      }
    }
    /**
    * Removes the specified class value.
    * @memberof DOM
    * @param element - target
    * @param className - the class name to remove
    * @example
    import {removeClass} from "@daybrush/utils";

    removeClass(element, "start");
    */


    function removeClass$2(element, className) {
      if (element.classList) {
        element.classList.remove(className);
      } else {
        var reg = new RegExp("(\\s|^)" + className + "(\\s|$)");
        element.className = element.className.replace(reg, " ");
      }
    }
    /**
    * Gets the CSS properties from the element.
    * @memberof DOM
    * @param elements - elements
    * @param properites - the CSS properties
    * @return returns CSS properties and values.
    * @example
    import {fromCSS} from "@daybrush/utils";

    console.log(fromCSS(element, ["left", "opacity", "top"])); // {"left": "10px", "opacity": 1, "top": "10px"}
    */


    function fromCSS$2(elements, properties) {
      if (!elements || !properties || !properties.length) {
        return {};
      }

      var element;

      if (elements instanceof Element) {
        element = elements;
      } else if (elements.length) {
        element = elements[0];
      } else {
        return {};
      }

      var cssObject = {};
      var styles = window.getComputedStyle(element);
      var length = properties.length;

      for (var i = 0; i < length; ++i) {
        cssObject[properties[i]] = styles[properties[i]];
      }

      return cssObject;
    }
    /**
    * Sets up a function that will be called whenever the specified event is delivered to the target
    * @memberof DOM
    * @param - event target
    * @param - A case-sensitive string representing the event type to listen for.
    * @param - The object which receives a notification (an object that implements the Event interface) when an event of the specified type occurs
    * @param - An options object that specifies characteristics about the event listener. The available options are:
    * @example
    import {addEvent} from "@daybrush/utils";

    addEvent(el, "click", e => {
      console.log(e);
    });
    */


    function addEvent(el, type, listener, options) {
      el.addEventListener(type, listener, options);
    }
    /**
    * removes from the EventTarget an event listener previously registered with EventTarget.addEventListener()
    * @memberof DOM
    * @param - event target
    * @param - A case-sensitive string representing the event type to listen for.
    * @param - The EventListener function of the event handler to remove from the event target.
    * @example
    import {addEvent, removeEvent} from "@daybrush/utils";
    const listener = e => {
      console.log(e);
    };
    addEvent(el, "click", listener);
    removeEvent(el, "click", listener);
    */


    function removeEvent(el, type, listener) {
      el.removeEventListener(type, listener);
    }

    var clapper = document.querySelector(".clapper");

    function makeShadow(element, func, options, left, top) {
      if (left === void 0) {
        left = 10;
      }

      if (top === void 0) {
        top = 15;
      }

      var target = func(__assign({
        left: left,
        top: top,
        opacity: 1
      }, options));
      func(__assign({
        left: left * 2,
        top: top * 2,
        opacity: 0.2
      }, options), target);
      element.appendChild(target);
      return target;
    }

    var radius = 50;

    for (var i = 1; i <= 6; ++i) {
      var size = 170 - (i - 1) * 20;
      var stroke = radius * 12 / size;
      var ir = radius - stroke;
      var target = makeShadow(clapper, oval, {
        "className": "svg_circle svg_circle" + i + " center",
        "r": ir,
        "strokeWidth": stroke,
        "strokeLinejoin": "round",
        "stroke-linecap": "round",
        "stroke": "#333",
        "rotate": -360,
        "origin": "50% 50%"
      }, 5, 5);
      target.style.cssText = "width: " + size + "px; height: " + size + "px;";
    }

    makeShadow(clapper, poly, {
      className: "play_btn back",
      side: 3,
      width: 60,
      strokeWidth: 8,
      strokeLinejoin: "round",
      rotate: 90,
      stroke: "#333",
      fill: "#333",
      origin: "50% 50%"
    });
    makeShadow(clapper, poly, {
      className: "play_btn front",
      side: 3,
      width: 60,
      strokeWidth: 8,
      strokeLinejoin: "round",
      rotate: 90,
      stroke: "#333",
      fill: "#333",
      origin: "50% 50%"
    });
    var nextStep = 2.6;
    var nextStep2 = nextStep + 3;
    var nextStep3 = nextStep2 + 1.6;
    var EASE_IN_OUT = Scene.EASE_IN_OUT;
    var scene = new Scene({
      ".logo1 .scene1.circle": function (i) {
        return {
          0: {
            transform: "scale(0)"
          },
          0.2: {
            "border-width": "50px"
          },
          0.5: {
            opacity: 1
          },
          1: {
            "transform": "scale(1)",
            "border-width": "0px",
            "opacity": 0
          },
          options: {
            delay: i * 0.4
          }
        };
      },
      ".logo1 ellipse": function (i, el) {
        var opacity = el.getAttribute("opacity");
        var index = Math.floor(i / 2);
        return _a = {
          0: {
            "opacity": 0,
            "stroke-dasharray": "0 1000",
            "transform": "scaleX(" + (index % 2 ? -1 : 1) + ") rotate(" + (-90 + index * 180) + "deg)"
          },
          0.1: {
            opacity: opacity
          }
        }, _a[0.6] = {
          "stroke-dasharray": 70 + " 1000",
          "stroke-dashoffset": 0
        }, _a[1.1 - index * 0.06] = {
          opacity: opacity
        }, _a[1.2 - index * 0.06] = {
          "stroke-dashoffset": -76,
          "stroke-dasharray": "0 1000",
          "transform": "rotate(" + (180 + index * 180) + "deg)",
          "opacity": 0
        }, _a.options = {
          delay: nextStep + index * 0.16
        }, _a;

        var _a;
      },
      ".play_btn.back": {
        0: {
          transform: "translate(-50%, -50%) translate2(3px) scale(1)"
        },
        1: {
          transform: "scale(0.5)"
        },
        2: {
          transform: "scale(1)"
        },
        options: {
          delay: nextStep + 1
        }
      },
      ".play_btn.front": {
        0: {
          transform: "translate(-50%, -50%) translate2(3px) scale(0)"
        },
        1: {
          transform: "scale(1)"
        },
        options: {
          delay: nextStep + 2.4
        }
      },
      ".play_circle": {
        0: {
          transform: "translate(-50%, -50%) scale(0)"
        },
        1: {
          transform: "scale(1)"
        },
        options: {
          delay: nextStep + 2.1
        }
      },
      ".background": {
        0: {
          transform: "translate(-50%, -50%) scale(0)"
        },
        1: {
          transform: "scale(1)"
        },
        options: {
          delay: nextStep + 1.8
        }
      },
      ".stick1 .rect": function (i) {
        return {
          0: {
            transform: {
              scale: 0,
              skew: "15deg"
            }
          },
          0.7: {
            transform: {
              scale: 1
            }
          },
          options: {
            delay: nextStep2 - 0.2 + i * 0.22
          }
        };
      },
      ".stick2 .rect": function (i) {
        return {
          0: {
            transform: {
              scale: 0,
              skew: "-15deg"
            }
          },
          0.7: {
            transform: {
              scale: 1
            }
          },
          options: {
            delay: nextStep2 + i * 0.22
          }
        };
      },
      ".stick1": {
        0: {
          transform: {
            rotate: "0deg"
          }
        },
        0.5: {
          transform: {
            rotate: "-20deg"
          }
        },
        1: {
          transform: {
            rotate: "0deg"
          }
        },
        1.5: {
          transform: {
            rotate: "-10deg"
          }
        },
        options: {
          delay: nextStep3,
          easing: EASE_IN_OUT
        }
      },
      ".logo1 .clapper": {
        0: {
          transform: "rotate(0deg)"
        },
        0.5: {
          transform: "rotate(-15deg)"
        },
        1: {
          transform: "rotate(0deg)"
        },
        1.5: {
          transform: "rotate(-10deg)"
        },
        options: {
          delay: nextStep3,
          easing: EASE_IN_OUT
        }
      },
      ".logo1 .character .left": function (i) {
        return {
          0: {
            transform: {
              translateX: "-100%"
            }
          },
          1: {
            transform: {
              translateX: "0%"
            }
          },
          options: {
            delay: nextStep2 + i * 0.1
          }
        };
      },
      ".logo1 .character .right": function (i) {
        return {
          0: {
            transform: {
              translateX: "100%"
            }
          },
          1: {
            transform: {
              translateX: "0%"
            }
          },
          options: {
            delay: nextStep2 + i * 0.1
          }
        };
      },
      ".logo1 .description p span": function (i) {
        return {
          0: {
            transform: {
              translateY: "-100%"
            }
          },
          1: {
            transform: {
              translateY: "0%"
            }
          },
          options: {
            delay: nextStep3 + 0.5 + i * 0.2
          }
        };
      }
    }, {
      easing: EASE_IN_OUT,
      selector: true
    });
    var clapperSound = document.querySelector("audio");
    var mediaScene = new MediaScene(scene.getDuration(), {
      "./clapper.mp3": (_a = {}, _a[nextStep3 + 0.9] = {
        seek: [0, 1],
        playSpeed: 2,
        volume: 0.7
      }, _a.options = {
        element: clapperSound
      }, _a)
    });
    addEvent($$2(".play_btn.front"), "click", function () {
      scene.playCSS(false);
      mediaScene.play();
    });
    var page1 = new Page(".page.page1");
    page1.range(["10%", "90%"]).on({
      firstEnter: function () {
        scene.exportCSS();
      },
      enter: function () {
        scene.playCSS(false);
        mediaScene.play();
      }
    });
    page1.on("exit", function () {
      scene.finish();
      mediaScene.finish();
    });
    add(page1);

    var _a;

    new Scene({
      ".page2 .icon1 .lang": function (i) {
        return {
          0: {
            "border-color": "#f55",
            "color": "#f55"
          },
          0.5: {
            "border-color": "#f55",
            "color": "#f55"
          },
          1.5: {
            "border-color": "#fff",
            "color": "#fff"
          },
          2: {
            "border-color": "#fff",
            "color": "#fff"
          },
          options: {
            direction: i ? "alternate-reverse" : "alternate",
            iterationCount: "infinite"
          }
        };
      }
    }, {
      easing: Scene.EASE_IN_OUT,
      selector: true
    }).setTime(0).exportCSS({
      selector: function (_, selector) {
        return ".page2 [data-feature=\"play\"]:hover .icon1 " + selector;
      }
    });
    new Scene({
      ".page2 .icon2 .thumb": {
        0: {
          transform: {
            translate: "-50%, -50%",
            translate2: "0px"
          }
        },
        1: {
          transform: {
            translate2: "100px"
          }
        }
      }
    }, {
      iterationCount: "infinite",
      direction: "alternate",
      easing: Scene.EASE_IN_OUT,
      selector: true
    }).exportCSS({
      selector: ".page2 [data-feature=\"progress\"]:hover .icon2 .thumb"
    });
    new Scene({
      ".page2 .icon3 svg path": {
        "0": {
          "stroke-dasharray": "4450 4450"
        },
        "0>": {
          "stroke-dasharray": "0 5000"
        },
        "0.8": {
          "stroke-dasharray": "1400 5000"
        },
        "1.6": {
          "stroke-dasharray": "2500 4450"
        },
        "2.7": {
          "stroke-dasharray": "4450 4450"
        },
        "3": {}
      }
    }, {
      iterationCount: "infinite",
      easing: Scene.EASE_IN,
      selector: true
    }).exportCSS({
      selector: ".page2 [data-feature=\"svg\"]:hover .icon3 path"
    }).setTime(0);
    new Scene({
      ".page2 .icon4 .play_bar": {
        0: {
          left: "0%"
        },
        2: {
          left: "100%"
        }
      }
    }, {
      iterationCount: "infinite",
      easing: Scene.LINEAR,
      selector: true
    }).exportCSS({
      selector: ".page2 [data-feature=\"timeline\"]:hover .icon4 .play_bar"
    });
    var valueFeatureElement = $$2(".page2 [data-feature=\"value\"]");
    Scene.setRole(["text"], true);
    var icon5Scene = new Scene({
      ".slide": function (i) {
        return {
          1.5: {
            transform: "translateY(-50%) translate(" + i * 100 + "%)"
          },
          2.5: {
            transform: "translate(" + (i - 1) * 100 + "%)"
          },
          4: {
            transform: "translateY(-50%) translate(" + (i - 1) * 100 + "%)"
          },
          5: {
            transform: "translate(" + (i - 2) * 100 + "%)"
          },
          options: {
            easing: Scene.EASE_IN_OUT
          }
        };
      },
      ".slide:nth-child(1) .target": {
        0: {
          opacity: 1
        },
        1: {
          opacity: 0
        }
      },
      ".slide:nth-child(2) .target": {
        0: {
          "background-color": "rgb(255, 255, 255)"
        },
        1: {
          "background-color": "rgb(255, 90, 90)"
        },
        options: {
          delay: 2.5
        }
      },
      ".slide:nth-child(3) .target": {
        0: {
          "font-weight": "bold",
          "background": "transparent",
          "text": ""
        },
        0.12: {
          text: "S"
        },
        0.24: {
          text: "Sc"
        },
        0.36: {
          text: "Sce"
        },
        0.48: {
          text: "Scen"
        },
        0.60: {
          text: "Scene"
        },
        0.72: {
          text: "Scene."
        },
        0.84: {
          text: "Scene.j"
        },
        0.96: {
          text: "Scene.js"
        },
        2: {},
        options: {
          delay: 5
        }
      }
    }, {
      iterationCount: "infinite",
      selector: true
    }).setTime(0);
    var descriptionElements = toArray($$2(".page2 .slide .sub_description", true));
    icon5Scene.getItem(".slide:nth-child(1) .target").on("animate", function (e) {
      var el = descriptionElements[0];
      el.innerHTML = "opacity: " + e.frame.get("opacity").toFixed(2);
    });
    icon5Scene.getItem(".slide:nth-child(2) .target").on("animate", function (e) {
      var el = descriptionElements[1];
      el.innerHTML = "" + e.frame.get("background-color");
    });
    icon5Scene.getItem(".slide:nth-child(3) .target").on("animate", function (e) {
      var el = e.currentTarget.elements[0];
      el.innerHTML = "" + e.frame.get("text");
    });
    addEvent(valueFeatureElement, "mouseenter", function () {
      icon5Scene.getPlayState() !== "running" && icon5Scene.play();
    });
    addEvent(valueFeatureElement, "mouseleave", function () {
      icon5Scene.pause();
    });
    var page2 = new Page(".page.page2");
    add(page2);

    var page3 = new Page(".page.page3");
    add(page3);

    var page4 = new Page(".page.page4");
    add(page4);

    var PREFIX = "__SCENEJS_";
    var DATA_SCENE_ID = "data-scene-id";
    var TIMING_FUNCTION = "animation-timing-function";
    var ROLES = {
      transform: {},
      filter: {},
      attribute: {}
    };
    var ALIAS = {
      easing: [TIMING_FUNCTION]
    };
    var FIXED = (_a$1 = {}, _a$1[TIMING_FUNCTION] = true, _a$1.contents = true, _a$1);
    var MAXIMUM = 1000000;
    var THRESHOLD = 0.000001;
    var DURATION = "duration";
    var FILL_MODE = "fillMode";
    var DIRECTION = "direction";
    var ITERATION_COUNT = "iterationCount";
    var DELAY = "delay";
    var EASING = "easing";
    var PLAY_SPEED = "playSpeed";
    var EASING_NAME = "easingName";
    var ITERATION_TIME = "iterationTime";
    var PAUSED = "paused";
    var ENDED = "ended";
    var TIMEUPDATE = "timeupdate";
    var PLAY = "play";
    var RUNNING = "running";
    var ITERATION = "iteration";
    var START_ANIMATION = "startAnimation";
    var PAUSE_ANIMATION = "pauseAnimation";
    var ALTERNATE = "alternate";
    var REVERSE = "reverse";
    var ALTERNATE_REVERSE = "alternate-reverse";
    var NORMAL = "normal";
    var INFINITE = "infinite";
    var PLAY_STATE = "playState";
    var PLAY_CSS = "playCSS";
    var PREV_TIME = "prevTime";
    var TICK_TIME = "tickTime";
    var CURRENT_TIME = "currentTime";
    var SELECTOR = "selector";
    var TRANSFORM_NAME = "transform";
    /**
    * option name list
    * @name Scene.OPTIONS
    * @memberof Scene
    * @static
    * @type {$ts:OptionType}
    * @example
    * Scene.OPTIONS // ["duration", "fillMode", "direction", "iterationCount", "delay", "easing", "playSpeed"]
    */

    var OPTIONS = [DURATION, FILL_MODE, DIRECTION, ITERATION_COUNT, DELAY, EASING, PLAY_SPEED];

    var _a$1;

    /**
    * attach and trigger event handlers.
    */

    var EventTrigger =
    /** @class */
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

      var __proto = EventTrigger.prototype;

      __proto._on = function (name, callback, once) {
        var _this = this;

        var events = this.events;

        if (isObject$2(name)) {
          for (var n in name) {
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

        if (isArray$2(callback)) {
          callback.forEach(function (func) {
            return _this._on(name, func, once);
          });
          return;
        }

        events[name].push(once ? function callback2() {
          var args = [];

          for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
          }

          callback.apply(void 0, args);
          this.off(name, callback2);
        } : callback);
      };
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


      __proto.on = function (name, callback) {
        this._on(name, callback);

        return this;
      };
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


      __proto.off = function (name, callback) {
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
        * @param - event's name
        * @param - event handler's additional parameter
        * @return {EventTrigger} An Instance itself.
        * @example
      target.on("animate", function(a1, a2) {
        console.log("animate", a1, a2);
      });
      target.trigger("animate", [1, 2]); // log => "animate", 1, 2
         */


      __proto.trigger = function (name) {
        var _this = this;

        var data = [];

        for (var _i = 1; _i < arguments.length; _i++) {
          data[_i - 1] = arguments[_i];
        }

        var events = this.events;

        if (!(name in events)) {
          return this;
        }

        var args = data || [];
        !args[0] && (args[0] = {});
        var event = events[name];
        var target = args[0];
        target.type = name;
        target.currentTarget = this;
        !target.target && (target.target = this);
        toArray(events[name]).forEach(function (callback) {
          callback.apply(_this, data);
        });
        return this;
      };

      __proto.once = function (name, callback) {
        this._on(name, callback, true);

        return this;
      };

      return EventTrigger;
    }();

    function cubic(y1, y2, t) {
      var t2 = 1 - t; // Bezier Curve Formula

      return t * t * t + 3 * t * t * t2 * y2 + 3 * t * t2 * t2 * y1;
    }

    function solveFromX(x1, x2, x) {
      // x  0 ~ 1
      // t 0 ~ 1
      var t = x;
      var solveX = x;
      var dx = 1;

      while (Math.abs(dx) > 1 / 1000) {
        // 예상 t초에 의한 _x값
        solveX = cubic(x1, x2, t);
        dx = solveX - x; // 차이가 미세하면 그 값을 t로 지정

        if (Math.abs(dx) < 1 / 1000) {
          return t;
        }

        t -= dx / 2;
      }

      return t;
    }
    /**
     * @namespace easing
     */

    /**
    * Cubic Bezier curve.
    * @memberof easing
    * @func bezier
    * @param {number} [x1] - point1's x
    * @param {number} [y1] - point1's y
    * @param {number} [x2] - point2's x
    * @param {number} [y2] - point2's y
    * @return {function} the curve function
    * @example
    import {bezier} from "scenejs";
    Scene.bezier(0, 0, 1, 1) // LINEAR
    Scene.bezier(0.25, 0.1, 0.25, 1) // EASE
    */


    function bezier(x1, y1, x2, y2) {
      /*
            x = f(t)
            calculate inverse function by x
            t = f-1(x)
        */
      var func = function (x) {
        var t = solveFromX(x1, x2, Math.max(Math.min(1, x), 0));
        return cubic(y1, y2, t);
      };

      func.easingName = "cubic-bezier(" + x1 + "," + y1 + "," + x2 + "," + y2 + ")";
      return func;
    }
    /**
    * Linear Speed (0, 0, 1, 1)
    * @memberof easing
    * @name LINEAR
    * @static
    * @type {function}
    * @example
    import {LINEAR} from "scenejs";
    Scene.LINEAR
    */

    var LINEAR =
    /*#__PURE__#*/
    bezier(0, 0, 1, 1);
    /**
    * Ease Speed (0.25, 0.1, 0.25, 1)
    * @memberof easing
    * @name EASE
    * @static
    * @type {function}
    * @example
    import {EASE} from "scenejs";
    Scene.EASE
    */

    var EASE =
    /*#__PURE__#*/
    bezier(0.25, 0.1, 0.25, 1);
    /**
    * Ease In Speed (0.42, 0, 1, 1)
    * @memberof easing
    * @name EASE_IN
    * @static
    * @type {function}
    * @example
    import {EASE_IN} from "scenejs";
    Scene.EASE_IN
    */

    var EASE_IN =
    /*#__PURE__#*/
    bezier(0.42, 0, 1, 1);
    /**
    * Ease Out Speed (0, 0, 0.58, 1)
    * @memberof easing
    * @name EASE_OUT
    * @static
    * @type {function}
    * @example
    import {EASE_OUT} from "scenejs";
    Scene.EASE_OUT
    */

    var EASE_OUT =
    /*#__PURE__#*/
    bezier(0, 0, 0.58, 1);
    /**
    * Ease In Out Speed (0.42, 0, 0.58, 1)
    * @memberof easing
    * @name EASE_IN_OUT
    * @static
    * @type {function}
    * @example
    import {EASE_IN_OUT} from "scenejs";
    Scene.EASE_IN_OUT
    */

    var EASE_IN_OUT$1 =
    /*#__PURE__#*/
    bezier(0.42, 0, 0.58, 1);

    /**
    * Make string, array to PropertyObject for the dot product
    */

    var PropertyObject =
    /** @class */
    function () {
      /**
        * @param - This value is in the array format.
        * @param - options
        * @example
      var obj = new PropertyObject([100,100,100,0.5], {
        "separator" : ",",
        "prefix" : "rgba(",
        "suffix" : ")"
      });
         */
      function PropertyObject(value, options) {
        this.prefix = "";
        this.suffix = "";
        this.model = "";
        this.type = "";
        this.separator = ",";
        options && this.setOptions(options);
        this.value = isString$2(value) ? value.split(this.separator) : value;
      }

      var __proto = PropertyObject.prototype;

      __proto.setOptions = function (newOptions) {
        for (var name in newOptions) {
          this[name] = newOptions[name];
        }

        return this;
      };
      /**
        * the number of values.
        * @example
      const obj1 = new PropertyObject("1,2,3", ",");
      console.log(obj1.length);
      // 3
         */


      __proto.size = function () {
        return this.value.length;
      };
      /**
        * retrieve one of values at the index
        * @param {Number} index - index
        * @return {Object} one of values at the index
        * @example
      const obj1 = new PropertyObject("1,2,3", ",");
      console.log(obj1.get(0));
      // 1
         */


      __proto.get = function (index) {
        return this.value[index];
      };
      /**
        * Set the value at that index
        * @param {Number} index - index
        * @param {Object} value - text, a number, object to set
        * @return {PropertyObject} An instance itself
        * @example
      const obj1 = new PropertyObject("1,2,3", ",");
      obj1.set(0, 2);
      console.log(obj1.toValue());
      // 2,2,3
         */


      __proto.set = function (index, value) {
        this.value[index] = value;
        return this;
      };
      /**
        * create a copy of an instance itself.
        * @return {PropertyObject} clone
        * @example
      const obj1 = new PropertyObject("1,2,3", ",");
      const obj2 = obj1.clone();
         */


      __proto.clone = function () {
        var _a = this,
            separator = _a.separator,
            prefix = _a.prefix,
            suffix = _a.suffix,
            model = _a.model,
            type = _a.type;

        var arr = this.value.map(function (v) {
          return v instanceof PropertyObject ? v.clone() : v;
        });
        return new PropertyObject(arr, {
          separator: separator,
          prefix: prefix,
          suffix: suffix,
          model: model,
          type: type
        });
      };
      /**
        * Make Property Object to String
        * @return {String} Make Property Object to String
        * @example
      //rgba(100, 100, 100, 0.5)
      const obj4 = new PropertyObject([100,100,100,0.5], {
        "separator" : ",",
        "prefix" : "rgba(",
        "suffix" : ")",
      });
      console.log(obj4.toValue());
      // "rgba(100,100,100,0.5)"
        */


      __proto.toValue = function () {
        return this.prefix + this.join() + this.suffix;
      };
      /**
        * Make Property Object's array to String
        * @return {String} Join the elements of an array into a string
        * @example
        //rgba(100, 100, 100, 0.5)
        var obj4 = new PropertyObject([100,100,100,0.5], {
            "separator" : ",",
            "prefix" : "rgba(",
            "suffix" : ")"
        });
        obj4.join();  // =>   "100,100,100,0.5"
         */


      __proto.join = function () {
        return this.value.map(function (v) {
          return v instanceof PropertyObject ? v.toValue() : v;
        }).join(this.separator);
      };
      /**
        * executes a provided function once per array element.
        * @param {Function} callback - Function to execute for each element, taking three arguments
        * @param {All} [callback.currentValue] The current element being processed in the array.
        * @param {Number} [callback.index] The index of the current element being processed in the array.
        * @param {Array} [callback.array] the array.
        * @return {PropertyObject} An instance itself
        * @see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach|MDN Array.forEach()} reference to MDN document.
        * @example
      //rgba(100, 100, 100, 0.5)
      var obj4 = new PropertyObject([100,100,100,0.5], {
        "separator" : ",",
        "prefix" : "rgba(",
        "suffix" : ")"
      });
      obj4.forEach(t => {
        console.log(t);
      });  // =>   "100,100,100,0.5"
        */


      __proto.forEach = function (func) {
        this.value.forEach(func);
        return this;
      };

      return PropertyObject;
    }();

    function isPropertyObject(value) {
      return value instanceof PropertyObject;
    }
    function getType(value) {
      var type = typeof value;

      if (type === OBJECT$2) {
        if (isArray$2(value)) {
          return ARRAY$2;
        } else if (isPropertyObject(value)) {
          return PROPERTY$2;
        }
      } else if (type === STRING$2 || type === NUMBER$2) {
        return "value";
      }

      return type;
    }
    function toFixed(num) {
      return Math.round(num * MAXIMUM) / MAXIMUM;
    }
    function getValueByNames(names, properties, length) {
      if (length === void 0) {
        length = names.length;
      }

      var value = properties;

      for (var i = 0; i < length; ++i) {
        if (!isObject$2(value)) {
          return undefined;
        }

        value = value[names[i]];
      }

      return value;
    }
    function isInProperties(roles, args, isCheckTrue) {
      var length = args.length;
      var role = roles;

      if (length === 0) {
        return false;
      }

      for (var i = 0; i < length; ++i) {
        if (role === true) {
          return false;
        }

        role = role[args[i]];

        if (!role || !isCheckTrue && role === true) {
          return false;
        }
      }

      return true;
    }
    function isRole(args, isCheckTrue) {
      return isInProperties(ROLES, args, isCheckTrue);
    }
    function isFixed(args) {
      return isInProperties(FIXED, args, true);
    }
    function setPlayCSS(item, isActivate) {
      item.state[PLAY_CSS] = isActivate;
    }
    function isPausedCSS(item) {
      return item.state[PLAY_CSS] && item.isPaused();
    }
    function isEndedCSS(item) {
      return !item.isEnded() && item.state[PLAY_CSS];
    }
    function exportCSS(id, css) {
      var styleId = PREFIX + "STYLE_" + toId(id);
      var styleElement = $$2("#" + styleId);

      if (styleElement) {
        styleElement.innerText = css;
      } else {
        doc$2.body.insertAdjacentHTML("beforeend", "<style id=\"" + styleId + "\">" + css + "</style>");
      }
    }
    function makeId(selector) {
      for (;;) {
        var id = "" + Math.floor(Math.random() * 10000000);

        if (!IS_WINDOW$2 || !selector) {
          return id;
        }

        var checkElement = $$2("[data-scene-id=\"" + id + "\"]");

        if (!checkElement) {
          return id;
        }
      }
    }
    function getRealId(item) {
      return item.getId() || item.setId(makeId(false)).getId();
    }
    function toId(text) {
      return ("" + text).match(/[0-9a-zA-Z]+/g).join("");
    }
    function playCSS(item, isExportCSS, playClassName, properties) {
      if (properties === void 0) {
        properties = {};
      }

      if (!ANIMATION$2 || item.getPlayState() === RUNNING) {
        return;
      }

      var className = playClassName || START_ANIMATION;

      if (isPausedCSS(item)) {
        item.addPlayClass(true, className, properties);
      } else {
        if (item.isEnded()) {
          item.setTime(0);
        }

        isExportCSS && item.exportCSS({
          className: className
        });
        var el = item.addPlayClass(false, className, properties);

        if (!el) {
          return;
        }

        addAnimationEvent(item, el);
        setPlayCSS(item, true);
      }

      item.setPlayState(RUNNING);
    }
    function findIndex(arr, callback, defaultIndex) {
      if (defaultIndex === void 0) {
        defaultIndex = -1;
      }

      var length = arr.length;

      for (var i = 0; i < length; ++i) {
        if (callback(arr[i])) {
          return i;
        }
      }

      return defaultIndex;
    }
    function find(arr, callback, defalutValue) {
      var index = findIndex(arr, callback);
      return index > -1 ? arr[index] : defalutValue;
    }
    function addAnimationEvent(item, el) {
      var state = item.state;
      var duration = item.getDuration();
      var isZeroDuration = !duration || !isFinite(duration);

      var animationend = function () {
        setPlayCSS(item, false);
        item.finish();
      };

      var animationstart = function () {
        item.trigger(PLAY);
      };

      item.once(ENDED, function () {
        removeEvent(el, "animationcancel", animationend);
        removeEvent(el, "animationend", animationend);
        removeEvent(el, "animationiteration", animationiteration);
        removeEvent(el, "animationstart", animationstart);
      });

      var animationiteration = function (_a) {
        var elapsedTime = _a.elapsedTime;
        var currentTime = elapsedTime;
        var iterationCount = isZeroDuration ? 0 : currentTime / duration;
        state[CURRENT_TIME] = currentTime;
        item.setIteration(iterationCount);
      };

      addEvent(el, "animationcancel", animationend);
      addEvent(el, "animationend", animationend);
      addEvent(el, "animationiteration", animationiteration);
      addEvent(el, "animationstart", animationstart);
    }

    function GetterSetter(getter, setter, parent) {
      return function (constructor) {
        var prototype = constructor.prototype;
        getter.forEach(function (name) {
          prototype[camelize$2("get " + name)] = function () {
            return this[parent][name];
          };
        });
        setter.forEach(function (name) {
          prototype[camelize$2("set " + name)] = function (value) {
            this[parent][name] = value;
            return this;
          };
        });
      };
    }

    function tick(animator, now, to) {
      if (animator.isPaused()) {
        return;
      }

      var state = animator.state;
      var playSpeed = state[PLAY_SPEED];
      var prevTime = state[PREV_TIME];
      var delay = state[DELAY];
      var tickTime = state[TICK_TIME];
      var currentTime = tickTime + Math.min(1000, now - prevTime) / 1000 * playSpeed;
      state[PREV_TIME] = now;
      animator.setTime(currentTime - delay, true);

      if (to && to * 1000 < now) {
        animator.pause();
      }

      if (state[PLAY_STATE] === PAUSED) {
        return;
      }

      requestAnimationFrame$2(function (time) {
        tick(animator, time, to);
      });
    }

    function isDirectionReverse(iteration, iteraiontCount, direction) {
      if (direction === REVERSE) {
        return true;
      } else if (iteraiontCount !== INFINITE && iteration === iteraiontCount && iteraiontCount % 1 === 0) {
        return direction === (iteration % 2 >= 1 ? ALTERNATE_REVERSE : ALTERNATE);
      }

      return direction === (iteration % 2 >= 1 ? ALTERNATE : ALTERNATE_REVERSE);
    }
    /**
    * @typedef {Object} AnimatorState The Animator options. Properties used in css animation.
    * @property {number} [duration] The duration property defines how long an animation should take to complete one cycle.
    * @property {"none"|"forwards"|"backwards"|"both"} [fillMode] The fillMode property specifies a style for the element when the animation is not playing (before it starts, after it ends, or both).
    * @property {"infinite"|number} [iterationCount] The iterationCount property specifies the number of times an animation should be played.
    * @property {array|function} [easing] The easing(timing-function) specifies the speed curve of an animation.
    * @property {number} [delay] The delay property specifies a delay for the start of an animation.
    * @property {"normal"|"reverse"|"alternate"|"alternate-reverse"} [direction] The direction property defines whether an animation should be played forwards, backwards or in alternate cycles.
    */

    var setters = ["id", ITERATION_COUNT, DELAY, FILL_MODE, DIRECTION, PLAY_SPEED, DURATION, PLAY_SPEED, ITERATION_TIME, PLAY_STATE];
    var getters = setters.concat([EASING, EASING_NAME]);
    /**
    * play video, animation, the others
    * @extends EventTrigger
    * @see {@link https://www.w3schools.com/css/css3_animations.asp|CSS3 Animation}
    */

    var Animator =
    /** @class */
    function (_super) {
      __extends(Animator, _super);
      /**
       * @param - animator's options
       * @example
      const animator = new Animator({
        delay: 2,
        diretion: "alternate",
        duration: 2,
        fillMode: "forwards",
        iterationCount: 3,
        easing: Scene.easing.EASE,
      });
       */


      function Animator(options) {
        var _this = _super.call(this) || this;

        _this.state = {
          id: "",
          easing: 0,
          easingName: "linear",
          iterationCount: 1,
          delay: 0,
          fillMode: "forwards",
          direction: NORMAL,
          playSpeed: 1,
          currentTime: 0,
          iterationTime: -1,
          iteration: 0,
          tickTime: 0,
          prevTime: 0,
          playState: PAUSED,
          duration: 0
        };

        _this.setOptions(options);

        return _this;
      }
      /**
        * set animator's easing.
        * @param curverArray - The speed curve of an animation.
        * @return {Animator} An instance itself.
        * @example
      animator.({
        delay: 2,
        diretion: "alternate",
        duration: 2,
        fillMode: "forwards",
        iterationCount: 3,
        easing: Scene.easing.EASE,
      });
        */


      var __proto = Animator.prototype;

      __proto.setEasing = function (curveArray) {
        var easing = isArray$2(curveArray) ? bezier(curveArray[0], curveArray[1], curveArray[2], curveArray[3]) : curveArray;
        var easingName = easing[EASING_NAME] || "linear";
        var state = this.state;
        state[EASING] = easing;
        state[EASING_NAME] = easingName;
        return this;
      };
      /**
        * set animator's options.
        * @see {@link https://www.w3schools.com/css/css3_animations.asp|CSS3 Animation}
        * @param - animator's options
        * @return {Animator} An instance itself.
        * @example
      animator.({
        delay: 2,
        diretion: "alternate",
        duration: 2,
        fillMode: "forwards",
        iterationCount: 3,
        easing: Scene.eaasing.EASE,
      });
        */


      __proto.setOptions = function (options) {
        if (options === void 0) {
          options = {};
        }

        for (var name in options) {
          var value = options[name];

          if (name === EASING) {
            this.setEasing(value);
            continue;
          } else if (name === DURATION) {
            value && this.setDuration(value);
            continue;
          }

          if (OPTIONS.indexOf(name) > -1) {
            this.state[name] = value;
          }
        }

        return this;
      };
      /**
        * Get the animator's total duration including delay
        * @return {number} Total duration
        * @example
      animator.getTotalDuration();
        */


      __proto.getTotalDuration = function () {
        return this.getActiveDuration(true);
      };
      /**
        * Get the animator's total duration excluding delay
        * @return {number} Total duration excluding delay
        * @example
      animator.getActiveDuration();
        */


      __proto.getActiveDuration = function (delay) {
        var state = this.state;
        var count = state[ITERATION_COUNT];

        if (count === INFINITE) {
          return Infinity;
        }

        return (delay ? state[DELAY] : 0) + this.getDuration() * count;
      };
      /**
        * Check if the animator has reached the end.
        * @return {boolean} ended
        * @example
      animator.isEnded(); // true or false
        */


      __proto.isEnded = function () {
        if (this.state[TICK_TIME] === 0 && this.state[PLAY_STATE] === PAUSED) {
          return true;
        } else if (this.getTime() < this.getActiveDuration()) {
          return false;
        }

        return true;
      };
      /**
        *Check if the animator is paused:
        * @return {boolean} paused
        * @example
      animator.isPaused(); // true or false
        */


      __proto.isPaused = function () {
        return this.state[PLAY_STATE] === PAUSED;
      };

      __proto.start = function (delay) {
        if (delay === void 0) {
          delay = this.state[DELAY];
        }

        var state = this.state;
        state[PLAY_STATE] = RUNNING;

        if (state[TICK_TIME] >= delay) {
          /**
           * This event is fired when play animator.
           * @event Animator#play
           */
          this.trigger(PLAY);
        }
      };
      /**
        * play animator
        * @return {Animator} An instance itself.
        */


      __proto.play = function (toTime) {
        var _this = this;

        var state = this.state;
        var delay = state[DELAY];
        var currentTime = this.getTime();
        state[PLAY_STATE] = RUNNING;

        if (this.isEnded() && (currentTime === 0 || currentTime >= this.getActiveDuration())) {
          this.setTime(-delay, true);
        }

        state[TICK_TIME] = this.getTime();
        requestAnimationFrame$2(function (time) {
          state[PREV_TIME] = time;
          tick(_this, time, toTime);
        });
        this.start();
        return this;
      };
      /**
        * pause animator
        * @return {Animator} An instance itself.
        */


      __proto.pause = function () {
        var state = this.state;

        if (state[PLAY_STATE] !== PAUSED) {
          state[PLAY_STATE] = PAUSED;
          /**
           * This event is fired when animator is paused.
           * @event Animator#paused
           */

          this.trigger(PAUSED);
        }

        return this;
      };
      /**
         * end animator
         * @return {Animator} An instance itself.
        */


      __proto.finish = function () {
        this.setTime(0);
        this.state[TICK_TIME] = 0;
        this.end();
        return this;
      };
      /**
         * end animator
         * @return {Animator} An instance itself.
        */


      __proto.end = function () {
        this.pause();
        /**
             * This event is fired when animator is ended.
             * @event Animator#ended
             */

        this.trigger(ENDED);
        return this;
      };
      /**
        * set currentTime
        * @param {Number|String} time - currentTime
        * @return {Animator} An instance itself.
        * @example
      animator.setTime("from"); // 0
      animator.setTime("to"); // 100%
      animator.setTime("50%");
      animator.setTime(10);
      animator.getTime() // 10
        */


      __proto.setTime = function (time, isTick) {
        var activeDuration = this.getActiveDuration();
        var state = this.state;
        var prevTime = state[TICK_TIME];
        var delay = state[DELAY];
        var currentTime = isTick ? time : this.getUnitTime(time);
        state[TICK_TIME] = delay + currentTime;

        if (currentTime < 0) {
          currentTime = 0;
        } else if (currentTime > activeDuration) {
          currentTime = activeDuration;
        }

        state[CURRENT_TIME] = currentTime;
        this.calculate();

        if (isTick) {
          var tickTime = state[TICK_TIME];

          if (prevTime < delay && time >= 0 || state[PLAY_STATE] !== RUNNING && tickTime >= delay && !this.isEnded()) {
            this.start(0);
          }

          if (tickTime < prevTime || this.isEnded()) {
            this.end();
            return;
          }
        }

        if (this.isDelay()) {
          return this;
        }
        /**
             * This event is fired when the animator updates the time.
             * @event Animator#timeupdate
             * @param {Object} param The object of data to be sent to an event.
             * @param {Number} param.currentTime The total time that the animator is running.
             * @param {Number} param.time The iteration time during duration that the animator is running.
             * @param {Number} param.iterationCount The iteration count that the animator is running.
             */


        this.trigger(TIMEUPDATE, {
          currentTime: currentTime,
          time: this.getIterationTime(),
          iterationCount: state[ITERATION]
        });
        return this;
      };
      /**
        * Get the animator's current time
        * @return {number} current time
        * @example
      animator.getTime();
        */


      __proto.getTime = function () {
        return this.state[CURRENT_TIME];
      };

      __proto.getUnitTime = function (time) {
        if (isString$2(time)) {
          var duration = this.getDuration() || 100;

          if (time === "from") {
            return 0;
          } else if (time === "to") {
            return duration;
          }

          var _a = splitUnit$2(time),
              unit = _a.unit,
              value = _a.value;

          if (unit === "%") {
            !this.getDuration() && (this.state[DURATION] = duration);
            return toFixed(parseFloat(time) / 100 * duration);
          } else if (unit === ">") {
            return value + THRESHOLD;
          } else {
            return value;
          }
        } else {
          return toFixed(time);
        }
      };
      /**
         * Check if the current state of animator is delayed.
         * @return {boolean} check delay state
         */


      __proto.isDelay = function () {
        var state = this.state;
        var delay = state[DELAY];
        var tickTime = state[TICK_TIME];
        return delay > 0 && tickTime < delay;
      };

      __proto.setIteration = function (iterationCount) {
        var state = this.state;
        var passIterationCount = Math.floor(iterationCount);
        var maxIterationCount = state[ITERATION_COUNT] === INFINITE ? Infinity : state[ITERATION_COUNT];

        if (state[ITERATION] < passIterationCount && passIterationCount < maxIterationCount) {
          /**
                * The event is fired when an iteration of an animation ends.
                * @event Animator#iteration
                * @param {Object} param The object of data to be sent to an event.
                * @param {Number} param.currentTime The total time that the animator is running.
                * @param {Number} param.iterationCount The iteration count that the animator is running.
                */
          this.trigger("iteration", {
            currentTime: state[CURRENT_TIME],
            iterationCount: passIterationCount
          });
        }

        state[ITERATION] = iterationCount;
        return this;
      };

      __proto.calculate = function () {
        var state = this.state;
        var iterationCount = state[ITERATION_COUNT];
        var fillMode = state[FILL_MODE];
        var direction = state[DIRECTION];
        var duration = this.getDuration();
        var time = this.getTime();
        var iteration = duration === 0 ? 0 : time / duration;
        var currentIterationTime = duration ? time % duration : 0;

        if (!duration) {
          this.setIterationTime(0);
          return this;
        }

        this.setIteration(iteration); // direction : normal, reverse, alternate, alternate-reverse
        // fillMode : forwards, backwards, both, none

        var isReverse = isDirectionReverse(iteration, iterationCount, direction);
        var isFiniteDuration = isFinite(duration);

        if (isFiniteDuration && isReverse) {
          currentIterationTime = duration - currentIterationTime;
        }

        if (isFiniteDuration && iterationCount !== INFINITE) {
          var isForwards = fillMode === "both" || fillMode === "forwards"; // fill forwards

          if (iteration >= iterationCount) {
            currentIterationTime = duration * (isForwards ? iterationCount % 1 || 1 : 0);
            isReverse && (currentIterationTime = duration - currentIterationTime);
          }
        }

        this.setIterationTime(currentIterationTime);
        return this;
      };

      Animator = __decorate([GetterSetter(getters, setters, "state")], Animator);
      return Animator;
    }(EventTrigger);

    /**
    * @namespace
    * @name Property
    */
    function splitStyle(str) {
      var properties = str.split(";");
      var obj = {};
      var length = properties.length;

      for (var i = 0; i < length; ++i) {
        var matches = /([^:]*):([\S\s]*)/g.exec(properties[i]);

        if (!matches || matches.length < 3 || !matches[1]) {
          --length;
          continue;
        }

        obj[matches[1].trim()] = toPropertyObject(matches[2].trim());
      }

      return {
        styles: obj,
        length: length
      };
    }
    /**
    * convert array to PropertyObject[type=color].
    * default model "rgba"
    * @memberof Property
    * @function arrayToColorObject
    * @param {Array|PropertyObject} value ex) [0, 0, 0, 1]
    * @return {PropertyObject} PropertyObject[type=color]
    * @example
    arrayToColorObject([0, 0, 0])
    // => PropertyObject(type="color", model="rgba", value=[0, 0, 0, 1], separator=",")
    */

    function arrayToColorObject(arr) {
      var model = RGBA$2;

      if (arr.length === 3) {
        arr[3] = 1;
      }

      return new PropertyObject(arr, {
        model: model,
        separator: ",",
        type: "color",
        prefix: model + "(",
        suffix: ")"
      });
    }
    /**
    * convert text with parentheses to object.
    * @memberof Property
    * @function stringToBracketObject
    * @param {String} value ex) "rgba(0,0,0,1)"
    * @return {PropertyObject} PropertyObject
    * @example
    stringToBracketObject("abcde(0, 0, 0,1)")
    // => PropertyObject(model="abcde", value=[0, 0, 0,1], separator=",")
    */

    function stringToBracketObject(text) {
      // [prefix, value, other]
      var _a = splitBracket$2(text),
          model = _a.prefix,
          value = _a.value,
          afterModel = _a.suffix;

      if (typeof value === "undefined") {
        return text;
      }

      if (COLOR_MODELS$2.indexOf(model) !== -1) {
        return arrayToColorObject(stringToRGBA$2(text));
      } // divide comma(,)


      var obj = toPropertyObject(value);
      var arr = [value];
      var separator = ",";
      var prefix = model + "(";
      var suffix = ")" + afterModel;

      if (obj instanceof PropertyObject) {
        separator = obj.separator;
        arr = obj.value;
        prefix += obj.prefix;
        suffix = obj.suffix + suffix;
      }

      return new PropertyObject(arr, {
        separator: separator,
        model: model,
        prefix: prefix,
        suffix: suffix
      });
    }
    function arrayToPropertyObject(arr, separator) {
      return new PropertyObject(arr, {
        type: "array",
        separator: separator
      });
    }
    /**
    * convert text with parentheses to PropertyObject[type=color].
    * If the values are not RGBA model, change them RGBA mdoel.
    * @memberof Property
    * @function stringToColorObject
    * @param {String|PropertyObject} value ex) "rgba(0,0,0,1)"
    * @return {PropertyObject} PropertyObject[type=color]
    * @example
    stringToColorObject("rgba(0, 0, 0,1)")
    // => PropertyObject(type="color", model="rgba", value=[0, 0, 0,1], separator=",")
    */

    function stringToColorObject(value) {
      var result = stringToRGBA$2(value);
      return result ? arrayToColorObject(result) : value;
    }
    function toPropertyObject(value) {
      if (!isString$2(value)) {
        if (isArray$2(value)) {
          return arrayToPropertyObject(value, ",");
        }

        return value;
      }

      var values = splitComma$2(value);

      if (values.length > 1) {
        return arrayToPropertyObject(values.map(function (v) {
          return toPropertyObject(v);
        }), ",");
      }

      values = splitSpace$2(value);

      if (values.length > 1) {
        return arrayToPropertyObject(values.map(function (v) {
          return toPropertyObject(v);
        }), " ");
      }

      values = /^(['"])([^'"]*)(['"])$/g.exec(value);

      if (values && values[1] === values[3]) {
        // Quotes
        return new PropertyObject([toPropertyObject(values[2])], {
          prefix: values[1],
          suffix: values[1]
        });
      } else if (value.indexOf("(") !== -1) {
        // color
        return stringToBracketObject(value);
      } else if (value.charAt(0) === "#") {
        return stringToColorObject(value);
      }

      return value;
    }
    function toObject(object, result) {
      if (result === void 0) {
        result = {};
      }

      var model = object.model;

      if (model) {
        object.setOptions({
          model: "",
          suffix: "",
          prefix: ""
        });
        var value = object.size() > 1 ? object : object.get(0);
        result[model] = value;
      } else {
        object.forEach(function (obj) {
          toObject(obj, result);
        });
      }

      return result;
    }

    function toInnerProperties(obj) {
      if (!obj) {
        return "";
      }

      var arrObj = [];

      for (var name in obj) {
        arrObj.push(name.replace(/\d/g, "") + "(" + obj[name] + ")");
      }

      return arrObj.join(" ");
    }
    /* eslint-disable */


    function clone(target, toValue) {
      if (toValue === void 0) {
        toValue = false;
      }

      return merge({}, target, toValue);
    }

    function merge(to, from, toValue) {
      if (toValue === void 0) {
        toValue = false;
      }

      for (var name in from) {
        var value = from[name];
        var type = getType(value);

        if (type === PROPERTY$2) {
          to[name] = toValue ? value.toValue() : value.clone();
        } else if (type === FUNCTION$2) {
          to[name] = toValue ? getValue([name], value) : value;
        } else if (type === ARRAY$2) {
          to[name] = value.slice();
        } else if (type === OBJECT$2) {
          if (isObject$2(to[name]) && !isPropertyObject(to[name])) {
            merge(to[name], value, toValue);
          } else {
            to[name] = clone(value, toValue);
          }
        } else {
          to[name] = from[name];
        }
      }

      return to;
    }
    /* eslint-enable */


    function getPropertyName(args) {
      return args[0] in ALIAS ? ALIAS[args[0]] : args;
    }

    function getValue(names, value) {
      var type = getType(value);

      if (type === PROPERTY$2) {
        return value.toValue();
      } else if (type === FUNCTION$2) {
        if (names[0] !== TIMING_FUNCTION) {
          return getValue(names, value());
        }
      } else if (type === OBJECT$2) {
        return clone(value, true);
      }

      return value;
    }
    /**
    * Animation's Frame
    */


    var Frame =
    /** @class */
    function () {
      /**
       * @param - properties
       * @example
      const frame = new Scene.Frame({
        display: "none"
        transform: {
            translate: "50px",
            scale: "5, 5",
        }
      });
       */
      function Frame(properties) {
        if (properties === void 0) {
          properties = {};
        }

        this.properties = {};
        this.set(properties);
      }
      /**
        * get property value
        * @param {...Number|String|PropertyObject} args - property name or value
        * @example
        frame.get("display") // => "none", "block", ....
        frame.get("transform", "translate") // => "10px,10px"
        */


      var __proto = Frame.prototype;

      __proto.get = function () {
        var args = [];

        for (var _i = 0; _i < arguments.length; _i++) {
          args[_i] = arguments[_i];
        }

        var value = this.raw.apply(this, args);
        return getValue(getPropertyName(args), value);
      };

      __proto.raw = function () {
        var args = [];

        for (var _i = 0; _i < arguments.length; _i++) {
          args[_i] = arguments[_i];
        }

        return getValueByNames(getPropertyName(args), this.properties);
      };
      /**
        * remove property value
        * @param {...String} args - property name
        * @return {Frame} An instance itself
        * @example
        frame.remove("display")
        */


      __proto.remove = function () {
        var args = [];

        for (var _i = 0; _i < arguments.length; _i++) {
          args[_i] = arguments[_i];
        }

        var params = getPropertyName(args);
        var length = params.length;

        if (!length) {
          return this;
        }

        var value = getValueByNames(params, this.properties, length - 1);

        if (isObject$2(value)) {
          delete value[params[length - 1]];
        }

        return this;
      };
      /**
        * set property
        * @param {...Number|String|PropertyObject} args - property names or values
        * @return {Frame} An instance itself
        * @example
      // one parameter
      frame.set({
        display: "none",
        transform: {
            translate: "10px, 10px",
            scale: "1",
        },
        filter: {
            brightness: "50%",
            grayscale: "100%"
        }
      });
      // two parameters
      frame.set("transform", {
        translate: "10px, 10px",
        scale: "1",
      });
      // three parameters
      frame.set("transform", "translate", "50px");
      */


      __proto.set = function () {
        var args = [];

        for (var _i = 0; _i < arguments.length; _i++) {
          args[_i] = arguments[_i];
        }

        var self = this;
        var length = args.length;
        var params = args.slice(0, -1);
        var value = args[length - 1];

        if (params[0] in ALIAS) {
          self._set(ALIAS[params[0]], value);
        } else if (length === 2 && isArray$2(params[0])) {
          self._set(params[0], value);
        } else if (isArray$2(value)) {
          self._set(params, value);
        } else if (isPropertyObject(value)) {
          if (isRole(params)) {
            self.set.apply(self, params.concat([toObject(value)]));
          } else {
            self._set(params, value);
          }
        } else if (isObject$2(value)) {
          for (var name in value) {
            self.set.apply(self, params.concat([name, value[name]]));
          }
        } else if (isString$2(value)) {
          if (isRole(params, true)) {
            if (isFixed(params) || !isRole(params)) {
              this._set(params, value);
            } else {
              var obj = toPropertyObject(value);

              if (isObject$2(obj)) {
                self.set.apply(self, params.concat([obj]));
              }
            }

            return this;
          } else {
            var _a = splitStyle(value),
                styles = _a.styles,
                stylesLength = _a.length;

            for (var name in styles) {
              self.set.apply(self, params.concat([name, styles[name]]));
            }

            if (stylesLength) {
              return this;
            }
          }

          self._set(params, value);
        } else {
          self._set(params, value);
        }

        return self;
      };
      /**
        * check that has property.
        * @param {...String} args - property name
        * @example
        frame.has("property", "display") // => true or false
        */


      __proto.has = function () {
        var args = [];

        for (var _i = 0; _i < arguments.length; _i++) {
          args[_i] = arguments[_i];
        }

        var params = getPropertyName(args);
        var length = params.length;

        if (!length) {
          return false;
        }

        return !isUndefined$3(getValueByNames(params, this.properties, length));
      };
      /**
        * clone frame.
        * @return {Frame} An instance of clone
        * @example
        frame.clone();
        */


      __proto.clone = function () {
        var frame = new Frame();
        return frame.merge(this);
      };
      /**
        * merge one frame to other frame.
        * @param - target frame.
        * @return {Frame} An instance itself
        * @example
        frame.merge(frame2);
        */


      __proto.merge = function (frame) {
        var properties = this.properties;
        var frameProperties = frame.properties;

        if (!frameProperties) {
          return this;
        }

        merge(properties, frameProperties);
        return this;
      };
      /**
        * Specifies an css object that coverted the frame.
        * @return {object} cssObject
        */


      __proto.toCSSObject = function () {
        var properties = this.get();
        var cssObject = {};

        for (var name in properties) {
          if (isRole([name], true)) {
            continue;
          }

          var value = properties[name];

          if (name === TIMING_FUNCTION) {
            cssObject[TIMING_FUNCTION.replace("animation", ANIMATION$2)] = (isString$2(value) ? value : value[EASING_NAME]) || "initial";
            continue;
          }

          cssObject[name] = value;
        }

        var transform = toInnerProperties(properties[TRANSFORM_NAME]);
        var filter = toInnerProperties(properties.filter);
        TRANSFORM$2 && transform && (cssObject[TRANSFORM$2] = transform);
        FILTER$2 && filter && (cssObject[FILTER$2] = filter);
        return cssObject;
      };
      /**
        * Specifies an css text that coverted the frame.
        * @return {string} cssText
        */


      __proto.toCSS = function () {
        var cssObject = this.toCSSObject();
        var cssArray = [];

        for (var name in cssObject) {
          cssArray.push(name + ":" + cssObject[name] + ";");
        }

        return cssArray.join("");
      };

      __proto._set = function (args, value) {
        var properties = this.properties;
        var length = args.length;

        for (var i = 0; i < length - 1; ++i) {
          var name = args[i];
          !(name in properties) && (properties[name] = {});
          properties = properties[name];
        }

        if (!length) {
          return;
        }

        properties[args[length - 1]] = isString$2(value) ? toPropertyObject(value) : value;
      };

      return Frame;
    }();

    function dotArray(a1, a2, b1, b2) {
      var length = a2.length;
      return a1.map(function (v1, i) {
        if (i >= length) {
          return v1;
        } else {
          return dot(v1, a2[i], b1, b2);
        }
      });
    }

    function dotColor(color1, color2, b1, b2) {
      // convert array to PropertyObject(type=color)
      var value1 = color1.value;
      var value2 = color2.value; // If the model name is not same, the inner product is impossible.

      var model1 = color1.model;
      var model2 = color2.model;

      if (model1 !== model2) {
        // It is recognized as a string.
        return dot(color1.toValue(), color2.toValue(), b1, b2);
      }

      if (value1.length === 3) {
        value1[3] = 1;
      }

      if (value2.length === 3) {
        value2[3] = 1;
      }

      var v = dotArray(value1, value2, b1, b2);
      var colorModel = model1;

      for (var i = 0; i < 3; ++i) {
        v[i] = parseInt(v[i], 10);
      }

      var object = new PropertyObject(v, {
        type: "color",
        model: colorModel,
        prefix: colorModel + "(",
        suffix: ")"
      });
      return object;
    }

    function dotObject(a1, a2, b1, b2) {
      var a1Type = a1.type;

      if (a1Type === "color") {
        return dotColor(a1, a2, b1, b2);
      }

      var value1 = a1.value;
      var value2 = a2.value;
      var arr = dotArray(value1, value2, b1, b2);
      return new PropertyObject(arr, {
        type: a1Type,
        separator: a1.separator || a2.separator,
        prefix: a1.prefix || a2.prefix,
        suffix: a1.suffix || a2.suffix,
        model: a1.model || a2.model
      });
    }
    /**
    * The dot product of a1 and a2 for the b1 and b2.
    * @memberof Dot
    * @function dot
    * @param {String|Number|PropertyObject} a1 value1
    * @param {String|Number|PropertyObject} a2 value2
    * @param {Number} b1 b1 ratio
    * @param {Number} b2 b2 ratio
    * @return {String} Not Array, Not Separator, Only Number & Unit
    * @return {PropertyObject} Array with Separator.
    * @example
    dot(1, 3, 0.3, 0.7);
    // => 1.6
    */


    function dot(a1, a2, b1, b2) {
      if (b2 === 0) {
        return a2;
      } else if (b1 === 0 || b1 + b2 === 0) {
        // prevent division by zero.
        return a1;
      } // dot Object


      var type1 = getType(a1);
      var type2 = getType(a2);
      var isFunction1 = type1 === FUNCTION$2;
      var isFunction2 = type2 === FUNCTION$2;

      if (isFunction1 || isFunction2) {
        return function () {
          return dot(isFunction1 ? toPropertyObject(a1()) : a1, isFunction2 ? toPropertyObject(a2()) : a2, b1, b2);
        };
      } else if (type1 === type2) {
        if (type1 === PROPERTY$2) {
          return dotObject(a1, a2, b1, b2);
        } else if (type1 === ARRAY$2) {
          return dotArray(a1, a2, b1, b2);
        } else if (type1 !== "value") {
          return a1;
        }
      } else {
        return a1;
      }

      var v1 = splitUnit$2("" + a1);
      var v2 = splitUnit$2("" + a2);
      var v; // 숫자가 아닐경우 첫번째 값을 반환 b2가 0일경우 두번째 값을 반환

      if (isNaN(v1.value) || isNaN(v2.value)) {
        return a1;
      } else {
        v = dotNumber(v1.value, v2.value, b1, b2);
      }

      var prefix = v1.prefix || v2.prefix;
      var unit = v1.unit || v2.unit;

      if (!prefix && !unit) {
        return v;
      }

      return prefix + v + unit;
    }
    function dotNumber(a1, a2, b1, b2) {
      return (a1 * b2 + a2 * b1) / (b1 + b2);
    }
    function dotValue(time, prevTime, nextTime, prevValue, nextValue, easing) {
      if (time === prevTime) {
        return prevValue;
      } else if (time === nextTime) {
        return nextValue;
      } else if (!easing) {
        return dot(prevValue, nextValue, time - prevTime, nextTime - time);
      }

      var ratio = easing((time - prevTime) / (nextTime - prevTime));
      var value = dot(prevValue, nextValue, ratio, 1 - ratio);
      return value;
    }

    function getNearTimeIndex(times, time) {
      var length = times.length;

      for (var i = 0; i < length; ++i) {
        if (times[i] === time) {
          return [i, i];
        } else if (times[i] > time) {
          return [i > 0 ? i - 1 : 0, i];
        }
      }

      return [length - 1, length - 1];
    }

    function makeAnimationProperties(properties) {
      var cssArray = [];

      for (var name in properties) {
        cssArray.push(ANIMATION$2 + "-" + decamelize$2(name) + ":" + properties[name] + ";");
      }

      return cssArray.join("");
    }

    function isPureObject(obj) {
      return isObject$2(obj) && obj.constructor === Object;
    }

    function getNames(names, stack) {
      var arr = [];

      if (isPureObject(names)) {
        for (var name in names) {
          stack.push(name);
          arr = arr.concat(getNames(names[name], stack));
          stack.pop();
        }
      } else {
        arr.push(stack.slice());
      }

      return arr;
    }

    function updateFrame(names, properties) {
      for (var name in properties) {
        var value = properties[name];

        if (!isPureObject(value)) {
          names[name] = true;
          continue;
        }

        if (!isObject$2(names[name])) {
          names[name] = {};
        }

        updateFrame(names[name], properties[name]);
      }

      return names;
    }

    function addTime(times, time) {
      var length = times.length;

      for (var i = 0; i < length; ++i) {
        if (time < times[i]) {
          times.splice(i, 0, time);
          return;
        }
      }

      times[length] = time;
    }

    function addEntry(entries, time, keytime) {
      var prevEntry = entries[entries.length - 1];
      (!prevEntry || prevEntry[0] !== time || prevEntry[1] !== keytime) && entries.push([toFixed(time), toFixed(keytime)]);
    }

    function getEntries(times, states) {
      var entries = times.map(function (time) {
        return [time, time];
      });
      var nextEntries = [];
      states.forEach(function (state) {
        var iterationCount = state[ITERATION_COUNT];
        var delay = state[DELAY];
        var playSpeed = state[PLAY_SPEED];
        var direction = state[DIRECTION];
        var intCount = Math.ceil(iterationCount);
        var currentDuration = entries[entries.length - 1][0];
        var length = entries.length;
        var lastTime = currentDuration * iterationCount;

        for (var i = 0; i < intCount; ++i) {
          var isReverse = direction === REVERSE || direction === ALTERNATE && i % 2 || direction === ALTERNATE_REVERSE && !(i % 2);

          for (var j = 0; j < length; ++j) {
            var entry = entries[isReverse ? length - j - 1 : j];
            var time = entry[1];
            var currentTime = currentDuration * i + (isReverse ? currentDuration - entry[0] : entry[0]);
            var prevEntry = entries[isReverse ? length - j : j - 1];

            if (currentTime > lastTime) {
              if (j !== 0) {
                var prevTime = currentDuration * i + (isReverse ? currentDuration - prevEntry[0] : prevEntry[0]);
                var divideTime = dotNumber(prevEntry[1], time, lastTime - prevTime, currentTime - lastTime);
                addEntry(nextEntries, (delay + currentDuration * iterationCount) / playSpeed, divideTime);
              }

              break;
            } else if (currentTime === lastTime && nextEntries[nextEntries.length - 1][0] === lastTime + delay) {
              break;
            }

            addEntry(nextEntries, (delay + currentTime) / playSpeed, time);
          }
        } // delay time


        delay && nextEntries.unshift([0, nextEntries[0][1]]);
        entries = nextEntries;
        nextEntries = [];
      });
      return entries;
    }
    /**
    * manage Frame Keyframes and play keyframes.
    * @extends Animator
    * @example
    const item = new SceneItem({
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
    /** @class */
    function (_super) {
      __extends(SceneItem, _super);
      /**
        * @param - properties
        * @param - options
        * @example
        const item = new SceneItem({
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
        var _this = _super.call(this) || this;

        _this.times = [];
        _this.items = {};
        _this.names = {};
        _this.elements = [];
        _this.needUpdate = false;

        _this.load(properties, options);

        return _this;
      }

      var __proto = SceneItem.prototype;

      __proto.getDuration = function () {
        var times = this.times;
        var length = times.length;
        return Math.max(this.state[DURATION], length === 0 ? 0 : times[length - 1]);
      };
      /**
        * get size of list
        * @return {Number} length of list
        */


      __proto.size = function () {
        return this.times.length;
      };

      __proto.setDuration = function (duration) {
        if (!duration) {
          return this;
        }

        var originalDuration = this.getDuration();

        if (originalDuration > 0) {
          var ratio_1 = duration / originalDuration;

          var _a = this,
              times = _a.times,
              items_1 = _a.items;

          var obj_1 = {};
          this.times = times.map(function (time) {
            var time2 = toFixed(time * ratio_1);
            obj_1[time2] = items_1[time];
            return time2;
          });
          this.items = obj_1;
        }

        _super.prototype.setDuration.call(this, toFixed(duration));

        return this;
      };

      __proto.setId = function (id) {
        var state = this.state;
        state.id = id || makeId(!!length);
        var elements = this.elements;

        if (elements.length && !state[SELECTOR]) {
          var sceneId_1 = toId(this.getId());
          state[SELECTOR] = "[" + DATA_SCENE_ID + "=\"" + sceneId_1 + "\"]";
          elements.forEach(function (element) {
            element.setAttribute(DATA_SCENE_ID, sceneId_1);
          });
        }

        return this;
      };
      /**
        * Set properties to the sceneItem at that time
        * @param {Number} time - time
        * @param {...String|Object} [properties] - property names or values
        * @return {SceneItem} An instance itself
        * @example
      item.set(0, "a", "b") // item.getFrame(0).set("a", "b")
      console.log(item.get(0, "a")); // "b"
        */


      __proto.set = function (time) {
        var _this = this;

        var args = [];

        for (var _i = 1; _i < arguments.length; _i++) {
          args[_i - 1] = arguments[_i];
        }

        if (isArray$2(time)) {
          var length = time.length;

          for (var i = 0; i < length; ++i) {
            var t = length === 1 ? 0 : this.getUnitTime(i / (length - 1) * 100 + "%");
            this.set(t, time[i]);
          }
        } else if (isObject$2(time)) {
          var _loop_1 = function (t) {
            var value = time[t];
            var realTime = this_1.getUnitTime(t);

            if (isNaN(realTime)) {
              getNames(value, [t]).forEach(function (names) {
                var innerValue = getValueByNames(names.slice(1), value);
                var arr = isArray$2(innerValue) ? innerValue : [getValueByNames(names, _this.target), innerValue];
                var length = arr.length;

                for (var i = 0; i < length; ++i) {
                  _this.newFrame(i / (length - 1) * 100 + "%").set(names, arr[i]);
                }
              });
            } else {
              this_1.set(realTime, value);
            }
          };

          var this_1 = this;

          for (var t in time) {
            _loop_1(t);
          }
        } else {
          var value = args[0];

          if (value instanceof Frame) {
            this.setFrame(time, value);
          } else if (value instanceof SceneItem) {
            var delay = value.getDelay();
            var realTime = this.getUnitTime(time);
            var frames = value.toObject(!this.hasFrame(realTime + delay), realTime);

            for (var frameTime in frames) {
              this.set(frameTime, frames[frameTime]);
            }
          } else if (args.length === 1 && isArray$2(value)) {
            value.forEach(function (item) {
              _this.set(time, item);
            });
          } else {
            var frame = this.newFrame(time);
            frame.set.apply(frame, args);
          }
        }

        this.needUpdate = true;
        return this;
      };
      /**
        * Get properties of the sceneItem at that time
        * @param {Number} time - time
        * @param {...String|Object} args property's name or properties
        * @return {Number|String|PropertyObejct} property value
        * @example
      item.get(0, "a"); // item.getFrame(0).get("a");
      item.get(0, "transform", "translate"); // item.getFrame(0).get("transform", "translate");
        */


      __proto.get = function (time) {
        var args = [];

        for (var _i = 1; _i < arguments.length; _i++) {
          args[_i - 1] = arguments[_i];
        }

        var frame = this.getFrame(time);
        return frame && frame.get.apply(frame, args);
      };
      /**
        * remove properties to the sceneItem at that time
        * @param {Number} time - time
        * @param {...String|Object} [properties] - property names or values
        * @return {SceneItem} An instance itself
        * @example
      item.remove(0, "a");
        */


      __proto.remove = function (time) {
        var args = [];

        for (var _i = 1; _i < arguments.length; _i++) {
          args[_i - 1] = arguments[_i];
        }

        var frame = this.getFrame(time);
        frame && frame.remove.apply(frame, args);
        this.needUpdate = true;
        return this;
      };
      /**
        * Append the item or object at the last time.
        * @param - the scene item or item object
        * @return An instance itself
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


      __proto.append = function (item) {
        this.set(this.getDuration(), item);
        return this;
      };
      /**
        * Push the front frames for the time and prepend the scene item or item object.
        * @param - the scene item or item object
        * @return An instance itself
        */


      __proto.prepend = function (item) {
        if (item instanceof SceneItem) {
          var unshiftTime = item.getDuration() + item.getDelay();
          var firstFrame = this.getFrame(0); // remove first frame

          this.removeFrame(0);
          this.unshift(unshiftTime);
          this.set(0, item);
          this.set(unshiftTime + THRESHOLD, firstFrame);
        } else {
          this.prepend(new SceneItem(item));
        }

        return this;
      };
      /**
      * Push out the amount of time.
      * @param - time to push
       * @return {}
       * @example
      item.get(0); // frame 0
      item.unshift(3);
      item.get(3) // frame 0
       */


      __proto.unshift = function (time) {
        var _a = this,
            times = _a.times,
            items = _a.items;

        var obj = {};
        this.times = times.map(function (t) {
          var time2 = toFixed(time + t);
          obj[time2] = items[t];
          return time2;
        });
        this.items = obj;
      };
      /**
       * Get the frames in the item in object form.
       * @return {}
       * @example
      item.toObject();
      // {0: {display: "none"}, 1: {display: "block"}}
       */


      __proto.toObject = function (isStartZero, startTime) {
        if (isStartZero === void 0) {
          isStartZero = true;
        }

        if (startTime === void 0) {
          startTime = 0;
        }

        var obj = {};
        var delay = this.getDelay();
        this.forEach(function (frame, time) {
          obj[(!time && !isStartZero ? THRESHOLD : 0) + delay + startTime + time] = frame.clone();
        });
        return obj;
      };
      /**
       * Specifies an element to synchronize items' keyframes.
       * @param {string} selectors - Selectors to find elements in items.
       * @return {SceneItem} An instance itself
       * @example
      item.setSelector("#id.class");
       */


      __proto.setSelector = function (target) {
        this.setElement(target);
      };
      /**
        * Specifies an element to synchronize item's keyframes.
      * @param - elements to synchronize item's keyframes.
      * @param - Make sure that you have peusdo.
        * @return {SceneItem} An instance itself
        * @example
      item.setElement(document.querySelector("#id.class"));
      item.setElement(document.querySelectorAll(".class"));
        */


      __proto.setElement = function (target) {
        var state = this.state;
        var elements = [];

        if (!target) {
          return this;
        } else if (target === true || isString$2(target)) {
          var selector = target === true ? "" + state.id : target;
          var matches = /([\s\S]+)(:+[a-zA-Z]+)$/g.exec(selector);
          elements = toArray($$2(matches ? matches[1] : selector, true));
          state[SELECTOR] = selector;
        } else {
          elements = target instanceof Element ? [target] : toArray(target);
        }

        if (!elements.length) {
          return this;
        }

        this.elements = elements;
        this.setId(this.getId());
        this.target = elements[0].style;

        this.targetFunc = function (frame) {
          var attributes = frame.get("attribute");

          if (attributes) {
            var _loop_2 = function (name) {
              elements.forEach(function (el) {
                el.setAttribute(name, attributes[name]);
              });
            };

            for (var name in attributes) {
              _loop_2(name);
            }
          }

          var cssText = frame.toCSS();

          if (state.cssText !== cssText) {
            state.cssText = cssText;
            elements.forEach(function (el) {
              el.style.cssText += cssText;
            });
            return frame;
          }
        };

        return this;
      };

      __proto.setTarget = function (target) {
        this.target = target;

        this.targetFunc = function (frame) {
          var obj = frame.get();

          for (var name in obj) {
            target[name] = obj[name];
          }
        };

        return this;
      };
      /**
        * add css styles of items's element to the frame at that time.
        * @param {Array} properties - elements to synchronize item's keyframes.
        * @return {SceneItem} An instance itself
        * @example
      item.setElement(document.querySelector("#id.class"));
      item.setCSS(0, ["opacity"]);
      item.setCSS(0, ["opacity", "width", "height"]);
        */


      __proto.setCSS = function (time, properties) {
        this.set(time, fromCSS$2(this.elements, properties));
        return this;
      };

      __proto.setTime = function (time, isTick, parentEasing) {
        _super.prototype.setTime.call(this, time, isTick);

        var iterationTime = this.getIterationTime();
        var easing = this.getEasing() || parentEasing;
        var frame = this.getNowFrame(iterationTime, easing);
        var currentTime = this.getTime();
        this.temp = frame;
        /**
             * This event is fired when timeupdate and animate.
             * @event SceneItem#animate
             * @param {Number} param.currentTime The total time that the animator is running.
             * @param {Number} param.time The iteration time during duration that the animator is running.
             * @param {Frame} param.frame frame of that time.
             */

        this.trigger("animate", {
          frame: frame,
          currentTime: currentTime,
          time: iterationTime
        });
        this.targetFunc && this.targetFunc(frame);
        return this;
      };
      /**
        * update property names used in frames.
        * @return {SceneItem} An instance itself
        * @example
      item.update();
        */


      __proto.update = function () {
        var names = this.names;
        this.forEach(function (frame) {
          updateFrame(names, frame.properties);
        });
        this.needUpdate = false;
        return this;
      };
      /**
        * Create and add a frame to the sceneItem at that time
        * @param {Number} time - frame's time
        * @return {Frame} Created frame.
        * @example
      item.newFrame(time);
        */


      __proto.newFrame = function (time) {
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
        * @param {Number} time - frame's time
        * @return {SceneItem} An instance itself
        * @example
      item.setFrame(time, frame);
        */


      __proto.setFrame = function (time, frame) {
        var realTime = this.getUnitTime(time);
        this.items[realTime] = frame;
        addTime(this.times, realTime);
        this.needUpdate = true;
        return this;
      };
      /**
        * get sceneItem's frame at that time
        * @param {Number} time - frame's time
        * @return {Frame} sceneItem's frame at that time
        * @example
      const frame = item.getFrame(time);
        */


      __proto.getFrame = function (time) {
        return this.items[this.getUnitTime(time)];
      };
      /**
        * check if the item has a frame at that time
        * @param {Number} time - frame's time
        * @return {Boolean} true: the item has a frame // false: not
        * @example
      if (item.hasFrame(10)) {
        // has
      } else {
        // not
      }
        */


      __proto.hasFrame = function (time) {
        return this.getUnitTime(time) in this.items;
      };
      /**
        * Check if keyframes has propery's name
        * @param - property's time
        * @return {boolean} true: if has property, false: not
        * @example
      item.hasName(["transform", "translate"]); // true or not
        */


      __proto.hasName = function (args) {
        this.needUpdate && this.update();
        return isInProperties(this.names, args, true);
      };
      /**
        * remove sceneItem's frame at that time
        * @param {Number} time - frame's time
        * @return {SceneItem} An instance itself
        * @example
      item.removeFrame(time);
        */


      __proto.removeFrame = function (time) {
        var items = this.items;
        var index = this.times.indexOf(time);
        delete items[time]; // remove time

        if (index > -1) {
          this.times.splice(index, 1);
        }

        return this;
      };
      /**
        * merge frame of the previous time at the next time.
      * @param - The time of the frame to merge
      * @param - The target frame
        * @return {SceneItem} An instance itself
        * @example
      // getFrame(1) contains getFrame(0)
      item.merge(0, 1);
        */


      __proto.mergeFrame = function (time, frame) {
        if (frame) {
          var toFrame = this.newFrame(time);
          toFrame.merge(frame);
        }

        return this;
      };
      /**
        * Get frame of the current time
        * @param {Number} time - the current time
        * @param {function} easing - the speed curve of an animation
        * @return {Frame} frame of the current time
        * @example
      let item = new SceneItem({
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


      __proto.getNowFrame = function (time, easing, isAccurate) {
        var _this = this;

        this.needUpdate && this.update();
        var frame = new Frame();

        var _a = getNearTimeIndex(this.times, time),
            left = _a[0],
            right = _a[1];

        var realEasing = this.getEasing() || easing;
        var nameObject = this.names;

        if (this.hasName([TIMING_FUNCTION])) {
          var nowEasing = this._getNowValue(time, [TIMING_FUNCTION], left, right, false, 0, true);

          isFunction$2(nowEasing) && (realEasing = nowEasing);
        }

        if (isAccurate) {
          var prevFrame = this.getFrame(time);
          var prevNames = updateFrame({}, prevFrame.properties);

          for (var name in ROLES) {
            if (name in prevNames) {
              prevNames[name] = nameObject[name];
            }
          }

          nameObject = prevNames;
        }

        var names = getNames(nameObject, []);
        names.forEach(function (properties) {
          var value = _this._getNowValue(time, properties, left, right, isAccurate, realEasing, isFixed(properties));

          if (isUndefined$3(value)) {
            return;
          }

          frame.set(properties, value);
        });
        return frame;
      };

      __proto.load = function (properties, options) {
        if (properties === void 0) {
          properties = {};
        }

        if (options === void 0) {
          options = properties.options;
        }

        options && this.setOptions(options);

        if (isArray$2(properties)) {
          this.set(properties);
        } else if (properties.keyframes) {
          this.set(properties.keyframes);
        } else {
          for (var time in properties) {
            if (time !== "options") {
              this.set((_a = {}, _a[time] = properties[time], _a));
            }
          }
        }

        if (options && options[DURATION]) {
          this.setDuration(options[DURATION]);
        }

        return this;

        var _a;
      };
      /**
         * clone SceneItem.
         * @return {SceneItem} An instance of clone
         * @example
         * item.clone();
         */


      __proto.clone = function () {
        var item = new SceneItem();
        item.setOptions(this.state);
        this.forEach(function (frame, time) {
          item.setFrame(time, frame.clone());
        });
        return item;
      };
      /**
         * executes a provided function once for each scene item.
         * @param - Function to execute for each element, taking three arguments
         * @return {Keyframes} An instance itself
         */


      __proto.forEach = function (callback) {
        var times = this.times;
        var items = this.items;
        times.forEach(function (time) {
          callback(items[time], time, items);
        });
        return this;
      };

      __proto.setOptions = function (options) {
        if (options === void 0) {
          options = {};
        }

        _super.prototype.setOptions.call(this, options);

        var id = options.id,
            selector = options.selector,
            elements = options.elements,
            element = options.element,
            target = options.target;
        id && this.setId(id);

        if (target) {
          this.setTarget(target);
        } else if (elements || element || selector) {
          this.setElement(elements || element || selector);
        }

        return this;
      };

      __proto.toCSS = function (playCondition, parentDuration, states) {
        if (playCondition === void 0) {
          playCondition = {
            className: START_ANIMATION
          };
        }

        if (parentDuration === void 0) {
          parentDuration = this.getDuration();
        }

        if (states === void 0) {
          states = [];
        }

        var itemState = this.state;
        var selector = itemState[SELECTOR];

        if (!selector) {
          return "";
        }

        var originalDuration = this.getDuration();
        itemState[DURATION] = originalDuration;
        states.push(itemState);
        var reversedStates = toArray(states).reverse();
        var id = toId(getRealId(this));
        var superParent = states[0];
        var infiniteIndex = findIndex(reversedStates, function (state) {
          return state[ITERATION_COUNT] === INFINITE || !isFinite(state[DURATION]);
        }, states.length - 1);
        var finiteStates = reversedStates.slice(0, infiniteIndex);
        var duration = parentDuration || finiteStates.reduce(function (prev, cur) {
          return (cur[DELAY] + prev * cur[ITERATION_COUNT]) / cur[PLAY_SPEED];
        }, originalDuration);
        var delay = reversedStates.slice(infiniteIndex).reduce(function (prev, cur) {
          return (prev + cur[DELAY]) / cur[PLAY_SPEED];
        }, 0);
        var easingName = find(reversedStates, function (state) {
          return state[EASING] && state[EASING_NAME];
        }, itemState)[EASING_NAME];
        var iterationCount = reversedStates[infiniteIndex][ITERATION_COUNT];
        var fillMode = superParent[FILL_MODE];
        var direction = reversedStates[infiniteIndex][DIRECTION];
        var cssText = makeAnimationProperties({
          fillMode: fillMode,
          direction: direction,
          iterationCount: iterationCount,
          delay: delay + "s",
          name: PREFIX + "KEYFRAMES_" + id,
          duration: duration / superParent[PLAY_SPEED] + "s",
          timingFunction: easingName
        });
        var selectors = splitComma$2(selector).map(function (sel) {
          var matches = /([\s\S]+)(:+[a-zA-Z]+)$/g.exec(sel);

          if (matches) {
            return [matches[0], matches[1]];
          } else {
            return [sel, ""];
          }
        });
        var className = playCondition.className;
        var selectorCallback = playCondition.selector;
        var preselector = isFunction$2(selectorCallback) ? selectorCallback(this, selector) : selectorCallback;
        return "\n    " + (preselector || selectors.map(function (_a) {
          var sel = _a[0],
              peusdo = _a[1];
          return sel + "." + className + peusdo;
        })) + " {" + cssText + "}\n    " + selectors.map(function (_a) {
          var sel = _a[0],
              peusdo = _a[1];
          return sel + "." + PAUSE_ANIMATION + peusdo;
        }) + " {" + ANIMATION$2 + "-play-state: paused;}\n    @" + KEYFRAMES$2 + " " + PREFIX + "KEYFRAMES_" + id + "{" + this._toKeyframes(duration, finiteStates, direction) + "}";
      };
      /**
       * Export the CSS of the items to the style.
       * @param - Add a selector or className to play.
       * @return {SceneItem} An instance itself
       */


      __proto.exportCSS = function (playCondition, duration, options) {
        if (!this.elements.length) {
          return "";
        }

        var css = this.toCSS(playCondition, duration, options);
        var isParent = options && !isUndefined$3(options[ITERATION_COUNT]);
        !isParent && exportCSS(getRealId(this), css);
        return this;
      };

      __proto.pause = function () {
        _super.prototype.pause.call(this);

        isPausedCSS(this) && this.pauseCSS();
        return this;
      };

      __proto.pauseCSS = function () {
        this.elements.forEach(function (element) {
          addClass$2(element, PAUSE_ANIMATION);
        });
        return this;
      };

      __proto.endCSS = function () {
        this.elements.forEach(function (element) {
          removeClass$2(element, PAUSE_ANIMATION);
          removeClass$2(element, START_ANIMATION);
        });
        setPlayCSS(this, false);
        return this;
      };

      __proto.end = function () {
        isEndedCSS(this) && this.endCSS();

        _super.prototype.end.call(this);

        return this;
      };
      /**
        * Play using the css animation and keyframes.
        * @param - Check if you want to export css.
        * @param [playClassName="startAnimation"] - Add a class name to play.
        * @param - The shorthand properties for six of the animation properties.
        * @see {@link https://www.w3schools.com/cssref/css3_pr_animation.asp}
        * @example
      item.playCSS();
      item.playCSS(false, "startAnimation", {
        direction: "reverse",
        fillMode: "forwards",
      });
        */


      __proto.playCSS = function (isExportCSS, playClassName, properties) {
        if (isExportCSS === void 0) {
          isExportCSS = true;
        }

        if (properties === void 0) {
          properties = {};
        }

        playCSS(this, isExportCSS, playClassName, properties);
        return this;
      };

      __proto.addPlayClass = function (isPaused, playClassName, properties) {
        if (properties === void 0) {
          properties = {};
        }

        var elements = this.elements;
        var length = elements.length;
        var cssText = makeAnimationProperties(properties);

        if (!length) {
          return;
        }

        if (isPaused) {
          elements.forEach(function (element) {
            removeClass$2(element, PAUSE_ANIMATION);
          });
        } else {
          elements.forEach(function (element) {
            element.style.cssText += cssText;

            if (hasClass$2(element, START_ANIMATION)) {
              removeClass$2(element, START_ANIMATION);
              requestAnimationFrame$2(function () {
                requestAnimationFrame$2(function () {
                  addClass$2(element, START_ANIMATION);
                });
              });
            } else {
              addClass$2(element, START_ANIMATION);
            }
          });
        }

        return elements[0];
      };

      __proto._toKeyframes = function (duration, states, direction) {
        var _this = this;

        var frames = {};
        var times = this.times.slice();

        if (!times.length) {
          return "";
        }

        var originalDuration = this.getDuration();
        !this.getFrame(0) && times.unshift(0);
        !this.getFrame(originalDuration) && times.push(originalDuration);
        var entries = getEntries(times, states);
        var lastEntry = entries[entries.length - 1]; // end delay time

        lastEntry[0] < duration && addEntry(entries, duration, lastEntry[1]);
        var prevTime = -1;
        return entries.map(function (_a) {
          var time = _a[0],
              keytime = _a[1];

          if (!frames[keytime]) {
            frames[keytime] = (!_this.hasFrame(keytime) || keytime === 0 || keytime === originalDuration ? _this.getNowFrame(keytime) : _this.getNowFrame(keytime, 0, true)).toCSS();
          }

          var frameTime = time / duration * 100;

          if (frameTime - prevTime < THRESHOLD) {
            frameTime += THRESHOLD;
          }

          prevTime = frameTime;
          return Math.min(frameTime, 100) + "%{\n                " + (time === 0 && !isDirectionReverse(0, 1, direction) ? "" : frames[keytime]) + "\n            }";
        }).join("");
      };

      __proto._getNowValue = function (time, properties, left, right, isAccurate, easing, usePrevValue) {
        var times = this.times;
        var length = times.length;
        var prevTime;
        var nextTime;
        var prevFrame;
        var nextFrame;

        for (var i = left; i >= 0; --i) {
          var frame = this.getFrame(times[i]);

          if (frame.has.apply(frame, properties)) {
            prevTime = times[i];
            prevFrame = frame;
            break;
          }
        }

        var prevValue = prevFrame && prevFrame.raw.apply(prevFrame, properties);

        if (isAccurate && !isRole([properties[0]])) {
          return prevTime === time ? prevValue : undefined;
        }

        if (usePrevValue) {
          return prevValue;
        }

        for (var i = right; i < length; ++i) {
          var frame = this.getFrame(times[i]);

          if (frame.has.apply(frame, properties)) {
            nextTime = times[i];
            nextFrame = frame;
            break;
          }
        }

        var nextValue = nextFrame && nextFrame.raw.apply(nextFrame, properties);

        if (!prevFrame || isUndefined$3(prevValue)) {
          return nextValue;
        }

        if (!nextFrame || isUndefined$3(nextValue) || prevValue === nextValue) {
          return prevValue;
        }

        if (prevTime < 0) {
          prevTime = 0;
        }

        return dotValue(time, prevTime, nextTime, prevValue, nextValue, easing);
      };

      return SceneItem;
    }(Animator);

    /**
     * manage sceneItems and play Scene.
     * @sort 1
     */

    var Scene$1 =
    /** @class */
    function (_super) {
      __extends(Scene, _super);
      /**
      * @param - properties
      * @param - options
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

      var __proto = Scene.prototype;

      __proto.getDuration = function () {
        var items = this.items;
        var time = 0;

        for (var id in items) {
          var item = items[id];
          time = Math.max(time, item.getTotalDuration() / item.getPlaySpeed());
        }

        return Math.max(time, this.state[DURATION]);
      };

      __proto.setDuration = function (duration) {
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

          for (var id in items) {
            var item = items[id];
            item.setDelay(item.getDelay() * ratio);
            item.setDuration(item.getDuration() * ratio);
          }
        }

        _super.prototype.setDuration.call(this, duration);

        return this;
      };
      /**
      * get item in scene by name
      * @param - The item's name
      * @param - If item is added as function, it can be imported via index.
      * @return {Scene | SceneItem} item
      * @example
      const item = scene.getItem("item1")
      */


      __proto.getItem = function (name, index) {
        if (index != null) {
          return this.items[name].getItem(index);
        }

        return this.items[name];
      };
      /**
      * create item in scene
      * @param {} name - name of item to create
      * @param {} options - The option object of SceneItem
      * @return {} Newly created item
      * @example
      const item = scene.newItem("item1")
      */


      __proto.newItem = function (name, options) {
        if (options === void 0) {
          options = {};
        }

        if (name in this.items) {
          return;
        }

        var item = new SceneItem();
        this.setItem(name, item);
        item.setOptions(options);
        return item;
      };
      /**
      * add a sceneItem to the scene
      * @param - name of item to create
      * @param - sceneItem
      * @example
      const item = scene.newItem("item1")
      */


      __proto.setItem = function (name, item) {
        item.setId(name);
        this.items[name] = item;
        return this;
      };

      __proto.setTime = function (time, isTick, parentEasing) {
        _super.prototype.setTime.call(this, time, isTick);

        var iterationTime = this.getIterationTime();
        var items = this.items;
        var easing = this.getEasing() || parentEasing;
        var frames = {};

        for (var id in items) {
          var item = items[id];
          item.setTime(iterationTime * item.getPlaySpeed() - item.getDelay(), isTick, easing);
          frames[item.getId()] = item.temp;
        }

        this.temp = frames;
        /**
             * This event is fired when timeupdate and animate.
             * @event Scene#animate
         * @param {object} param The object of data to be sent to an event.
             * @param {number} param.currentTime The total time that the animator is running.
             * @param {number} param.time The iteration time during duration that the animator is running.
             * @param {object} param.frames frames of that time.
         * @example
        const scene = new Scene({
        a: {
        0: {
          opacity: 0,
        },
        1: {
          opacity: 1,
        }
        },
        b: {
        0: {
          opacity: 0,
        },
        1: {
          opacity: 1,
        }
        }
        }).on("animate", e => {
        console.log(e);
        // {a: Frame, b: Frame}
        console.log(e.a.get("opacity"));
        });
             */

        this.trigger("animate", {
          frames: frames,
          currentTime: this.getTime(),
          time: iterationTime
        });
        return this;
      };
      /**
       * executes a provided function once for each scene item.
       * @param - Function to execute for each element, taking three arguments
       * @return {Scene} An instance itself
       */


      __proto.forEach = function (func) {
        var items = this.items;

        for (var name in items) {
          func(items[name], name, items);
        }

        return this;
      };

      __proto.toCSS = function (playCondition, duration, parentStates) {
        if (duration === void 0) {
          duration = this.getDuration();
        }

        if (parentStates === void 0) {
          parentStates = [];
        }

        var totalDuration = !duration || !isFinite(duration) ? 0 : duration;
        var styles = [];
        var state = this.state;
        state[DURATION] = this.getDuration();
        this.forEach(function (item) {
          styles.push(item.toCSS(playCondition, totalDuration, parentStates.concat(state)));
        });
        return styles.join("");
      };
      /**
       * Export the CSS of the items to the style.
       * @param - Add a selector or className to play.
       * @return {Scene} An instance itself
       */


      __proto.exportCSS = function (playCondition, duration, parentStates) {
        var css = this.toCSS(playCondition, duration, parentStates);
        (!parentStates || !parentStates.length) && exportCSS(getRealId(this), css);
        return this;
      };

      __proto.append = function (item) {
        item.setDelay(item.getDelay() + this.getDuration());
        this.setItem(getRealId(item), item);
      };

      __proto.pauseCSS = function () {
        return this.forEach(function (item) {
          item.pauseCSS();
        });
      };

      __proto.pause = function () {
        _super.prototype.pause.call(this);

        isPausedCSS(this) && this.pauseCSS();
        this.forEach(function (item) {
          item.pause();
        });
        return this;
      };

      __proto.endCSS = function () {
        var items = this.items;

        for (var id in items) {
          items[id].endCSS();
        }

        setPlayCSS(this, false);
      };

      __proto.end = function () {
        isEndedCSS(this) && this.endCSS();

        _super.prototype.end.call(this);

        return this;
      };

      __proto.addPlayClass = function (isPaused, playClassName, properties) {
        if (properties === void 0) {
          properties = {};
        }

        var items = this.items;
        var animtionElement;

        for (var id in items) {
          var el = items[id].addPlayClass(isPaused, playClassName, properties);
          !animtionElement && (animtionElement = el);
        }

        return animtionElement;
      };
      /**
      * Play using the css animation and keyframes.
      * @param - Check if you want to export css.
      * @param [playClassName="startAnimation"] - Add a class name to play.
      * @param - The shorthand properties for six of the animation properties.
      * @return {Scene} An instance itself
      * @see {@link https://www.w3schools.com/cssref/css3_pr_animation.asp}
      * @example
      scene.playCSS();
      scene.playCSS(false, {
      direction: "reverse",
      fillMode: "forwards",
      });
      */


      __proto.playCSS = function (isExportCSS, playClassName, properties) {
        if (isExportCSS === void 0) {
          isExportCSS = true;
        }

        if (properties === void 0) {
          properties = {};
        }

        playCSS(this, isExportCSS, playClassName, properties);
        return this;
      };

      __proto.set = function (properties) {
        this.load(properties);
        return this;
      };

      __proto.load = function (properties, options) {
        if (properties === void 0) {
          properties = {};
        }

        if (options === void 0) {
          options = properties.options;
        }

        if (!properties) {
          return this;
        }

        var isSelector = options && options[SELECTOR] || this.state[SELECTOR];

        for (var name in properties) {
          if (name === "options") {
            continue;
          }

          var object = properties[name];
          var item = void 0;

          if (object instanceof Scene || object instanceof SceneItem) {
            this.setItem(name, object);
            item = object;
          } else if (isFunction$2(object) && isSelector) {
            var elements = IS_WINDOW$2 ? $$2(name, true) : [];
            var length = elements.length;
            var scene = new Scene();

            for (var i = 0; i < length; ++i) {
              var id = makeId();
              scene.newItem("" + i, {
                id: id,
                selector: "[" + DATA_SCENE_ID + "=\"" + id + "\"]",
                elements: elements[i]
              }).load(object(i, elements[i]));
            }

            this.setItem(name, scene);
            continue;
          } else {
            item = this.newItem(name);
            item.load(object);
          }

          isSelector && item.setSelector(name);
        }

        this.setOptions(options);
      };

      __proto.setOptions = function (options) {
        if (options === void 0) {
          options = {};
        }

        _super.prototype.setOptions.call(this, options);

        if (options.selector) {
          this.state[SELECTOR] = true;
        }

        return this;
      };

      __proto.setSelector = function (target) {
        var state = this.state;
        var isSelector = target || state[SELECTOR];
        state[SELECTOR] = target;
        this.forEach(function (item, name) {
          item.setSelector(isSelector ? name : false);
        });
      };

      __proto.start = function (delay) {
        _super.prototype.start.call(this, delay);

        this.forEach(function (item) {
          item.start(delay);
        });
      };
      /**
      * version info
      * @type {string}
      * @example
      * Scene.VERSION // #__VERSION__#
      */


      Scene.VERSION = "#__VERSION__#";
      return Scene;
    }(Animator);

    function scroll$1(to) {
      return new SceneItem({
        scrollTop: to
      }, {
        target: document.documentElement,
        duration: 1,
        easing: EASE
      }).play();
    }

    var header = $$2("header");
    var menus = $$2("header [data-item] a", true);
    toArray(menus).forEach(function (menu, i) {
      var page = pages[i];
      page.range(["window - 1", "window"]).on({
        enter: function (e) {
          addClass$2(menu, "enter");
        },
        exit: function (e) {
          removeClass$2(menu, "enter");
        }
      });
      menu.addEventListener("click", function (e) {
        e.preventDefault();
        scroll$1(page.getRect(true).top);
      });
    });
    pages.forEach(function (page, i) {
      if (i % 2 === 0) {
        return;
      }

      page.range(["window - 80", "100% - 80"]).on({
        enter: function (e) {
          addClass$2(header, "white");
        },
        exit: function (e) {
          removeClass$2(header, "white");
        }
      });
    });

    scroll();

}());
//# sourceMappingURL=index.js.map
