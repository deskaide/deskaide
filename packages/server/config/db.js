import { app } from 'electron';
import isDev from 'electron-is-dev';
import path from 'path';

import DBService from '../services/dbService';

const userDataPath = app.getPath('userData');

let dbFilePath = `${userDataPath}/data/`;

if (isDev) {
  dbFilePath = path.join(__dirname, '../data/');
}

const DB = new DBService(dbFilePath);

export default DB;
