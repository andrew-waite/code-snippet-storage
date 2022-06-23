import { Component, ElementRef, EventEmitter, Inject, Input, OnInit, ViewChild } from '@angular/core';
import $ from 'jQuery';
import { Observable, Subscription } from 'rxjs';
import { IFile } from '../repositories/folders/IFile';
import { IFileRepository } from '../repositories/folders/IFileRepository';

@Component({
  selector: 'app-monaco-editor',
  templateUrl: './monaco-editor.component.html',
  styleUrls: ['./monaco-editor.component.sass']
})
export class MonacoeditorComponent implements OnInit {
  public editorOptions = {theme: 'vs-dark', language: 'javascript', automaticLayout: true};
  //The exclamation means we know the property is not defined in the constructor and we will intialize it elsewhere
  
  @Input() selectedFileEvent!: EventEmitter<IFile>;

  private selectedFile!: IFile;

  constructor(@Inject('IFileRepository') private folderRepository: IFileRepository) {
  }

  ngOnInit(): void {
    if (this.selectedFileEvent) {
      this.selectedFileEvent.subscribe(data => {
        this.selectedFile = data;
      });
    }
  }

  ngOnDestroy() {
  }

  public onMonacoEditorInit(): void {
      $('.editor-container').css('height', '100%');

      setTimeout(() => {
        $('.monaco-editor').css('height', '100%');
      }, 10);
  }

  public onSave(): void {
    console.log('Save called. Selected item: ' + this.selectedFile);
    var lines = monaco.editor.getModels()[0].getValue(monaco.editor.EndOfLinePreference.LF);
    console.log(lines);

    this.folderRepository.saveFile(this.selectedFile.name, lines);
  }
}
