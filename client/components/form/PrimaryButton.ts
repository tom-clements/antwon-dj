import styled from "styled-components";

export const PrimaryButton = styled.button`
    font-size: 1em;
    padding: 0.305em 1em;

    text-align: center;
    text-decoration: none;
    font-weight: bold;
    text-transform: uppercase;

    border-width: 0.05em;
    border-style: solid;
    border-radius: 0.25em;
    outline: none;
    transition: 0.12s;

    color: ${props => props.theme.primaryButton.base.color};
    background-color: ${props => props.theme.primaryButton.base.backgroundColor};
    border-color: ${props => props.theme.primaryButton.base.borderColor};

    &:hover {
        color: ${props => props.theme.primaryButton.hover.color};
        background-color: ${props => props.theme.primaryButton.hover.backgroundColor};
        border-color: ${props => props.theme.primaryButton.hover.borderColor};
    }

    &:active {
        color: ${props => props.theme.primaryButton.active.color};
        background-color: ${props => props.theme.primaryButton.active.backgroundColor};
        border-color: ${props => props.theme.primaryButton.active.borderColor};
    }

    &:focus {
        box-shadow: 0 0 0.3em 0.02em ${props => props.theme.field.focus.outlineColor};
    }

    & .disabled {
        color: ${props => props.theme.primaryButton.disabled.color};
        background-color: ${props => props.theme.primaryButton.disabled.backgroundColor};
        border-color: ${props => props.theme.primaryButton.disabled.borderColor};
    }

    & .invalid {
        border-color: ${props => props.theme.primaryButton.invalid.borderColor};
    }
`;
