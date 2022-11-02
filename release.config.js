module.exports = {
  branches: ['main'],
  plugins: [
    '@semantic-release/commit-analyzer',
    [
      '@semantic-release/github',
      {
        assets: ['package.json', 'package-lock.json'],
      },
    ],
  ],
};
