import { FC } from "react";
import { ThemeProvider as ThemeProviderInternal } from "styled-components";
import { TwonDark } from "styles/TwonTheme";

export const ThemeProvider: FC = props => {
    return (
        <ThemeProviderInternal theme={TwonDark} >
            {props.children}
        </ThemeProviderInternal>
    );
};
