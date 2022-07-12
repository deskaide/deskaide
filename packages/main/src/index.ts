import type { BrowserWindow } from 'electron';
import { app, ipcMain } from 'electron';

import './security-restrictions';
import {
  restoreOrCreateMainWindow,
  restoreOrCreateBreakWindow,
} from './screens';
import { notify } from './utils';
import type { NotificationMessage } from '../../../types';
import { TimerType, IpcEventTypes } from '../../../types';

/**
 * Prevent multiple instances
 */
const isSingleInstance = app.requestSingleInstanceLock();
let mainWindow: BrowserWindow;
let breakWindow: BrowserWindow;

if (!isSingleInstance) {
  app.quit();
  process.exit(0);
}
app.on('second-instance', async () => {
  mainWindow = await restoreOrCreateMainWindow();
});

/**
 * Disable Hardware Acceleration for more power-save
 */
app.disableHardwareAcceleration();

/**
 * Shout down background process if all windows was closed
 */
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

/**
 * @see https://www.electronjs.org/docs/v14-x-y/api/app#event-activate-macos Event: 'activate'
 */
app.on('activate', async () => {
  mainWindow = await restoreOrCreateMainWindow();
});

/**
 * Create app window when background process will be ready
 */
app
  .whenReady()
  .then(async () => {
    mainWindow = await restoreOrCreateMainWindow();
  })
  .catch((e) => console.error('Failed create main window:', e));

ipcMain.on(
  IpcEventTypes.ShowNotification,
  (_e, message: NotificationMessage) => {
    notify(message);
  }
);

ipcMain.on(IpcEventTypes.ShowBreakWindow, async () => {
  breakWindow = await restoreOrCreateBreakWindow();
  if (breakWindow) {
    breakWindow.webContents.send(
      IpcEventTypes.ToggleTimerType,
      TimerType.BreakTimer
    );
  }
});

ipcMain.on(IpcEventTypes.HideBreakWindow, () => {
  if (mainWindow) {
    mainWindow.webContents.send(
      IpcEventTypes.ToggleTimerType,
      TimerType.PomodoroTimer
    );
  }
  if (breakWindow) {
    breakWindow.close();
  }
});
/**
 * Install React devtools in development mode only
 */
if (import.meta.env.DEV) {
  app
    .whenReady()
    .then(() => import('electron-devtools-installer'))
    .then(({ default: installExtension, REACT_DEVELOPER_TOOLS }) =>
      installExtension(REACT_DEVELOPER_TOOLS, {
        loadExtensionOptions: {
          allowFileAccess: true,
        },
      })
    )
    .catch((e) => console.error('Failed install extension:', e));
}

/**
 * Check new app version in production mode only
 */
if (import.meta.env.PROD) {
  app
    .whenReady()
    .then(() => import('electron-updater'))
    .then(({ autoUpdater }) => autoUpdater.checkForUpdatesAndNotify())
    .catch((e) => console.error('Failed check updates:', e));
}
