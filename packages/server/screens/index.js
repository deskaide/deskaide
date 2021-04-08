import AutoLaunch from 'auto-launch';
import electron, { ipcRenderer } from 'electron';
import debug from 'electron-debug';
import isDev from 'electron-is-dev';
import path from 'path';

import DB from '../config/db';
import { createContextMenuTemplate } from '../menus';
import metadata from '../utils/metadata';
import createBreakTimeWindow from './break';
import createMainWindow from './main';

debug({
  isEnabled: true,
  showDevTools: false,
});

try {
  require('electron-reloader')(module, {
    watchRenderer: false,
  });
} catch (error) {
  console.log(error);
}

const {
  app,
  BrowserWindow,
  screen,
  Menu,
  Tray,
  ipcMain,
  globalShortcut,
  clipboard,
} = electron;

let mainWindow;
let breakTimeWindow;
let appIcon;

async function getSettings() {
  const settings = (await DB.getById('app/settings')) || {};
  return settings;
}

function createContextMenu() {
  const contextMenuTemplate = createContextMenuTemplate(app, mainWindow);
  const contextMenu = Menu.buildFromTemplate(contextMenuTemplate);

  appIcon = new Tray(path.join(__dirname, '../assets/icons/icon.png'));
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
  app.setAppUserModelId('pro.shahid.deskaide');
  mainWindow = createMainWindow({ app, BrowserWindow, Menu, screen });
  createContextMenu();
  startPowerMonitoring();
  await autoLaunchApp(settings.autoStart === 'Y');
  globalShortcut.register('CommandOrControl+L', () => {
    const text = clipboard.readText();
    mainWindow.webContents.send('CLIPBOARD_TEXT', text);
  });
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

app.on('will-quit', () => {
  globalShortcut.unregisterAll();
});

app.on('before-quit', () => {
  app.isQuiting = true;
});

ipcMain.on('SHOW_BREAK_PAGE', () => {
  breakTimeWindow = createBreakTimeWindow({ app, BrowserWindow });
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
  if (data.url) {
    const { title = '', image = '', description = '' } = await urlMetadata(
      data.url
    );
    data.title = title;
    data.image = image;
    data.description = description;
  }

  const newData = await DB.upsert(data, id);
  event.returnValue = newData;
});

ipcMain.on('FETCH_ALL', async (event, query = {}) => {
  const { rows } = await DB.fetchAll(query);
  // await DB.deleteAll(query);
  const sortedData = rows.sort((a, b) =>
    b.doc.createdAt.localeCompare(a.doc.createdAt)
  );

  event.returnValue = { data: sortedData };
});

ipcMain.on('SAVE_LINK_DATA', async (e, { id, data }) => {
  try {
    const urlData = { ...data };
    const { title = '', image = '', description = '' } = await metadata(
      data.url
    );

    urlData.title = title;
    urlData.image = image;
    urlData.description = description;

    await DB.upsert(urlData, id);

    const { rows } = await DB.fetchAll({ type: 'links' });
    const sortedData = rows.sort((a, b) =>
      b.doc.createdAt.localeCompare(a.doc.createdAt)
    );

    mainWindow.webContents.send('LINK_LIST_UPDATED', { data: sortedData });
  } catch (e) {
    console.log(e);
  }
});

ipcMain.on('DELETE_BY_ID', async (event, id) => {
  await DB.deleteById(id);

  const { rows } = await DB.fetchAll({ type: 'links' });
  const sortedData = rows.sort((a, b) =>
    b.doc.createdAt.localeCompare(a.doc.createdAt)
  );

  mainWindow.webContents.send('LINK_LIST_UPDATED', { data: sortedData });
});
