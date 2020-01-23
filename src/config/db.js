import PouchDB from '../utils/PouchDB';

const db = new PouchDB('deskaide', { adapter: 'idb' });

export default db;
