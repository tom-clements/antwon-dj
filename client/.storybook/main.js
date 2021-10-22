const path = require('path');

module.exports = {
    addons: [
        "@storybook/addon-essentials",
        "@storybook/addon-links",
    ],
    stories: [
        "../**/*.stories.@(ts|tsx)"
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
            },
        };
    }
}
