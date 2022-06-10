import { CSSProperties, FC, useCallback, MouseEvent } from 'react';
import { Avatar, ListItem, ListItemAvatar, ListItemText, Skeleton } from '@mui/material';
import { useDependencies } from 'common/hooks/useDependencies';
import { QueueSongLikeButton } from 'room/components/QueueSongLikeButton';
import { QueueSongDeleteButton } from 'room/components/QueueSongDeleteButton';
import { SongItem } from 'room/components/SongItem';

interface Props {
    roomId: string;
    songId: string;
    title: string;
    artist: string;
    albumUrl: string;
    isLoggedIn: boolean;
    isRoomOwner: boolean;
    style?: CSSProperties;
    onClick?: () => void;
}

export const QueueSong: FC<Props> = props => {
    const { songLikes, likeToggle, deleteSong } = useDependencies(d => d.useSong)(props);
    const isLiked = songLikes?.isLiked ?? false;
    // const likeCount = songLikes?.likeCount ?? 0;

    const likeClickHandler = useCallback((event?: MouseEvent<HTMLButtonElement>) => {
        event?.stopPropagation();
        likeToggle();
    }, [likeToggle]);

    const deleteClickHandler = useCallback((event?: MouseEvent<HTMLButtonElement>) => {
        event?.stopPropagation();
        deleteSong();
    }, [deleteSong]);

    return (
        <ListItem style={props.style} onClick={props.onClick}>
            <SongItem title={props.title} artist={props.artist} albumUrl={props.albumUrl}/>
            {props.isLoggedIn ? <QueueSongLikeButton isLiked={isLiked} onClick={likeClickHandler} /> : null}
            {props.isRoomOwner ? <QueueSongDeleteButton onClick={deleteClickHandler}/> : null}
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
