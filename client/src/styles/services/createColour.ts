import { createTheme } from '@mui/material/styles';

const { palette } = createTheme();
const { augmentColor } = palette;

export const createColour = (colour: string) => augmentColor({ color: { main: colour } });
