import type { FC } from 'react';
import { SongList } from 'room/components/SongList';
import { Box, Skeleton } from '@mui/material';
import { QueueSong } from 'room/components/QueueSong';
import { useDependencies } from 'common/hooks/useDependencies';
import { TaskStatus } from 'common/model/Task';
import { DeferredTask } from 'common/components/DeferredTask';
import type { RoomSongModel } from 'room/model/RoomSongModel';
import { mapSongFromGuestDto } from 'room/mappers/mapRoomSongFromDto';

interface Props {
    roomId: string;
}

export const Queue: FC<Props> = props => {
    const task = useDependencies(d => d.useSongQueue)(props);

    return (
        <DeferredTask task={task}>
            {{
                [TaskStatus.Resulted]: songs => <QueueInternal songs={songs.map(mapSongFromGuestDto)} />,
                [TaskStatus.Completed]: () => <QueueInternal songs={[]} />,
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

const QueueInternal: FC<{ songs: RoomSongModel[] }> = props => {
    // TODO This should probably be done in the API/state layer.
    // It can stay here for now.
    const songs = props.songs.filter(s => !s.isPlayed && !s.isRemoved).slice(1);
    return <SongList<RoomSongModel>
        songs={songs}
        row={rowProps => (
            <QueueSong
                style={rowProps.style}
                key={`${rowProps.data[rowProps.index].song.uri}_${rowProps.index}`}
                title={rowProps.data[rowProps.index].song.name}
                artist={rowProps.data[rowProps.index].song.artist}
                albumUrl={rowProps.data[rowProps.index].song.albumUrl}
                isLoggedIn={true} // TODO: update values 
                isRoomOwner={false} // TODO: update values 
                isLiked={rowProps.data[rowProps.index].isUserLiked ?? false}
            />
        )}
    />;
};
