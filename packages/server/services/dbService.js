import PouchDBAdapterLevelDB from 'pouchdb-adapter-leveldb';
import PouchDBCore from 'pouchdb-core';
import PouchDBFind from 'pouchdb-find';
import PouchDBMapReduce from 'pouchdb-mapreduce';
import PouchDBReplication from 'pouchdb-replication';
import shortid from 'shortid';

import prefixes from '../config/prefixes';

const PouchDB = PouchDBCore.plugin(PouchDBAdapterLevelDB)
  .plugin(PouchDBMapReduce)
  .plugin(PouchDBReplication)
  .plugin(PouchDBFind);

class DBService {
  constructor(dbPath = '') {
    this.db = new PouchDB(`${dbPath}`, { skip_setup: true });
  }

  upsert = async (data, id) => {
    const now = new Date().toISOString();
    const createdAt = now;
    const updatedAt = now;
    const _id = id || `${prefixes[data.type]}${shortid.generate()}`;

    let doc = await this.getById(_id);

    if (doc) {
      doc = {
        ...doc,
        ...data,
        updatedAt,
      };
    } else {
      doc = {
        ...data,
        _id,
        createdAt,
        updatedAt,
      };
    }

    const { rev } = await this.db.put(doc);
    doc._rev = rev;
    return doc;
  };

  getById = async (id) => {
    try {
      const doc = await this.db.get(id);
      return doc;
    } catch (error) {
      console.log(error);
      switch (error.name) {
        case 'not_found':
          return null;
        default:
          throw error;
      }
    }
  };

  fetchAll = async ({ type }) => {
    try {
      const data = await this.db.allDocs({ include_docs: true });
      if (type) {
        data.rows = data.rows.filter((d) => d.id.includes(type));
      }
      return data;
    } catch (error) {
      console.log(error);
      switch (error.name) {
        case 'not_found':
          return null;
        default:
          throw error;
      }
    }
  };
}

export default DBService;
