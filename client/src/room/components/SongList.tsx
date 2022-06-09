import AutoSizer from 'react-virtualized-auto-sizer';
import { FixedSizeList, ListChildComponentProps } from 'react-window';
import type { SongModel } from 'room/model/SongModel';
import type { RoomSongModel } from 'room/model/RoomSongModel';

type SongItemModel = SongModel | RoomSongModel;

interface Props<T extends SongItemModel> {
    songs: T[];
    row: (rowProps: ListChildComponentProps<T[]>) => JSX.Element;
}

export const SongList = <T extends SongItemModel>(props: Props<T>) => {
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
                    {rowProps => props.row(rowProps)}
                </FixedSizeList>
            )}
        </AutoSizer>
    );
};
