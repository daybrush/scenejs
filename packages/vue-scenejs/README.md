
<p align="middle"><img src="https://daybrush.com/scenejs/images/clapperboard.png" width="250"/></p>
<h2 align="middle">Vue Scene.js</h2>
<p align="middle"><a href="https://badge.fury.io/js/vue-scenejs" target="_blank"><img src="https://badge.fury.io/js/vue-scenejs.svg" alt="npm version" height="18"/></a>  <img src="https://img.shields.io/badge/language-typescript-blue.svg"/> <a href="https://github.com/daybrush/scenejs/blob/master/LICENSE" target="_blank"><img src="https://img.shields.io/badge/License-MIT-brightgreen.svg"/></a></p>


<p align="middle">🎬 A Vue Component that create JavaScript & CSS timeline-based animation with Scene.js.</p>

<p align="middle"><a href="https://daybrush.com/scenejs"><strong>About Scene.js</strong></a> &nbsp;/&nbsp; <a href="https://daybrush.com/scenejs/release/latest/doc"><strong>API</strong></a> &nbsp;/&nbsp; <a href="https://daybrush.com/scenejs/features.html"><strong>Features</strong></a> &nbsp;/&nbsp; <a href="https://codesandbox.io/s/ngxscenejs-clapperboard-raindrop-demo-njhkc"><strong>CodeSandbox Demo</strong></a></p>
<br/>


## Installation
```bash
$ npm install vue-scenejs
```



## How to use
```html
<template>
  <vue-scene
    :keyframes="keyframes"
    easing="ease-in-out"
    fillMode="forwards"
    direction="normal"
    :iterationCount="1"
    :playSpeed="1"
    :time="0"
    :css="false"
    :autoplay="false"
    @play="onPlay"
    @paused="onPaused"
    @ended="onEnded"
    @animate="onAnimate"
    @timeupdate="onTimeUpdate"
    @iteration="onIteration"
  >
    <div className="circles">
      <div className="circle circle1"></div>
      <div className="circle circle2"></div>
      <div className="circle circle3"></div>
    </div>
  </vue-scene>
</template>
<script>
  import { VueScene, VueSceneItem } from "vue-scenejs";

  export default {
    name: "App",
    components: {
      VueScene,
      VueSceneItem,
    },
    data: function () {
      return {
        keyframes: {
          ".circles .circle": i => ({
            0: {
              "border-width": "150px",
              "opacity": 1,
              "transform": "translate(-50%, -50%) scale(0)",
            },
            1.5: {
              "border-width": "0px",
              "opacity": 0.3,
              "transform": "scale(0.7)",
            },
            options: {
              delay: i * 0.4,
            },
          }),
        },
      };
    },
  };
</script>
```


### Props
|name|type|default|description|
|---|---|---|---|
|css|boolean|false|Check to play with CSS|
|autoplay|boolean|false|Check to play automatically|
|keyframes|object|{}|Specify properties by time.|
|...options|||[Check out the options](https://daybrush.github.io/scenejs/release/latest/doc/global.html#AnimatorOptions)|
|...events|||[Check out Scene's events](https://daybrush.com/scenejs/release/latest/doc/Scene.html#events)<br/> [Check out SceneItem's events](https://daybrush.com/scenejs/release/latest/doc/SceneItem.html#events)|




## Development

### Compiles and hot-reloads for development
```
npm run serve
```


## License

```
MIT License

Copyright (c) 2016 Daybrush
```
