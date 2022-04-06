const nextJest = require('next/jest')

const createJestConfig = nextJest({
    dir: './',
})

const customJestConfig = {
    testMatch: ['<rootDir>/tests/**/*.(ts|tsx)'],
    moduleDirectories: ['node_modules', '<rootDir>/src'],
    testEnvironment: 'jest-environment-jsdom',
}

module.exports = createJestConfig(customJestConfig)
