/* eslint no-underscore-dangle: ["error", { "allow": ["_id", "_rev"] }] */
const shortid = require('shortid');
const PouchDBCore = require('pouchdb-core');
const PouchDBMapReduce = require('pouchdb-mapreduce');
const PouchDBAdapterLevelDB = require('pouchdb-adapter-leveldb');
const PouchDBReplication = require('pouchdb-replication');
const PouchDBFind = require('pouchdb-find');

const PouchDB = PouchDBCore.plugin(PouchDBAdapterLevelDB)
  .plugin(PouchDBMapReduce)
  .plugin(PouchDBReplication)
  .plugin(PouchDBFind);

const db = new PouchDB('deskaide', { skip_setup: true });

class DBService {
  upsert = async (data, id = null) => {
    const now = new Date().toISOString();
    const createdAt = now;
    const updatedAt = now;
    const _id = id || shortid.generate();

    let doc = await this.getById(id);

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

    const { rev } = await db.put(doc);
    doc._rev = rev;
    return doc;
  };

  getById = async id => {
    try {
      const doc = await db.get(id);
      return doc;
    } catch (error) {
      switch (error.name) {
        case 'not_found':
          return null;
        default:
          throw error;
      }
    }
  };
}

module.exports = DBService;
