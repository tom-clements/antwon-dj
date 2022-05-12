const nextJest = require('next/jest');

const createJestConfig = nextJest({
    dir: './',
});

const customJestConfig = {
    testMatch: ['<rootDir>/tests/**/*.test.(ts|tsx)'],
    moduleDirectories: ['node_modules', '<rootDir>/src', '<rootDir>/tests'],
    moduleNameMapper: {
        '^tests/(.*)$': '<rootDir>/tests/$1',
    },
    testEnvironment: 'jest-environment-jsdom',
    setupFilesAfterEnv: ['<rootDir>/tests/jest.setup.ts'],
};

module.exports = createJestConfig(customJestConfig);
