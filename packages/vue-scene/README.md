# vue-scene [![npm version](https://badge.fury.io/js/vue-scene.svg)](https://badge.fury.io/js/vue-scene)
It is an vue component of scenejs animation library.

This supports @vue 2.x

* [Raindrop Demo](https://codesandbox.io/s/98zn82kq1w)

## Install
```bash
$ npm install vue-scene  --save
```

## How to use
```js
import {VueScene, VueSceneItem, EASE, EASE_IN, EASE_IN_OUT, bezier, steps, STEP_START, STEP_END} from "vue-scene";

export default {
  name: "App",
  components: {
    VueScene,
    VueSceneItem
  },
  data: function () {
    return {
      easing: EASE_IN_OUT,
      time: 0,
      keyframes: {
        0: {"border-width": "150px", opacity: 1, transform: "scale(0)" },
        1: { "border-width": "0px", opacity: 0.3, transform: "scale(0.7)" },
      },
    };
  },
};
```
* Scene
```html
<vue-scene v-bind:easing='easing' v-bind:time='time'>
	<div class='container'>
		<vue-scene-item v-bind:keyframes='keyframes'>
		<div class='raindrop'></div>
		</vue-scene-item>
		<vue-scene-item v-bind:keyframes='keyframes' v-bind:delay='0.4'>
		<div class='raindrop'></div>
		</vue-scene-item>
		<vue-scene-item v-bind:keyframes='keyframes' v-bind:delay='0.8'>
		<div class='raindrop'></div>
		</vue-scene-item>
	</div>
</vue-scene>
  ```
* SceneItem
```html
<vue-scene-item
  v-bind:time="time" v-bind:duration=1
  v-bind:from="{'border-width': '150px', opacity: 1, transform: 'scale(0)'}"
  v-bind:to="{'border-width': '0px', opacity: 0, transform: 'scale(1)'}"
  iterationCount='infinite'>
  <div class='raindrop'></div>
</vue-scene-item>
```

### easing
* [easing list](https://daybrush.github.io/scenejs/release/latest/doc/easing.html)
### Props
|name|type|default|description|
|---|---|---|---|
|css|boolean|false|Check to play with CSS|
|autoplay|boolean|false|Check to play automatically|
|from(vue-scene-item)|object||Start properties. only |
|to(vue-scene-item)|object||End properties|
|keyframes(vue-scene-item)|object||Specify properties by time. If not keyframes, use **from**, **to**, and **duration**.|
|...options|||[Check out the options](https://daybrush.github.io/scenejs/release/latest/doc/global.html#AnimatorOptions)|

### Events
```html
<vue-scene-item v-on:animate="animate($event)" v-on:play="play($event)" v-on:paused="paused($event)">
  <div class="item"></div>
</vue-scene-item>
```
* [vue-scene events](https://daybrush.github.io/scenejs/release/latest/doc/Scene.html#events)
* [vue-scene-item events](https://daybrush.github.io/scenejs/release/latest/doc/Scene.SceneItem.html#events)