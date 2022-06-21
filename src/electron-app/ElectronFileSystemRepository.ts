import { ipcMain } from "electron";

export class ElectronFileSystemRepository {
  public constructor () {

  }

  private registerIPCMainListener(): void {
    ipcMain.on('load-files', (event) => {

    }
  }
}
