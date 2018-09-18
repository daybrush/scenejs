Scene.js  [![npm version](https://badge.fury.io/js/scenejs.svg)](https://badge.fury.io/js/scenejs) [![Build Status](https://travis-ci.org/daybrush/scenejs.svg?branch=master)](https://travis-ci.org/daybrush/scenejs) [![Coverage Status](https://coveralls.io/repos/github/daybrush/scenejs/badge.svg?branch=master)](https://coveralls.io/github/daybrush/scenejs?branch=master)
============ 

Scene.js is an Javascript Aniamtion Library. Make Your Homepage Dynamic.
<br>


<p align="middle">
  <img src="https://daybrush.github.io/scenejs/example/motion.gif" width="400" style="min-width:300px;max-width:450px;width: 48%;"/>
  <img src="https://daybrush.github.io/scenejs/example/raindrop.gif" width="400" style="min-width:300px;max-width:450px;width: 48%;"/>
</p>
<p align="middle">
  <img src="https://daybrush.github.io/scenejs/example/search.gif" width="400" style="min-width:300px;max-width:450px;width: 48%;"/>
  <img src="https://daybrush.github.io/scenejs/example/dissolve.gif" width="400" style="min-width:300px;max-width:450px;width: 48%;"/>
  
</p>
<p align="middle">
  <img src="https://daybrush.github.io/scenejs/example/parallax.gif" width="400" style="min-width:300px;max-width:450px;width: 48%;"/>
  <img src="https://daybrush.github.io/scenejs/example/shape.gif" width="400" style="min-width:300px;max-width:450px;width: 48%;"/>
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
<script src="//daybrush.github.io/scenejs/release/latest/scene.min.js"></script>
```

## Components
* [**react-scenejs**](https://github.com/daybrush/scenejs/tree/master/packages/react-scenejs): A React Component that can easily use scenejs
* [**ng-scene**](https://github.com/daybrush/scenejs/tree/master/packages/ng-scene): A Angular Component that can easily use scenejs
* [**vue-scene**](https://github.com/daybrush/scenejs/tree/master/packages/vue-scene): A Vue Component that can easily use scenejs


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

## Documents
* [API documentation](https://daybrush.github.io/scenejs/release/latest/doc/)

## Support Browser

|Internet Explorer|Chrome|FireFox|Safari|Opera|
|---|---|---|---|---|
|9+(polyfill 8+)|latest|latest|latest|latest|


