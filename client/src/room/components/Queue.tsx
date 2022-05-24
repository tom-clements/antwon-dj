import React, { FC } from 'react';
import { roomApi } from 'room/services/roomApi';
import { QueryResult, QueryResultStatus } from 'common/components/QueryResult';
import { Box, Skeleton } from '@mui/material';
import { SongList } from 'room/components/SongList';
import { QueueSong } from 'room/components/QueueSong';

// TODO use a model for this to de-couple frontend
import type { RoomSongDto } from 'room/dtos/RoomSongDto';

interface Props {
    roomId: string;
}

export const RoomQueue: FC<Props> = props => {
    // TODO Replace with useTask based hook
    // Turns out we _need_ to do this for MVP - we cannot safely or easily differentiate user types
    const result = roomApi.endpoints.guestQueue.useQuery(props.roomId, {
        pollingInterval: 5000,
    });
    return (
        <QueryResult<RoomSongDto[]> result={result}>
            {{
                [QueryResultStatus.OK]: data => <RoomQueueInternal songs={data} />,
                [QueryResultStatus.Pending]: () => <RoomQueueSkeleton />,
            }}
        </QueryResult>
    );
};

const RoomQueueSkeleton: FC = () => {
    return (
        <Box p={'16px'} position={'absolute'} width={'100%'} height={'100%'}>
            <Skeleton variant={'rectangular'} height={'100%'} />
        </Box>
    );
};

const RoomQueueInternal: FC<{ songs: RoomSongDto[] }> = props => {
    // This should probably be done in the API/state layer.
    // It can stay here for now.
    const songs = props.songs.filter(s => !s.is_played && !s.is_removed).slice(1);
    return <SongList
        songs={songs}
        row={rowProps => (
            <QueueSong
                style={rowProps.style}
                key={`${rowProps.data[rowProps.index].song_uri}_${rowProps.index}`}
                title={rowProps.data[rowProps.index].song_name}
                artist={rowProps.data[rowProps.index].song_artist}
                albumUrl={rowProps.data[rowProps.index].song_album_url}
                isLoggedIn={true} // TODO: update values 
                isRoomOwner={false} // TODO: update values 
                isLiked={false} // TODO: update values 
            />
        )}
    />;
};
