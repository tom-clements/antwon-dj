import React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import { StateProvider } from 'common/components/StateProvider';
import { ThemeProvider } from 'styles/components/ThemeProvider';

export const decorators = [
    Story => (
        <StateProvider>
            <ThemeProvider>
                <CssBaseline />
                <Story />
            </ThemeProvider>
        </StateProvider>
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
