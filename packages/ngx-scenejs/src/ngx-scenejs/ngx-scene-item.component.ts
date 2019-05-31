import { Component, OnInit, ElementRef } from '@angular/core';
import { SceneItem } from 'scenejs';
import { NgxSceneInterface } from './ngx-scene.interface';

@Component({
  selector: '[ngx-scene-item], ngx-scene-item',
  template: '<ng-content></ng-content>',
})
export class NgxSceneItemComponent extends NgxSceneInterface implements OnInit {
  constructor(protected el: ElementRef) {
    super();
  }
  ngOnInit() {
    this.item = new SceneItem();
    const item = this.item;
    const element = this.el.nativeElement;

    item.setElement(element.nodeName === 'NGX-SCENE-ITEM' ? element.children : element);
    this.init();
  }
}
