const { ipcRenderer } = require('electron');

import type { NotificationMessage } from '../../../types';
import { IpcEventTypes } from '../../../types';
import { exposeInMainWorld } from './exposeInMainWorld';

function send(message: NotificationMessage) {
  ipcRenderer.send(IpcEventTypes.ShowNotification, message);
}

// Export for types in contracts.d.ts
export const notification = { send } as const;

exposeInMainWorld('notification', notification);
