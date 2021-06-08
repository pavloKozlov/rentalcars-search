module.exports = {
  automock: false,
  collectCoverage: false,
  setupFiles: ['<rootDir>/config/tests/enzymeSetup.js'],
  testRegex: '.*\\.(test|spec)\\.js$',
  transformIgnorePatterns: ['/node_modules/(?!@)/'],
  moduleNameMapper: {
    '^.+\\.(css|scss)$': 'identity-obj-proxy',
    '\\.svg': '<rootDir>/__mocks__/svgrMock.js',
  },
  moduleFileExtensions: ['js', 'jsx'],
  testEnvironment: 'jsdom',
};
