import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { JsonFolderRepository } from './repositories/folders/JsonFolderRepository';
import { ContextMenuModule } from '@perfectmemory/ngx-contextmenu';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ContextMenuModule
  ],
  providers: [{ provide: 'IFolderRepository', useClass: JsonFolderRepository }],
  bootstrap: [AppComponent]
})
export class AppModule { }
