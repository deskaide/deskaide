import { ipcRenderer } from 'electron';
import type { IpcEventTypes, TimerType } from '../../../types';

function toggleTimerType(
  event: IpcEventTypes,
  callback: (data: TimerType) => void
) {
  ipcRenderer.on(event, (e, data) => callback(data));
}

export const manageTimer = toggleTimerType;
