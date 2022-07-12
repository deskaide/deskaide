import { ipcRenderer } from 'electron';
import type { IpcEventTypes, TimerType } from '../../../types';

import { exposeInMainWorld } from './exposeInMainWorld';

function toggleTimerType(
  event: IpcEventTypes,
  callback: (data: TimerType) => void
) {
  ipcRenderer.on(event, (e, data) => callback(data));
}

export const manageTimer = toggleTimerType;

exposeInMainWorld('manageTimer', manageTimer);
