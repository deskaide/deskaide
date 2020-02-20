/* eslint no-param-reassign: ["error", { "props": false }] */
const electron = require('electron');
const path = require('path');
const isDev = require('electron-is-dev');
const AutoLaunch = require('auto-launch');
const {
  createMainMenuTemplate,
  createContextMenuTemplate,
  DBService,
} = require('./config');

const { app, BrowserWindow, screen, Menu, Tray, ipcMain } = electron;
const DB = new DBService();

let mainWindow;
let breakTimeWindow;
let appIcon;

const startUrl = isDev
  ? 'http://localhost:3000'
  : `file://${path.join(__dirname, '../build/index.html')}`;

const breakPageURL = isDev
  ? 'http://localhost:3000/#/breaks'
  : `file://${path.join(__dirname, '../build/index.html#/breaks')}`;

async function getSettings() {
  const settings = await DB.getById('app/settings');
  return settings;
}

function createWindow() {
  const { width, height } = screen.getPrimaryDisplay().workAreaSize;
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

  const mainMenuTemplate = createMainMenuTemplate(app, mainWindow);
  const mainMenu = Menu.buildFromTemplate(mainMenuTemplate);
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
    } else {
      mainWindow = null;
    }
    return false;
  });
}

function createBreakTimeWindow() {
  if (breakTimeWindow) {
    breakTimeWindow.focus();
    return;
  }

  breakTimeWindow = new BrowserWindow({
    width: 880,
    height: 495,
    resizable: false,
    title: 'Desk Aide | Break Time',
    minimizable: false,
    fullscreenable: false,
    frame: false,
    alwaysOnTop: true,
    webPreferences: {
      nodeIntegration: true,
    },
  });

  breakTimeWindow.setMenuBarVisibility(false);
  breakTimeWindow.loadURL(breakPageURL);
  breakTimeWindow.on('closed', () => {
    breakTimeWindow = null;
  });
}

function createContextMenu() {
  const contextMenuTemplate = createContextMenuTemplate(app, mainWindow);
  const contextMenu = Menu.buildFromTemplate(contextMenuTemplate);

  appIcon = new Tray(path.join(__dirname, 'assets/icons/icon.png'));
  appIcon.setToolTip('Deskstat');
  appIcon.setContextMenu(contextMenu);
  appIcon.on('click', () => {
    mainWindow.show();
  });
}

function onSuspendOrLock() {
  mainWindow.webContents.send('SUSPEND_FOCUS_TIMER');
}

function onResumeOrUnlock() {
  mainWindow.webContents.send('START_FOCUS_TIMER');
}

function startPowerMonitoring() {
  electron.powerMonitor.on('suspend', onSuspendOrLock);
  electron.powerMonitor.on('lock-screen', onSuspendOrLock);
  electron.powerMonitor.on('resume', onResumeOrUnlock);
  electron.powerMonitor.on('unlock-screen', onResumeOrUnlock);
}

async function autoLaunchApp(isEnabled = false) {
  if (isDev) return;
  const launcher = new AutoLaunch({
    name: app.name || 'deskaide',
  });

  if (isEnabled) {
    launcher.enable();
    const launcherEnabled = await launcher.isEnabled();

    if (!launcherEnabled) launcher.enable();
  } else {
    launcher.disable();
  }
}

app.on('ready', async () => {
  const settings = await getSettings();
  app.setAppUserModelId('pro.shahid.deskstat');
  createWindow();
  createContextMenu();
  startPowerMonitoring();
  await autoLaunchApp(true);
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

app.on('before-quit', () => {
  app.isQuiting = true;
});

ipcMain.on('SHOW_BREAK_PAGE', () => {
  createBreakTimeWindow();
});

ipcMain.on('HIDE_BREAK_PAGE', () => {
  mainWindow.webContents.send('START_FOCUS_TIMER');
  breakTimeWindow.close();
});

ipcMain.on('START_FOCUS_TIMER', () => {
  mainWindow.webContents.send('START_FOCUS_TIMER');
});

ipcMain.on('GET_BY_ID', async (event, id) => {
  const data = await DB.getById(id);
  event.returnValue = data;
});

ipcMain.on('UPSERT_DATA', async (event, { id, data }) => {
  const newData = await DB.upsert(data, id);
  event.returnValue = newData;
});
