import { isNil } from "lodash";
import { FC } from "react";
import styled, { CSSProperties } from "styled-components";

interface StyleProps {
    marginTop?: CSSProperties["marginTop"];
    marginRight?: CSSProperties["marginRight"];
    marginBottom?: CSSProperties["marginBottom"];
    marginLeft?: CSSProperties["marginLeft"];
    margin?: CSSProperties["margin"];
    paddingTop?: CSSProperties["paddingTop"];
    paddingRight?: CSSProperties["paddingRight"];
    paddingBottom?: CSSProperties["paddingBottom"];
    paddingLeft?: CSSProperties["paddingLeft"];
    padding?: CSSProperties["padding"];
    width?: CSSProperties["width"];
}

interface Props extends StyleProps {
}

const SpacingContainer = styled.div<StyleProps>`
    ${props => !isNil(props.marginTop) && `margin-top: ${props.marginTop};`}
    ${props => !isNil(props.marginRight) && `margin-right: ${props.marginRight};`}
    ${props => !isNil(props.marginBottom) && `margin-bottom: ${props.marginBottom};`}
    ${props => !isNil(props.marginLeft) && `margin-left: ${props.marginLeft};`}
    ${props => !isNil(props.margin) && `margin: ${props.margin};`}
    ${props => !isNil(props.paddingTop) && `padding-top: ${props.paddingTop};`}
    ${props => !isNil(props.paddingRight) && `padding-right: ${props.paddingRight};`}
    ${props => !isNil(props.paddingBottom) && `padding-bottom: ${props.paddingBottom};`}
    ${props => !isNil(props.paddingLeft) && `padding-left: ${props.paddingLeft};`}
    ${props => !isNil(props.padding) && `padding: ${props.padding};`}
    ${props => !isNil(props.width) && `width: ${props.width};`}
`;

/**
 * Simple block component that can wrap its children with a given margin or padding.
 * Can alternatively be used on its own to provide spacing between other components.
 */
export const Spacing: FC<Props> = props => {
    return (
        <SpacingContainer {...props}>
            {props.children}
        </SpacingContainer>
    );
};
