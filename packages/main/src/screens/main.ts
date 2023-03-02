import { BrowserWindow, screen } from 'electron';
import { join } from 'path';
import { homePageUrl } from '../utils/common';

async function createWindow() {
  const browserWindow = new BrowserWindow({
    width: Math.round(0.8 * screen.getPrimaryDisplay().workArea.width),
    height: Math.round(0.8 * screen.getPrimaryDisplay().workArea.height),
    minWidth: Math.round(0.72 * screen.getPrimaryDisplay().workArea.width),
    minHeight: Math.round(0.72 * screen.getPrimaryDisplay().workArea.height),
    show: false, // Use 'ready-to-show' event to show window
    webPreferences: {
      webviewTag: false, // The webview tag is not recommended. Consider alternatives like iframe or Electron's BrowserView. https://www.electronjs.org/docs/latest/api/webview-tag#warning
      preload: join(__dirname, '../../preload/dist/index.cjs'),
      sandbox: false,
    },
  });

  /**
   * If you install `show: true` then it can cause issues when trying to close the window.
   * Use `show: false` and listener events `ready-to-show` to fix these issues.
   *
   * @see https://github.com/electron/electron/issues/25012
   */
  browserWindow.on('ready-to-show', () => {
    browserWindow?.show();

    if (import.meta.env.DEV) {
      browserWindow?.webContents.openDevTools();
    }
  });

  /**
   * URL for main window.
   * Vite dev server for development.
   * `file://../renderer/index.html` for production and test
   */

  await browserWindow.loadURL(homePageUrl);

  return browserWindow;
}

/**
 * Restore existing BrowserWindow or Create new BrowserWindow
 */
export async function restoreOrCreateMainWindow() {
  let window = BrowserWindow.getAllWindows().find((w) => !w.isDestroyed());

  if (window === undefined) {
    window = await createWindow();
  }

  if (window.isMinimized()) {
    window.restore();
  }

  if (!window.isVisible()) {
    window.show();
  }

  window.focus();

  return window;
}
