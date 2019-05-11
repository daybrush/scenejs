Scene.js  [![npm version](https://badge.fury.io/js/scenejs.svg)](https://badge.fury.io/js/scenejs) [![Build Status](https://travis-ci.org/daybrush/scenejs.svg?branch=master)](https://travis-ci.org/daybrush/scenejs) [![Coverage Status](https://coveralls.io/repos/github/daybrush/scenejs/badge.svg?branch=master)](https://coveralls.io/github/daybrush/scenejs?branch=master)
============ 

Scene.js is an Javascript Aniamtion Library. Make Your Homepage Dynamic.
<br>


<p align="middle" style="max-width: 1000px; margin: 0px auto;" >
  <img src="https://daybrush.github.io/scenejs/example/logo.gif" width="280" style="min-width:200px;max-width:320px;width: 32%;"/>&nbsp;
  <img src="https://daybrush.github.io/scenejs/example/scenejs.gif" width="280" style="min-width:200px;max-width:320px;width: 32%;"/>&nbsp;
  <img src="https://daybrush.github.io/scenejs/example/main.gif" width="280" style="min-width:200px;max-width:320px;width: 32%;"/>&nbsp;
  <img src="https://daybrush.github.io/scenejs/example/dissolve.gif" width="280" style="min-width:200px;max-width:320px;width: 32%;"/>&nbsp;
  <img src="https://daybrush.github.io/scenejs/example/motion.gif" width="280" style="min-width:200px;max-width:320px;width: 32%;"/>&nbsp;
  <img src="https://daybrush.github.io/scenejs/example/parallax.gif" width="280" style="min-width:200px;max-width:320px;width: 32%;"/>&nbsp;
  <img src="https://daybrush.github.io/scenejs/example/raindrop.gif" width="280" style="min-width:200px;max-width:320px;width: 32%;"/>&nbsp;
  <img src="https://daybrush.github.io/scenejs/example/search.gif" width="280" style="min-width:200px;max-width:320px;width: 32%;"/>&nbsp;
  <img src="https://daybrush.github.io/scenejs/example/shape.gif" width="280" style="min-width:200px;max-width:320px;width: 32%;"/>
</p>


## Examples
* [Circle Burst](https://codepen.io/daybrush/pen/zWMeJW)
* [Motion Effect](https://codepen.io/daybrush/pen/pLxQGY)
* [Tree Animation](https://codepen.io/daybrush/pen/EQPPBg)
* [Snow Animation](https://codepen.io/daybrush/pen/eoYGrx)
* [Card Rotation](https://codepen.io/daybrush/pen/QYRyMd)
* [Raindrop Effect](https://codepen.io/daybrush/pen/vRrbXG)
* [Cube](https://codepen.io/daybrush/pen/ybxwpV)
* [Shape](https://codepen.io/daybrush/pen/VXVgpE) 
* [Timer](https://codepen.io/daybrush/pen/OdMMXd)

[**More Examples**](https://codepen.io/collection/DLWxrd/)



## Installation
```bash
$ npm install scenejs
```
```html
<script src="//daybrush.com/scenejs/release/latest/dist/scene.min.js"></script>
```

## Documents
* [API documentation](https://daybrush.com/scenejs/release/latest/doc/)
* [Features Documentation](https://daybrush.com/scenejs/features.html)

## Related Projects
* [**react-scenejs**](https://www.npmjs.com/package/react-scenejs): A React Component that can easily use scenejs
* [**ng-scene**](https://www.npmjs.com/package/ng-scene): A Angular Component that can easily use scenejs
* [**vue-scene**](https://www.npmjs.com/package/vue-scene): A Vue Component that can easily use scenejs
* [**@scenejs/effects**](https://www.npmjs.com/package/@scenejs/effects): Effect collection library where you can add scene effects to Scenejs.
* [**@scenejs/timeline**](https://www.npmjs.com/package/@scenejs/timeline): A library that represents the timeline of Scene.js. You can control time, properties, and items.
* [**@scenejs/media**](https://www.npmjs.com/package/@scenejs/media): A library for playing or controlling media
* [**@scenejs/render**](https://www.npmjs.com/package/@scenejs/render): Make a movie of CSS animation through scenejs.


## Make scene
```javascript
import Scene from "scenejs";

const scene = new Scene({
  ".class": {
    0: "left: 0px; top: 0px"
    1: {
      "left": "100px",
      "top": "0px"
    },
    2: {
      "left": "200px",
      "top": "100px"
    }
  }
}, {
  selector: true,
  easing: "ease-in-out",
}).play();

```

## easing
* [EASE](https://daybrush.github.io/scenejs/release/latest/doc/easing.html#.EASE)
* [EASE_IN](https://daybrush.github.io/scenejs/release/latest/doc/easing.html#.EASE_IN)
* [EASE_OUT](https://daybrush.github.io/scenejs/release/latest/doc/easing.html#.EASE_OUT)
* [EASE_IN_OUT](https://daybrush.github.io/scenejs/release/latest/doc/easing.html#.EASE_IN_OUT)
* [STEP_START](https://daybrush.github.io/scenejs/release/latest/doc/easing.html#.STEP_START)
* [STEP_END](https://daybrush.github.io/scenejs/release/latest/doc/easing.html#.STEP_END)
* [bezier(x1, y1, x2, y2)](https://daybrush.github.io/scenejs/release/latest/doc/easing.html#.bezier)
* [steps(count, "start" | "end")](https://daybrush.github.io/scenejs/release/latest/doc/easing.html#.steps)


## presets
* [wipeIn](https://daybrush.github.io/scenejs/release/latest/doc/presets.html#.wipeIn)
* [wipeOut](https://daybrush.github.io/scenejs/release/latest/doc/presets.html#.wipeOut)
* [zoomIn](https://daybrush.github.io/scenejs/release/latest/doc/presets.html#.zoomIn)
* [zoomOut](https://daybrush.github.io/scenejs/release/latest/doc/presets.html#.zoomOut)
* [blink](https://daybrush.github.io/scenejs/release/latest/doc/presets.html#.blink)
* [fadeIn](https://daybrush.github.io/scenejs/release/latest/doc/presets.html#.fadeIn)
* [fadeOut](https://daybrush.github.io/scenejs/release/latest/doc/presets.html#.fadeOut)
* [transition](https://daybrush.github.io/scenejs/release/latest/doc/presets.html#.transition)
* [animate](https://daybrush.github.io/scenejs/release/latest/doc/presets.html#.animate)
* [animateItem](https://daybrush.github.io/scenejs/release/latest/doc/presets.html#.animateItem)


## Support Browser

|Internet Explorer|Chrome|FireFox|Safari|Opera|
|---|---|---|---|---|
|9+(10+ playCSS)|latest|latest|latest|latest|



```
MIT License

Copyright (c) 2016 Daybrush

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```