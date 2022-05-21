import type { Theme } from '@mui/material/styles';

export { Theme };

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
