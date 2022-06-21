import { IFile } from "./IFile";
import { IFileRepository } from "./IFileRepository";
import { ipcRenderer } from "electron";

export class FileSystemRepository implements IFileRepository {
  public constructor() {

  }

  public getFiles(): Array<IFile> {
    return [];
  }

  private getFilesFromFileSystem(): void {
  }
}
