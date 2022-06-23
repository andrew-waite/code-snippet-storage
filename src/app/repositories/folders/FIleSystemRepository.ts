import { IFile } from "./IFile";
import { IFileRepository } from "./IFileRepository";
import { Injectable } from "@angular/core";

@Injectable()
export class FileSystemRepository implements IFileRepository {
  public constructor() {

  }

  public getFiles(): Array<IFile> {
    return this.getFilesFromFileSystem();
  }

  private getFilesFromFileSystem(): Array<IFile> {
    //Send request as syncronous so app waits until files are loaded before rendering
    return window.contextBridgeApi.sendSync('load-files-from-disk');
  }
}
