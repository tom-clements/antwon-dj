import React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from 'src/styles/ThemeProvider';

export const decorators = [
    Story => (
        <ThemeProvider>
            <CssBaseline />
            <Story />
        </ThemeProvider>
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
