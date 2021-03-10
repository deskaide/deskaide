const { app } = require("electron");
const isDev = require("electron-is-dev");
const path = require("path");
const DBService = require("../services/dbService");

const appDir = app.getPath("appData");
let dbFilePath = `${appDir}/data/`;

if (isDev) {
  dbFilePath = path.join(__dirname, "../../data/");
}

const DB = new DBService(dbFilePath);

module.exports = DB;
