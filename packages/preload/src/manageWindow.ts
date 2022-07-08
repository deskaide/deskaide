import { ipcRenderer } from 'electron';
import { IpcEventTypes } from '../../../types';

import { exposeInMainWorld } from './exposeInMainWorld';

function showBreakWindow() {
  ipcRenderer.send(IpcEventTypes.ShowBreakWindow);
}

function hideBreakWindow() {
  ipcRenderer.send(IpcEventTypes.HideBreakWindow);
}

// Export for types in contracts.d.ts
export const manageWindow = { showBreakWindow, hideBreakWindow } as const;

exposeInMainWorld('manageWindow', manageWindow);
