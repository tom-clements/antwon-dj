import { createTheme } from "@mui/material/styles";
import { grey, purple } from "@mui/material/colors";

export const twonDark = createTheme({
    palette: {
        mode: "dark",
        primary: {
            main: purple["A700"],
        },
        secondary: {
            main: grey["800"],
        },
    },
    typography: {
        fontFamily: "Poppins, sans-serif"
    }
});
