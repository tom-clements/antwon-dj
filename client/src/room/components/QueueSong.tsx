import { CSSProperties, FC, useCallback, MouseEvent } from 'react';
import { ListItem } from '@mui/material';
import { useDependencies } from 'common/hooks/useDependencies';
import { QueueSongLikeButton } from 'room/components/QueueSongLikeButton';
import { QueueSongDeleteButton } from 'room/components/QueueSongDeleteButton';
import { SongItem } from 'room/components/SongItem';
import { getIsLocal } from 'config/getIsLocal';

interface Props {
    roomId: string;
    songId: string;
    title: string;
    artist: string;
    albumUrl: string;
    style?: CSSProperties;
    onClick?: () => void;
}

export const QueueSong: FC<Props> = props => {
    const { isLoggedIn } = useDependencies(d => d.useUserClaims)();
    if (!isLoggedIn) return <GuestQueueSong {...props} />;
    return <UserQueueSong {...props} />;
};

const GuestQueueSong: FC<Props> = props => {
    return (
        <ListItem style={props.style} onClick={props.onClick}>
            <SongItem title={props.title} artist={props.artist} albumUrl={props.albumUrl}/>
        </ListItem>
    );
};

const UserQueueSong: FC<Props> = props => {
    const { isRoomOwner } = useDependencies(d => d.useUserClaims)();
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
            <QueueSongLikeButton isLiked={isLiked} onClick={likeClickHandler} />
            {isRoomOwner && getIsLocal() ? <QueueSongDeleteButton onClick={deleteClickHandler}/> : null}
        </ListItem>
    );
};
