import React, { FC } from 'react';
import { spotifyCurrentlyPlayingApi } from 'model/service/SpotifyCurrentlyPlaying';
import { styled } from '@mui/material/styles';
import { grey } from '@mui/material/colors';
import Box from '@mui/material/Box';
import { SongDto } from 'model/service/SpotifySearchApi';
import { Spinner } from 'components/core/Spinner';
import { QueryResult, QueryResultStatus } from 'components/core/QueryResult';

interface Props {
    roomId: string;
}

const Root = styled(Box)`
    width: 100vw;
    height: 50vh;
    position: relative;
`;

const Overlay = styled(Box)`
    opacity: 0.75;
    background: ${props => props.theme.palette.mode === 'light' ? grey[100] : grey[900]};
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
`;

const NowPlayingArtContainer = styled(Box)`
    width: 100%;
    height: 50vh;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
`;

const NowPlayingArt = styled('img')`
    height: 50vh;
`;

const NowPlayingSideArt = styled('img')`
    width: 100%;
    height: 50vh;
    filter: blur(14px) opacity(0.75);
    transform: scale(1.05);
`;

export const NowPlaying: FC<Props> = props => {
    const result = spotifyCurrentlyPlayingApi.endpoints.get.useQuery(props.roomId);
    return (
        <QueryResult<SongDto> result={result}>
            {{
                [QueryResultStatus.OK]: data => <NowPlayingInternalLoaded song={data} />,
                [QueryResultStatus.Pending]: () => <NowPlayingInternalPending />,
            }}
        </QueryResult>
    );
};

const NowPlayingInternalLoaded: FC<{ song: SongDto }> = props => {
    return (
        <Root>
            <NowPlayingArtContainer>
                <NowPlayingSideArt src={props.song.song_album_url} />
                <NowPlayingArt src={props.song.song_album_url} />
                <NowPlayingSideArt src={props.song.song_album_url} />
            </NowPlayingArtContainer>
            <Overlay />
        </Root>
    );
};

const NowPlayingInternalPending: FC = () => {
    return (
        <Root>
            <NowPlayingArtContainer>
                <Spinner scale={7} />
            </NowPlayingArtContainer>
            <Overlay />
        </Root>
    );
};
