import shortid from 'shortid';

class DBService {
  constructor(db) {
    this.db = db;
  }

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

    const { rev } = await this.db.put(doc);
    doc._rev = rev;
    return doc;
  };

  getById = async id => {
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

export default DBService;
