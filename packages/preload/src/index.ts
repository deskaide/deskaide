import { contextBridge } from 'electron';

const pkg = require('../../../package.json');

const apiKey = 'deskaide';

const api = {
  platform: process.versions,
  version: pkg.version,
};

contextBridge.exposeInMainWorld(apiKey, api);
