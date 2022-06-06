import React, { CSSProperties, FC, useCallback, MouseEvent } from 'react';
import { Avatar, ListItem, ListItemAvatar, ListItemText, Skeleton } from '@mui/material';
import { LikeIcon } from 'room/components/QueueSongLike';
import { DeleteIcon } from 'room/components/QueueSongDelete';
import { SongItem } from 'room/components/SongItem';

interface Props {
    title: string;
    artist: string;
    albumUrl: string;
    isLoggedIn: boolean;
    isRoomOwner: boolean;
    isLiked: boolean;
    style?: CSSProperties;
    onClick?: () => void;
    onDeleteClick?: () => void;
    onLikeClick?: () => void;
}


export const QueueSong: FC<Props> = props => {
    const { onLikeClick, onDeleteClick } = props;

    const likeClickHandler = useCallback((event?: MouseEvent<HTMLButtonElement>) => {
        event?.stopPropagation();
        onLikeClick && onLikeClick();
    }, [onLikeClick]);

    const deleteClickHandler = useCallback((event?: MouseEvent<HTMLButtonElement>) => {
        event?.stopPropagation();
        onDeleteClick && onDeleteClick();
    }, [onDeleteClick]);

    return (
        <ListItem style={props.style} onClick={props.onClick}>
            <SongItem title={props.title} artist={props.artist} albumUrl={props.albumUrl}/>
            { props.isLoggedIn ?  <LikeIcon isLiked={props.isLiked} onClick={likeClickHandler} /> : null }
            { props.isRoomOwner ? <DeleteIcon onClick={deleteClickHandler}/> : null }
        </ListItem>
    );
};

export const QueueSongItemSkeleton: FC = () => {
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

