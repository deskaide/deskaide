import PouchDB from '../utils/PouchDB';

class DBService {
  constructor() {
    this.db = new PouchDB('deskaide');
  }

  async create(data, id = null, app) {}
}

export default DBService;
