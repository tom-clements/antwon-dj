import React, { FC } from 'react';
import { SongDto } from 'model/service/SpotifySearchApi';
import { SongItem } from 'components/room/SongItem';
import AutoSizer from 'react-virtualized-auto-sizer';
import { FixedSizeList, ListChildComponentProps } from 'react-window';

interface Props {
    songs: SongDto[];
}

export const SongList: FC<Props> = props => {
    return (
        <AutoSizer>
            {({ height, width }) => (
                <FixedSizeList
                    height={height}
                    width={width}
                    itemData={props.songs}
                    itemCount={props.songs.length}
                    itemSize={56}
                    overscanCount={5}
                >
                    {SongRow}
                </FixedSizeList>
            )}
        </AutoSizer>
    )
};

const SongRow: FC<ListChildComponentProps<SongDto[]>> = ({ index, style, data }) => {
    return (
        <SongItem
            style={style}
            key={`${data[index].id}_${index}`}
            title={data[index].song_name}
            artist={data[index].song_artist}
            albumUrl={data[index].song_album_url}
        />
    );
};
