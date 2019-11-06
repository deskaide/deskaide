const { app, BrowserWindow, screen, Menu, Tray } = require('electron');
const path = require('path');
const url = require('url');
const isDev = require('electron-is-dev');
const {
  createMainMenuTemplate,
  createContextMenuTemplate,
} = require('./config');

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

  mainWindow.on('closed', () => {
    mainWindow = null;
  });

  mainWindow.on('close', event => {
    if (!app.isQuiting) {
      event.preventDefault();
      mainWindow.hide();
    }
    return false;
  });
}

function createContextMenu() {
  const appIcon = new Tray(path.join(__dirname, 'assets/icons/128x128.png'));
  const contextMenu = Menu.buildFromTemplate(contextMenuTemplate);
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

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
});
