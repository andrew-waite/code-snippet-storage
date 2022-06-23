import { ChangeDetectorRef, Component, ElementRef, EventEmitter, Inject, Output, Renderer2, ViewChild } from '@angular/core';
import { IFileRepository } from './repositories/folders/IFileRepository';
import { v4 as uuidv4 } from 'uuid';
import $ from 'jQuery';
import { IFile } from './repositories/folders/IFile';
import { Subject } from 'rxjs';

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

  public constructor(@Inject('IFileRepository') private folderRepository: IFileRepository) {
  }
  
  public ngOnInit() {
    this.files = this.folderRepository.getFiles();
  }

  public addFolder(): void {
    this.files.push({id: uuidv4(), name: "New File", code: '', contentEditable: false});
  }

  public rename(file: IFile) {
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

    console.log(newValue.code);
    monaco.editor.getModels()[0].setValue(newValue.code);
  }

  private registerListeners(file: IFile) {
    const folderElementId = '#menu-item-' + file.id;

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
      console.log("Finished editing");
      $(folderElementId).off('keydown');
      file.contentEditable = false;
   });
  }
}
