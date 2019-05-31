
<p align="middle"><img src="https://daybrush.com/scenejs/images/clapperboard.png" width="250"/></p>
<h2 align="middle">Angular Scene.js</h2>
<p align="middle"><a href="https://badge.fury.io/js/ngx-scenejs" target="_blank"><img src="https://badge.fury.io/js/ngx-scenejs.svg" alt="npm version" height="18"/></a>  <img src="https://img.shields.io/badge/language-typescript-blue.svg"/> <a href="https://github.com/daybrush/scenejs/blob/master/LICENSE" target="_blank"><img src="https://img.shields.io/badge/License-MIT-brightgreen.svg"/></a></p>


<p align="middle">🎬 An Angular Component that create tJavaScript & CSS timeline-based animation with Scene.js.</p>

<p align="middle"><a href="https://daybrush.com/scenejs"><strong>About Scene.js</strong></a> &nbsp;/&nbsp; <a href="https://daybrush.com/scenejs/release/latest/doc"><strong>API</strong></a> &nbsp;/&nbsp; <a href="https://daybrush.com/scenejs/features.html"><strong>Features</strong></a> &nbsp;/&nbsp; <a href="https://codesandbox.io/s/ngxscenejs-clapperboard-raindrop-demo-njhkc"><strong>CodeSandbox Demo</strong></a></p>
<br/>


## Installation
```bash
$ npm install ngx-scenejs
```


## Make scene

* app.module.ts
```ts
import { NgxSceneComponent, NgxSceneItemComponent, NgxSceneModule } from "ngx-scenejs";

@NgModule({
  declarations: [
    NgxSceneComponent,
  ],
})
```

* app.component.ts
```ts
@Component(...)
export class AppComponent {
  keyframes = {
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
}
```
* app.component.html

```html
<ngx-scene
  [keyframes]="keyframes"
  easing="ease-in-out"
  fillMode="forwards"
  direction="normal"
  [iterationCount]="1"
  [playSpeed]="1"
  [time]="0"
  [css]="false"
  [autoplay]="false"
  (scenePlay)="onPlay($event)"
  (scenePaused)="onPaused($event)"
  (sceneEnded)="onEnded($event)"
  (sceneAnimate)="onAnimate($event)"
  (sceneTimeUpdate)="onTimeUpdate($event)"
  (sceneIteration)="onIteration($event)"
>
  <div className="circles">
    <div className="circle circle1"></div>
    <div className="circle circle2"></div>
    <div className="circle circle3"></div>
  </div>
</ngx-scene>
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

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 8.0.1.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.



## License

```
MIT License

Copyright (c) 2016 Daybrush
```
