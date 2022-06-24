import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ContextMenuModule } from '@perfectmemory/ngx-contextmenu';
import { MonacoeditorComponent } from './monaco-editor/monaco-editor.component';
import { MonacoEditorModule} from "ngx-monaco-editor";
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { environment } from 'src/environments/environment';

@NgModule({
  declarations: [
    AppComponent,
    MonacoeditorComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ContextMenuModule,
    MonacoEditorModule.forRoot(),
    FormsModule,
    NgbModule
  ],
  providers: [
    { provide: 'IFileRepository', useClass: environment.fileRepository }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
