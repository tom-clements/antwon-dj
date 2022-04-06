module.exports = {
    eslint: {
        dirs: [
            'src',
            'tests'
        ],
    },
    env: {
        API_BASE_URL: process.env.API_BASE_URL,
        CLIENT_BASE_URL: process.env.CLIENT_BASE_URL,
    }
};
