const { app } = require('electron');
const isDev = require('electron-is-dev');
const DBService = require('./DBService');

const appDir = app.getPath('appData');
let dbFilePath = `${appDir}/data/`;

if (isDev) {
  dbFilePath = './data/';
}

const DB = new DBService(dbFilePath);

module.exports = DB;
