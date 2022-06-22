import { Notification } from 'electron';

import type { NotificationMessage } from '../../../../types/NotificationMessage';

export const notify = (message: NotificationMessage) => {
  new Notification({
    title: message.title,
    body: message.body,
  }).show();
};
