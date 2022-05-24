import React, { FC } from 'react';
import AutoSizer from 'react-virtualized-auto-sizer';
import { FixedSizeList, ListChildComponentProps } from 'react-window';

// TODO use a model for this to de-couple frontend
import type { SongDto } from 'room/dtos/SongDto';

interface Props {
    songs: SongDto[];
    row: (rowProps: ListChildComponentProps<SongDto[]>) => JSX.Element;
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
                    {rowProps => props.row(rowProps)}
                </FixedSizeList>
            )}
        </AutoSizer>
    );
};
