import { app, BrowserWindow } from "electron";
import * as path from 'path';
import * as fs from 'fs';
import * as url from 'url';
import { ElectronFileSystemRepository } from "./ElectronFileSystemRepository";

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

  mainWindow.loadURL(url.format({
    pathname: path.join(__dirname, '../index.html'),
    protocol: 'file:',
    slashes: true
  }));

  // Open the DevTools.
  //mainWindow.webContents.openDevTools()

  mainWindow.on('closed', function () {
    mainWindow = null
  });

  mainWindow.webContents.on('did-fail-load', () => {
      mainWindow.loadURL(url.format({
      pathname: path.join(__dirname, '../index.html'),
      protocol: 'file:',
      slashes: true
    }))
  });

}

function initializeApp() {
  createWindow();
  new ElectronFileSystemRepository();
}

app.on('ready', initializeApp);

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit();
});

app.on('activate', function () {
  if (mainWindow === null) initializeApp();
});

