import React, { FC } from 'react';
import { roomApi, RoomSongDto } from 'service/RoomApi';
import { QueryResult, QueryResultStatus } from 'components/core/QueryResult';
import { SongList } from 'components/room/SongList';
import { Box, Skeleton } from '@mui/material';

interface Props {
    roomId: string;
}

export const SongQueue: FC<Props> = props => {
    const result = roomApi.endpoints.getRoomQueue.useQuery(props.roomId, {
        pollingInterval: 5000,
    });
    return (
        <QueryResult<RoomSongDto[]> result={result}>
            {{
                [QueryResultStatus.OK]: data => <SongQueueInternal songs={data} />,
                [QueryResultStatus.Pending]: () => <QueueSkeleton />,
            }}
        </QueryResult>
    );
};

const QueueSkeleton: FC = () => {
    return (
        <Box p={'16px'} position={'absolute'} width={'100%'} height={'100%'}>
            <Skeleton variant={'rectangular'} height={'100%'} />
        </Box>
    );
};

const SongQueueInternal: FC<{ songs: RoomSongDto[] }> = props => {
    // This should probably be done in the API/state layer.
    // It can stay here for now.
    const songs = props.songs.filter(s => !s.is_played && !s.is_removed).slice(1);
    return <SongList songs={songs} />;
};
