module.exports = {
  branches: ['main', 'chore/cimmitizen'],
  plugins: [
    '@semantic-release/commit-analyzer',
    '@semantic-release/release-notes-generator',
    '@semantic-release/changelog',
    [
      '@semantic-release/github',
      {
        assets: ['CHANGELOG.md', 'package.json', 'package-lock.json'],
      },
    ],
  ],
};
