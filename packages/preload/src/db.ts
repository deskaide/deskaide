import { exposeInMainWorld } from './exposeInMainWorld';

import Pouchdb from 'pouchdb';

type GetAllQuery = { limit?: number; startKey?: string; endKey?: string };

const database = new Pouchdb('deskaide');

export const save = async <T>(data: T, idPrefix?: string, id?: string) => {
  const now = new Date().toJSON();
  const result = await database.put({
    _id: `${idPrefix ? idPrefix + '#' : ''}${id || now}`,
    ...data,
    createdAt: now,
    updatedAt: now,
  });
  const doc: T = await database.get(result.id);
  return doc;
};

export const update = async <T>(id: string, data: T) => {
  if (!id) {
    throw new Error('Id cannot be empty');
  }

  let doc = await database.get(id);

  if (!doc) {
    throw new Error(`Data not found with this id: ${id}`);
  }

  const now = new Date().toJSON();
  await database.put({ _id: id, ...data, updatedAt: now });
  doc = await database.get(id);
  return doc;
};

export const getById = async <T>(id: string) => {
  if (!id) {
    throw new Error('Id cannot be empty');
  }

  const doc: T = await database.get(id);

  if (!doc) {
    throw new Error(`Data not found with this id: ${id}`);
  }

  return doc;
};

export const getAll = async ({
  limit = 0,
  startKey = '',
  endKey = '',
}: GetAllQuery) => {
  const options = {
    ...(limit && { limit: startKey ? limit + 1 : limit }),
    ...(startKey && { startkey: startKey }),
    ...(endKey && { endkey: endKey }),
    include_docs: true,
  };
  const result = await database.allDocs(options);
  const data = result?.rows
    ? startKey
      ? result.rows.slice(1)
      : result.rows
    : [];
  const response = {
    totalCount: result?.total_rows ?? 0,
    data,
    ...(limit &&
      data.length >= limit && {
        nextStartKey: result.rows[result.rows.length - 1].id,
      }),
  };

  return response;
};

export const deleteById = async (id: string) => {
  if (!id) {
    throw new Error('Id cannot be empty');
  }

  const doc = await database.get(id);

  if (!doc) {
    throw new Error(`Data not found with this id: ${id}`);
  }

  await database.remove(doc);

  return null;
};

export const db = {
  save,
  update,
  getById,
  getAll,
  deleteById,
} as const;

exposeInMainWorld('db', db);
