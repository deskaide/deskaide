import { ipcRenderer } from 'electron';
import { IpcEventTypes } from '../../../types';

import { exposeInMainWorld } from './exposeInMainWorld';

function showBreakWindow() {
  ipcRenderer.send(IpcEventTypes.ShowBreakWindow);
}

function showMainWindow() {
  ipcRenderer.send(IpcEventTypes.ShowMainWindow);
}

// Export for types in contracts.d.ts
export const showWindow = { showBreakWindow, showMainWindow } as const;

exposeInMainWorld('showWindow', showWindow);
