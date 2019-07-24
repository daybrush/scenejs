
<p align="middle"><img src="https://daybrush.com/scenejs/images/clapperboard.png" width="250"/></p>
<h2 align="middle">Preact Scene.js</h2>
<p align="middle"><a href="https://badge.fury.io/js/preact-scenejs" target="_blank"><img src="https://badge.fury.io/js/react-scenejs.svg" alt="npm version" height="18"/></a>  <img src="https://img.shields.io/badge/language-typescript-blue.svg"/> <a href="https://github.com/daybrush/scenejs/blob/master/LICENSE" target="_blank"><img src="https://img.shields.io/badge/License-MIT-brightgreen.svg"/></a></p>


<p align="middle">🎬 A Preact Component that create JavaScript & CSS timeline-based animation with Scene.js.</p>

<p align="middle"><a href="https://daybrush.com/scenejs"><strong>About Scene.js</strong></a> &nbsp;/&nbsp; <a href="https://daybrush.com/scenejs/release/latest/doc"><strong>API</strong></a> &nbsp;/&nbsp; <a href="https://daybrush.com/scenejs/features.html"><strong>Features</strong></a> &nbsp;/&nbsp; <a href="https://codesandbox.io/s/preactscenejs-clapperboard-raindrop-demo-5o0gd"><strong>CodeSandbox Demo</strong></a></p>
<br/>


## Installation
```bash
$ npm install preact-scenejs
```


## Make scene
```tsx
import { Scene, SceneItem } from "preact-scenejs";

const keyframes = {
  ".circles .circle": (i: number) => ({
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
};

render() {
  return (<Scene
    keyframes={this.keyframes}
    easing="ease-in-out"
    fillMode="forwards"
    direcition="normal"
    iterationCount={1}
    playSpeed={1}
    delay={0}
    time={0}
    css={false}
    autoplay={false}
    ready={true}
    onPlay={e => { console.log(e); }}
    onPaused={e => { console.log(e); }}
    onAnimate={e => { console.log(e); }}
    onTimeUpdate={e => { console.log(e); }}
    onIteration={e => { console.log(e); }}
    onEnded={e => { console.log(e); }}
  >
    <div className="circles">
      <div className="circle circle1"></div>
      <div className="circle circle2"></div>
      <div className="circle circle3"></div>
    </div>
  </Scene>);
}
```

### Props
|name|type|default|description|
|---|---|---|---|
|css|boolean|false|Check to play with CSS|
|autoplay|boolean|false|Check to play automatically|
|keyframes|object|{}|Specify properties by time.|
|ready|boolean|true|Check if you are ready to init and play.|
|...options|||[Check out the options](https://daybrush.github.io/scenejs/release/latest/doc/global.html#AnimatorOptions)|
|...events|||[Check out Scene's events](https://daybrush.com/scenejs/release/latest/doc/Scene.html#events)<br/> [Check out SceneItem's events](https://daybrush.com/scenejs/release/latest/doc/SceneItem.html#events)|

## Development

### `npm start`

Runs the app in the development mode.
Open **./demo/index.html** to view it in the browser.

If you fix it, it will build automatically. Then reload the page.

## Bug Report

If you find a bug, please report it to us using the [Issues](https://github.com/daybrush/scenejs/issues) page on GitHub.

## License

```
MIT License

Copyright (c) 2016 Daybrush
```
