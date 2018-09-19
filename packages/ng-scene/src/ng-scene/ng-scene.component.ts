import { Component, AfterViewInit, ContentChildren, QueryList } from '@angular/core';
import Scene from 'scenejs';
import { NgSceneItemComponent } from './ng-scene-item.component';
import { NgSceneInterface } from './ng-scene.interface';


@Component({
  selector: 'ng-scene',
  template: '<ng-content></ng-content>'
})
export class NgSceneComponent extends NgSceneInterface implements AfterViewInit {
  @ContentChildren(NgSceneItemComponent) private _items !: QueryList<NgSceneItemComponent>;
  ngAfterViewInit() {
    this.item = new Scene();
    const scene: Scene = this.item;

     this._items.forEach(ngItem => {
      const item = ngItem.getItem();
      const id = item.getId() || item.setId().getId();

      scene.setItem(id, item);
    });
    this.init();
  }
}
