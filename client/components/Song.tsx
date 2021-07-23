import { FC } from "react";
import styled from "styled-components";
import { SongDto } from "model/service/SpotifySearchApi";
import { Flex } from "components/layout/Flex";
import { Spacing } from "components/layout/Spacing";

interface Props extends SongDto {
    skipTopBorder?: boolean;
}

export const SongContainer = styled.div<Props>`
    display: flex;
    border-width: 0.05em;
    border-style: solid;
    ${props => props.skipTopBorder && "border-top: none"};

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

    h3 {
        font-size: 1.25em;
        font-weight: bold;
    }

    h4 {
        font-size: 1.1em;
        font-style: italic;
    }
`;

export const Song: FC<Props> = props => {
    return (
        <SongContainer {...props}>
            <Flex flexGrow={0} flexShrink={0} flexBasis={"5em"}>
                <Spacing margin={"0.8em"}>
                    <img width={"100%"} src={props.song_album_url} />
                </Spacing>
            </Flex>
            <Flex>
                <Spacing margin={"0.8em 0.8em 0.8em 0"}>
                    <h3>{props.song_name}</h3>
                    <h4>{props.song_artist}</h4>
                </Spacing>
            </Flex>
        </SongContainer>
    );
};
