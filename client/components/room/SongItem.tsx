import React, { CSSProperties, FC } from 'react';
import { Avatar, ListItem, ListItemAvatar, ListItemText, Skeleton, styled } from '@mui/material';

interface Props {
    title: string;
    artist: string;
    albumUrl: string;
    style: CSSProperties;
}

const SongItemText = styled(ListItemText)`
    & p, & span {
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
    }
`;

export const SongItem: FC<Props> = props => {
    return (
        <ListItem style={props.style}>
            <ListItemAvatar>
                <Avatar variant="square" src={props.albumUrl} />
            </ListItemAvatar>
            <SongItemText
                primary={props.title}
                secondary={props.artist}
            />
        </ListItem>
    );
}

export const SongItemSkeleton: FC = () => {
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
