import { Component, AfterViewInit, ContentChildren, QueryList } from '@angular/core';
import Scene from 'scenejs';
import {  StateInterface } from 'scenejs/declaration/Animator';
import { NgSceneItemComponent } from './ng-scene-item.component';
import { NgSceneInterface, EVENTS, OPTIONS } from './ng-scene.interface';


@Component({
  selector: 'ng-scene',
  template: '<ng-content></ng-content>'
})
export class NgSceneComponent extends NgSceneInterface implements AfterViewInit {
  @ContentChildren(NgSceneItemComponent) private _items !: QueryList<NgSceneItemComponent>;
  ngAfterViewInit() {
    this.item = new Scene({}, {});
    const scene: Scene = this.item;

    EVENTS.forEach(name => {
      scene.on(name, e => {
        this[`ng${name}`].emit(e);
      });
    });
    this._items.forEach(ngItem => {
      const item = ngItem.getItem();
      const id = item.getId() || item.setId().getId();

      scene.setItem(id, item);
    });
    const sceneOptions: StateInterface = {};

    OPTIONS.forEach(name => {
      sceneOptions[name] = this[name];
    });

    scene.setOptions(sceneOptions);

    if (this.autoplay !== false) {
      this.play();
    }
  }
}
