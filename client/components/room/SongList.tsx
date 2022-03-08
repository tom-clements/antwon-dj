import React, { FC } from 'react';
import { SongDto } from 'service/SpotifySearchApi';
import { SongItem } from 'components/room/SongItem';
import AutoSizer from 'react-virtualized-auto-sizer';
import { FixedSizeList, ListChildComponentProps } from 'react-window';

interface Props {
    songs: SongDto[];
    onSelectSong?: (song: SongDto) => void;
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
                    {({ index, style, data }) => (
                        <SongRow index={index} style={style} data={data} onSelectSong={props.onSelectSong} />
                    )}
                </FixedSizeList>
            )}
        </AutoSizer>
    );
};

interface SongRowProps extends ListChildComponentProps<SongDto[]> {
    onSelectSong?: (song: SongDto) => void;
}

const SongRow: FC<SongRowProps> = props => {
    return (
        <SongItem
            style={props.style}
            key={`${props.data[props.index].song_uri}_${props.index}`}
            title={props.data[props.index].song_name}
            artist={props.data[props.index].song_artist}
            albumUrl={props.data[props.index].song_album_url}
            onClick={() => props.onSelectSong && props.onSelectSong(props.data[props.index])}
        />
    );
};
