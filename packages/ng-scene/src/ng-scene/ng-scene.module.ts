import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgSceneComponent } from './ng-scene.component';
import { NgSceneItemComponent } from './ng-scene-item.component';


@NgModule({
  imports: [
    CommonModule
  ],
  providers: [],
  declarations: [
    NgSceneComponent,
    NgSceneItemComponent,
  ],
  exports: [
    NgSceneComponent,
    NgSceneItemComponent
  ],
})
export class NgSceneModule {

}
