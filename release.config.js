module.exports = {
  branches: [
    'main',
    'next',
    'next-major',
    { name: 'beta', prerelease: true },
    { name: 'alpha', prerelease: true },
  ],
  plugins: ['@semantic-release/commit-analyzer'],
};
