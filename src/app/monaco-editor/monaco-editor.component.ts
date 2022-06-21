import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import $ from 'jQuery';

@Component({
  selector: 'app-monaco-editor',
  templateUrl: './monaco-editor.component.html',
  styleUrls: ['./monaco-editor.component.sass']
})
export class MonacoeditorComponent implements OnInit {
  public editorOptions = {theme: 'vs-dark', language: 'javascript', automaticLayout: true};

  constructor() {
   }

  ngOnInit(): void {
  }

  public onMonacoEditorInit(): void {
      $('.editor-container').css('height', '100%');

      setTimeout(() => {
        $('.monaco-editor').css('height', '100%');
      }, 10);
  }

  public onSave(): void {
    var lines = monaco.editor.getModels()[0].getValue(monaco.editor.EndOfLinePreference.LF);
    console.log(lines);
  }
}
