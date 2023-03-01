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
  extraResources: ['buildResources/icons/**'],
  files: ['packages/**/dist/**'],
  extraMetadata: {
    version: process.env.VITE_APP_VERSION,
    homepage: 'https://www.deskaide.app',
    description:
      'An open source application to help managing your desk (Computer) usage.',
  },
  mac: {
    icon: 'assets/icons/Deskaide.icns',
    hardenedRuntime: true,
    gatekeeperAssess: false,
    entitlements: 'buildResources/entitlements.mac.inherit.plist',
    entitlementsInherit: 'buildResources/entitlements.mac.inherit.plist',
    category: 'public.app-category.utilities',
    target: ['dmg'],
    publish: 'github',
  },
  linux: {
    icon: 'assets/icons/linuxIcons',
    category: 'Utility',
    target: ['deb', 'AppImage'],
    publish: 'github',
    desktop: {
      Icon: 'deskaide',
      MimeType: 'x-scheme-handler/deskaide;',
    },
  },
  win: {
    icon: 'assets/icons/Deskaide.ico',
    target: [
      {
        target: 'nsis',
        arch: ['x64'],
      },
      {
        target: 'portable',
        arch: ['x64'],
      },
    ],
    publish: 'github',
  },
  nsis: {
    oneClick: false,
    allowToChangeInstallationDirectory: false,
    differentialPackage: false,
  },
  portable: {
    artifactName: '${productName}Portable.${ext}',
  },
  dmg: {
    sign: false,
  },
  afterSign: 'scripts/notarize.js',
};

module.exports = config;
