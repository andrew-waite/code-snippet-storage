import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { JsonFileRepository } from './repositories/folders/JsonFileRepository';
import { ContextMenuModule } from '@perfectmemory/ngx-contextmenu';
import { MonacoeditorComponent } from './monaco-editor/monaco-editor.component';
import { MonacoEditorModule} from "ngx-monaco-editor";
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { FileSystemRepository } from './repositories/folders/FIleSystemRepository';

@NgModule({
  declarations: [
    AppComponent,
    MonacoeditorComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ContextMenuModule,
    MonacoEditorModule.forRoot({
      "defaultOptions": {
        "automaticLayout": true
      }
    }),
    FormsModule,
  ],
  providers: [
    { provide: 'IFileRepository', useClass: FileSystemRepository } //useClass: JsonFileRepository }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
