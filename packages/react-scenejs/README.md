# react-scenejs [![npm version](https://badge.fury.io/js/react-scenejs.svg)](https://badge.fury.io/js/react-scenejs)


* [Raindrop Demo](https://codesandbox.io/s/knz6l89wv)

## Install
```bash
$ npm install react-scenejs  --save
```

## How to use
* Scene
```jsx
import { Scene, EASE, EASE_IN, EASE_IN_OUT, bezier, steps, STEP_START, STEP_END } from 'react-scenejs';

const keyframes = {
  0: {opacity: 0, left: "0px"},
  1: {opacity: 0.3, left: "40px"},
  2: {opacity: 1, left: "100px"},
};

<Scene keyframes={{
  item1: {keyframes: keyframes, options: {delay: 0}},
  item2: {keyframes: keyframes, options: {delay: 0.4}},
  item3: {keyframes: keyframes, options: {delay: 0.8}},
}}
iterationCount={1}
easing={EASE_IN_OUT}
css={true}
autoplay={true}
>
  <div className="item" data-scene-id="item1"></div>
  <div className="item" data-scene-id="item2"></div>
  <div className="item" data-scene-id="item3"></div>
</Scene>
```

* SceneItem
```js
import { SceneItem, EASE, EASE_IN, EASE_IN_OUT, bezier, steps, STEP_START, STEP_END } from 'react-scenejs';

<SceneItem keyframes={{
  0: {opacity: 0, left: "0px"},
  1: {opacity: 0.3, left: "40px"},
  2: {opacity: 1, left: "100px"},
}}
iterationCount="infinite"
easing={easing.EASE_IN_OUT}
css={true}
autoplay={true}
>
  <div className="item"></div>
</SceneItem>
```
### easing
* [easing list](https://daybrush.github.io/scenejs/release/latest/doc/easing.html)

### Props
|name|type|default|description|
|---|---|---|---|
|css|boolean|false|Check to play with CSS|
|autoplay|boolean|false|Check to play automatically|
|from(SceneItem)|object||Start properties|
|to(SceneItem)|object||End properties|
|keyframes|object||Specify properties by time. If not keyframes, use **from**, **to**, and **duration**.|
|...options|||[Check out the options](https://daybrush.github.io/scenejs/release/latest/doc/global.html#AnimatorOptions)|

### Events
The event prefix is **on**
```jsx
<SceneItem
  onPlay={this.onPlay}
  onPaused={this.onPaused}
  onAnimate={this.onAnimate}
  onTimeUpdate={this.onTimeUpdate}
  onIteration={this.onIteration}
	>
</SceneItem>
```
* [Scene events](https://daybrush.github.io/scenejs/release/latest/doc/Scene.html#events)
* [SceneItem events](https://daybrush.github.io/scenejs/release/latest/doc/Scene.SceneItem.html#events)