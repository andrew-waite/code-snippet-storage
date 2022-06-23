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

  public saveFile(fileName: string, fileContents: string): boolean { 
    return this.saveFileToDisk(fileName, fileContents);
  }

  private saveFileToDisk(fileName: string, fileContents: string): boolean {
    window.contextBridgeApi.send('save-file-to-disk', fileName, fileContents);
    
    return true;
  }

  private getFilesFromFileSystem(): Array<IFile> {
    //Send request as syncronous so app waits until files are loaded before rendering
    return window.contextBridgeApi.sendSync('load-files-from-disk');
  }
}
