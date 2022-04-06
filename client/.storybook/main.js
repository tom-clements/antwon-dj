const path = require('path');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');

module.exports = {
    addons: [
        "@storybook/addon-essentials",
        "@storybook/addon-links",
    ],
    stories: [
        "../src/**/*.stories.@(ts|tsx)"
    ],
    reactOptions: {
        fastRefresh: true,
    },
    webpackFinal: async config => {
        return {
            ...config,
            resolve: {
                ...config.resolve,
                alias: {
                    ...config.resolve.alias,
                    "@emotion/core": require.resolve('@emotion/react'),
                    "@emotion/styled": require.resolve('@emotion/styled'),
                    "emotion-theming": require.resolve('@emotion/react'),
                },
                modules: [
                    path.resolve(__dirname, ".."),
                    "node_modules",
                ],
                plugins: [
                    ...config.resolve.plugins,
                    new TsconfigPathsPlugin()
                ]
            },
        };
    }
}
