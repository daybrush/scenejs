/*
Copyright (c) Daybrush
name: demo
license: MIT
author: Daybrush
repository: https://github.com/daybrush/scenejs.git
version: 0.0.0
*/
(function () {
    'use strict';

    /******************************************************************************
    Copyright (c) Microsoft Corporation.

    Permission to use, copy, modify, and/or distribute this software for any
    purpose with or without fee is hereby granted.

    THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
    REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
    AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
    INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
    LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
    OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
    PERFORMANCE OF THIS SOFTWARE.
    ***************************************************************************** */

    var __assign$1 = function() {
        __assign$1 = Object.assign || function __assign(t) {
            for (var s, i = 1, n = arguments.length; i < n; i++) {
                s = arguments[i];
                for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
            }
            return t;
        };
        return __assign$1.apply(this, arguments);
    };

    /*
    Copyright (c) 2018 Daybrush
    @name: @daybrush/utils
    license: MIT
    author: Daybrush
    repository: https://github.com/daybrush/utils
    @version 1.10.2
    */
    /**
    * get string "object"
    * @memberof Consts
    * @example
    import {OBJECT} from "@daybrush/utils";

    console.log(OBJECT); // "object"
    */
    var OBJECT = "object";
    /**
    * get string "string"
    * @memberof Consts
    * @example
    import {STRING} from "@daybrush/utils";

    console.log(STRING); // "string"
    */
    var STRING = "string";
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
    * @name document
    * @example
    import {IS_WINDOW} from "@daybrush/utils";

    console.log(IS_WINDOW); // false in node.js
    console.log(IS_WINDOW); // true in browser
    */
    var doc = typeof document !== UNDEFINED && document; // FIXME: this type maybe false
    var OPEN_CLOSED_CHARACTERS = [{
      open: "(",
      close: ")"
    }, {
      open: "\"",
      close: "\""
    }, {
      open: "'",
      close: "'"
    }, {
      open: "\\\"",
      close: "\\\""
    }, {
      open: "\\'",
      close: "\\'"
    }];

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation.

    Permission to use, copy, modify, and/or distribute this software for any
    purpose with or without fee is hereby granted.

    THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
    REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
    AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
    INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
    LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
    OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
    PERFORMANCE OF THIS SOFTWARE.
    ***************************************************************************** */
    function __spreadArrays() {
      for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
      for (var r = Array(s), k = 0, i = 0; i < il; i++) for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++) r[k] = a[j];
      return r;
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
    function isObject(value) {
      return value && typeof value === OBJECT;
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
    function isArray(value) {
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
    function isString(value) {
      return typeof value === STRING;
    }
    function isEqualSeparator(character, separator) {
      var isCharacterSpace = character === "" || character == " ";
      var isSeparatorSpace = separator === "" || separator == " ";
      return isSeparatorSpace && isCharacterSpace || character === separator;
    }
    function findOpen(openCharacter, texts, index, length, openCloseCharacters) {
      var isIgnore = findIgnore(openCharacter, texts, index);
      if (!isIgnore) {
        return findClose(openCharacter, texts, index + 1, length, openCloseCharacters);
      }
      return index;
    }
    function findIgnore(character, texts, index) {
      if (!character.ignore) {
        return null;
      }
      var otherText = texts.slice(Math.max(index - 3, 0), index + 3).join("");
      return new RegExp(character.ignore).exec(otherText);
    }
    function findClose(closeCharacter, texts, index, length, openCloseCharacters) {
      var _loop_1 = function (i) {
        var character = texts[i].trim();
        if (character === closeCharacter.close && !findIgnore(closeCharacter, texts, i)) {
          return {
            value: i
          };
        }
        var nextIndex = i;
        // re open
        var openCharacter = find(openCloseCharacters, function (_a) {
          var open = _a.open;
          return open === character;
        });
        if (openCharacter) {
          nextIndex = findOpen(openCharacter, texts, i, length, openCloseCharacters);
        }
        if (nextIndex === -1) {
          return out_i_1 = i, "break";
        }
        i = nextIndex;
        out_i_1 = i;
      };
      var out_i_1;
      for (var i = index; i < length; ++i) {
        var state_1 = _loop_1(i);
        i = out_i_1;
        if (typeof state_1 === "object") return state_1.value;
        if (state_1 === "break") break;
      }
      return -1;
    }
    function splitText(text, splitOptions) {
      var _a = isString(splitOptions) ? {
          separator: splitOptions
        } : splitOptions,
        _b = _a.separator,
        separator = _b === void 0 ? "," : _b,
        isSeparateFirst = _a.isSeparateFirst,
        isSeparateOnlyOpenClose = _a.isSeparateOnlyOpenClose,
        _c = _a.isSeparateOpenClose,
        isSeparateOpenClose = _c === void 0 ? isSeparateOnlyOpenClose : _c,
        _d = _a.openCloseCharacters,
        openCloseCharacters = _d === void 0 ? OPEN_CLOSED_CHARACTERS : _d;
      var openClosedText = openCloseCharacters.map(function (_a) {
        var open = _a.open,
          close = _a.close;
        if (open === close) {
          return open;
        }
        return open + "|" + close;
      }).join("|");
      var regexText = "(\\s*" + separator + "\\s*|" + openClosedText + "|\\s+)";
      var regex = new RegExp(regexText, "g");
      var texts = text.split(regex).filter(Boolean);
      var length = texts.length;
      var values = [];
      var tempValues = [];
      function resetTemp() {
        if (tempValues.length) {
          values.push(tempValues.join(""));
          tempValues = [];
          return true;
        }
        return false;
      }
      var _loop_2 = function (i) {
        var character = texts[i].trim();
        var nextIndex = i;
        var openCharacter = find(openCloseCharacters, function (_a) {
          var open = _a.open;
          return open === character;
        });
        var closeCharacter = find(openCloseCharacters, function (_a) {
          var close = _a.close;
          return close === character;
        });
        if (openCharacter) {
          nextIndex = findOpen(openCharacter, texts, i, length, openCloseCharacters);
          if (nextIndex !== -1 && isSeparateOpenClose) {
            if (resetTemp() && isSeparateFirst) {
              return out_i_2 = i, "break";
            }
            values.push(texts.slice(i, nextIndex + 1).join(""));
            i = nextIndex;
            if (isSeparateFirst) {
              return out_i_2 = i, "break";
            }
            return out_i_2 = i, "continue";
          }
        } else if (closeCharacter && !findIgnore(closeCharacter, texts, i)) {
          var nextOpenCloseCharacters = __spreadArrays(openCloseCharacters);
          nextOpenCloseCharacters.splice(openCloseCharacters.indexOf(closeCharacter), 1);
          return {
            value: splitText(text, {
              separator: separator,
              isSeparateFirst: isSeparateFirst,
              isSeparateOnlyOpenClose: isSeparateOnlyOpenClose,
              isSeparateOpenClose: isSeparateOpenClose,
              openCloseCharacters: nextOpenCloseCharacters
            })
          };
        } else if (isEqualSeparator(character, separator) && !isSeparateOnlyOpenClose) {
          resetTemp();
          if (isSeparateFirst) {
            return out_i_2 = i, "break";
          }
          return out_i_2 = i, "continue";
        }
        if (nextIndex === -1) {
          nextIndex = length - 1;
        }
        tempValues.push(texts.slice(i, nextIndex + 1).join(""));
        i = nextIndex;
        out_i_2 = i;
      };
      var out_i_2;
      for (var i = 0; i < length; ++i) {
        var state_2 = _loop_2(i);
        i = out_i_2;
        if (typeof state_2 === "object") return state_2.value;
        if (state_2 === "break") break;
      }
      if (tempValues.length) {
        values.push(tempValues.join(""));
      }
      return values;
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
    function splitSpace(text) {
      // divide comma(space)
      return splitText(text, "");
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
    function splitBracket(text) {
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
    * Returns the index of the first element in the array that satisfies the provided testing function.
    * @function
    * @memberof CrossBrowser
    * @param - The array `findIndex` was called upon.
    * @param - A function to execute on each value in the array until the function returns true, indicating that the satisfying element was found.
    * @param - Returns defaultIndex if not found by the function.
    * @example
    import { findIndex } from "@daybrush/utils";

    findIndex([{a: 1}, {a: 2}, {a: 3}, {a: 4}], ({ a }) => a === 2); // 1
    */
    function findIndex(arr, callback, defaultIndex) {
      if (defaultIndex === void 0) {
        defaultIndex = -1;
      }
      var length = arr.length;
      for (var i = 0; i < length; ++i) {
        if (callback(arr[i], i, arr)) {
          return i;
        }
      }
      return defaultIndex;
    }
    /**
    * Returns the value of the first element in the array that satisfies the provided testing function.
    * @function
    * @memberof CrossBrowser
    * @param - The array `find` was called upon.
    * @param - A function to execute on each value in the array,
    * @param - Returns defalutValue if not found by the function.
    * @example
    import { find } from "@daybrush/utils";

    find([{a: 1}, {a: 2}, {a: 3}, {a: 4}], ({ a }) => a === 2); // {a: 2}
    */
    function find(arr, callback, defalutValue) {
      var index = findIndex(arr, callback);
      return index > -1 ? arr[index] : defalutValue;
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
    function $(selectors, multi) {
      if (!doc) {
        return multi ? [] : null;
      }
      return multi ? doc.querySelectorAll(selectors) : doc.querySelector(selectors);
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
    /**
    * Removes the specified class value.
    * @memberof DOM
    * @param element - target
    * @param className - the class name to remove
    * @example
    import {removeClass} from "@daybrush/utils";

    removeClass(element, "start");
    */
    function removeClass(element, className) {
      if (element.classList) {
        element.classList.remove(className);
      } else {
        var reg = new RegExp("(\\s|^)" + className + "(\\s|$)");
        element.className = element.className.replace(reg, " ");
      }
    }
    /**
    * Sets up a function that will be called whenever the specified event is delivered to the target
    * @memberof DOM
    * @param - event target
    * @param - A case-sensitive string representing the event type to listen for.
    * @param - The object which receives a notification (an object that implements the Event interface) when an event of the specified type occurs
    * @param - An options object that specifies characteristics about the event listener.
    * @example
    import {addEvent} from "@daybrush/utils";

    addEvent(el, "click", e => {
      console.log(e);
    });
    */
    function addEvent(el, type, listener, options) {
      el.addEventListener(type, listener, options);
    }

    /*
    Copyright (c) 2018 Daybrush
    name: shape-svg
    license: MIT
    author: Daybrush
    repository: https://github.com/daybrush/shape-svg
    @version 0.3.3
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
    function __rest(s, e) {
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
          attributes = __rest(_a, ["left", "top", "right", "bottom", "side", "split", "rotate", "innerRadius", "height", "width", "fill", "strokeLinejoin", "strokeWidth", "css", "className"]);

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
      setAttributes(path, __assign({
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
          attributes = __rest(_a, ["left", "top", "right", "bottom", "fill", "strokeLinejoin", "strokeWidth", "className", "r", "rx", "ry", "width", "height", "origin"]);

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
      setAttributes(ellipse, __assign({
        fill: fill,
        "cx": left + halfStroke + width / 2,
        "cy": top + halfStroke + height / 2,
        "rx": width / 2,
        "ry": height / 2,
        "stroke-linejoin": strokeLinejoin,
        "stroke-width": "" + strokeWidth
      }, attributes));
      container.appendChild(ellipse);
      return container;
    }

    /*
    Copyright (c) NAVER Corp.
    name: @egjs/component
    license: MIT
    author: NAVER Corp.
    repository: https://github.com/naver/egjs-component
    version: 2.2.2
    */
    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation.

    Permission to use, copy, modify, and/or distribute this software for any
    purpose with or without fee is hereby granted.

    THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
    REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
    AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
    INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
    LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
    OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
    PERFORMANCE OF THIS SOFTWARE.
    ***************************************************************************** */
    function __values(o) {
      var s = typeof Symbol === "function" && Symbol.iterator,
          m = s && o[s],
          i = 0;
      if (m) return m.call(o);
      if (o && typeof o.length === "number") return {
        next: function () {
          if (o && i >= o.length) o = void 0;
          return {
            value: o && o[i++],
            done: !o
          };
        }
      };
      throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
    }

    /*
     * Copyright (c) 2015 NAVER Corp.
     * egjs projects are licensed under the MIT license
     */

    function isUndefined(value) {
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
      /**
       * @support {"ie": "7+", "ch" : "latest", "ff" : "latest",  "sf" : "latest", "edge" : "latest", "ios" : "7+", "an" : "2.1+ (except 3.x)"}
       */
      function Component() {
        /**
         * @deprecated
         * @private
         */
        this.options = {};
        this._eventHandler = {};
      }
      /**
       * Triggers a custom event.
       * @ko 커스텀 이벤트를 발생시킨다
       * @param {string} eventName The name of the custom event to be triggered <ko>발생할 커스텀 이벤트의 이름</ko>
       * @param {object} customEvent Event data to be sent when triggering a custom event <ko>커스텀 이벤트가 발생할 때 전달할 데이터</ko>
       * @param {any[]} restParam Additional parameters when triggering a custom event <ko>커스텀 이벤트가 발생할 때 필요시 추가적으로 전달할 데이터</ko>
       * @return Indicates whether the event has occurred. If the stop() method is called by a custom event handler, it will return false and prevent the event from occurring. <a href="https://github.com/naver/egjs-component/wiki/How-to-make-Component-event-design%3F">Ref</a> <ko>이벤트 발생 여부. 커스텀 이벤트 핸들러에서 stop() 메서드를 호출하면 'false'를 반환하고 이벤트 발생을 중단한다. <a href="https://github.com/naver/egjs-component/wiki/How-to-make-Component-event-design%3F">참고</a></ko>
       * @example
       * ```
       * class Some extends eg.Component {
       *   some(){
       *     if(this.trigger("beforeHi")){ // When event call to stop return false.
       *       this.trigger("hi");// fire hi event.
       *     }
       *   }
       * }
       *
       * const some = new Some();
       * some.on("beforeHi", (e) => {
       *   if(condition){
       *     e.stop(); // When event call to stop, `hi` event not call.
       *   }
       * });
       * some.on("hi", (e) => {
       *   // `currentTarget` is component instance.
       *   console.log(some === e.currentTarget); // true
       * });
       * // If you want to more know event design. You can see article.
       * // https://github.com/naver/egjs-component/wiki/How-to-make-Component-event-design%3F
       * ```
       */


      var __proto = Component.prototype;

      __proto.trigger = function (eventName) {
        var _this = this;

        var params = [];

        for (var _i = 1; _i < arguments.length; _i++) {
          params[_i - 1] = arguments[_i];
        }

        var handlerList = this._eventHandler[eventName] || [];
        var hasHandlerList = handlerList.length > 0;

        if (!hasHandlerList) {
          return true;
        }

        var customEvent = params[0] || {};
        var restParams = params.slice(1); // If detach method call in handler in first time then handler list calls.

        handlerList = handlerList.concat();
        var isCanceled = false; // This should be done like this to pass previous tests

        customEvent.eventType = eventName;

        customEvent.stop = function () {
          isCanceled = true;
        };

        customEvent.currentTarget = this;
        var arg = [customEvent];

        if (restParams.length >= 1) {
          arg = arg.concat(restParams);
        }

        handlerList.forEach(function (handler) {
          handler.apply(_this, arg);
        });
        return !isCanceled;
      };
      /**
       * Executed event just one time.
       * @ko 이벤트가 한번만 실행된다.
       * @param {string} eventName The name of the event to be attached <ko>등록할 이벤트의 이름</ko>
       * @param {function} handlerToAttach The handler function of the event to be attached <ko>등록할 이벤트의 핸들러 함수</ko>
       * @return An instance of a component itself<ko>컴포넌트 자신의 인스턴스</ko>
       * @example
       * ```
       * class Some extends eg.Component {
       * hi() {
       *   alert("hi");
       * }
       * thing() {
       *   this.once("hi", this.hi);
       * }
       *
       * var some = new Some();
       * some.thing();
       * some.trigger("hi");
       * // fire alert("hi");
       * some.trigger("hi");
       * // Nothing happens
       * ```
       */


      __proto.once = function (eventName, handlerToAttach) {
        var _this = this;

        if (typeof eventName === "object" && isUndefined(handlerToAttach)) {
          var eventHash = eventName;

          for (var key in eventHash) {
            this.once(key, eventHash[key]);
          }

          return this;
        } else if (typeof eventName === "string" && typeof handlerToAttach === "function") {
          var listener_1 = function () {
            var args = [];

            for (var _i = 0; _i < arguments.length; _i++) {
              args[_i] = arguments[_i];
            }

            handlerToAttach.apply(_this, args);

            _this.off(eventName, listener_1);
          };

          this.on(eventName, listener_1);
        }

        return this;
      };
      /**
       * Checks whether an event has been attached to a component.
       * @ko 컴포넌트에 이벤트가 등록됐는지 확인한다.
       * @param {string} eventName The name of the event to be attached <ko>등록 여부를 확인할 이벤트의 이름</ko>
       * @return {boolean} Indicates whether the event is attached. <ko>이벤트 등록 여부</ko>
       * @example
       * ```
       * class Some extends eg.Component {
       *   some() {
       *     this.hasOn("hi");// check hi event.
       *   }
       * }
       * ```
       */


      __proto.hasOn = function (eventName) {
        return !!this._eventHandler[eventName];
      };
      /**
       * Attaches an event to a component.
       * @ko 컴포넌트에 이벤트를 등록한다.
       * @param {string} eventName The name of the event to be attached <ko>등록할 이벤트의 이름</ko>
       * @param {function} handlerToAttach The handler function of the event to be attached <ko>등록할 이벤트의 핸들러 함수</ko>
       * @return An instance of a component itself<ko>컴포넌트 자신의 인스턴스</ko>
       * @example
       * ```
       * class Some extends eg.Component {
       *   hi() {
       *     console.log("hi");
       *   }
       *   some() {
       *     this.on("hi",this.hi); //attach event
       *   }
       * }
       * ```
       */


      __proto.on = function (eventName, handlerToAttach) {
        if (typeof eventName === "object" && isUndefined(handlerToAttach)) {
          var eventHash = eventName;

          for (var name in eventHash) {
            this.on(name, eventHash[name]);
          }

          return this;
        } else if (typeof eventName === "string" && typeof handlerToAttach === "function") {
          var handlerList = this._eventHandler[eventName];

          if (isUndefined(handlerList)) {
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
       * @param {string} eventName The name of the event to be detached <ko>해제할 이벤트의 이름</ko>
       * @param {function} handlerToDetach The handler function of the event to be detached <ko>해제할 이벤트의 핸들러 함수</ko>
       * @return An instance of a component itself <ko>컴포넌트 자신의 인스턴스</ko>
       * @example
       * ```
       * class Some extends eg.Component {
       *   hi() {
       *     console.log("hi");
       *   }
       *   some() {
       *     this.off("hi",this.hi); //detach event
       *   }
       * }
       * ```
       */


      __proto.off = function (eventName, handlerToDetach) {
        var e_1, _a; // Detach all event handlers.


        if (isUndefined(eventName)) {
          this._eventHandler = {};
          return this;
        } // Detach all handlers for eventname or detach event handlers by object.


        if (isUndefined(handlerToDetach)) {
          if (typeof eventName === "string") {
            delete this._eventHandler[eventName];
            return this;
          } else {
            var eventHash = eventName;

            for (var name in eventHash) {
              this.off(name, eventHash[name]);
            }

            return this;
          }
        } // Detach single event handler


        var handlerList = this._eventHandler[eventName];

        if (handlerList) {
          var idx = 0;

          try {
            for (var handlerList_1 = __values(handlerList), handlerList_1_1 = handlerList_1.next(); !handlerList_1_1.done; handlerList_1_1 = handlerList_1.next()) {
              var handlerFunction = handlerList_1_1.value;

              if (handlerFunction === handlerToDetach) {
                handlerList.splice(idx, 1);
                break;
              }

              idx++;
            }
          } catch (e_1_1) {
            e_1 = {
              error: e_1_1
            };
          } finally {
            try {
              if (handlerList_1_1 && !handlerList_1_1.done && (_a = handlerList_1.return)) _a.call(handlerList_1);
            } finally {
              if (e_1) throw e_1.error;
            }
          }
        }

        return this;
      };
      /**
       * Version info string
       * @ko 버전정보 문자열
       * @name VERSION
       * @static
       * @example
       * eg.Component.VERSION;  // ex) 2.0.0
       * @memberof eg.Component
       */


      Component.VERSION = "2.2.2";
      return Component;
    }();

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

    var width = 0;
    var height = 0;

    function resize() {
      width = window.innerWidth;
      height = window.innerHeight;
    }

    window.addEventListener("resize", resize);
    resize();

    var WindowSize = ({
        get width () { return width; },
        get height () { return height; }
    });

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
      __extends(Page, _super);
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

        _this.el = el ? isObject(el) ? el : $(el) : null;

        if ("range" in options) {
          var range = options.range;
          var rangeArr = isArray(range) ? range : [range, range];
          _this._range = rangeArr;
        }

        if ("margin" in options) {
          var margin = options.margin;

          if (isArray(margin)) {
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

        var rangeArr = isArray(range) ? range : [range, range];
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

        var sizeInfos = splitSpace(size);

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
          return this.calcSize(splitBracket(size).value, rect);
        }

        var info = splitUnit(size);

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
      __extends(Pages, _super);
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

    var Page$1 = Page;

    var manager = new Page$1.s({
        events: ["resize", "scroll"],
    });
    var pages = [];
    function add(page) {
        pages.push(page);
        manager.add(page);
    }
    function scroll$1() {
        manager.scroll();
    }

    var clapper = document.querySelector(".clapper");
    function makeShadow(element, func, options, left, top) {
        if (left === void 0) { left = 10; }
        if (top === void 0) { top = 15; }
        var target = func(__assign$1({ left: left, top: top, opacity: 1 }, options));
        func(__assign$1({ left: left * 2, top: top * 2, opacity: 0.2 }, options), target);
        element.appendChild(target);
        return target;
    }
    var radius = 50;
    for (var i = 1; i <= 6; ++i) {
        var size = (170 - (i - 1) * 20);
        var stroke = radius * 12 / size;
        var ir = radius - stroke;
        var target = makeShadow(clapper, oval, {
            "className": "svg_circle svg_circle".concat(i, " center"),
            "r": ir,
            "strokeWidth": stroke,
            "strokeLinejoin": "round",
            "stroke-linecap": "round",
            "stroke": "#333",
            "rotate": -360,
            "origin": "50% 50%",
        }, 5, 5);
        target.style.cssText = "width: ".concat(size, "px; height: ").concat(size, "px;");
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
        origin: "50% 50%",
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
        origin: "50% 50%",
    });
    var nextStep = 2.6;
    var nextStep2 = nextStep + 3;
    var nextStep3 = nextStep2 + 1.6;
    var EASE_IN_OUT = Scene.EASE_IN_OUT;
    var scene = new Scene({
        ".logo1 .scene1.circle": function (i) { return ({
            0: {
                transform: "scale(0)",
            },
            0.2: {
                "border-width": "50px",
            },
            0.5: {
                opacity: 1,
            },
            1: {
                "transform": "scale(1)",
                "border-width": "0px",
                "opacity": 0,
            },
            options: {
                delay: i * 0.4,
            },
        }); },
        ".logo1 ellipse": function (i, el) {
            var _a;
            var opacity = el.getAttribute("opacity");
            var index = Math.floor(i / 2);
            return _a = {
                    0: {
                        "opacity": 0,
                        "stroke-dasharray": "0 1000",
                        "transform": "scaleX(".concat(index % 2 ? -1 : 1, ") rotate(").concat(-90 + index * 180, "deg)"),
                    },
                    0.1: {
                        opacity: opacity,
                    }
                },
                _a[0.6] = {
                    "stroke-dasharray": "".concat(70, " 1000"),
                    "stroke-dashoffset": 0,
                },
                _a[1.1 - index * 0.06] = {
                    opacity: opacity,
                },
                _a[1.2 - index * 0.06] = {
                    "stroke-dashoffset": -76,
                    "stroke-dasharray": "0 1000",
                    "transform": "rotate(".concat(180 + index * 180, "deg)"),
                    "opacity": 0,
                },
                _a.options = {
                    delay: nextStep + index * 0.16,
                },
                _a;
        },
        ".play_btn.back": {
            0: {
                transform: "translate(-50%, -50%) translate2(3px) scale(1)",
            },
            1: {
                transform: "scale(0.5)",
            },
            2: {
                transform: "scale(1)",
            },
            options: {
                delay: nextStep + 1,
            },
        },
        ".play_btn.front": {
            0: {
                transform: "translate(-50%, -50%) translate2(3px) scale(0)",
            },
            1: {
                transform: "scale(1)",
            },
            options: {
                delay: nextStep + 2.4,
            },
        },
        ".play_circle": {
            0: {
                transform: "translate(-50%, -50%) scale(0)",
            },
            1: {
                transform: "scale(1)",
            },
            options: {
                delay: nextStep + 2.1,
            },
        },
        ".background": {
            0: {
                transform: "translate(-50%, -50%) scale(0)",
            },
            1: {
                transform: "scale(1)",
            },
            options: {
                delay: nextStep + 1.8,
            },
        },
        ".stick1 .rect": function (i) { return ({
            0: {
                transform: {
                    scale: 0,
                    skew: "15deg",
                },
            },
            0.7: {
                transform: {
                    scale: 1,
                },
            },
            options: {
                delay: nextStep2 - 0.2 + i * 0.22,
            },
        }); },
        ".stick2 .rect": function (i) { return ({
            0: {
                transform: {
                    scale: 0,
                    skew: "-15deg",
                },
            },
            0.7: {
                transform: {
                    scale: 1,
                },
            },
            options: {
                delay: nextStep2 + i * 0.22,
            },
        }); },
        ".stick1": {
            0: {
                transform: {
                    rotate: "0deg",
                },
            },
            0.5: {
                transform: {
                    rotate: "-20deg",
                },
            },
            1: {
                transform: {
                    rotate: "0deg",
                },
            },
            1.5: {
                transform: {
                    rotate: "-10deg",
                },
            },
            options: {
                delay: nextStep3,
                easing: EASE_IN_OUT,
            },
        },
        ".logo1 .clapper": {
            0: {
                transform: "rotate(0deg)",
            },
            0.5: {
                transform: "rotate(-15deg)",
            },
            1: {
                transform: "rotate(0deg)",
            },
            1.5: {
                transform: "rotate(-10deg)",
            },
            options: {
                delay: nextStep3,
                easing: EASE_IN_OUT,
            },
        },
        ".logo1 .character .left": function (i) { return ({
            0: {
                transform: {
                    translateX: "-100%",
                },
            },
            1: {
                transform: {
                    translateX: "0%",
                },
            },
            options: {
                delay: nextStep2 + i * 0.1,
            },
        }); },
        ".logo1 .character .right": function (i) { return ({
            0: {
                transform: {
                    translateX: "100%",
                },
            },
            1: {
                transform: {
                    translateX: "0%",
                },
            },
            options: {
                delay: nextStep2 + i * 0.1,
            },
        }); },
        ".logo1 .description p span": function (i) { return ({
            0: {
                transform: {
                    translateY: "-100%",
                },
            },
            1: {
                transform: {
                    translateY: "0%",
                },
            },
            options: {
                delay: nextStep3 + 0.5 + i * 0.2,
            },
        }); },
    }, {
        easing: EASE_IN_OUT,
        selector: true,
    });
    var mediaScene = new MediaScene();
    mediaScene
        .addMedia("./clapper.mp3")
        .seek(0, 0.452)
        .setPlaySpeed(2)
        .setVolume(0.7)
        .setDelay(nextStep3 + 0.9);
    window.mediaScene = mediaScene;
    addEvent($(".play_btn.front"), "click", function () {
        scene.play();
        mediaScene.play();
    });
    var page1 = new Page$1(".page.page1");
    page1.range(["10%", "90%"]).on({
        firstEnter: function () {
            scene.play();
            mediaScene.play();
        },
    });
    add(page1);

    new Scene({
        ".page2 .icon1 .lang": function (i) { return ({
            0: {
                "border-color": "#f55",
                "color": "#f55",
            },
            0.5: {
                "border-color": "#f55",
                "color": "#f55",
            },
            1.5: {
                "border-color": "#fff",
                "color": "#fff",
            },
            2: {
                "border-color": "#fff",
                "color": "#fff",
            },
            options: {
                direction: i ? "alternate-reverse" : "alternate",
                iterationCount: "infinite",
            },
        }); },
    }, {
        easing: Scene.EASE_IN_OUT,
        selector: true,
    }).setTime(0).exportCSS({
        selector: function (_, selector) {
            return ".page2 [data-feature=\"play\"]:hover .icon1 ".concat(selector);
        },
    });
    new Scene({
        ".page2 .icon2 .thumb": {
            0: {
                transform: {
                    translate: "-50%, -50%",
                    translate2: "0px",
                },
            },
            1: {
                transform: {
                    translate2: "100px",
                },
            },
        },
    }, {
        iterationCount: "infinite",
        direction: "alternate",
        easing: Scene.EASE_IN_OUT,
        selector: true,
    }).exportCSS({
        selector: ".page2 [data-feature=\"progress\"]:hover .icon2 .thumb, .page2 [data-feature=\"progress\"]:focus .icon2 .thumb",
    });
    new Scene({
        ".page2 .icon3 svg path": {
            "0": {
                "stroke-dasharray": "4450 4450",
            },
            "0>": {
                "stroke-dasharray": "0 4450",
            },
            "0.3": {
                "stroke-dasharray": "360 4450",
            },
            "1.2": {
                "stroke-dasharray": "1400 4450",
            },
            "2": {
                "stroke-dasharray": "2400 4450",
            },
            "2.6": {
                "stroke-dasharray": "3000 4450",
            },
            "3.1": {
                "stroke-dasharray": "4450 4450",
            },
            "3.5": {},
        },
    }, {
        iterationCount: "infinite",
        easing: Scene.EASE_IN,
        selector: true,
    }).exportCSS({
        selector: ".page2 [data-feature=\"svg\"]:hover .icon3 path, .page2 [data-feature=\"svg\"]:focus .icon3 path",
    }).setTime(0);
    new Scene({
        ".page2 .icon4 .play_bar": {
            0: {
                left: "0%",
            },
            2: {
                left: "100%",
            },
        },
    }, {
        iterationCount: "infinite",
        easing: Scene.LINEAR,
        selector: true,
    }).exportCSS({
        selector: ".page2 [data-feature=\"timeline\"]:hover .icon4 .play_bar",
    });
    var valueFeatureElement = $(".page2 [data-feature=\"value\"]");
    Scene.setRole(["text"], true);
    var icon5Scene = new Scene({
        ".slide": function (i) { return ({
            1.5: {
                transform: "translateY(-50%) translate(".concat(i * 100, "%)"),
            },
            2.5: {
                transform: "translate(".concat((i - 1) * 100, "%)"),
            },
            4: {
                transform: "translateY(-50%) translate(".concat((i - 1) * 100, "%)"),
            },
            5: {
                transform: "translate(".concat((i - 2) * 100, "%)"),
            },
            options: {
                easing: Scene.EASE_IN_OUT,
            },
        }); },
        ".slide:nth-child(1) .target": {
            0: {
                opacity: 1,
            },
            1: {
                opacity: 0,
            },
        },
        ".slide:nth-child(2) .target": {
            0: {
                "background-color": "rgb(255, 255, 255)",
            },
            1: {
                "background-color": "rgb(255, 90, 90)",
            },
            options: {
                delay: 2.5,
            },
        },
        ".slide:nth-child(3) .target": {
            0: {
                "font-weight": "bold",
                "background": "transparent",
                "text": "",
            },
            0.12: {
                text: "S",
            },
            0.24: {
                text: "Sc",
            },
            0.36: {
                text: "Sce",
            },
            0.48: {
                text: "Scen",
            },
            0.60: {
                text: "Scene",
            },
            0.72: {
                text: "Scene.",
            },
            0.84: {
                text: "Scene.j",
            },
            0.96: {
                text: "Scene.js",
            },
            2: {},
            options: {
                delay: 5,
            },
        },
    }, {
        iterationCount: "infinite",
        selector: true,
    }).setTime(0);
    var descriptionElements = toArray($(".page2 .slide .sub_description", true));
    icon5Scene.getItem(".slide:nth-child(1) .target").on("animate", function (e) {
        var el = descriptionElements[0];
        el.innerHTML = "opacity: ".concat(e.frame.get("opacity").toFixed(2));
    });
    icon5Scene.getItem(".slide:nth-child(2) .target").on("animate", function (e) {
        var el = descriptionElements[1];
        el.innerHTML = "".concat(e.frame.get("background-color"));
    });
    icon5Scene.getItem(".slide:nth-child(3) .target").on("animate", function (e) {
        var el = e.currentTarget.elements[0];
        el.innerHTML = "".concat(e.frame.get("text"));
    });
    new Scene({
        ".icon6 .card-rotor": {
            0: Scene.flipY({ y: 2, duration: 2 }),
        },
        ".icon6 .bottom": {
            0: {
                transform: "translateX(-50%) scaleX(4)",
            },
            0.5: {
                transform: "scaleX(1)",
            },
            options: {
                iterationCount: 4,
                direction: "alternate",
            },
        }
    }, {
        easing: "linear",
        direction: "alternate",
        iterationCount: "infinite",
        selector: true,
    }).exportCSS({
        selector: function (item, selector) { return ".page2 [data-feature=\"effect\"]:hover ".concat(selector); },
    }).setTime(0);
    toArray($(".page2 li .feature", true)).forEach(function (el) {
        addEvent(el, "click", function () { });
    });
    addEvent(valueFeatureElement, "mouseenter", function () {
        icon5Scene.getPlayState() !== "running" && icon5Scene.play();
    });
    addEvent(valueFeatureElement, "mouseleave", function () {
        icon5Scene.pause();
    });
    var page2 = new Page$1(".page.page2");
    add(page2);

    var page3 = new Page$1(".page.page3");
    add(page3);

    var page4 = new Page$1(".page.page4");
    add(page4);

    function scroll(to) {
        return Scene.animateItem({
            scrollTop: [document.documentElement.scrollTop || document.body.scrollTop, to],
        }, {
            duration: 1,
            easing: Scene.EASE,
        }).on("animate", function (_a) {
            var frame = _a.frame;
            window.scrollTo(0, frame.get("scrollTop"));
        });
    }

    var body = document.body;
    var nav = $("nav");
    var navButon = $(".nav_button");
    var menus = $("nav [data-item] a", true);
    var navScene = new Scene({
        "nav": {
            0: {
                "background-color": "rgba(255, 255, 255, 0)",
            },
            0.5: {
                "background-color": "rgba(255, 255, 255, 0.7)",
            },
        },
        "nav .half": {
            0.2: {
                transform: {
                    translate: "-100%",
                    translate2: "-15vw",
                },
            },
            1.1: {
                transform: {
                    translate: "0%",
                    translate2: "0vw",
                },
            },
        },
        "nav li": function (i) { return ({
            0: {
                opacity: 0,
                transform: "translate(-50px)",
            },
            0.3: {
                opacity: 1,
                transform: "translate(0px)",
            },
            options: {
                delay: 0.9 + i * 0.1,
            },
        }); },
    }, {
        easing: Scene.EASE_IN_OUT,
        selector: true,
    }).on({
        play: function () {
            nav.style.display = "block";
        },
        ended: function () {
            if (navScene.getDirection() === "reverse") {
                nav.style.display = "none";
            }
            else {
                nav.style.display = "block";
            }
        },
    });
    function enterNav() {
        if (hasClass(body, "navigate") || (navScene.getPlayState() === "running" && navScene.getDirection() === "normal")) {
            return;
        }
        addClass(body, "navigate");
        navScene.pause();
        navScene.setPlaySpeed(1);
        navScene.setDirection("normal");
        navScene.setTime(0);
        navScene.play();
    }
    function exitNav() {
        if (!hasClass(body, "navigate") ||
            (navScene.getPlayState() === "running" && navScene.getDirection() === "reverse")) {
            return;
        }
        removeClass(body, "navigate");
        navScene.pause();
        navScene.setPlaySpeed(1.5);
        navScene.setDirection("reverse");
        navScene.setTime(0);
        navScene.play();
    }
    toArray(menus).forEach(function (menu, i) {
        var page = pages[i];
        page.range(["window - 1", "window"]).on({
            enter: function (e) {
                addClass(menu, "enter");
            },
            exit: function (e) {
                removeClass(menu, "enter");
            },
        });
        menu.addEventListener("click", function (e) {
            e.preventDefault();
            scroll(page.getRect(true).top);
            exitNav();
        });
    });
    $("header .logo").addEventListener("click", function (e) {
        e.preventDefault();
        scroll(pages[0].getRect(true).top);
        exitNav();
    });
    addEvent(nav, "click", function (e) {
        if (e.target === nav) {
            exitNav();
        }
    });
    addEvent(navButon, "click", function () {
        if (hasClass(body, "navigate")) {
            exitNav();
        }
        else {
            enterNav();
        }
    });
    pages.forEach(function (page, i) {
        if (i % 2 === 0) {
            return;
        }
        page.range(["window - 80", "100% - 80"]).on({
            enter: function (e) {
                addClass(body, "white");
            },
            exit: function (e) {
                removeClass(body, "white");
            },
        });
    });

    scroll$1();

})();
//# sourceMappingURL=index.js.map
