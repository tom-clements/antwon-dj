import React, { FC } from 'react';
import { roomApi, RoomSongDto } from 'model/service/RoomApi';
import { QueryResult, QueryResultStatus } from 'components/core/QueryResult';
import { SongItem, SongItemSkeleton } from 'components/room/SongItem';

interface Props {
    roomId: string;
}

export const NextSong: FC<Props> = props => {
    const result = roomApi.endpoints.getRoomQueue.useQuery(props.roomId);
    return (
        <QueryResult<RoomSongDto[]> result={result}>
            {{
                [QueryResultStatus.OK]: data => <NextSongInternal songs={data} />,
                [QueryResultStatus.Pending]: () => <SongItemSkeleton />,
            }}
        </QueryResult >
    );
};

const NextSongInternal: FC<{ songs: RoomSongDto[] }> = props => {
    // This should probably be done in the API/state layer.
    // It can stay here for now.
    const nextSong = props.songs.filter(s => !s.is_played && !s.is_removed).shift();
    if (!nextSong) return null;
    return (
        <SongItem
            title={nextSong.song_name}
            artist={nextSong.song_artist}
            albumUrl={nextSong.song_album_url}
        />
    );
};
