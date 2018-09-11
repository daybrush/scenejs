import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {NgSceneModule} from '../ng-scene/ng-scene.module';


@NgModule({
  declarations: [
    AppComponent,
    // NgSceneComponent,
    // NgSceneItemComponent
  ],
  imports: [
    BrowserModule,
    NgSceneModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {

 }
