import React, { FC } from 'react';
import { SongDto } from 'model/service/SpotifySearchApi';
import { List, styled } from '@mui/material';
import { SongItem } from 'components/room/SongItem';

const ScrollList = styled(List)`
    max-height: 100%;
    overflow: auto;
`;

interface Props {
    songs: SongDto[];
}

export const SongList: FC<Props> = props => {
    // This should be virtualized. For now, suffer performance.
    return (
        <ScrollList>
            {props.songs.map((s, i) =>
                <SongItem key={`${s.id}_${i}`}
                    title={s.song_name}
                    artist={s.song_artist}
                    albumUrl={s.song_album_url}
                />
            )}
        </ScrollList>
    )
}
