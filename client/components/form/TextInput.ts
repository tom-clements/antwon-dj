import { isNil } from "lodash";
import styled, { CSSProperties } from "styled-components";

interface Props {
    width?: CSSProperties["width"];
}

export const TextInput = styled.input.attrs<Props>({
    type: "text"
}) <Props>`
    ${props => !isNil(props.width) && `width: ${props.width};`}

    font-size: 1.2em;
    padding: 0.2em 0.8em;

    border-width: 0.15em;
    border-style: solid;
    border-radius: 0.5em;
    outline: none;
    transition: 0.12s;

    ::placeholder {
        color: ${props => props.theme.field.base.color};
        font-style: italic;
        text-align: right;
        letter-spacing: 0.02em;
        opacity: 0.4;
    }

    color: ${props => props.theme.field.base.color};
    background-color: ${props => props.theme.field.base.backgroundColor};
    border-color: ${props => props.theme.field.base.borderColor};

    &:hover {
        color: ${props => props.theme.field.hover.color};
        background-color: ${props => props.theme.field.hover.backgroundColor};
        border-color: ${props => props.theme.field.hover.borderColor};

        ::placeholder {
            opacity: 0.6;
        }
    }

    &:active {
        color: ${props => props.theme.field.active.color};
        background-color: ${props => props.theme.field.active.backgroundColor};
        border-color: ${props => props.theme.field.active.borderColor};
    }

    &:focus {
        box-shadow: 0 0 0.3em 0.02em ${props => props.theme.field.focus.outlineColor};
    }

    & .disabled {
        color: ${props => props.theme.field.disabled.color};
        background-color: ${props => props.theme.field.disabled.backgroundColor};
        border-color: ${props => props.theme.field.disabled.borderColor};
    }

    & .invalid {
        border-color: ${props => props.theme.field.invalid.borderColor};
    }
`;
