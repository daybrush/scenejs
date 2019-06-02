
<p align="middle"><img src="https://daybrush.com/scenejs/images/clapperboard.png" width="250"/></p>
<h2 align="middle">Scene.js</h2>
<p align="middle"><a href="https://badge.fury.io/js/scenejs" target="_blank"><img src="https://badge.fury.io/js/scenejs.svg" alt="npm version" height="18"/></a> <a href="https://travis-ci.org/daybrush/scenejs"><img src="https://travis-ci.org/daybrush/scenejs.svg?branch=master"/></a> <a href="https://coveralls.io/github/daybrush/scenejs?branch=master"><img src="https://coveralls.io/repos/github/daybrush/scenejs/badge.svg?branch=master"/></a> <img src="https://img.shields.io/badge/language-typescript-blue.svg"/> <a href="https://github.com/daybrush/scenejs/blob/master/LICENSE" target="_blank"><img src="https://img.shields.io/badge/License-MIT-brightgreen.svg"/></a></p>


<p align="middle">🎬 Scene.js is an JavaScript & CSS timeline-based animation library.</p>

<p align="middle"><a href="https://daybrush.com/scenejs"><strong>About Scene.js</strong></a> &nbsp;/&nbsp; <a href="https://daybrush.com/scenejs/release/latest/doc"><strong>API</strong></a> &nbsp;/&nbsp; <a href="https://daybrush.com/scenejs/features.html"><strong>Features</strong></a> &nbsp;/&nbsp; <a href="https://codepen.io/collection/DLWxrd/"><strong>Examples</strong></a></p>
<br/>

<p align="middle" style="max-width: 1000px; margin: 0px auto;" >
  <img src="https://daybrush.github.io/scenejs/example/logo.gif" width="280" style="min-width:200px;max-width:320px;width: 32%;"/>&nbsp;
  <img src="https://daybrush.github.io/scenejs/example/motion.gif" width="280" style="min-width:200px;max-width:320px;width: 32%;"/>&nbsp;
  <img src="https://daybrush.github.io/scenejs/example/main.gif" width="280" style="min-width:200px;max-width:320px;width: 32%;"/>&nbsp;
  <img src="https://daybrush.github.io/scenejs/example/dissolve.gif" width="280" style="min-width:200px;max-width:320px;width: 32%;"/>&nbsp;
  <img src="https://daybrush.github.io/scenejs/example/scenejs.gif" width="280" style="min-width:200px;max-width:320px;width: 32%;"/>&nbsp;
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
* [API Documentation](https://daybrush.com/scenejs/release/latest/doc/)
* [Features Documentation](https://daybrush.com/scenejs/features.html)

## Related Projects
* [**react-scenejs**](https://github.com/daybrush/scenejs/tree/master/packages/react-scenejs): A React Component that create JavaScript & CSS timeline-based animation with Scene.js.
* [**ngx-scenejs**](https://github.com/daybrush/scenejs/tree/master/packages/ngx-scenejs): An Angular Component that create JavaScript & CSS timeline-based animation with Scene.js.
* [**vue-scenejs**](https://github.com/daybrush/scenejs/tree/master/packages/vue-scenejs): A Vue Component that create JavaScript & CSS timeline-based animation with Scene.js.
* [**preact-scenejs**](https://github.com/daybrush/scenejs/tree/master/packages/preact-scenejs): A Preact Component that create JavaScript & CSS timeline-based animation with Scene.js.
* [**keyframer**](https://github.com/daybrush/keyframer): Make the CSS Keyframes the keyframes object.
* [**@scenejs/effects**](https://github.com/daybrush/scenejs-effects): Effect collection library where you can add scene effects to Scene.js.
* [**@scenejs/timeline**](https://github.com/daybrush/scenejs-timeline): A library that represents the timeline of Scene.js. You can control time, properties, and items.
* [**@scenejs/media**](https://github.com/daybrush/scenejs-media): A library for playing or controlling media.
* [**@scenejs/iframe**](https://github.com/daybrush/scenejs-iframe): A library that control the animation of iframe with Scene.js.
* [**@scenejs/render**](https://github.com/daybrush/scenejs-render): Make a movie of CSS animation through Scene.js.

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
## Effects
* [wipeIn](https://daybrush.com/scenejs/features.html#wipein)
* [wipeOut](https://daybrush.com/scenejs/features.html#wipeout)
* [zoomIn](https://daybrush.com/scenejs/features.html#zoomin)
* [zoomOut](https://daybrush.com/scenejs/features.html#zoomout)
* [blink](https://daybrush.com/scenejs/features.html#bllink)
* [fadeIn](https://daybrush.com/scenejs/features.html#fadein)
* [fadeOut](https://daybrush.com/scenejs/features.html#fadeout)
* [flip](https://daybrush.com/scenejs/features.html#flip)
* [flipX](https://daybrush.com/scenejs/features.html#flipx)
* [flipY](https://daybrush.com/scenejs/features.html#flipy)
* [shake](https://daybrush.com/scenejs/features.html#shake)
* [shakeX](https://daybrush.com/scenejs/features.html#shakex)
* [shakeY](https://daybrush.com/scenejs/features.html#shakey)
* [transition](https://daybrush.com/scenejs/features.html#transition)


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
