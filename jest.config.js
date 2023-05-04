/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: ['**/test/**/all-tests.ts'],
  testPathIgnorePatterns: [
    '/node_modules/',
    '/path/to/directory/to/ignore/',
  ],
  // testSequencer: "./test/custome-sequencer.ts",

};