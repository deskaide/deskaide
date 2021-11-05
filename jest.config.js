module.exports = {
  preset: 'vite-jest',

  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  testMatch: [
    '<rootDir>/packages/renderer/**/__tests__/**/*.{js,jsx,ts,tsx}',
    '<rootDir>/packages/renderer/**/*.{spec,test}.{js,jsx,ts,tsx}',
  ],
  testEnvironment: 'jest-environment-jsdom',
};
