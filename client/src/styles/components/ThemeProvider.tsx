import type { FC } from 'react';
import { ThemeProvider as ThemeProviderInternal } from '@mui/material/styles';
import { useTheme } from 'styles/hooks/useTheme';

export const ThemeProvider: FC = props => {
    const theme = useTheme();

    return (
        <ThemeProviderInternal theme={theme} >
            {props.children}
        </ThemeProviderInternal>
    );
};
