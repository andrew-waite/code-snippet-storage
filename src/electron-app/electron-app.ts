import { Menu, ipcMain, app, BrowserWindow } from "electron";
import * as path from "path";
import * as url from 'url';

    let mainWindow: any = null;

    function createWindow () {
      mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
          nodeIntegration: true, // is default value after Electron v5
          contextIsolation: true, // protect against prototype pollution
          preload: path.join(__dirname, "preload.js"),
        }
      })

      mainWindow.loadURL(
        url.format({
          pathname: path.join(__dirname, `index.html`),
          protocol: "file:",
          slashes: true
        })
      );

      ipcMain.on('show-context-menu', (event) => {
        console.log('got command to open context window');
        const template = [
          {
            label: 'Rename',
            click: () => { event.sender.send('context-menu-command', 'rename') }
          },
          {
            label: 'Menu Item 2'
          }
        ];
        const menu = Menu.buildFromTemplate(template);
        menu.popup(
          {
             window: BrowserWindow.fromWebContents(event.sender)
          }
        );
      })

      // Open the DevTools.
      mainWindow.webContents.openDevTools()

      mainWindow.on('closed', function () {
        mainWindow = null
      })
    }

    app.on('ready', createWindow)

    app.on('window-all-closed', function () {
      if (process.platform !== 'darwin') app.quit()
    })

    app.on('activate', function () {
      if (mainWindow === null) createWindow()
    })
