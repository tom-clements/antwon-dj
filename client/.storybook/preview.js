import React from 'react';
import { Provider } from 'react-redux';
import CssBaseline from '@mui/material/CssBaseline';
import { createStore } from 'model/Store';
import { ThemeProvider } from 'styles/components/ThemeProvider';

export const decorators = [
    Story => (
        <Provider store={createStore()}>
            <ThemeProvider>
                <CssBaseline />
                <Story />
            </ThemeProvider>
        </Provider>
    ),
];

export const parameters = {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
        matchers: {
            color: /(background|color)$/i,
            date: /Date$/,
        },
    },
    layout: 'centered',
};
