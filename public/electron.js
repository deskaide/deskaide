const { app, BrowserWindow, ipcMain, screen, Menu, Tray } = require('electron');
const path = require('path');
const url = require('url');
const isDev = require('electron-is-dev');
const {
  createMainMenuTemplate,
  createContextMenuTemplate,
} = require('./config');
// const dataPath = app.getPath('userData');

let mainWindow;

const startUrl = isDev
  ? 'http://localhost:3000'
  : url.format({
      pathname: path.join(__dirname, './../build/index.html'),
      protocol: 'file:',
      slashes: true,
    });

const mainMenuTemplate = createMainMenuTemplate(app, mainWindow);
const contextMenuTemplate = createContextMenuTemplate(app, mainWindow);

function createWindow() {
  const { width, height } = screen.getPrimaryDisplay().workAreaSize;
  const mainMenu = Menu.buildFromTemplate(mainMenuTemplate);
  mainWindow = new BrowserWindow({
    width,
    height,
    minWidth: 1152,
    minHeight: 700,
    icon: path.join(__dirname, './assets/icons/icon.png'),
    webPreferences: {
      nodeIntegration: true,
    },
  });

  Menu.setApplicationMenu(mainMenu);
  mainWindow.loadURL(startUrl);

  if (isDev) {
    mainWindow.webContents.openDevTools();
  }

  mainWindow.on('closed', function() {
    mainWindow = null;
  });

  mainWindow.on('close', function(event) {
    if (!app.isQuiting) {
      event.preventDefault();
      mainWindow.hide();
    }
    return false;
  });
}

function createContextMenu() {
  appIcon = new Tray(path.join(__dirname, 'assets/icons/128x128.png'));
  let contextMenu = Menu.buildFromTemplate(contextMenuTemplate);
  appIcon.setToolTip('Deskstat');
  appIcon.setContextMenu(contextMenu);
  appIcon.on('click', () => {
    mainWindow.show();
  });
}

app.on('ready', () => {
  createWindow();
  createContextMenu();
});

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
