import { Notification } from 'electron';

import type { NotificationMessage } from '../../../../types/NotificationMessage';
import logo from '../../../../assets/icons/icon.png';

export const notify = (message: NotificationMessage) => {
  new Notification({
    title: message.title,
    body: message.body,
    icon: logo,
  }).show();
};
