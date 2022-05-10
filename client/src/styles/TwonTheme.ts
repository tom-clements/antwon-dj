import { createTheme, responsiveFontSizes } from '@mui/material/styles';
import { grey, purple } from '@mui/material/colors';
import { createColour } from 'styles/ThemeAugmentation';

export const twonDark = responsiveFontSizes(createTheme({
    palette: {
        mode: 'dark',
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
}));
