import uuid from 'uuid/v4';
import { apps } from '../config';

class Model {
  constructor(db) {
    this.db = db;
  }

  async create(data, id = null, app = apps.stat) {
    const now = new Date().toISOString();
    const _id = id || uuid();
    const createdAt = now;
    const updatedAt = now;

    const doc = {
      _id,
      createdAt,
      updatedAt,
      ...data,
    };

    const { rev } = await this.db.put(doc);
    doc._rev = rev;
    console.log(doc);
    return doc;
  }
}

export default Model;
