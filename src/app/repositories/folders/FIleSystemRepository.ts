import { IFile } from "./IFile";
import { IFileRepository } from "./IFileRepository";
import { Injectable } from "@angular/core";
import { resolve } from "dns";

@Injectable()
export class FileSystemRepository implements IFileRepository {
  public constructor() {

  }

  public getFiles(): Array<IFile> {
    return this.getFilesFromFileSystem();
  }

  public saveFile(fileName: string, fileContents: string): Promise<boolean> { 
    return this.saveFileToDisk(fileName, fileContents);
  }

  private async saveFileToDisk(fileName: string, fileContents: string): Promise<boolean> {
    let success: boolean = false;
    
    await window.contextBridgeApi.invoke('save-file-to-disk', fileName, fileContents).then((data: boolean) => {console.log('data in promise ' + data); success = data});
    
    return new Promise(function(resolve, reject) {
      resolve(success);
    });
  }

  private getFilesFromFileSystem(): Array<IFile> {
    //Send request as syncronous so app waits until files are loaded before rendering
    return window.contextBridgeApi.sendSync('load-files-from-disk');
  }
}
