const { ipcRenderer } = require('electron');

import { exposeInMainWorld } from './exposeInMainWorld';

function showBreakWindow() {
  ipcRenderer.send('SHOW_BREAK_WINDOW');
}

// Export for types in contracts.d.ts
export const showWindow = { showBreakWindow } as const;

exposeInMainWorld('showWindow', showWindow);
