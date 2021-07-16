import { Palette } from "styles/Palette";
import { Theme } from "styles/Theme";

const TwonPalette: Palette = {
    primaryLight750: "#EDFBF4",
    primaryLight500: "#DAF6E9",
    primaryLight250: "#C8F2DE",
    primary: "#B4EDD2",
    primaryDark250: "#61D9A1",
    primaryDark500: "#29A86D",
    primaryDark750: "#145436",

    secondaryLight750: "#E7F3F4",
    secondaryLight500: "#D0E7E9",
    secondaryLight250: "#B8DBDE",
    secondary: "#A0CFD3",
    secondaryDark250: "#61AFB6",
    secondaryDark500: "#3B7A80",
    secondaryDark750: "#1D3D40",

    tertiaryLight750: "#CFD2E2",
    tertiaryLight500: "#9FA4C6",
    tertiaryLight250: "#7077A9",
    tertiary: "#4D5480",
    tertiaryDark250: "#393E60",
    tertiaryDark500: "#262A40",
    tertiaryDark750: "#131520",

    quaternaryLight750: "#E6DDE7",
    quaternaryLight500: "#CCBCCF",
    quaternaryLight250: "#B39AB8",
    quaternary: "#9A7AA0",
    quaternaryDark250: "#76577B",
    quaternaryDark500: "#4E3A52",
    quaternaryDark750: "#271D29",

    quinaryLight750: "#E2D9DE",
    quinaryLight500: "#C4B3BD",
    quinaryLight250: "#A78C9D",
    quinary: "#87677B",
    quinaryDark250: "#664E5D",
    quinaryDark500: "#44343E",
    quinaryDark750: "#221A1F",

    white: "#FFF",
    black: "#000",
};

export const TwonDark: Theme = {
    background: TwonPalette.tertiaryDark750,
    field: {
        base: {
            color: TwonPalette.white,
            backgroundColor: TwonPalette.secondaryDark750,
            borderColor: TwonPalette.secondaryLight750,
        },
        hover: {
            color: TwonPalette.white,
            backgroundColor: TwonPalette.secondaryDark500,
            borderColor: TwonPalette.secondaryLight500,
        },
        active: {
            borderColor: TwonPalette.primary,
        },
        focus: {
            outlineColor: TwonPalette.primaryLight750,
        },
        disabled: {
            color: TwonPalette.white,
            backgroundColor: TwonPalette.secondaryDark750,
            borderColor: TwonPalette.quaternaryLight250,
        },
        invalid: {
            borderColor: TwonPalette.quaternary,
        },
    },
    primaryButton: {
        base: {
            color: TwonPalette.primaryLight250,
            backgroundColor: TwonPalette.primaryDark500,
            borderColor: TwonPalette.secondaryLight750,
        },
        hover: {
            color: TwonPalette.primaryDark750,
            backgroundColor: TwonPalette.primaryDark250,
            borderColor: TwonPalette.secondaryLight500,
        },
        active: {
            color: TwonPalette.white,
            backgroundColor: TwonPalette.secondaryDark500,
            borderColor: TwonPalette.primary,
        },
        focus: {
            outlineColor: TwonPalette.primaryLight750,
        },
        disabled: {
        },
        invalid: {
        },
    },
};
