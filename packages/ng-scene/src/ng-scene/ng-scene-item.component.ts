import { Component, OnInit, ElementRef, OnDestroy, AfterContentChecked } from '@angular/core';
import { SceneItem } from 'scenejs';
import { NgSceneInterface } from './ng-scene.interface';

@Component({
  selector: '[ng-scene-item], ng-scene-item',
  template: '<ng-content></ng-content>',
})
export class NgSceneItemComponent extends NgSceneInterface implements OnInit {
  static ctorParameters() {
    return [{ type: ElementRef }];
  }
  constructor(protected _element: ElementRef) {
    super();
  }
  ngOnInit() {
    this.item = new SceneItem();
    const item = this.item;

    if (this.keyframes) {
      item.set(this.keyframes);
    } else {
      item.set('0%', this.from);
      item.set('100%', this.to);
    }
    const element = this._element.nativeElement;

    item.setElement(element.nodeName === 'NG-SCENE-ITEM' ? element.children : element);
    this.init();
  }
}
