import React, { FC } from 'react';
import { spotifyCurrentlyPlayingApi } from 'service/SpotifyCurrentlyPlaying';
import { styled } from '@mui/material/styles';
import { grey } from '@mui/material/colors';
import Box from '@mui/material/Box';
import { SongDto } from 'service/SpotifySearchApi';
import { Spinner } from 'components/core/Spinner';
import { QueryResult, QueryResultStatus } from 'components/core/QueryResult';
import { Typography } from '@mui/material';
import { useAppSelector } from 'model/Store';
import { selectRoomPortalCode } from 'model/slices/RoomPortalSlice';

interface Props {
    roomId: string;
}

const Root = styled(Box)`
    width: 100%;
    height: calc(50% + 16px); // todo make border radius offset constant
    position: relative;
`;

const Mask = styled(Box)`
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

const Overlay = styled(Box)`
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: ${props => props.theme.spacing(2, 2, 4)};
    align-items: flex-end;
    text-align: right;
`;

const NowPlayingArtContainer = styled(Box)`
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
`;

const NowPlayingArt = styled('img')`
    height: 100%;
`;

const NowPlayingSideArt = styled('img')`
    width: 100%;
    height: 100%;
    filter: blur(14px) opacity(0.75);
    transform: scale(1.05);
`;

export const NowPlaying: FC<Props> = props => {
    const result = spotifyCurrentlyPlayingApi.endpoints.get.useQuery(props.roomId, {
        pollingInterval: 5000,
    });
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
            <Mask />
            <Overlay>
                <RoomDetails />
                <NowPlayingDetails song={props.song} />
            </Overlay>
        </Root>
    );
};

const NowPlayingInternalPending: FC = () => {
    return (
        <Root>
            <NowPlayingArtContainer>
                <Spinner scale={7} />
            </NowPlayingArtContainer>
            <Mask />
            <Overlay>
                <RoomDetails />
            </Overlay>
        </Root >
    );
};

const RoomDetails: FC = () => {
    const roomCode = useAppSelector(selectRoomPortalCode);
    return (
        <Box>
            <Typography variant="caption" sx={{ opacity: 0.75 }}>
                Room
            </Typography>
            <Typography variant="h6">
                {roomCode}
            </Typography>
        </Box>
    );
};

const NowPlayingDetails: FC<{ song: SongDto }> = props => {
    return (
        <Box>
            <Typography variant="caption" sx={{ opacity: 0.75 }}>
                {props.song.song_artist}
            </Typography>
            <Typography variant="h5">
                {props.song.song_name}
            </Typography>
        </Box>
    );
};
