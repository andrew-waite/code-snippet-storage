import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

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
}
