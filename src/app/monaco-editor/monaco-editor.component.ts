import { Component, ElementRef, EventEmitter, Inject, Input, OnInit, ViewChild } from '@angular/core';
import $ from 'jQuery';
import { Observable, Subject, Subscription } from 'rxjs';
import {debounceTime} from 'rxjs/operators';
import { NgbAlert } from '@ng-bootstrap/ng-bootstrap'
import { IFile } from '../repositories/folders/IFile';
import { IFileRepository } from '../repositories/folders/IFileRepository';

@Component({
  selector: 'app-monaco-editor',
  templateUrl: './monaco-editor.component.html',
  styleUrls: ['./monaco-editor.component.sass']
})
export class MonacoeditorComponent implements OnInit {
  private _success = new Subject<string>();
  public editorOptions = {theme: 'vs-dark', language: 'javascript', automaticLayout: true};
  public successMessage: string = '';
  
  //The exclamation means we know the property is not defined in the constructor and we will intialize it elsewhere
  @Input() selectedFileEvent!: EventEmitter<IFile>;
  @ViewChild('selfClosingAlert', {static: false}) selfClosingAlert!: NgbAlert;

  private selectedFile!: IFile;

  constructor(@Inject('IFileRepository') private folderRepository: IFileRepository) {
  }

  ngOnInit(): void {
    if (this.selectedFileEvent) {
      this.selectedFileEvent.subscribe((data: IFile) => {
        this.selectedFile = data;
      });
    }

    this._success.subscribe(message => this.successMessage = message);
    this._success.pipe(debounceTime(5000)).subscribe(() => {
      if (this.selfClosingAlert) {
        this.selfClosingAlert.close();
      }
    });
  }

  ngOnDestroy() {
  }

  public onMonacoEditorInit(): void {
     $('.editor-container').css('height', '100%');
  }

  public onSave(): void {
    var lines = monaco.editor.getModels()[0].getValue(monaco.editor.EndOfLinePreference.LF);

    this.folderRepository.saveFile(this.selectedFile.name, lines)
      .then((result) => {
        this._success.next('The file ' + this.selectedFile.name + ' was saved successfully');
      });
  }
}
