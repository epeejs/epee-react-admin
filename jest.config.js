/*
 * For a detailed explanation regarding each configuration property, visit:
 * https://jestjs.io/docs/configuration
 */

/** @type {import('jest').Config} */
export default {
  // Automatically clear mock calls, instances, contexts and results before every test
  clearMocks: true,
  // A list of paths to directories that Jest should use to search for files in
  roots: ['src'],
  // The test environment that will be used for testing
  testEnvironment: 'jsdom',
  moduleNameMapper: {
    '^.+\\.(css|styl|less|sass|scss|png|jpg|ttf|woff|woff2|svg)$': 'jest-transform-stub',
  },
  coverageReporters: ['html', 'cobertura', 'text'],
};
