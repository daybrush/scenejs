import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxSceneComponent } from './ngx-scene.component';
import { NgxSceneItemComponent } from './ngx-scene-item.component';


@NgModule({
  imports: [
    CommonModule
  ],
  providers: [],
  declarations: [
    NgxSceneComponent,
    NgxSceneItemComponent,
  ],
  exports: [
    NgxSceneComponent,
    NgxSceneItemComponent
  ],
})
export class NgxSceneModule {

}
