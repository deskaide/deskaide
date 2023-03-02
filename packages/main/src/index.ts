import type { BrowserWindow } from 'electron';
import {
  session,
  shell,
  powerMonitor,
  powerSaveBlocker,
  app,
  ipcMain,
  Tray,
  Menu,
} from 'electron';

import './security-restrictions';
import {
  restoreOrCreateMainWindow,
  restoreOrCreateBreakWindow,
} from './screens';
import { TimerType, IpcEventTypes } from '../../../types';
import { initEventSubscriptions } from './utils/events';
import {
  diaryPageUrl,
  getBuildResourceDiractory,
  getTrayIcon,
  linksPageUrl,
  notesPageUrl,
  pomodoroPageUrl,
  settingsPageUrl,
  todoPageUrl,
} from './utils';

/**
 * Prevent multiple instances
 */
const isSingleInstance = app.requestSingleInstanceLock();
let mainWindow: BrowserWindow;
let breakWindow: BrowserWindow;
let tray: Tray;
let willQuitApp = false;

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

app.on('before-quit', function () {
  willQuitApp = true;
});

/**
 * Create app window when background process will be ready
 */
app
  .whenReady()
  .then(async () => {
    if (import.meta.env.DEV) {
      const { REDUX_DEVTOOLS } = require('electron-devtools-vendor');
      session.defaultSession.loadExtension(REDUX_DEVTOOLS, {
        allowFileAccess: true,
      });
    }

    mainWindow = await restoreOrCreateMainWindow();

    const contextMenu = Menu.buildFromTemplate([
      {
        label: 'Open Deskaide',
        click: () => {
          mainWindow.show();
        },
      },
      { type: 'separator' },
      {
        label: 'Diary',
        click: () => {
          mainWindow.loadURL(diaryPageUrl);
          if (!mainWindow.isVisible()) {
            mainWindow.show();
          }
        },
      },
      {
        label: 'Notes',
        click: () => {
          mainWindow.loadURL(notesPageUrl);
          if (!mainWindow.isVisible()) {
            mainWindow.show();
          }
        },
      },
      {
        label: 'Links',
        click: () => {
          mainWindow.loadURL(linksPageUrl);
          if (!mainWindow.isVisible()) {
            mainWindow.show();
          }
        },
      },
      {
        label: 'Pomodoro',
        click: () => {
          mainWindow.loadURL(pomodoroPageUrl);
          if (!mainWindow.isVisible()) {
            mainWindow.show();
          }
        },
      },
      {
        label: 'Todos',
        click: () => {
          mainWindow.loadURL(todoPageUrl);
          if (!mainWindow.isVisible()) {
            mainWindow.show();
          }
        },
      },
      { type: 'separator' },
      {
        label: 'Settings',
        click: () => {
          mainWindow.loadURL(settingsPageUrl);
          if (!mainWindow.isVisible()) {
            mainWindow.show();
          }
        },
      },
      { type: 'separator' },
      {
        label: 'Quit',
        accelerator: 'CommandOrControl+Q',
        click: () => {
          app.quit();
        },
      },
    ]);

    const trayIcon = `${getBuildResourceDiractory()}/icons/${getTrayIcon()}`;
    tray = new Tray(trayIcon);
    tray.setToolTip('Deskaide');
    tray.setContextMenu(contextMenu);

    tray.on('click', () => {
      tray.popUpContextMenu();
    });

    powerMonitor.on('suspend', () => {
      powerSaveBlocker.start('prevent-app-suspension');
    });

    mainWindow.webContents.on('will-navigate', (e, url) => {
      e.preventDefault();
      shell.openExternal(url);
    });

    mainWindow.on('close', (e) => {
      let isGoingToExit = false;

      if (process.platform === 'darwin') {
        if (willQuitApp) {
          isGoingToExit = true;
        } else {
          e.preventDefault();
          mainWindow.hide();
        }
      } else {
        if (!!tray && !willQuitApp) {
          e.preventDefault();
          mainWindow.hide();
        } else {
          isGoingToExit = true;
        }
      }

      if (isGoingToExit) {
        app.quit();
      }
    });
  })
  .catch((e) => console.error('Failed create main window:', e));

initEventSubscriptions();

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
