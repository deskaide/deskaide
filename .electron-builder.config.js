if (process.env.VITE_APP_VERSION === undefined) {
  const now = new Date();
  process.env.VITE_APP_VERSION = `${now.getUTCFullYear() - 2000}.${
    now.getUTCMonth() + 1
  }.${now.getUTCDate()}-${now.getUTCHours() * 60 + now.getUTCMinutes()}`;
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
    category: 'public.app-category.utilities',
    target: ['dmg'],
  },
  linux: {
    category: 'Utility',
    target: ['deb', 'AppImage'],
  },
  win: {
    target: ['nsis'],
  },
  afterSign: 'electron-builder-notarize',
};

module.exports = config;
