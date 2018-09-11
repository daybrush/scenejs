import { Component, ViewChild } from '@angular/core';
import { easing } from '../ng-scene';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angular-scenejs';
  easing = easing.EASE_IN_OUT;
  keyframes = {
    '0': {'border-width': '150px', opacity: 1, transform: 'scale(0)'},
    '1': {'border-width': '0px', opacity: '0.3', transform: 'scale(0.7)'},
  };

  @ViewChild('test') someElement;

  animate(e) {
    console.log(e);
  }
  update(e) {
    console.log(this.someElement);
    this.someElement.setTime(e.target.value);
  }
}
