# ng-scene [![npm version](https://badge.fury.io/js/ng-scene.svg)](https://badge.fury.io/js/ng-scene)

* [Raindrop Demo](https://codesandbox.io/s/6vmzwl9nvz)

## Install
```bash
$ npm install ng-scene  --save
```

## How to use
* App Module
```js
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { NgSceneModule, easing } from 'ng-scene';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    NgSceneModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
```
* Template
```html
<ng-scene iterationCount="infinite" [easing]="easing.EASE_IN_OUT" css autoplay>
    <div class="raindrop" from="{'left': 0, 'top': }" ng-scene-item>
    </div>
    <div class="raindrop" [keyframes]="keyframes" [delay]=0.4 ng-scene-item>
    </div>
    <div class="raindrop" [keyframes]="keyframes" [delay]=0.8 ng-scene-item>
    </div>
  </div>
</ng-scene>
```

### Attributes
|name|type|default|description|
|---|---|---|---|
|css|boolean|false|Check to play with CSS|
|autoplay|boolean|false|Check to play automatically|
|from|object||Start properties|
|to|object||End properties|
|keyframes|object||specify properties by time|
|...options|||[Check out the options](https://daybrush.github.io/scenejs/release/latest/doc/global.html#AnimatorOptions)|

### Events
The event prefix is **ng**
```html
<ng-scene-item [delay]=1 [duration]=2 (nganimate)="animate($event)" (ngplay)="play($event)" ngpaused="paused($event">
  <div class="item"></div>
  <div class="item"></div>
  <div class="item"></div>
</ng-scene-item>
```
* [ng-scene events](https://daybrush.github.io/scenejs/release/latest/doc/Scene.html#events)
* [ng-scene-item events](https://daybrush.github.io/scenejs/release/latest/doc/Scene.SceneItem.html#events)