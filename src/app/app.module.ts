import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { JsonFolderRepository } from './repositories/JsonFolderRepository';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [{ provide: 'IFolderRepository', useClass: JsonFolderRepository }],
  bootstrap: [AppComponent]
})
export class AppModule { }
