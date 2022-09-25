import { ipcRenderer } from 'electron';

import type { NotificationMessage } from '../../../types';
import { IpcEventTypes } from '../../../types';

// Export for types in contracts.d.ts
export const notification = {
  send: (message: NotificationMessage) =>
    ipcRenderer.send(IpcEventTypes.ShowNotification, message),
};
