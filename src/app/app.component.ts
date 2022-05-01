import { Component, Inject } from '@angular/core';
import { IFolderRepository } from './repositories/folders/IFolderRepository';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})

export class AppComponent {
  public constructor(@Inject('IFolderRepository') private folderRepository: IFolderRepository) {}

  public folderNames: Array<string> = [];
  public title = 'code-snippet-storage';

  public ngOnInit() {
    this.folderNames = this.folderRepository.getFolders();
  }
}
