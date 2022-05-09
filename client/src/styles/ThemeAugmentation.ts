import { createTheme } from '@mui/material/styles';

const { palette } = createTheme();
const { augmentColor } = palette;

export const createColour = (colour: string) => augmentColor({ color: { main: colour } });

declare module '@mui/material/styles' {
    // remove when expanding default theme shape
    // eslint-disable-next-line @typescript-eslint/no-empty-interface
    interface Theme {
    }

    // remove when expanding default theme shape
    // eslint-disable-next-line @typescript-eslint/no-empty-interface
    interface ThemeOptions {
    }

    interface Palette {
        spotifyGreen: Palette['primary'];
    }

    interface PaletteOptions {
        spotifyGreen: PaletteOptions['primary'];
    }
}

declare module '@mui/material/Button' {
    interface ButtonPropsColorOverrides {
        spotifyGreen: true;
    }
}
