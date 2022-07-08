import type { NotificationMessage } from '../../../../types';

export const sendNotification = (message: NotificationMessage) => {
  if (window && window.notification) {
    window.notification.send(message);
  }
};
