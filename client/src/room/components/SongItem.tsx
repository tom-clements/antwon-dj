import React, { CSSProperties, FC } from 'react';
import { Avatar, ListItem, ListItemAvatar, ListItemText, Skeleton, styled } from '@mui/material';
import { FavoriteBorder, Delete } from '@mui/icons-material';

interface Props {
    title: string;
    artist: string;
    albumUrl: string;
    isLoggedIn: boolean;
    isRoomOwner: boolean;
    style?: CSSProperties;
    onClick?: () => void;
}

const SongItemText = styled(ListItemText)`
    & p, & span {
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
    }
`;

export const SongItem: FC<Props> = props => {
    const {
        style,
        albumUrl,
        title,
        artist,
        isLoggedIn,
        isRoomOwner
    } = props;
    return (
        <ListItem style={style} onClick={props.onClick}>
            <ListItemAvatar>
                <Avatar variant="square" src={albumUrl} />
            </ListItemAvatar>
            <SongItemText
                primary={title}
                secondary={artist}
            />
            {isLoggedIn ? <FavoriteBorder /> : null}
            {isRoomOwner ? <Delete /> : null}
        </ListItem>
    );
};

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
