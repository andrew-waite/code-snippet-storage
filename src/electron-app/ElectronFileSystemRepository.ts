import { ipcMain } from 'electron'
import * as path from 'path';
import * as fs from 'fs';
import * as os from 'os';
import { IFile } from '../app/repositories/folders/iFile'
import { v4 as uuidv4 } from 'uuid';

export class ElectronFileSystemRepository {
  public constructor () {
    this.registerIPCMainListener();
  }

  private registerIPCMainListener(): void {
    ipcMain.on('load-files-from-disk', (event: Electron.IpcMainEvent) => {
      //joining path of directorsy 
      const directoryPath: string = path.join(os.homedir(), 'Documents', 'code-snippet-storage');
      if (!fs.existsSync(directoryPath)){
        fs.mkdirSync(directoryPath);
      }

      fs.readdir(directoryPath, function (error: NodeJS.ErrnoException, fileNames: string[]) {
          if (error) {
              return console.log('Unable to scan directory: ' + error);
          } 

          var files: Array<IFile> = [];

          fileNames.forEach(function (fileName: string) {
              let data = fs.readFileSync(path.join(directoryPath, fileName));
              let stats = fs.statSync(path.join(directoryPath, fileName));

              files.push({id: uuidv4(), name: fileName, code: data.toString(), lastModified: stats.mtime.toDateString(), contentEditable: false} as IFile);

              console.log('fileName' + fileName);
              console.log('data: ' + data.toString());
          });

          event.returnValue = files;
      });
    });
  }
}