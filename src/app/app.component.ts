import { ChangeDetectorRef, Component, ElementRef, Inject, Renderer2, ViewChild } from '@angular/core';
import { IFileRepository } from './repositories/folders/IFileRepository';
import { v4 as uuidv4 } from 'uuid';
import $ from 'jQuery';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})

export class AppComponent {
  public constructor(@Inject('IFileRepository') private folderRepository: IFileRepository) {
  }

  public files: Array<{id: string, name: string, contenteditable: boolean}> = [];
  public title = 'code-snippet-storage';
  public selectedItem: any = null;

  public ngOnInit() {
    this.files = this.folderRepository.getFiles();
  }

  public addFolder(): void {
    this.files.push({id: uuidv4(), name: "New File", contenteditable: false});
  }

  public rename(folder: {name: string, id: string, contenteditable: boolean}) {
    folder.contenteditable = true;

    //hack to get focus to actually focus
    setTimeout(function() {
        $('#menu-item-' + folder.id).trigger('focus');
    });

    this.registerListeners(folder);
  }

  public onSidebarItemClick(event: any, newValue: any): void { 
    this.selectedItem = newValue;
  }

  private registerListeners(folder: {name: string, id: string, contenteditable: boolean}) {
    const folderElementId = '#menu-item-' + folder.id;

    $(folderElementId).on('keydown', (jQueryEvent: JQuery.Event) => {
      if (jQueryEvent.key == 'Enter') {
        jQueryEvent.preventDefault();

        //set content editable to false. blur event will handle renaming the file
        $(folderElementId).trigger('blur');
        $(folderElementId).off('keydown');
        folder.contenteditable = false;
      }
   });

  // //When user clicks away from the element (i.e content editing done)
   $(folderElementId).one('blur', () => {
      console.log("Finished editing");
      $(folderElementId).off('keydown');
      folder.contenteditable = false;
   });
  }
}
