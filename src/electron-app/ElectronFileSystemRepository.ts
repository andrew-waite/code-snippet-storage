import { ipcMain } from 'electron'
import * as path from 'path';
import * as fs from 'fs';
import * as os from 'os';
import { IFile } from '../app/repositories/folders/iFile'
import { v4 as uuidv4 } from 'uuid';
import { EBADF } from 'constants';

export class ElectronFileSystemRepository {
  private static DIRECTORY_PATH: string = path.join(os.homedir(), 'Documents', 'code-snippet-storage');

  public constructor () {
    this.registerIPCMainListeners();
  }

  private registerIPCMainListeners(): void {
    this.loadFilesFromDiskListener();ng
    this.saveFileToDiskListener();
  }

  private saveFileToDiskListener(): void { 
    ipcMain.on('save-file-to-disk', (event: Electron.IpcMainEvent, fileName: string, fileContents: string) => {
      console.log('called savefiletodisklistener');
      console.log('path: ' + path.join(ElectronFileSystemRepository.DIRECTORY_PATH, fileName));
      console.log('file contents ' + fileContents);
      fs.writeFile(path.join(ElectronFileSystemRepository.DIRECTORY_PATH, fileName), fileContents, function(error: NodeJS.ErrnoException) {
        if(error) {
            event.returnValue = false;
            console.log(error);
        }
        
        event.returnValue = true;
      }); 

      event.returnValue = false;
    });
  }

  private loadFilesFromDiskListener(): void { 
    ipcMain.on('load-files-from-disk', (event: Electron.IpcMainEvent) => {
      //joining path of directorsy 
      if (!fs.existsSync(ElectronFileSystemRepository.DIRECTORY_PATH)){
        fs.mkdirSync(ElectronFileSystemRepository.DIRECTORY_PATH);
      }

      fs.readdir(ElectronFileSystemRepository.DIRECTORY_PATH, function (error: NodeJS.ErrnoException, fileNames: string[]) {
          if (error) {
              return console.log('Unable to scan directory: ' + error);
          } 

          var files: Array<IFile> = [];

          fileNames.forEach(function (fileName: string) {
              let data = fs.readFileSync(path.join(ElectronFileSystemRepository.DIRECTORY_PATH, fileName));
              let stats = fs.statSync(path.join(ElectronFileSystemRepository.DIRECTORY_PATH, fileName));

              files.push({id: uuidv4(), name: fileName, code: data.toString(), lastModified: stats.mtime.toDateString(), contentEditable: false} as IFile);

              console.log('fileName' + fileName);
              console.log('data: ' + data.toString());
          });

          event.returnValue = files;
      });
    });
  }
}