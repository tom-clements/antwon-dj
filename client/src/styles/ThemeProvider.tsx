import type { FC } from 'react';
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

