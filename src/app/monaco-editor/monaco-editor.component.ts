import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import $ from 'jQuery'; 
import { NgxEditorModel } from 'ngx-monaco-editor';

@Component({
  selector: 'app-monaco-editor',
  templateUrl: './monaco-editor.component.html',
  styleUrls: ['./monaco-editor.component.sass']
})
export class MonacoeditorComponent implements OnInit {
  public editorOptions = {theme: 'vs-dark', language: 'javascript', automaticLayout: true};
  public code: string= 'function x() {\nconsole.log("Hello world!");\n}';

  constructor() {
   }

  ngOnInit(): void {
  }

  public onMonacoEditorInit(editor: monaco.editor.ICodeEditor): void { 
      $('.editor-container').css('height', '100%');
      
      setTimeout(() => {
        //console.log(editor.getDomNode());
        //editor.layout();
        $('.monaco-editor').css('height', '100%');
      }, 10);
  }

  public onSave(): void { 
    var save = monaco.editor.getModels()[0].getValue();
    console.log(save);
  }
}
