export const baseJestConfig = {
  preset: 'ts-jest',
  clearMocks: true,
  coverageDirectory: 'coverage',
  testEnvironment: 'jest-environment-jsdom',
  // testMatch: ['<rootDir>/tests/**/*.test.(ts|tsx)'],
};
