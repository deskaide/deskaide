const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const url = require('url');
const isDev = require('electron-is-dev');
// const dataPath = app.getPath('userData');

const startUrl = isDev
  ? 'http://localhost:3000'
  : url.format({
      pathname: path.join(__dirname, './../build/index.html'),
      protocol: 'file:',
      slashes: true,
    });

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1152,
    height: 700,
    minWidth: 1152,
    minHeight: 700,
    // frame: false,
    icon: path.join(__dirname, './assets/icons/icon.png'),
    webPreferences: {
      nodeIntegration: true,
    },
  });
  mainWindow.loadURL(startUrl);
  // Open the DevTools.
  if (isDev) {
    mainWindow.webContents.openDevTools();
  }

  mainWindow.on('closed', function() {
    mainWindow = null;
  });
}

app.on('ready', createWindow);

app.on('window-all-closed', function() {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', function() {
  if (mainWindow === null) {
    createWindow();
  }
});

ipcMain.on('MINIMIZE_APP', (event, data) => {
  mainWindow.minimize();
});

ipcMain.on('MAXIMIZE_APP', (event, data) => {
  mainWindow.maximize();
});

ipcMain.on('UN_MAXIMIZE_APP', (event, data) => {
  mainWindow.unmaximize();
});

ipcMain.on('EXIT_APP', (event, data) => {
  app.quit();
});
