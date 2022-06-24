import {  Component, EventEmitter, Inject } from '@angular/core';
import { IFileRepository } from './repositories/folders/IFileRepository';
import { v4 as uuidv4 } from 'uuid';
import $ from 'jQuery';
import { IFile } from './repositories/folders/IFile';
import { Event } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})

export class AppComponent {
  public files: Array<IFile> = [];
  public title = 'code-snippet-storage';
  public selectedItem!: IFile; 
  public selectedItemEvent: EventEmitter<IFile> = new EventEmitter();

  public constructor(@Inject('IFileRepository') private fileRepository: IFileRepository) {
  }
  
  public ngOnInit() {
    this.files = this.fileRepository.getFiles();
  }

  public addFile(): void {
    this.fileRepository.saveFile('NewFile.txt', '');
    this.refreshFileList();
  }

  public refreshFileList(): void {
    this.files = this.fileRepository.getFiles();
    console.log('refreshed file list');
  }

  public rename(file: IFile) {
    console.log('hi');
    file.contentEditable = true;

    //hack to get focus to actually focus
    setTimeout(function() {
        $('#menu-item-' + file.id).trigger('focus');
    });

    this.registerListeners(file);
  }

  public onSidebarItemClick(event: any, newValue: any): void {
    this.selectedItem = <IFile>newValue;
    this.selectedItemEvent.emit(this.selectedItem);

    monaco.editor.getModels()[0].setValue(newValue.code);
  }

  private registerListeners(file: IFile) {
    const folderElementId = '#menu-item-' + file.id;
    const originaFileName = file.name;

    $(folderElementId).on('keydown', (jQueryEvent: JQuery.Event) => {
      if (jQueryEvent.key == 'Enter') {
        jQueryEvent.preventDefault();

        //set content editable to false. blur event will handle renaming the file
        $(folderElementId).trigger('blur');
        $(folderElementId).off('keydown');
        file.contentEditable = false;
      }
   });

  //When user clicks away from the element (i.e content editing done)
   $(folderElementId).one('blur', () => {
      $(folderElementId).off('keydown');
      file.contentEditable = false;

      const newFileName = $(folderElementId).text();
      this.finishedRenamingFile(originaFileName, newFileName);
   });
  }

  private finishedRenamingFile(originalFileName: string, newFileName: string) {
    this.fileRepository.renameFile(originalFileName, newFileName);
  }
}
