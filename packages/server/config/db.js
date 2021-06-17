import { app } from 'electron';
import isDev from 'electron-is-dev';
import path from 'path';
import PouchDB from 'pouchdb';

import DBService from '../services/dbService';

const userDataPath = app.getPath('userData');

let dbFilePath = `${userDataPath}/data/`;

if (isDev) {
  dbFilePath = path.join(__dirname, '../data/');
}

const DB = new DBService(dbFilePath);

export function initRemoteDB(dbURL = '') {
  if (!dbURL) {
    return null;
  }

  return new PouchDB(dbURL);
}

export default DB;
