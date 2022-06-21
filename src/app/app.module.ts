import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { JsonFileRepository } from './repositories/folders/JsonFileRepository';
import { ContextMenuModule } from '@perfectmemory/ngx-contextmenu';
import { MonacoeditorComponent } from './monaco-editor/monaco-editor.component';
import { MonacoEditorModule} from "ngx-monaco-editor";
import { FormsModule } from '@angular/forms';

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
    FormsModule
  ],
  providers: [{ provide: 'IFileRepository', useClass: JsonFileRepository }],
  bootstrap: [AppComponent]
})
export class AppModule { }
