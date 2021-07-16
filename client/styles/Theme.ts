import { CSSProperties } from "react";

interface ControlState {
    base: CSSProperties;
    hover: CSSProperties;
    focus: CSSProperties;
    active: CSSProperties;
    disabled: CSSProperties;
    invalid: CSSProperties;
}

export interface Theme {
    background: CSSProperties["color"];
    field: ControlState;
    primaryButton: ControlState;
}

declare module "styled-components" {
    export interface DefaultTheme extends Theme { }
}
