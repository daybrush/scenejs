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
import {Scene, SceneItem, easing} from "vue-scene";

export default {
  name: "App",
  components: {
    Scene,
    SceneItem
  },
  data: function () {
    return {
      easing: easing.EASE_IN_OUT,
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
<scene v-bind:easing='easing' v-bind:time='time'>
	<div class='container'>
		<scene-item v-bind:keyframes='keyframes'>
		<div class='raindrop'></div>
		</scene-item>
		<scene-item v-bind:keyframes='keyframes' v-bind:delay='0.4'>
		<div class='raindrop'></div>
		</scene-item>
		<scene-item v-bind:keyframes='keyframes' v-bind:delay='0.8'>
		<div class='raindrop'></div>
		</scene-item>
	</div>
</scene>
  ```
* SceneItem
```html
<scene-item
  v-bind:time="time" v-bind:duration=1
  v-bind:from="{'border-width': '150px', opacity: 1, transform: 'scale(0)'}"
  v-bind:to="{'border-width': '0px', opacity: 0, transform: 'scale(1)'}"
  iterationCount='infinite'>
  <div class='raindrop'></div>
</scene-item>
```

### Props
|name|type|default|description|
|---|---|---|---|
|css|boolean|false|Check to play with CSS|
|autoplay|boolean|false|Check to play automatically|
|from(scene-item)|object||Start properties. only |
|to(scene-item)|object||End properties|
|keyframes(scene-item)|object||Specify properties by time. If not keyframes, use **from**, **to**, and **duration**.|
|...options|||[Check out the options](https://daybrush.github.io/scenejs/release/latest/doc/global.html#AnimatorOptions)|

### Events
```html
<scene-item v-on:animate="animate($event)" v-on:play="play($event)" v-on:paused="paused($event)">
  <div class="item"></div>
  <div class="item"></div>
  <div class="item"></div>
</scene-item>
```
* [scene events](https://daybrush.github.io/scenejs/release/latest/doc/Scene.html#events)
* [scene-item events](https://daybrush.github.io/scenejs/release/latest/doc/Scene.SceneItem.html#events)