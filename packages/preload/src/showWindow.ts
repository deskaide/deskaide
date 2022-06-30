import { ipcRenderer } from 'electron';

import { exposeInMainWorld } from './exposeInMainWorld';

function showBreakWindow() {
  ipcRenderer.send('SHOW_BREAK_WINDOW');
}

function showMainWindow() {
  ipcRenderer.send('SHOW_MAIN_WINDOW');
}

// Export for types in contracts.d.ts
export const showWindow = { showBreakWindow, showMainWindow } as const;

exposeInMainWorld('showWindow', showWindow);
