import { ipcRenderer } from 'electron';
import { IpcEventTypes } from '../../../types';

// Export for types in contracts.d.ts
export const manageWindow = {
  showBreakWindow: () => ipcRenderer.send(IpcEventTypes.ShowBreakWindow),
  hideBreakWindow: () => ipcRenderer.send(IpcEventTypes.HideBreakWindow),
};
