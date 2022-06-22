import type { NotificationMessage } from '../../../../types/NotificationMessage';

export const sendNotification = (message: NotificationMessage) => {
  if (window && window.notification) {
    window.notification.send(message);
  }
};
