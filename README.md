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
* [Raindrop Effect](https://codepen.io/daybrush/pen/vRrbXG)
* [Cube](https://codepen.io/daybrush/pen/ybxwpV)
* [Shape](https://codepen.io/daybrush/pen/VXVgpE) 

[**More Examples**](https://codepen.io/collection/DLWxrd/)



## Installation
```bash
$ npm install scenejs
```
```js
<script src="//daybrush.github.io/scenejs/release/latest/dist/scene.min.js"></script>
```

## Components
* [**react-scenejs**](https://www.npmjs.com/package/react-scenejs): A React Component that can easily use scenejs
* [**ng-scene**](https://www.npmjs.com/package/ng-scene): A Angular Component that can easily use scenejs
* [**vue-scene**](https://www.npmjs.com/package/vue-scene): A Vue Component that can easily use scenejs

## Documents
* [API documentation](https://daybrush.github.io/scenejs/release/latest/doc/)

## Make scene
```javascript
import Scene, {EASE_IN_OUT} from "scenejs";

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
  easing: EASE_IN_OUT,
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
* [set](https://daybrush.github.io/scenejs/release/latest/doc/presets.html#.set)
* [transition](https://daybrush.github.io/scenejs/release/latest/doc/presets.html#.transition)

## Support Browser

|Internet Explorer|Chrome|FireFox|Safari|Opera|
|---|---|---|---|---|
|9+(polyfill 8+)|latest|latest|latest|latest|


