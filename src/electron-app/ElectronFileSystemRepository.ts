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
    this.loadFilesFromDiskListener();
    this.saveFileToDiskListener();
  }

  private saveFileToDiskListener(): void { 
    ipcMain.handle('save-file-to-disk', async (event: Electron.IpcMainEvent, fileName: string, fileContents: string) => {
      let success: boolean = false;

      await fs.promises.writeFile(path.join(ElectronFileSystemRepository.DIRECTORY_PATH, fileName), fileContents)
        .then(() => success = true)
        .catch((error) => {
          console.log(error); 
          success = false;
        });
    
      return success;
    });
  }

  private loadFilesFromDiskListener(): void { 
    ipcMain.on('load-files-from-disk', (event: Electron.IpcMainEvent) => {
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