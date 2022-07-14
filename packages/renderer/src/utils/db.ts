import Pouchdb from 'pouchdb';

type GetAllQuery = { limit?: number; startKey?: string; endKey?: string };

const db = new Pouchdb('deskaide');

export const save = async <T>(data: T, idPrefix?: string) => {
  const now = new Date().toJSON();
  const result = await db.put({
    _id: `${idPrefix ? idPrefix + '_' : ''}${now}`,
    ...data,
    createdAt: now,
    updatedAt: now,
  });
  const doc = await db.get(result.id);
  return doc;
};

export const update = async <T>(id: string, data: T) => {
  if (!id) {
    throw new Error('Id cannot be empty');
  }

  let doc = await db.get(id);

  if (!doc) {
    throw new Error(`Data not found with this id: ${id}`);
  }

  const now = new Date().toJSON();
  await db.put({ _id: id, ...data, updatedAt: now });
  doc = await db.get(id);
  return doc;
};

export const getById = async (id: string) => {
  if (!id) {
    throw new Error('Id cannot be empty');
  }

  const doc = await db.get(id);

  if (!doc) {
    throw new Error(`Data not found with this id: ${id}`);
  }

  return doc;
};

export const deleteById = async (id: string) => {
  if (!id) {
    throw new Error('Id cannot be empty');
  }

  const doc = await db.get(id);

  if (!doc) {
    throw new Error(`Data not found with this id: ${id}`);
  }

  await db.remove(doc);

  return null;
};

export const getAll = async ({
  limit = 0,
  startKey = '',
  endKey = '',
}: GetAllQuery) => {
  const options = {
    ...(limit && { limit }),
    ...(startKey && { startKey }),
    ...(endKey && { endKey }),
  };
  const result = await db.allDocs(options);
  const response = {
    count: result?.total_rows ?? 0,
    data: result?.rows ?? [],
    ...(result &&
      result?.rows.length && {
        nextStartKey: result.rows[result.rows.length - 1].id,
      }),
  };

  return response;
};
