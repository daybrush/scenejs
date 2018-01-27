Scene.js  [![npm version](https://badge.fury.io/js/scenejs.svg)](https://badge.fury.io/js/scenejs) [![Build Status](https://travis-ci.org/daybrush/scenejs.svg?branch=master)](https://travis-ci.org/daybrush/scenejs)
============ 

Scene.js is an Javascript Aniamtion Library. Make Your Homepage Dynamic.
<br>

![Shape Example](https://daybrush.github.io/scenejs/example/shape.gif)
## Usage
```js
var scene = new Scene({
  ".shape" : {
    0: {
      "border-radius": "0%",
      "transform": "translateY(0px) rotate(0deg)"
    },
    1: {
      "border-radius": "50%",
      "transform": "translateY(200px) rotate(90deg)",
      "border-color": "rgba(0, 0, 0, 1)",
      "border-bottom-color": "rgba(0, 0, 0, 1)"
    },
    2: {
      "transform": "translateY(0px) rotate(-180deg)",
      "border-color": "rgba(0, 0, 0, 0)",
      "border-bottom-color": "rgba(0, 0, 0, 1)",
      "box-shadow": "0px 0px 0 0 black"
    },
    3: {
      "border-radius": "50%",
      "transform": "translateY(200px) rotate(105deg)",
      "border-color": "rgba(0, 0, 0, 0)",
      "border-bottom-color": "rgba(0, 0, 0, 0)",
      "box-shadow": "-15px -20px 0px 0px black"
    },
    4: {
      "border-radius": "0%",
      "transform": "translateY(0px) rotate(0deg)",
      "box-shadow": "0px 0px 0px 0px black",
      "border-color": "rgba(0, 0, 0, 1)",
      "border-bottom-color": "rgba(0, 0, 0, 1)"
    }
  }
}, {
  selector: true,
  iterationCount: "infinite",
  easing: Scene.EASE_IN_OUT
});
// play javascript
scene.play();
// play css
scene.playCSS();
```

## Plugins
* [StopMotion](https://github.com/daybrush/scenejs-stopmotion)
* GetterSetter
* MovieEffect


## Support Browser

|Internet Explorer|Chrome|FireFox|Safari|Opera|
|---|---|---|---|---|
|9+(polyfill 8+)|latest|latest|latest|latest|

## Demo
* [Circle Burst](https://daybrush.github.io/scenejs/example/circleburst.html)
* [Cube](https://daybrush.github.io/scenejs/example/cube.html)
* [Shape](https://daybrush.github.io/scenejs/example/shape.html)

## How to use
### Installation with npm

```bash
$ npm install scenejs
```

### Import library
#### ES5
```HTML
<script src="//daybrush.github.io/scenejs/release/latest/scene.min.js"></script>
```
#### ES6
```js
import Scene from "scenejs";
```

### Make scene

```javascript
var scene = new Scene({
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
  selector: true
}).play();

```

