import type { FC } from 'react';
import { styled, Box, ListItem } from '@mui/material';
import { useDependencies } from 'common/hooks/useDependencies';
import { TaskStatus } from 'common/model/Task';
import { DeferredTask } from 'common/components/DeferredTask';
import { SongItem, SongItemSkeleton } from 'room/components/SongItem';
import type { RoomSongModel } from 'room/model/RoomSongModel';
import { mapSongFromGuestDto } from 'room/mappers/mapRoomSongFromDto';

interface Props {
    roomId: string;
    isOpen: boolean;
}

const EmptyQueueContainer = styled(Box)`
    text-align: center;
    padding: ${props => props.theme.spacing(2)};
`;

export const QueueSongNext: FC<Props> = props => {
    const task = useDependencies(d => d.useSongQueue)(props);
    return (
        <DeferredTask task={task}>
            {{
                [TaskStatus.Resulted]: songs => <NextSongInternal songs={songs.map(mapSongFromGuestDto)} isOpen={props.isOpen} />,
                [TaskStatus.Completed]: () => <NextSongInternal songs={[]} isOpen={props.isOpen} />,
                [TaskStatus.Created]: () => <SongItemSkeleton />,
            }}
        </DeferredTask >
    );
};

interface InternalProps {
    songs: RoomSongModel[];
    isOpen: boolean;
}

const NextSongInternal: FC<InternalProps> = props => {
    // TODO This should probably be done in the API/state layer.
    // It can stay here for now.
    const nextSong = props.songs.filter(s => !s.isPlayed && !s.isRemoved).shift();

    if (!nextSong) {
        if (props.isOpen) return null;
        return (
            <EmptyQueueContainer>
                The queue is currently empty! Try adding some songs by clicking here
            </EmptyQueueContainer>
        );
    }

    return (
        <ListItem>
            <SongItem
                title={nextSong.song.name}
                artist={nextSong.song.artist}
                albumUrl={nextSong.song.albumUrl}
            />
        </ListItem>
    );
};
