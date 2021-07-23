import { FC } from "react";
import styled from "styled-components";
import { Flex } from "components/layout/Flex";
import { FlexCentre } from "components/layout/FlexCentre";
import { Spacing } from "components/layout/Spacing";
import { Song } from "components/Song";
import { Spinner } from "components/Spinner";
import { spotifyCurrentlyPlayingApi } from "model/service/SpotifyCurrentlyPlaying";

export const NowPlayingContainer = styled.div`
    border-top: 0.05em solid ${props => props.theme.field.base.borderColor};
    border-bottom: 0.05em solid ${props => props.theme.field.base.borderColor};
    padding-bottom: 1em;
`;

interface Props {
    roomId: string;
}

export const NowPlaying: FC<Props> = props => {
    const result = spotifyCurrentlyPlayingApi.endpoints.get.useQuery(props.roomId);

    const isPending = result.isLoading || result.isFetching;
    if (isPending) return (
        <FlexCentre>
            <Spinner />
        </FlexCentre>
    );

    if (result.isError || !result.data) return (
        <FlexCentre>
            Could not get currently playing
        </FlexCentre>
    );

    return (
        <NowPlayingContainer>
            <Flex flexDirection="column">
                <Spacing marginTop={"0.5em"} marginBottom={"0.5em"}>
                    Currently playing:
                </Spacing>
                <Song song={result.data} />
            </Flex>
        </NowPlayingContainer>
    );
};
