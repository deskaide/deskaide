/* eslint no-underscore-dangle: ["error", { "allow": ["_id", "_rev"] }] */
const shortid = require('shortid');
const PouchDBCore = require('pouchdb-core');
const PouchDBMapReduce = require('pouchdb-mapreduce');
const PouchDBAdapterLevelDB = require('pouchdb-adapter-leveldb');
const PouchDBReplication = require('pouchdb-replication');
const PouchDBFind = require('pouchdb-find');
const prefixes = require('./prefixes');

const PouchDB = PouchDBCore.plugin(PouchDBAdapterLevelDB)
  .plugin(PouchDBMapReduce)
  .plugin(PouchDBReplication)
  .plugin(PouchDBFind);

class DBService {
  constructor(dbPath = '') {
    this.db = new PouchDB(`${dbPath}`, { skip_setup: true });
  }

  upsert = async (data, id = null) => {
    const now = new Date().toISOString();
    const createdAt = now;
    const updatedAt = now;
    const _id = id || `${prefixes[data.type]}${shortid.generate()}`;

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

    const { rev } = await this.db.put(doc);
    doc._rev = rev;
    return doc;
  };

  getById = async (id) => {
    try {
      const doc = await this.db.get(id);
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
