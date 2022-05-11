module.exports = {
  verbose: true,
  preset: 'jest-playwright-preset',
  transform: {
    "^.+\\.(ts|js)x?$": "ts-jest"
  },
  testMatch: ['**/?(*.)+(test).ts'],
  testPathIgnorePatterns: ['/node_modules/'],
  setupFilesAfterEnv: ['./jest.setup.js'],
  reporters: [
    'default',
    [
      'jest-html-reporters',
      {
        publicPath: './test-results/',
        filename: 'report.html',
        expand: true
      }
    ]
  ]
}