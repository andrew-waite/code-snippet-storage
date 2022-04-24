import { Component, Inject } from '@angular/core';
import { FolderRepository } from './FolderRepository';
import { JsonFolderRepository } from './JsonFolderRepository';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})

export class AppComponent {
  public foldernames: Array<string> = [];
  public title = 'code-snippet-storage';

  public ngOnInit() {
    this.foldernames.push("hello", "world");
  }
}
