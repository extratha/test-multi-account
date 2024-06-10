const nextJest = require("next/jest");

// Provide the path to your Next.js app to load next.config.js and .env files in your test environment
const createJestConfig = nextJest({ dir: "./" });

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
/** @type {import('jest').Config} */
module.exports = createJestConfig({
  // Add more setup options before each test is run
  setupFilesAfterEnv: ["<rootDir>/src/__tests__/config/jest.setup.ts"],
  modulePathIgnorePatterns: [
    "<rootDir>/src/__tests__/config/",
    "<rootDir>/src/__tests__/__mocks__/",
    "<rootDir>/src/__tests__/testUtils.tsx",
  ],
  testEnvironment: "jsdom",
  preset: "ts-jest",
  collectCoverage: true,
  coverageReporters: ["cobertura", "json", "lcov", "text"],
  collectCoverageFrom: ["src/**/*.{ts,tsx}", "!src/**/*.d.ts", "!src/testUtils/**/*"],
  snapshotSerializers: ["@emotion/jest/serializer"],
  watchPlugins: ["jest-watch-typeahead/filename", "jest-watch-typeahead/testname"],
});
