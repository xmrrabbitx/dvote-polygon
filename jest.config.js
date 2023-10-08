/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: ['node_modules/dvote-polygon/test/all-tests.ts'],
  testPathIgnorePatterns: [
    '/node_modules/',
    '/path/to/directory/to/ignore/',
  ],
  testMatch: [
    "**/__tests__/**/*.[jt]s?(x)",
    "**/?(*.)+(spec|test).[tj]s?(x)"
  ],
  // testSequencer: "./test/custome-sequencer.ts",

};