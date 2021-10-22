import React, { FC } from 'react';
import { styled, Box } from '@mui/material';
import { roomApi, RoomSongDto } from 'model/service/RoomApi';
import { QueryResult, QueryResultStatus } from 'components/core/QueryResult';
import { SongItem, SongItemSkeleton } from 'components/room/SongItem';

interface Props {
    roomId: string;
    isOpen: boolean;
}

const EmptyQueueContainer = styled(Box)`
    text-align: center;
    padding: ${props => props.theme.spacing(2)};
`;

export const NextSong: FC<Props> = props => {
    const result = roomApi.endpoints.getRoomQueue.useQuery(props.roomId, {
        pollingInterval: 5000,
    });
    return (
        <QueryResult<RoomSongDto[]> result={result}>
            {{
                [QueryResultStatus.OK]: data => <NextSongInternal songs={data} isOpen={props.isOpen} />,
                [QueryResultStatus.Pending]: () => <SongItemSkeleton />,
            }}
        </QueryResult >
    );
};

interface InternalProps {
    songs: RoomSongDto[];
    isOpen: boolean;
}

const NextSongInternal: FC<InternalProps> = props => {
    // This should probably be done in the API/state layer.
    // It can stay here for now.
    const nextSong = props.songs.filter(s => !s.is_played && !s.is_removed).shift();

    if (!nextSong) {
        if (props.isOpen) return null;
        return (
            <EmptyQueueContainer>
                The queue is currently empty! Try adding some songs by clicking here
            </EmptyQueueContainer>
        );
    }

    return (
        <SongItem
            title={nextSong.song_name}
            artist={nextSong.song_artist}
            albumUrl={nextSong.song_album_url}
        />
    );
};
