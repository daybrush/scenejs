import { Component, OnInit, ElementRef, OnDestroy } from '@angular/core';
import { SceneItem } from 'scenejs';
import { StateInterface } from 'scenejs/declaration/Animator';
import { NgSceneInterface, OPTIONS, EVENTS } from './ng-scene.interface';

@Component({
  selector: '[ng-scene-item], ng-scene-item',
  template: '<ng-content></ng-content>',
})
export class NgSceneItemComponent extends NgSceneInterface implements OnInit, OnDestroy {
  static ctorParameters() {
    return [{ type: ElementRef }];
  }
  constructor(protected _element: ElementRef) {
    super();
  }
  ngOnInit() {
    this.item = new SceneItem();
    const item = this.item;

    EVENTS.forEach(name => {
      item.on(name, e => {
        this[`ng${name}`].emit(e);
      });
    });

    if (this.keyframes) {
      item.set(this.keyframes);
    } else {
      item.set('0%', this.from);
      item.set('100%', this.to);
    }
    const itemOptions: StateInterface = {};

    OPTIONS.forEach(name => {
      itemOptions[name] = this[name];
    });
    item.setOptions(itemOptions);

    const element = this._element.nativeElement;

    item.setElement(element.nodeName === 'NG-SCENE-ITEM' ? element.children : element);
    if (this.autoplay !== false) {
      this.play();
    }
  }
}
