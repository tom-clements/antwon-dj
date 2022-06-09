import type { FC } from 'react';
import { styled } from '@mui/material/styles';
import { grey } from '@mui/material/colors';
import Box from '@mui/material/Box';
import { Spinner } from 'common/components/Spinner';
import { useDependencies } from 'common/hooks/useDependencies';
import { TaskStatus } from 'common/model/Task';
import { DeferredTask } from 'common/components/DeferredTask';
import { Typography } from '@mui/material';
import { useSelector } from 'common/services/createStore';
import { selectRoomPortalCode } from 'roomPortal/services/roomPortalSlice';
import { mapSongFromDto } from 'room/mappers/mapSongFromDto';
import type { SongModel } from 'room/model/SongModel';

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
    const task = useDependencies(d => d.useNowPlaying)(props);
    return (
        <DeferredTask task={task}>
            {{
                [TaskStatus.Resulted]: song => <NowPlayingInternalLoaded song={mapSongFromDto(song)} />,
                [TaskStatus.Completed]: () => <NowPlayingInternalPending />,
                [TaskStatus.Created]: () => <NowPlayingInternalPending />,
            }}
        </DeferredTask>
    );
};

const NowPlayingInternalLoaded: FC<{ song: SongModel }> = props => {
    return (
        <Root>
            <NowPlayingArtContainer>
                <NowPlayingSideArt src={props.song.albumUrl} />
                <NowPlayingArt src={props.song.albumUrl} />
                <NowPlayingSideArt src={props.song.albumUrl} />
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
    const roomCode = useSelector(selectRoomPortalCode);
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

const NowPlayingDetails: FC<{ song: SongModel }> = props => {
    return (
        <Box>
            <Typography variant="caption" sx={{ opacity: 0.75 }}>
                {props.song.artist}
            </Typography>
            <Typography variant="h5">
                {props.song.name}
            </Typography>
        </Box>
    );
};
