module.exports = {
    testPathIgnorePatterns: [
        '/node_modules/',
        '/__fixtures__/',
        '/benchmarks/',
    ],
    testMatch: [
        '<rootDir>/**/*spec.js',
    ],
    verbose: true,
};
