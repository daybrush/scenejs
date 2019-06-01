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
