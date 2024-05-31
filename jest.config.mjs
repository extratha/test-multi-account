import nextJest from 'next/jest.js'

const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  dir: './',
})
const BASE_COVERAGE = 50
// Add any custom config to be passed to Jest
/** @type {import('jest').Config} */
const config = {
  // Add more setup options before each test is run
  setupFilesAfterEnv: ['<rootDir>/src/__tests__/config/jest.setup.ts'],
  modulePathIgnorePatterns: [
    '<rootDir>/src/__tests__/config/',
    '<rootDir>/src/__tests__/__mocks__/',
    '<rootDir>/src/__tests__/testUtils.tsx', 
  ],
  testEnvironment: 'jest-environment-jsdom',
  preset: 'ts-jest',
  transform: {
    "^.+\\.(css|scss|sass|less)$": "jest-preview/transforms/css",
    "^(?!.*\\.(js|jsx|mjs|cjs|ts|tsx|css|json)$)": "jest-preview/transforms/file",
  },
  collectCoverage: true,
  collectCoverageFrom: [
    "src/**/*.{ts,tsx}",
    "!src/__test__/testUtils.tsx",
    "!src/app/**/*.*",
    "!src/middleware.ts",
    "!<rootDir>/node_modules/",
    "!**/*.{css,scss}",
  ],
  coverageThreshold: {
    global: {
      Branches: BASE_COVERAGE,
      functions: BASE_COVERAGE,
      lines: BASE_COVERAGE,
      statements: BASE_COVERAGE,
    },
  },
}
 
// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
export default createJestConfig(config)