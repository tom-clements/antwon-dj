import { grey, purple } from '@mui/material/colors';
import { createColour } from 'styles/services/createColour';
import { createTheme } from 'styles/services/createTheme';

export const twonDark = createTheme({
    palette: {
        mode: 'dark',
        primary: {
            main: purple['A700'],
        },
        secondary: {
            main: grey['400'],
        },
        spotifyGreen: createColour('#1ed760'),
    },
    typography: {
        fontFamily: 'Poppins, sans-serif'
    }
});

export const twonLight = createTheme({
    palette: {
        mode: 'light',
        primary: {
            main: purple['A700'],
        },
        secondary: {
            main: grey['800'],
        },
        spotifyGreen: createColour('#1ed760'),
    },
    typography: {
        fontFamily: 'Poppins, sans-serif'
    }
});
