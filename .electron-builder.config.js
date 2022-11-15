const { version } = require('./package.json');

if (process.env.VITE_APP_VERSION === undefined) {
  process.env.VITE_APP_VERSION = version;
}

/**
 * @type {import('electron-builder').Configuration}
 * @see https://www.electron.build/configuration/configuration
 */
const config = {
  appId: 'app.deskaide.www',
  productName: 'Deskaide',
  directories: {
    output: 'dist',
    buildResources: 'buildResources',
  },
  files: ['packages/**/dist/**'],
  extraMetadata: {
    version: process.env.VITE_APP_VERSION,
    homepage: 'https://www.deskaide.app',
    description:
      'An open source application to help managing your desk (Computer) usage.',
  },
  mac: {
    hardenedRuntime: true,
    entitlements:
      './node_modules/electron-builder-notarize/entitlements.mac.inherit.plist',
    category: 'public.app-category.utilities',
    target: ['dmg'],
    publish: 'github',
  },
  linux: {
    category: 'Utility',
    target: ['deb', 'AppImage'],
    publish: 'github',
  },
  win: {
    target: ['nsis'],
    publish: 'github',
  },
  afterSign: 'electron-builder-notarize',
};

module.exports = config;
