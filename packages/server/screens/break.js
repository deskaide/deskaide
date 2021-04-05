import isDev from 'electron-is-dev';
import path from 'path';

let breakTimeWindow;

const breakPageURL = isDev
  ? 'http://localhost:3000/#/breaks'
  : `file://${path.join(__dirname, '../build/index.html#/breaks')}`;

function createBreakTimeWindow({ app, BrowserWindow }) {
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
      contextIsolation: false,
    },
  });

  breakTimeWindow.setMenuBarVisibility(false);
  breakTimeWindow.loadURL(breakPageURL);
  breakTimeWindow.on('closed', () => {
    breakTimeWindow = null;
  });

  return breakTimeWindow;
}

export default createBreakTimeWindow;
