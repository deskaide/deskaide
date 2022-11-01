import { notification } from '#preload';

import type { NotificationMessage } from '../../../../types';

export const sendNotification = (message: NotificationMessage) => {
  if (notification) {
    notification.send(message);
  }
};
