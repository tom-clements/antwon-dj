import type { ThemeOptions } from '@mui/material/styles';
import { createTheme as _createTheme, responsiveFontSizes } from '@mui/material/styles';

export const createTheme = (options: ThemeOptions) => {
    return responsiveFontSizes(_createTheme(options));
};
