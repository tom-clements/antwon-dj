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
};

module.exports = createJestConfig(customJestConfig);
