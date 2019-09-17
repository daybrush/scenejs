import { Component, AfterViewInit } from '@angular/core';
import Scene from 'scenejs';
import { NgxSceneInterface } from './ngx-scene.interface';


@Component({
  selector: 'ngx-scene',
  template: '<ng-content></ng-content>'
})
export class NgxSceneComponent extends NgxSceneInterface implements AfterViewInit {
  ngAfterViewInit() {
    this.item = new Scene({}, { selector: true });
    this.init();
  }
}
