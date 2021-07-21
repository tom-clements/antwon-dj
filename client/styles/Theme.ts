import { CSSProperties } from "react";
import { Palette } from "styles/Palette";

interface ControlState {
    base: CSSProperties;
    hover: CSSProperties;
    focus: CSSProperties;
    active: CSSProperties;
    disabled: CSSProperties;
    invalid: CSSProperties;
}

export interface Theme {
    palette: Palette;
    color: CSSProperties["color"];
    background: CSSProperties["color"];
    field: ControlState;
    primaryButton: ControlState;
}

declare module "styled-components" {
    export interface DefaultTheme extends Theme { }
}
