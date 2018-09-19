# ng-scene [![npm version](https://badge.fury.io/js/ng-scene.svg)](https://badge.fury.io/js/ng-scene)
It is an angular component of scenejs animation library.

This supports @angular 5.x, 6.x.

* [Raindrop Demo](https://codesandbox.io/s/6vmzwl9nvz)

## Install
```bash
$ npm install ng-scene  --save
```

## How to use
* Module
```js
import { NgSceneModule } from 'ng-scene';

@NgModule({
  imports: [
    ...
    NgSceneModule,
    ...
  ],
})
export class AppModule {}
```
* Component
```ts
import { Component } from '@angular/core';
import { EASE, EASE_IN, EASE_IN_OUT, bezier, steps, STEP_START, STEP_END } from 'ng-scene';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  easing = EASE_IN_OUT;
  keyframes = {
    '0': {'border-width': '150px', opacity: 1, transform: 'scale(0)'},
    '1': {'border-width': '0px', opacity: '0.3', transform: 'scale(0.7)'},
  };
}

```
* Template
```html
<ng-scene iterationCount="infinite" [easing]="easing" css autoplay>
    <ng-scene-item
      [duration]=1
      [from]="{'border-width': '150px', opacity: 1, transform: 'scale(0)'}"
      [to]="{'border-width': '0px', opacity: 0, transform: 'scale(1)'}">
      <div class="raindrop"></div>
    </ng-scene-item>
    <div class="raindrop" [keyframes]="keyframes" [delay]=0.4 ng-scene-item>
    </div>
    <div class="raindrop" [keyframes]="keyframes" [delay]=0.8 ng-scene-item>
    </div>
  </div>
</ng-scene>
```


### easing
* [easing list](https://daybrush.github.io/scenejs/release/latest/doc/easing.html)

### Props
|name|type|default|description|
|---|---|---|---|
|css|boolean|false|Check to play with CSS|
|autoplay|boolean|false|Check to play automatically|
|from(ng-scene-item)|object||Start properties. only |
|to(ng-scene-item)|object||End properties|
|keyframes(ng-scene-item)|object||Specify properties by time. If not keyframes, use **from**, **to**, and **duration**.|
|...options|||[Check out the options](https://daybrush.github.io/scenejs/release/latest/doc/global.html#AnimatorOptions)|

### Events
The event prefix is **ng**
```html
<ng-scene-item [delay]=1 [duration]=2 (nganimate)="animate($event)" (ngplay)="play($event)" ngpaused="paused($event)">
  <div class="item"></div>
  <div class="item"></div>
  <div class="item"></div>
</ng-scene-item>
```
* [ng-scene events](https://daybrush.github.io/scenejs/release/latest/doc/Scene.html#events)
* [ng-scene-item events](https://daybrush.github.io/scenejs/release/latest/doc/Scene.SceneItem.html#events)