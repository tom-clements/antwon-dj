module.exports = {
    eslint: {
        dirs: [
            'components',
            'model',
            'pages',
            'service',
            'styles',
            'tests'
        ],
    },
    env: {
        API_BASE_URL: process.env.API_BASE_URL,
        CLIENT_BASE_URL: process.env.CLIENT_BASE_URL,
    }
};
