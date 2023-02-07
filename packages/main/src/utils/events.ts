import { ipcMain } from 'electron';
import type { NotificationMessage } from '../../../../types';
import { IpcEventTypes } from '../../../../types';
import { db } from './db';
import { notify } from './notifier';

export const initEventSubscriptions = () => {
  ipcMain.on(
    IpcEventTypes.ShowNotification,
    (_e, message: NotificationMessage) => {
      notify(message);
    }
  );

  ipcMain.handle(IpcEventTypes.Create, async (_e, { data, idPrefix, id }) => {
    const result = await db.save(data, idPrefix, id);
    return result;
  });

  ipcMain.handle(IpcEventTypes.Update, async (_e, { id, data }) => {
    const result = await db.update(id, data);
    return result;
  });

  ipcMain.handle(IpcEventTypes.GetById, async (_e, id) => {
    const result = await db.getById(id);
    return result;
  });

  ipcMain.handle(IpcEventTypes.GetAll, async (_e, query) => {
    const result = await db.getAll(query);
    return result;
  });

  ipcMain.handle(IpcEventTypes.DeleteById, async (_e, id) => {
    const result = await db.deleteById(id);
    return result;
  });

  ipcMain.handle(IpcEventTypes.Search, async (_e, query) => {
    const result = await db.search(query);
    return result;
  });
};
