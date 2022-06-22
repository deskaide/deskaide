const { ipcRenderer } = require('electron');

import type { NotificationMessage } from '../../../types/NotificationMessage';
import { exposeInMainWorld } from './exposeInMainWorld';

function send(message: NotificationMessage) {
  ipcRenderer.send('SHOW_NOTIFICATION', message);
}

// Export for types in contracts.d.ts
export const notification = { send } as const;

exposeInMainWorld('notification', notification);
