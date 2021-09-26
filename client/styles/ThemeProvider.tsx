import { FC } from 'react';
import { ThemeProvider as ThemeProviderInternal } from '@mui/material/styles';
import { twonDark } from 'styles/TwonTheme';

export const defaultTheme = twonDark;

export const ThemeProvider: FC = props => {
    return (
        <ThemeProviderInternal theme={defaultTheme} >
            {props.children}
        </ThemeProviderInternal>
    );
};

declare module '@mui/material/styles' {
    // remove when expanding default theme shape
    // eslint-disable-next-line @typescript-eslint/no-empty-interface
    interface Theme {
    }

    // remove when expanding default theme shape
    // eslint-disable-next-line @typescript-eslint/no-empty-interface
    interface ThemeOptions {
    }
}
