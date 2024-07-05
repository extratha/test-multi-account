const nextJest = require("next/jest");
const createJestConfig = nextJest({ dir: "./" });

/** @type {import('jest').Config} */
module.exports = createJestConfig({
  restoreMocks: true,
  testEnvironment: "jsdom",
  coverageReporters: ["cobertura", "json", "lcov", "text"],
  snapshotSerializers: ["@emotion/jest/serializer"],
  collectCoverageFrom: ["src/**/*.{ts,tsx}", "!src/**/*.d.ts", "!src/testUtils/**/*"],
  setupFilesAfterEnv: ["<rootDir>/src/testUtils/setupTest.ts"],
  watchPlugins: ["jest-watch-typeahead/filename", "jest-watch-typeahead/testname"],
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
    "^.+\\.(svg)$": "<rootDir>/src/__mocks__/SvgMock.tsx",
  },
});
