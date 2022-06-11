import { ChangeDetectorRef, Component, ElementRef, Inject, Renderer2, ViewChild } from '@angular/core';
import { IFolderRepository } from './repositories/folders/IFolderRepository';
import { v4 as uuidv4 } from 'uuid';
import * as $ from 'jQuery';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})

export class AppComponent {
  @ViewChild('folderElement') folderElement!: ElementRef;

  public constructor(@Inject('IFolderRepository') private folderRepository: IFolderRepository, private changeDetectorRef: ChangeDetectorRef) {
  }

  public folders: Array<{id: string, name: string, contenteditable: boolean}> = this.folderRepository.getFolders();
  public title = 'code-snippet-storage';


  public ngOnInit() {
  }

  public addFolder(): void {
    this.folders.push({id: uuidv4(), name: "New Folder", contenteditable: false});
  }

  public onRightClick(mouseEvent: MouseEvent, folder: {id: string, name: string}): void {
    mouseEvent.preventDefault();

    console.log('right clicked');
    window.contextBridgeApi.send('show-context-menu', {});
    window.contextBridgeApi.receive('context-menu-command', (event, command) => {
      console.log(command);
      if (command == 'rename') {
        this.markFolderAsEditable(folder.id, true);

        const folderElementId = "#" + (mouseEvent.target as Element).id;

        console.log("element: " + folderElementId);

        $(folderElementId).trigger('focus');

        //When user presses enter accept the input and stop editing the element
        $(folderElementId).on('keydown', (jQueryEvent: JQuery.Event) => {
          if (jQueryEvent.key == 'Enter') {
            jQueryEvent.preventDefault();

            //set content editable to false. blur event will handle renaming the file
            this.markFolderAsEditable(folder.id, false);

            //Remove the event listener so we dont get duplicates when a person renames the element again
            $(folderElementId).off('keydown');
          }
        });

        //When user clicks away from the element (i.e content editing done)
        $(folderElementId).one('blur', () => {
          console.log("Finished editing");
          this.renameFolder(folder.id, $(folderElementId).text());
        });
      }
    });
  }

  private markFolderAsEditable(id: string, editable: boolean) {
    this.folders = this.folders.map(e => e.id === id ? { ...e, contenteditable: editable } : e);
    this.changeDetectorRef.detectChanges();
  }

  private renameFolder(id: string, folderName: string): void {
    //the three dots is a spread operator, it means include all the elements in the array or object
    this.folders = this.folders.map(e => e.id === id ? { ...e, name: folderName, contenteditable: false } : e);

    this.changeDetectorRef.detectChanges();
  }
}
