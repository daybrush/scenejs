import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { NgxSceneModule } from 'projects/ngx-scenejs/src/lib/ngx-scene.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    NgxSceneModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
