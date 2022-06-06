import React, { CSSProperties, FC } from 'react';
import { Avatar, ListItem, ListItemAvatar, ListItemText, Skeleton } from '@mui/material';
import { SongItem } from 'room/components/SongItem';

interface Props {
    title: string;
    artist: string;
    albumUrl: string;
    style?: CSSProperties;
    onClick?: () => void;
}


export const SearchSong: FC<Props> = props => {
    return (
        <ListItem style={props.style} onClick={props.onClick}>
            <SongItem title={props.title} artist={props.artist} albumUrl={props.albumUrl}/>
        </ListItem>
    );
};

export const SearchSongItemSkeleton: FC = () => {
    return (
        <ListItem>
            <ListItemAvatar>
                <Skeleton variant="rectangular">
                    <Avatar variant="square" />
                </Skeleton>
            </ListItemAvatar>
            <ListItemText
                primary={<Skeleton />}
                secondary={<Skeleton />}
            />
        </ListItem>
    );
};

