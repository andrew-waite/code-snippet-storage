import { ChangeDetectorRef, Component, ElementRef, Inject, Renderer2, ViewChild } from '@angular/core';
import { IFolderRepository } from './repositories/folders/IFolderRepository';
import { v4 as uuidv4 } from 'uuid';
import $ from 'jQuery';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})

export class AppComponent {
  public constructor(@Inject('IFolderRepository') private folderRepository: IFolderRepository) {
  }

  public folders: Array<{id: string, name: string, contenteditable: boolean}> = [];
  public title = 'code-snippet-storage';

  public ngOnInit() {
    this.folders = this.folderRepository.getFolders();
  }

  public addFolder(): void {
    this.folders.push({id: uuidv4(), name: "New Folder", contenteditable: false});
  }

  public rename(folder: {name: string, id: string, contenteditable: boolean}) {
    folder.contenteditable = true;

    //hack to get focus to actually focus
    setTimeout(function() {
        $('#menu-item-' + folder.id).trigger('focus');
    });

    this.registerListeners(folder);
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
