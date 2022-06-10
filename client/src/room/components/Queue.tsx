import type { FC } from 'react';
import { SongList } from 'room/components/SongList';
import { Box, Skeleton } from '@mui/material';
import { QueueSong } from 'room/components/QueueSong';
import { useDependencies } from 'common/hooks/useDependencies';
import { TaskStatus } from 'common/model/Task';
import { DeferredTask } from 'common/components/DeferredTask';
import type { RoomSongModel } from 'room/model/RoomSongModel';
import { mapRoomSongFromDto } from 'room/mappers/mapRoomSongFromDto';

interface Props {
    roomId: string;
}

export const Queue: FC<Props> = props => {
    const task = useDependencies(d => d.useSongQueue)(props);

    return (
        <DeferredTask task={task}>
            {{
                [TaskStatus.Resulted]: songs => <QueueInternal songs={songs.map(mapRoomSongFromDto)} roomId={props.roomId} isLoggedIn />,
                [TaskStatus.Completed]: () => <QueueInternal songs={[]} roomId={props.roomId} isLoggedIn />,
                [TaskStatus.Created]: () => <QueueSkeleton />,
            }}
        </DeferredTask>
    );
};

const QueueSkeleton: FC = () => {
    return (
        <Box p={'16px'} position={'absolute'} width={'100%'} height={'100%'}>
            <Skeleton variant={'rectangular'} height={'100%'} />
        </Box>
    );
};

interface QueueInternalProps {
    roomId: string;
    songs: RoomSongModel[];
    isLoggedIn?: boolean;
}

const QueueInternal: FC<QueueInternalProps> = props => {
    // TODO This should probably be done in the API/state layer.
    // It can stay here for now.
    const songs = props.songs.filter(s => !s.isPlayed && !s.isRemoved).slice(1);

    return <SongList<RoomSongModel>
        songs={songs}
        row={rowProps => (
            <QueueSong
                style={rowProps.style}
                key={`${rowProps.data[rowProps.index].song.uri}_${rowProps.index}`}
                roomId={props.roomId}
                songId={rowProps.data[rowProps.index].id}
                title={rowProps.data[rowProps.index].song.name}
                artist={rowProps.data[rowProps.index].song.artist}
                albumUrl={rowProps.data[rowProps.index].song.albumUrl}
                isLoggedIn={!!props.isLoggedIn}
                isRoomOwner={false} // TODO: update value
            />
        )}
    />;
};
