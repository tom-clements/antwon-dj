import { createGlobalStyle } from "styled-components";

export const BaseStyle = createGlobalStyle`
    html, body {
        padding: 0;
        margin: 0;
        width: 100%;
        height: 100%;
    }

    body {
        font-size: 14px;
        font-family: Poppins, sans-serif;
        color: ${props => props.theme.color};
        background: ${props => props.theme.background};
    }

    * {
        box-sizing: border-box;
    }
`;
