import { ipcRenderer } from 'electron';

import type { GetAllQuery, GetAllQueryResponse } from '../../../types';
import { IpcEventTypes } from '../../../types';

// Export for types in contracts.d.ts
export const db = {
  save: <T>(data: T, idPrefix?: string, id?: string): Promise<T> =>
    ipcRenderer.invoke(IpcEventTypes.Create, { data, idPrefix, id }),
  update: <T>(id: string, data: T): Promise<T> =>
    ipcRenderer.invoke(IpcEventTypes.Update, { id, data }),
  getById: <T>(id: string): Promise<T> =>
    ipcRenderer.invoke(IpcEventTypes.GetById, id),
  getAll: <T>(query: GetAllQuery): Promise<GetAllQueryResponse<T>> =>
    ipcRenderer.invoke(IpcEventTypes.GetAll, query),
  deleteById: (id: string): Promise<null> =>
    ipcRenderer.invoke(IpcEventTypes.DeleteById, id),
  search: <T>(
    query: Record<string, unknown>
  ): Promise<GetAllQueryResponse<T>> =>
    ipcRenderer.invoke(IpcEventTypes.Search, query),
};
