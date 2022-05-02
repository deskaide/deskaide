const esmModules = [
  'unified',
  'bail',
  'is-plain-obj',
  'trough',
  'vfile',
  'unist-util-stringify-position',
  'remark-parse',
  'mdast-util-from-markdown',
  'mdast-util-to-string',
  'micromark',
  'parse-entities',
  'character-entities',
  'remark-gfm',
  'mdast-util-gfm',
  'ccount',
  'mdast-util-find-and-replace',
  'unist-util-visit-parents',
  'unist-util-is',
  'mdast-util-to-markdown',
  'unist-util-visit',
  'markdown-table',
  'remark-react',
  'mdast-util-to-hast',
  'unist-builder',
  'unist-util-position',
  'unist-util-generated',
  'mdast-util-definitions',
  'hast-util-sanitize',
  'hast-to-hyperscript',
  'property-information',
  'space-separated-tokens',
  'comma-separated-tokens',
  'web-namespaces',
];

module.exports = {
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  testEnvironment: 'jest-environment-jsdom',
  preset: 'ts-jest/presets/default-esm', // or other ESM presets
  globals: {
    'ts-jest': {
      useESM: true,
      tsconfig: '<rootDir>/packages/renderer/tsconfig.json',
    },
  },
  transform: {
    '^.+\\.ts?$': 'ts-jest',
    '^.+\\.(js|jsx)$': 'babel-jest',
  },
  transformIgnorePatterns: [
    `<rootDir>/node_modules/(?!${esmModules.join('|')})`,
  ],
  moduleNameMapper: {
    '^(\\.{1,2}/.*)\\.js$': '$1',
    '\\.(css|less|scss)$': 'identity-obj-proxy',
  },
};
